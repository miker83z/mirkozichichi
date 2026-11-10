---
layout: capo
capo: III
sezione: Crittografia simmetrica
---

# Crittografia simmetrica

Una sola chiave, condivisa da mittente e destinatario

---

# Cifratura simmetrica

<p class="lead">Mittente e destinatario usano la stessa chiave segreta: chi la possiede legge, chi non la possiede vede solo caratteri senza senso.</p>

<div class="flusso">
  <div class="nodo"><strong>Testo in chiaro</strong><br><span class="grigio">plaintext</span></div>
  <div class="freccia">cifra con K →</div>
  <div class="nodo cifrato"><code>A4$h*L@9. T6=#/&gt;B#1</code><br><strong>Testo cifrato</strong><br><span class="grigio">ciphertext</span></div>
  <div class="freccia">decifra con K →</div>
  <div class="nodo"><strong>Testo in chiaro</strong><br><span class="grigio">plaintext</span></div>
</div>

<p class="mt-6"><strong>Stessa chiave K</strong> alle due estremità: è il "segreto condiviso" (<em>shared secret</em>).</p>

<style>
.flusso { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; margin-top: 1.4rem; }
.nodo { text-align: center; border: 1px solid var(--linea); border-radius: 6px; padding: 0.8rem 1rem; min-width: 10rem; font-size: 1rem; line-height: 1.5; }
.nodo.cifrato { background: var(--campo); }
.freccia { color: var(--rubrica); font-weight: 700; font-size: 0.95rem; white-space: nowrap; }
</style>

---

# Il cifrario di Cesare, attaccato

<p class="lead">La chiave è un numero da 1 a 25: basta provarle tutte. È l'attacco a forza bruta (<em>brute force</em>).</p>

<Caesar modo="forzabruta" :chiave-vera="3" />

<!--
Far scegliere alla classe la riga leggibile. Morale: lo spazio delle chiavi deve essere enorme, non solo segreto.
-->

---

# Una chiave che cambia

<p class="lead">Idea: cambiare la chiave secondo una sequenza concordata, così lo stesso messaggio produce ogni volta un cifrato diverso.</p>

<VariableShift />

<p class="fonte">La slide del 2024 parlava di "cifrario polimorfico"; il termine corretto per un cifrario che cambia sostituzione lettera per lettera è <strong>cifrario polialfabetico</strong>. Il più famoso, detto "di Vigenère", era già stato descritto in forma molto simile dall'italiano Giovan Battista Bellaso (Venezia, 1553).</p>

<!--
Prima parte: la chiave cambia a ogni messaggio (sequenza 3, -1, 2, 6): lo stesso "Hello" dà Khoor, Gdkkn, ...
Seconda parte: Vigenère applica lo stesso principio a ogni lettera.
-->

---

# DES: Data Encryption Standard

<div class="grid grid-cols-[1fr_15rem] gap-8">
<div>

- Progettato da **IBM**, adottato come standard federale USA nel **1977**
- Chiave di **56 bit**; il messaggio è diviso in blocchi da 64 bit, cifrati uno per uno
- Chiavi possibili: 2<sup>56</sup> ≈ 7,2 × 10<sup>16</sup>

<v-click>

- Sembrano tante, ma nel **1998** la macchina *Deep Crack* della EFF trovò una chiave in **56 ore**, nel 1999 in 22 ore. Oggi hardware dedicato prova **tutte** le chiavi in circa un giorno; una sola scheda grafica di fascia alta in circa sei giorni
- La variante **Triplo DES** (tre passaggi, circa 112 bit di sicurezza) è stata a lungo il rimedio: dal 1° gennaio 2024 il NIST non la ammette più per cifrare

</v-click>

</div>
<div class="demo piccolo">

**Morale**: una chiave è sicura finché provarle tutte costa più di quanto valga il segreto. I computer diventano più veloci: le chiavi devono allungarsi.

</div>
</div>

<p class="fonte">EFF (1998, 1999); crack.sh (48 FPGA, ~26 ore); NIST SP 800-131A Rev. 2.</p>

<!--
La slide del 2024 diceva "un moderno calcolatore può esaminarle tutte in poche ore" e che il Triplo DES "fornisce un livello accettabile di sicurezza": entrambe le affermazioni sono state corrette.
Una RTX 4090 prova circa 1,5 × 10^11 chiavi DES al secondo (hashcat): 2^56 / 1,5 × 10^11 ≈ 5,7 giorni nel caso peggiore.
-->

---
layout: glossa
---

# AES: Advanced Encryption Standard

- Adottato come standard nel **2001** (NIST FIPS 197), sostituisce DES
- Il messaggio è diviso in blocchi da **128 bit**, cifrati uno per uno
- Chiavi da **128, 192 o 256 bit**
- Chiavi da 128 bit possibili: 2<sup>128</sup> ≈ 3,4 × 10<sup>38</sup>: esplorarle tutte è oggi impraticabile
- Resta adeguato anche in vista dei computer quantistici: il NIST non prevede di sostituirlo

<v-click>

<p class="lead mt-4">È l'algoritmo che protegge, ogni giorno, il Wi-Fi, i dischi cifrati dei portatili, WhatsApp e le connessioni HTTPS.</p>

</v-click>

::glossa::

Cifrare conviene anche giuridicamente: se i dati sottratti erano cifrati, il titolare non deve comunicare la violazione agli interessati.

- art. 34, par. 3, lett. a), GDPR

(Resta l'obbligo di notificarla al Garante, se ci sono rischi: art. 33.)

---

# Quanto tempo serve per esplorare tutte le chiavi?

<KeySpace :velocita-chiavi="[{ valore: 2.19e10, etichetta: 'una scheda grafica moderna' }, { valore: 2.19e14, etichetta: '10.000 schede grafiche' }, { valore: 1e21, etichetta: 'quanto tutta la rete Bitcoin (solo come ordine di grandezza)' }]" />

<!--
Velocità per la scheda "Chiavi": una RTX 4090 prova circa 2,2 × 10^10 chiavi AES-128 al secondo (hashcat 6.2.6); la rete Bitcoin calcola circa 10^21 hash SHA-256 al secondo (mempool.space, novembre 2026), ma i suoi circuiti sanno fare solo quello: è un limite simbolico.
Con 10^21 tentativi al secondo, 2^128 chiavi richiedono circa 1,1 × 10^10 anni: quasi l'età dell'universo.
L'NSA scrive che l'enorme numero di configurazioni di Enigma diede ai tedeschi una fiducia immeritata: lo spazio delle chiavi è necessario, non sufficiente.
La tabella in basso riproduce la slide del 2024 (con la correzione 62^12 al posto di 52^12).
Far cambiare la lunghezza da 8 a 12 caratteri: è il singolo consiglio più utile della lezione.
-->

---
layout: glossa
---

# Crittografia simmetrica: pro e contro

**A favore**: è molto **efficiente**, anche su grandi quantità di dati.

**Punti deboli**:

- **Distribuzione delle chiavi**: serve un modo sicuro per accordarsi sulla chiave
- **Scalabilità**: serve una chiave diversa per ogni coppia di interlocutori
- **Garanzie limitate**: protegge la riservatezza; l'autenticità è limitata alle due parti e **non c'è non ripudio** (la chiave ce l'hanno entrambi)

::glossa::

Se la stessa chiave è nelle mani di entrambe le parti, ciascuna può aver prodotto il messaggio: davanti a un terzo nessuna delle due può provare che l'ha scritto l'altra.

Serve qualcosa che solo una parte possiede: la chiave privata (Capo IV).

---

# Quante chiavi servono?

<p class="lead">Con la crittografia simmetrica serve una chiave segreta per ogni coppia di persone: il numero cresce con il quadrato di n.</p>

<KeyCount />

<!--
Correzione rispetto al 2024: il numero di chiavi cresce con il quadrato di n (n(n-1)/2), non "in maniera esponenziale".
10 persone: 45 chiavi; 100: 4.950; 1.000: 499.500. Con la crittografia asimmetrica bastano n coppie.
-->
