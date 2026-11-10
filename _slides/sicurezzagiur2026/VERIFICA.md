# Verifica delle affermazioni

Controllo eseguito il 9 novembre 2026 (furto a Binance: 10 novembre) su fonti primarie (EUR-Lex, Normattiva, Gazzetta Ufficiale, NIST, IETF, W3C, ACN, Garante, CURIA) e, per le notizie, su testate affidabili. I rapporti completi, con citazioni testuali e link, sono in `verifica/`:

- `verifica/A-sicurezza-crittografia.md`: pagine originali 5–41 (Capi I–IV)
- `verifica/B-hash-tempo-identita.md`: pagine 42–77 e 109–124 (Capi V, VI, VIII, IX)
- `verifica/C-firme-notizie.md`: pagine 78–108 (Capo VII) e le notizie di apertura

## Correzioni rispetto alla versione 2024

| Pag. 2024 | Affermazione | Nella nuova versione | Fonte |
|---|---|---|---|
| 3–4 | Notizie del 2024 (PMI, Comune di Palermo) | Sostituite da notizie 2025–2026 verificate (Clusit, ACN, frigoriferi dei supermercati, Farnesina, Milano-Cortina, Paragon, Crosetto, furto a Binance; il caso DIA, solo rivendicato, è stato tolto) | rapporto C, parte 2 |
| 6 | Riservatezza = "garantire l'autenticità della fonte" | L'autenticità è autenticazione, non riservatezza | NIST CSRC Glossary |
| 13 | "Top Passwords 2018" | Classifica NordPass 2025, mondo e Italia | nordpass.com |
| 14 | 4,7% / 9,8% / 91% tra le top 1000 (attribuito al 2018) | Numeri del 2011, ritrattati dall'autore; valori corretti: 1,6% top 10, 4,4% top 100, 13,2% top 1000, 30% top 10.000 | M. Burnett, xato.net (copia Wayback) |
| 15 | "Facile recuperare password da informazioni su Facebook" | Studio citato con precisione: Wang et al., ACM CCS 2016 (73% in 100 tentativi con PII + password trapelata) | eprints.lancs.ac.uk/85017 |
| 18 | Citazione di Schneier sull'anello debole | Non verificabile sul libro; sostituita da una frase verificata della prefazione | schneier.com |
| 19 | Link erikhollnagel.com | Dominio perso; testo invariato, citata la copia archiviata | Wayback Machine |
| 21 | Crittografia = solo segretezza | Anche integrità, autenticazione dell'origine e non ripudio | NIST Glossary |
| 22 | Cilindro di Jefferson "1800, comunicazioni diplomatiche" | Descritto nel 1790–93, forse mai costruito né usato; M-94 dal 1922 | Monticello (Thomas Jefferson Foundation) |
| 31 | "Cifrario polimorfico" | Termine corretto: polialfabetico (Vigenère, già descritto da Bellaso nel 1553) | Handbook of Applied Cryptography |
| 32 | DES: "un computer in poche ore"; Triplo DES "accettabile" | Deep Crack 56 h (1998), 22 h (1999), crack.sh ~26 h; Triplo DES non ammesso per cifrare dal 1/1/2024 | EFF; crack.sh; NIST SP 800-131A Rev. 2 |
| 34 | Tabella: "52^12" | 62^12 (i valori erano già per 62 simboli); ora calcolata dal vivo | calcolo |
| 35 | Numero di chiavi cresce "esponenzialmente" | Cresce in modo quadratico: n(n−1)/2 | Handbook of Applied Cryptography, §1.11 |
| 40 | RSA si basa sulla fattorizzazione | "In parte" (Rivest, Shamir, Adleman 1978); aggiunti Shor, standard post-quantistici, record RSA-260 e RSA-896 (settembre 2026), calendario NIST IR 8547 (finale 27/10/2026) | NIST; Cognition; S. Weis |
| 41 | ECDSA (solo titolo) | Aggiunti contenuti verificati (secp256k1, equivalenze NIST SP 800-57, Ed25519) | NIST SP 800-57; RFC 8032 |
| 47 | Collisioni "non si possono trovare" | Computazionalmente impraticabile trovarle (resistenza alle collisioni) | Narayanan et al. 2016 |
| 52–56 | Occultamento | Distinto dalla resistenza alla preimmagine; serve un segreto casuale | Narayanan et al. 2016 |
| 58–59 | Definizione di "puzzle-friendly" | La slide descriveva l'occultamento; definizione corretta | Narayanan et al. 2016, p. 29 |
| 64 | SHA-1: "nessuna collisione" | SHAttered (2017), collisioni a prefisso scelto (2020), ritiro NIST entro il 2030; per l'ACN MD5 e SHA-1 sono obsoleti | shattered.io; NIST; ACN |
| 66 | Impronte SHA-256 di esempio | Non riproducibili: ora calcolate dal vivo | — |
| 80 | L'hash rende improbabile l'alterazione | La rende rilevabile | eIDAS art. 26, lett. d) |
| 92 | Art. 25, par. 3, eIDAS | Soppresso da eIDAS 2: ora art. 24 bis, par. 1 | Reg. (UE) 2024/1183 |
| 94 | "Firme digitali" come esempio di FEA; documento "a prova di manomissione" | In Italia la firma digitale è una FEQ; la FEA rende la modifica rilevabile; firma grafometrica solo se conforme al d.P.C.M. 22/2/2013 | CAD art. 1 lett. s; eIDAS art. 26 |
| 96 | Decisione 2015/1506 sui formati | Abrogata dal Reg. es. (UE) 2026/248 (applicabile dal 23/2/2027); indica i formati che la PA deve accettare | EUR-Lex |
| 98 | XAdES: due modalità | Tre: interna, avvolgente, distaccata | W3C XML-DSig; ETSI EN 319 132-1 |
| 99 | CAdES "solo dati binari", niente firme multiple | Qualsiasi file; firme parallele e controfirme | RFC 5652; ETSI EN 319 122-1 |
| 100 | PAdES "leggibile solo dall'uomo" | Verificabile automaticamente; firme multiple in sequenza | ETSI EN 319 142-1 |
| 101 | Refuso "dicuro"; smartphone come dispositivo sicuro | Nella firma remota il QSCD è l'HSM del prestatore; l'OTP autorizza | eIDAS art. 29 bis |
| 107 | Chiave pubblica "condivisa" | Chiave pubblica registrata; esempio delle passkey (WebAuthn L3, 25/8/2026) | W3C |
| 111 | La TSA firma "il documento"; "certificatore accreditato" | La TSA firma impronta + data/ora, non vede il documento; prestatore di servizi fiduciari qualificato | RFC 3161 §2.1; eIDAS art. 42 |
| 114 | Elenco degli schemi "di X9.95" | Norma a pagamento non verificabile; l'elenco è una classificazione generale | rapporto B |
| 115–116 | Marcatura su blockchain | Aggiunti art. 8-ter d.l. 135/2018 e registri elettronici qualificati (artt. 45 duodecies e terdecies eIDAS); regola esatta dell'orario dei blocchi Bitcoin (dalla v27.0 orologio del nodo) | Normattiva; EUR-Lex; Bitcoin Core |
| 122 | DID "basati sul paradigma SSI" | La specifica non usa il termine; l'EUDI Wallet non usa i DID | W3C; ARF v3.0.0 |
| 123 | Elementi del documento DID con "timestamp" e "signature" | Non fanno parte del documento DID v1.0 | W3C DID v1.0 |

## Da ricontrollare poco prima della lezione

- **NordPass**: l'edizione 2026 della classifica potrebbe uscire a metà novembre (pagina "3. Humanware: le password più usate").
- **Notizie della settimana**: sviluppi su frigoriferi, Brennero e furto a Binance (fondi congelati, riciclaggio, indagini); esito del Comitato per l'ordine e la sicurezza pubblica del 10/11.
- **Video YouTube** di *Mr. Robot*: caricato da un privato, può essere rimosso.
- **Art. 8-ter, c. 4**: che gli standard AgID non siano mai stati adottati è un'inferenza (nessun atto trovato); conviene un controllo su agid.gov.it.
- **SPID**: il dettaglio dei livelli (L2 = password + secondo fattore) è conoscenza consolidata ma non estratta automaticamente dalla pagina ufficiale.
- **Specifiche tecniche del PCT** (provv. DGSIA 16/4/2014): vigenza dopo la riforma del processo telematico non verificata; in slide si cita solo la sentenza delle Sezioni Unite.
- **Testo di artt. 2702, 2712 c.c. e 615-ter c.p.**: Normattiva li carica in modo dinamico; le citazioni seguono il testo noto.
- **Valori casuali nelle dimostrazioni**: chiavi e firme ECDSA cambiano a ogni esportazione del PDF (impronte, orari e codici TOTP no).
