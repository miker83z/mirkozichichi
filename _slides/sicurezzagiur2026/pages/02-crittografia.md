---
layout: capo
capo: II
sezione: Crittografia
---

# Crittografia

L'arte di scrivere in modo che solo il destinatario possa leggere

---

# Crittografia

<p class="lead" v-click>Le tecniche per cifrare un messaggio in modo che solo il legittimo destinatario possa leggerlo.</p>

<v-clicks>

- **Efficiente** per chi è autorizzato: cifrare e decifrare è veloce
- **Difficile** per chi non lo è: troppo costoso o troppo lungo

</v-clicks>

<blockquote v-click>Difficile non vuol dire impossibile: vuol dire che costa più di quanto valga il segreto.</blockquote>

<!--
Oggi la crittografia protegge anche integrità, autenticazione e non ripudio (definizione NIST).
Per il giurista: il GDPR cita la cifratura tra le misure di sicurezza adeguate (art. 32, par. 1, lett. a); la NIS2 chiede politiche sull'uso della crittografia (art. 21, par. 2, lett. h, dir. (UE) 2022/2555).
-->

---

# Crittografia applicata

<div class="grid grid-cols-2 gap-8 mt-2">
<figure v-click>
  <img src="/img/jefferson.jpg" alt="Cilindro cifrante di Jefferson: dischi di legno con lettere incise, infilati su un asse" class="h-52 object-cover w-full" />
  <figcaption><strong>Il cilindro di Jefferson</strong> (anni 1790): l'ordine dei dischi è la chiave. Usato dall'esercito USA come M-94 dal 1922.</figcaption>
</figure>
<figure v-click>
  <img src="/img/enigma-milano.jpg" alt="Macchina Enigma esposta al Museo della Scienza e della Tecnologia di Milano" class="h-52 object-cover w-full" style="object-position: 50% 30%" />
  <figcaption><strong>Enigma</strong>, forze armate tedesche, Seconda guerra mondiale. Forzata da polacchi e britannici. Museo della Scienza e della Tecnologia di Milano.</figcaption>
</figure>
</div>

<p class="fonte" v-after>Foto: NSA, pubblico dominio; Alessandro Nassiri, CC BY-SA 4.0 (Wikimedia Commons).</p>

<style>
figure { margin: 0; }
figcaption { font-size: 0.9rem; line-height: 1.35; margin-top: 0.5rem; }
img { border-radius: 4px; }
</style>

<div class="sigle">
  <p v-click="2"><strong>NSA</strong>: National Security Agency, l'agenzia statunitense per la crittografia e le intercettazioni; <strong>CC BY-SA</strong>: licenza Creative Commons «Attribuzione – Condividi allo stesso modo»</p>
</div>

<!--
Jefferson descrisse il cilindro quando era Segretario di Stato (1790–93); forse mai costruito, non risulta che l'abbia usato (Monticello). Reinventato da Bazeries (1891). La slide del 2024 diceva "1800, comunicazioni diplomatiche": corretto.
Enigma: forzata prima dai crittoanalisti polacchi (Rejewski, 1932), poi a Bletchley Park (Turing e altri). Il segreto non era la macchina ma le impostazioni giornaliere: è il principio di Kerckhoffs (Capo I).
-->

---

# Il principio di base

<SchemaPrincipioBase />

<!--
Il canale (Internet, la posta, il Wi-Fi del bar) è insicuro per definizione: Eve vede tutto ciò che passa, ma senza la chiave vede solo M'.
-->

---

# Proviamo: cifrare e decifrare

<div v-click>

<CipherPipeline />

</div>

---

# Notazione

<v-clicks>

- **M**: messaggio in chiaro (*plaintext*)
- **M'**: messaggio cifrato (*ciphertext*)
- **E(K<sub>enc</sub>, M) = M'**: cifratura con la chiave K<sub>enc</sub> (*encryption*)
- **D(K<sub>dec</sub>, M') = M**: decifratura con la chiave K<sub>dec</sub> (*decryption*)

</v-clicks>

---

# Esempio: il cifrario di Cesare

<p class="lead" v-click>Ogni lettera è sostituita da quella K posizioni più avanti. La chiave è il numero K.</p>

<SchemaCesare />

<!--
Svetonio racconta che Cesare usava uno spostamento di 3 (Divus Iulius, 56).
Domanda alla classe: quante chiavi possibili ci sono? 25 utili. Lo riprendiamo nel Capo III con l'attacco a forza bruta.
-->

---

# Proviamo: il cifrario di Cesare

<div v-click>

<Caesar modo="cifra" testo="Alea iacta est" :chiave="3" />

</div>

---

# La regola d'oro

<div class="formula" v-click>D( K<sub>dec</sub>, E( K<sub>enc</sub>, M ) ) = M</div>

<v-clicks>

- Con la chiave giusta torna **esattamente** M
- Con una chiave sbagliata, solo **spazzatura**

</v-clicks>

---

# Due famiglie di sistemi crittografici

<div class="grid grid-cols-2 gap-10 mt-4">
<div v-click>

## A chiave segreta
### crittografia simmetrica

<div class="formula">K<sub>enc</sub> = K<sub>dec</sub></div>

Una chiave sola, con copie identiche: come la cassaforte.

</div>
<div v-click>

## A chiave pubblica
### crittografia asimmetrica

<div class="formula">K<sub>enc</sub> ≠ K<sub>dec</sub></div>

Due chiavi diverse: come la cassetta delle lettere.

</div>
</div>

<!--
Cassetta delle lettere: chiunque può imbucare (chiave pubblica), solo il titolare apre (chiave privata).
-->

---

# Verifica rapida

<div v-click>
<Quiz
  domanda="Il cifrario di Cesare con chiave K = 3 trasforma 'CASA' in…"
  :opzioni="['DBTB', 'FDVD', 'ZXPX', 'CASA3']"
  :corretta="1"
  spiegazione="Ogni lettera avanza di 3 posizioni: C→F, A→D, S→V, A→D. Per decifrare si torna indietro di 3: stessa chiave, quindi è un sistema simmetrico."
/>
</div>
