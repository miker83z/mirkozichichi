/// The class coin AULA, for the lecture "Blockchain & Smart Contracts" (UniBo, 2026).
/// A shared `Rubinetto` (faucet) holds the TreasuryCap: every address can join the class once, with a
/// nickname, and receives 10 AULA. Nicknames are unique and public, so classmates can send AULA to each
/// other by name. Test network (devnet) only: AULA has no value.
module aula::aula;

use iota::coin::{Self, Coin, TreasuryCap};
use iota::event;
use iota::table::{Self, Table};
use std::string::String;

/// One-time witness: the type of the coin.
public struct AULA has drop {}

/// The class faucet.
public struct Rubinetto has key {
    id: UID,
    tesoro: TreasuryCap<AULA>,
    /// nickname -> address
    iscritti: Table<String, address>,
    /// address -> nickname (one per address)
    nomi: Table<address, String>,
}

/// Emitted when a student joins.
public struct Iscritto has copy, drop {
    nome: String,
    indirizzo: address,
}

/// Emitted when AULA is sent to a classmate by nickname.
public struct Inviato has copy, drop {
    da: address,
    a: String,
    importo: u64,
}

/// AULA received when joining.
const DOTE: u64 = 10;
const NOME_MIN: u64 = 2;
const NOME_MAX: u64 = 20;

const EGiaIscritto: u64 = 0;
const ENomeOccupato: u64 = 1;
const ENomeNonValido: u64 = 2;
const ENomeSconosciuto: u64 = 3;

fun init(witness: AULA, ctx: &mut TxContext) {
    let (tesoro, metadati) = coin::create_currency(
        witness,
        0,
        b"AULA",
        b"Moneta di classe",
        b"Gettone didattico del seminario Blockchain e Smart Contract, Universita di Bologna, 2026. Senza valore.",
        option::none(),
        ctx,
    );
    transfer::public_freeze_object(metadati);
    transfer::share_object(Rubinetto {
        id: object::new(ctx),
        tesoro,
        iscritti: table::new(ctx),
        nomi: table::new(ctx),
    });
}

/// Join the class with a nickname (2-20 bytes): receive 10 AULA, once per address.
public fun iscriviti(rubinetto: &mut Rubinetto, nome: String, ctx: &mut TxContext) {
    let chi = ctx.sender();
    assert!(!rubinetto.nomi.contains(chi), EGiaIscritto);
    let lunghezza = nome.length();
    assert!(lunghezza >= NOME_MIN && lunghezza <= NOME_MAX, ENomeNonValido);
    assert!(!rubinetto.iscritti.contains(nome), ENomeOccupato);
    rubinetto.iscritti.add(nome, chi);
    rubinetto.nomi.add(chi, nome);
    coin::mint_and_transfer(&mut rubinetto.tesoro, DOTE, chi, ctx);
    event::emit(Iscritto { nome, indirizzo: chi });
}

/// Send a coin to the classmate registered under `a`.
public fun invia(rubinetto: &Rubinetto, moneta: Coin<AULA>, a: String, ctx: &TxContext) {
    assert!(rubinetto.iscritti.contains(a), ENomeSconosciuto);
    let destinatario = *rubinetto.iscritti.borrow(a);
    event::emit(Inviato { da: ctx.sender(), a, importo: moneta.value() });
    transfer::public_transfer(moneta, destinatario);
}

/// The address registered under a nickname.
public fun indirizzo_di(rubinetto: &Rubinetto, nome: String): address {
    assert!(rubinetto.iscritti.contains(nome), ENomeSconosciuto);
    *rubinetto.iscritti.borrow(nome)
}

/// Is this address already in the class?
public fun iscritto(rubinetto: &Rubinetto, chi: address): bool {
    rubinetto.nomi.contains(chi)
}

/// AULA in circulation.
public fun in_circolazione(rubinetto: &Rubinetto): u64 {
    rubinetto.tesoro.total_supply()
}

#[test_only]
public fun init_per_test(ctx: &mut TxContext) {
    init(AULA {}, ctx)
}
