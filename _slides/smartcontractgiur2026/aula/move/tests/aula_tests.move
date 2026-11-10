#[test_only]
module aula::aula_tests;

use aula::aula::{Self, AULA, Rubinetto};
use aula::voto::{Self, AdminCap, Sondaggio};
use iota::coin::Coin;
use iota::test_scenario as ts;
use std::string::utf8;

const DOCENTE: address = @0xD0;
const ANNA: address = @0xA1;
const BRUNO: address = @0xB2;

fun con_rubinetto(): ts::Scenario {
    let mut s = ts::begin(DOCENTE);
    aula::init_per_test(s.ctx());
    s
}

#[test]
fun iscrizione_da_10_aula() {
    let mut s = con_rubinetto();
    s.next_tx(ANNA);
    {
        let mut r = s.take_shared<Rubinetto>();
        aula::iscriviti(&mut r, utf8(b"anna"), s.ctx());
        assert!(aula::iscritto(&r, ANNA));
        assert!(aula::indirizzo_di(&r, utf8(b"anna")) == ANNA);
        assert!(aula::in_circolazione(&r) == 10);
        ts::return_shared(r);
    };
    s.next_tx(ANNA);
    {
        let moneta = s.take_from_sender<Coin<AULA>>();
        assert!(moneta.value() == 10);
        s.return_to_sender(moneta);
    };
    s.end();
}

#[test, expected_failure(abort_code = aula::EGiaIscritto)]
fun una_sola_iscrizione_per_indirizzo() {
    let mut s = con_rubinetto();
    s.next_tx(ANNA);
    let mut r = s.take_shared<Rubinetto>();
    aula::iscriviti(&mut r, utf8(b"anna"), s.ctx());
    aula::iscriviti(&mut r, utf8(b"anna2"), s.ctx());
    ts::return_shared(r);
    s.end();
}

#[test, expected_failure(abort_code = aula::ENomeOccupato)]
fun soprannome_unico() {
    let mut s = con_rubinetto();
    s.next_tx(ANNA);
    {
        let mut r = s.take_shared<Rubinetto>();
        aula::iscriviti(&mut r, utf8(b"anna"), s.ctx());
        ts::return_shared(r);
    };
    s.next_tx(BRUNO);
    let mut r = s.take_shared<Rubinetto>();
    aula::iscriviti(&mut r, utf8(b"anna"), s.ctx());
    ts::return_shared(r);
    s.end();
}

#[test, expected_failure(abort_code = aula::ENomeNonValido)]
fun soprannome_troppo_corto() {
    let mut s = con_rubinetto();
    s.next_tx(ANNA);
    let mut r = s.take_shared<Rubinetto>();
    aula::iscriviti(&mut r, utf8(b"a"), s.ctx());
    ts::return_shared(r);
    s.end();
}

#[test]
fun invio_per_soprannome() {
    let mut s = con_rubinetto();
    s.next_tx(ANNA);
    {
        let mut r = s.take_shared<Rubinetto>();
        aula::iscriviti(&mut r, utf8(b"anna"), s.ctx());
        ts::return_shared(r);
    };
    s.next_tx(BRUNO);
    {
        let mut r = s.take_shared<Rubinetto>();
        aula::iscriviti(&mut r, utf8(b"bruno"), s.ctx());
        ts::return_shared(r);
    };
    s.next_tx(ANNA);
    {
        let r = s.take_shared<Rubinetto>();
        let mut moneta = s.take_from_sender<Coin<AULA>>();
        let tre = moneta.split(3, s.ctx());
        aula::invia(&r, tre, utf8(b"bruno"), s.ctx());
        assert!(moneta.value() == 7);
        s.return_to_sender(moneta);
        ts::return_shared(r);
    };
    s.next_tx(BRUNO);
    {
        let ids = ts::ids_for_sender<Coin<AULA>>(&s);
        assert!(ids.length() == 2);
    };
    s.end();
}

#[test]
fun voto_contato_una_volta() {
    let mut s = ts::begin(DOCENTE);
    voto::init_per_test(s.ctx());
    s.next_tx(DOCENTE);
    {
        let cap = s.take_from_sender<AdminCap>();
        voto::crea(&cap, utf8(b"Uno smart contract e un contratto?"), vector[utf8(b"Si"), utf8(b"No"), utf8(b"Dipende")], s.ctx());
        s.return_to_sender(cap);
    };
    s.next_tx(ANNA);
    {
        let mut p = s.take_shared<Sondaggio>();
        voto::vota(&mut p, 2, s.ctx());
        assert!(voto::ha_votato(&p, ANNA));
        ts::return_shared(p);
    };
    s.next_tx(BRUNO);
    {
        let mut p = s.take_shared<Sondaggio>();
        voto::vota(&mut p, 2, s.ctx());
        assert!(voto::voti(&p) == vector[0, 0, 2]);
        ts::return_shared(p);
    };
    s.end();
}

#[test, expected_failure(abort_code = voto::EGiaVotato)]
fun niente_doppio_voto() {
    let mut s = ts::begin(DOCENTE);
    voto::init_per_test(s.ctx());
    s.next_tx(DOCENTE);
    {
        let cap = s.take_from_sender<AdminCap>();
        voto::crea(&cap, utf8(b"Domanda"), vector[utf8(b"A"), utf8(b"B")], s.ctx());
        s.return_to_sender(cap);
    };
    s.next_tx(ANNA);
    let mut p = s.take_shared<Sondaggio>();
    voto::vota(&mut p, 0, s.ctx());
    voto::vota(&mut p, 1, s.ctx());
    ts::return_shared(p);
    s.end();
}

#[test, expected_failure(abort_code = voto::EChiuso)]
fun niente_voto_a_sondaggio_chiuso() {
    let mut s = ts::begin(DOCENTE);
    voto::init_per_test(s.ctx());
    s.next_tx(DOCENTE);
    {
        let cap = s.take_from_sender<AdminCap>();
        voto::crea(&cap, utf8(b"Domanda"), vector[utf8(b"A"), utf8(b"B")], s.ctx());
        s.return_to_sender(cap);
    };
    s.next_tx(DOCENTE);
    {
        let cap = s.take_from_sender<AdminCap>();
        let mut p = s.take_shared<Sondaggio>();
        voto::chiudi(&cap, &mut p);
        ts::return_shared(p);
        s.return_to_sender(cap);
    };
    s.next_tx(ANNA);
    let mut p = s.take_shared<Sondaggio>();
    voto::vota(&mut p, 0, s.ctx());
    ts::return_shared(p);
    s.end();
}
