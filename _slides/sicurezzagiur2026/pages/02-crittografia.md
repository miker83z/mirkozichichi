---
layout: capo
capo: II
sezione: Crittografia
---

# Crittografia

L'arte di scrivere in modo che solo il destinatario possa leggere

---
layout: glossa
---

# Crittografia

<p class="lead">Studia le tecniche per cifrare un messaggio in modo che solo il legittimo destinatario sia in grado di leggerlo. Oggi protegge anche integrità, autenticità e non ripudio.</p>

Due requisiti, in tensione tra loro:

- **Efficienza**: cifrare e decifrare deve essere ragionevolmente veloce per chi è autorizzato
- **Sicurezza**: per chi non è autorizzato deve essere "difficile" (in pratica: troppo costoso o troppo lungo) capire il messaggio cifrato

<v-click>

> Difficile non vuol dire impossibile: vuol dire che servirebbero più tempo e risorse di quanto valga il segreto.

</v-click>

::glossa::

Il GDPR cita la cifratura tra le misure di sicurezza adeguate; la NIS2 chiede politiche sull'uso della crittografia.

- art. 32, par. 1, lett. a), GDPR
- art. 21, par. 2, lett. h), dir. (UE) 2022/2555 (NIS2)

<!--
Ricollegarsi al Capo I: il grado di sicurezza si misura in tempo, investimento e probabilità di successo.
-->

---

# Crittografia applicata

<div class="grid grid-cols-2 gap-8 mt-2">
<figure>
  <img src="/img/jefferson.jpg" alt="Cilindro cifrante di Jefferson: dischi di legno con lettere incise, infilati su un asse" class="h-48 object-cover w-full" />
  <figcaption>
    <strong>Il cilindro di Thomas Jefferson</strong>, descritto quando era Segretario di Stato (1790–93).<br>
    Dischi con alfabeti mescolati: l'ordine dei dischi è la chiave. Forse mai costruito, non risulta che Jefferson l'abbia usato; reinventato da Bazeries (1891), fu usato dall'esercito USA come M-94 dal 1922 alla Seconda guerra mondiale.
  </figcaption>
</figure>
<figure>
  <img src="/img/enigma-milano.jpg" alt="Macchina Enigma esposta al Museo della Scienza e della Tecnologia di Milano" class="h-48 object-cover w-full" style="object-position: 50% 30%" />
  <figcaption>
    <strong>Enigma</strong>, usata dalle forze armate tedesche nella Seconda guerra mondiale.<br>
    Forzata prima dai crittoanalisti polacchi (Rejewski, 1932), poi a Bletchley Park (Turing e altri). Questa è al Museo della Scienza e della Tecnologia di Milano.
  </figcaption>
</figure>
</div>

<p class="fonte">Foto: NSA, pubblico dominio; Alessandro Nassiri, CC BY-SA 4.0 (Wikimedia Commons).</p>

<style>
figure { margin: 0; }
figcaption { font-size: 0.85rem; line-height: 1.35; margin-top: 0.5rem; }
img { border-radius: 4px; }
</style>

<!--
Jefferson: secondo la Thomas Jefferson Foundation (Monticello) non lo usò mai e abbandonò l'idea dopo il 1802; per la corrispondenza diplomatica usava codici (la slide del 2024 diceva "1800, comunicazioni diplomatiche": corretto).
Enigma: il segreto non era la macchina (catturata e studiata) ma le impostazioni giornaliere: anticipa Kerckhoffs. Secondo l'NSA l'enorme numero di configurazioni diede ai tedeschi una fiducia "immeritata" nella sua sicurezza: lo riprendiamo con lo spazio delle chiavi.
-->

---

# Il principio di base

<p class="lead">Un algoritmo trasforma il messaggio in chiaro in un messaggio cifrato; un secondo algoritmo, con la chiave giusta, fa il percorso inverso.</p>

<CipherPipeline />

<!--
Far scrivere un messaggio a uno studente, cambiare la chiave, mostrare cosa vede Eve sul canale.
Il canale (Internet, la posta, il Wi-Fi del bar) è considerato insicuro per definizione.
-->

---

# Notazione

| Simbolo | Significato | In inglese |
|---|---|---|
| **M** | messaggio in chiaro | plaintext |
| **M'** | messaggio cifrato | ciphertext |
| **K<sub>enc</sub>** | chiave di cifratura | encryption key |
| **K<sub>dec</sub>** | chiave di decifratura | decryption key |
| **E(K<sub>enc</sub>, M) = M'** | funzione di cifratura | encryption |
| **D(K<sub>dec</sub>, M') = M** | funzione di decifratura | decryption |

<p class="mt-6 grigio">Le lettere servono solo a dire con precisione chi usa quale chiave: è il lessico che ritroverete in ogni norma tecnica.</p>

---

# Esempio: il cifrario di Cesare

<p class="lead">Ogni lettera viene sostituita da quella che si trova K posizioni più avanti nell'alfabeto. La chiave è il numero K.</p>

<Caesar modo="cifra" testo="Alea iacta est" :chiave="3" />

<!--
Svetonio racconta che Cesare usava uno spostamento di 3.
Domanda alla classe: quante chiavi possibili ci sono? (25 utili) Lo riprendiamo nel Capo III con l'attacco a forza bruta.
-->

---

# Sistemi crittografici: la regola d'oro

<div class="formula">D( K<sub>dec</sub>, E( K<sub>enc</sub>, M ) ) = M</div>

<p class="lead">Se cifro un messaggio M con la chiave K<sub>enc</sub> e decifro il risultato con K<sub>dec</sub>, devo riottenere esattamente M.</p>

- Se la decifratura non restituisce l'originale, il sistema è inutilizzabile
- Con una chiave sbagliata, invece, il risultato deve essere spazzatura (e non un "quasi originale")

---

# Due famiglie di sistemi crittografici

<div class="grid grid-cols-2 gap-10 mt-4">
<div>

## A chiave segreta
### crittografia simmetrica

<div class="formula">K<sub>enc</sub> = K<sub>dec</sub></div>

La stessa chiave serve per chiudere e per aprire: come la chiave di una cassaforte, di cui esistono copie identiche.

</div>
<div>

## A chiave pubblica
### crittografia asimmetrica

<div class="formula">K<sub>enc</sub> ≠ K<sub>dec</sub></div>

Le chiavi sono diverse: una si può dare a tutti, l'altra resta segreta. Come una cassetta delle lettere: chiunque imbuca, solo il titolare apre.

</div>
</div>

---

# Verifica rapida

<Quiz
  domanda="Il cifrario di Cesare con chiave K = 3 trasforma 'CASA' in…"
  :opzioni="['DBTB', 'FDVD', 'ZXPX', 'CASA3']"
  :corretta="1"
  spiegazione="Ogni lettera avanza di 3 posizioni: C→F, A→D, S→V, A→D. Per decifrare si torna indietro di 3: stessa chiave, quindi è un sistema simmetrico."
/>
