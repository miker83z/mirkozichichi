---
layout: capo
capo: II
sezione: Concetti di base
---

# Concetti di base

Integrità e non ripudio: le due proprietà su cui si regge una blockchain

---

# Hash: l'impronta che rivela ogni modifica

<SchemaEsempiHash />

<p class="lead" v-click><span class="chiave">Integrità</span>: cambia una lettera, cambia tutta l'impronta. Chi conserva l'impronta si accorge di qualsiasi modifica.</p>

<p v-click>Nella blockchain ogni blocco contiene l'impronta del precedente: la storia non si può riscrivere di nascosto.</p>

<div class="sigle">
  <p v-click="1"><strong>SHA-256</strong>: Secure Hash Algorithm, con impronte di 256 bit</p>
</div>

<!--
Proprietà di una funzione hash crittografica: lunghezza fissa (256 bit per SHA-256), impossibile in pratica trovare due dati con la stessa impronta, dall'impronta non si risale al dato.
Correzione rispetto al 2025: la slide mostrava SHA256(moat) = 98E2…16F3 e SHA256(maot) = E671…A9C9. Ricalcolati (UTF-8, senza a capo finale) i valori sono edf1eb93…adc737f4 e b075b425…e90b8f0b: li mostriamo dal vivo nella slide che segue.
Dal lato di chi sviluppa un protocollo: in IOTA tutto ha un'impronta. Le transazioni sono identificate dal loro digest, gli indirizzi sono l'impronta BLAKE2b-256 della chiave pubblica, ogni oggetto ha un digest che cambia a ogni versione.
-->

---

# Proviamo: moat o maot?

<div v-click>

<HashPlayground a="moat" b="maot" />

</div>

<p class="lead" v-click>Due lettere scambiate: cambia circa metà dei 256 bit.</p>

---

# Firma: chi ha firmato non può negarlo

<SchemaFirma />

<p class="lead" v-click><span class="chiave">Non ripudio</span>: solo chi ha la chiave privata produce quella firma; chiunque la verifica con la chiave pubblica.</p>

<!--
In una blockchain ogni transazione è firmata: nessuno può spendere al posto vostro, e voi non potete negare di aver pagato.
Nel 2025 qui c'era anche il certificato di Alice emesso da un prestatore fiduciario (TSP). Nelle blockchain non ci sono certificati: chi controlla la chiave privata controlla l'indirizzo, senza che nessuno garantisca chi c'è dietro. Meglio non chiamarla "firma digitale" davanti ai giuristi: nel CAD la firma digitale è una firma qualificata con certificato.
Dal lato del nodo IOTA: ogni transazione arriva con la firma e la chiave pubblica (in Ethereum la chiave si ricava dalla firma); se la firma non torna, il nodo la scarta prima ancora di eseguirla.
-->

---

# Firma: una modifica si vede

<SchemaFirmaAlterata />

<p class="lead" v-click>La firma resta legata a <span class="chiave">quel</span> documento: una transazione firmata non si può ritoccare.</p>

---

# Proviamo: firmare e verificare

<div v-click>

<SignatureDemo documento="Alice paga 5 a Bob" />

</div>

<p class="lead" v-click>Integrità e non ripudio insieme: così una blockchain fa a meno di un intermediario di fiducia.</p>
