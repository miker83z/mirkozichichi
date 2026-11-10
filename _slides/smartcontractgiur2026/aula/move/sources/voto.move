/// A class vote, for the lecture "Blockchain & Smart Contracts" (UniBo, 2026).
/// The lecturer (holder of the AdminCap) creates polls; each `Sondaggio` is a shared object that anyone
/// can read; every address can vote once; counts and votes are public on the testnet.
module aula::voto;

use iota::event;
use iota::table::{Self, Table};
use std::string::String;

/// Lets the lecturer create, close and reopen polls. Given to the publisher.
public struct AdminCap has key, store {
    id: UID,
}

public struct Sondaggio has key {
    id: UID,
    domanda: String,
    opzioni: vector<String>,
    voti: vector<u64>,
    /// address -> chosen option
    votanti: Table<address, u64>,
    aperto: bool,
}

public struct SondaggioCreato has copy, drop {
    sondaggio: ID,
    domanda: String,
}

public struct Votato has copy, drop {
    sondaggio: ID,
    scelta: u64,
    votante: address,
}

const OPZIONI_MIN: u64 = 2;
const OPZIONI_MAX: u64 = 6;

const EChiuso: u64 = 0;
const EGiaVotato: u64 = 1;
const ESceltaNonValida: u64 = 2;
const EOpzioniNonValide: u64 = 3;

fun init(ctx: &mut TxContext) {
    transfer::transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
}

/// Create an open poll with 2-6 options.
public fun crea(_: &AdminCap, domanda: String, opzioni: vector<String>, ctx: &mut TxContext) {
    let n = opzioni.length();
    assert!(n >= OPZIONI_MIN && n <= OPZIONI_MAX, EOpzioniNonValide);
    let mut voti = vector[];
    let mut i = 0;
    while (i < n) {
        voti.push_back(0);
        i = i + 1;
    };
    let sondaggio = Sondaggio {
        id: object::new(ctx),
        domanda,
        opzioni,
        voti,
        votanti: table::new(ctx),
        aperto: true,
    };
    event::emit(SondaggioCreato { sondaggio: object::id(&sondaggio), domanda });
    transfer::share_object(sondaggio);
}

/// Vote for option `scelta` (0-based), once per address, while the poll is open.
public fun vota(sondaggio: &mut Sondaggio, scelta: u64, ctx: &TxContext) {
    assert!(sondaggio.aperto, EChiuso);
    assert!(scelta < sondaggio.opzioni.length(), ESceltaNonValida);
    let chi = ctx.sender();
    assert!(!sondaggio.votanti.contains(chi), EGiaVotato);
    sondaggio.votanti.add(chi, scelta);
    let conteggio = &mut sondaggio.voti[scelta];
    *conteggio = *conteggio + 1;
    event::emit(Votato { sondaggio: object::id(sondaggio), scelta, votante: chi });
}

public fun chiudi(_: &AdminCap, sondaggio: &mut Sondaggio) {
    sondaggio.aperto = false;
}

public fun riapri(_: &AdminCap, sondaggio: &mut Sondaggio) {
    sondaggio.aperto = true;
}

public fun voti(sondaggio: &Sondaggio): vector<u64> {
    sondaggio.voti
}

public fun ha_votato(sondaggio: &Sondaggio, chi: address): bool {
    sondaggio.votanti.contains(chi)
}

#[test_only]
public fun init_per_test(ctx: &mut TxContext) {
    init(ctx)
}
