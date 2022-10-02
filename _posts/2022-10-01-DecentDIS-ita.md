---
layout: post
title: Un DecentDIS? Costruendo un servizio di intermediazione dei dati decent(ralizzato)
date: 2022-10-01 21:08:00 +0200
categories: projects
---

> **Single point of failure**: parte di un sistema che, se si guasta, impedisce all'intero sistema di funzionare [1].

Indubbiamente, l'esistenza di un single point of failure coinvolge le nostre vite in molti modi. La centralizzazione del potere nelle mani di poche entità rischia di minacciare in modo significativo molti aspetti della nostra vita quotidiana. La vita su Internet copre ormai la maggior parte delle nostre abitudini quotidiane e, proprio in questo sistema costituito da network di computer, il principio fondante è il controllo e non la libertà, come auspicato alla sua nascita [2]. Ciò può essere dovuto a molti fattori, come l'emergere spontaneo delle gerarchie nei sistemi naturali [3] o gli effetti delle dinamiche di mercato, come l'attaccamento preferenziale e la manifestazione della legge di potenza [4].

### Ma cosa può fare il suo opposto, cioè la _de_-centralizzazione? Cosa significa decentralizzazione?

> Nella teoria dei sistemi, un sistema è **decentralizzato** quando i componenti di livello più basso operano su informazioni locali per raggiungere obiettivi globali. Un sistema di questo tipo opera attraverso il comportamento emergente delle parti che lo compongono, piuttosto che come risultato dell'influenza di una parte centralizzata [5].

In una definizione più tecnica, i sistemi sono decentralizzati nel senso che la loro architettura è tale da cercare di evitare un single point of failure.
Con l'avvento di Bitcoin [6], il primo sistema che fornisce una criptovaluta Peer-to-Peer (P2P), vi è stata una nuova ondata di sviluppo di sistemi decentralizzati per combattere il problema del single point of failure. I primi sistemi di questo tipo ampiamente utilizzati risalgono infatti all'inizio del nuovo millennio e hanno reso possibile la condivisione e lo scambio di risorse come file di testo, musica e video, ad esempio BitTorrent, Emule, Gnutella e Napster.
Ad oggi, la blockchain di Nakamoto ha portato una rivoluzione in molti settori e la sua invenzione ha influenzato i settori finanziari. Inoltre, questa nuova ondata di P2P ha portato ottimismo per l'incentivazione di modelli di partecipazione, contributo di risorse e consenso che potrebbero fornire un substrato per un Internet decentralizzato, cioè il Web3.
Nakamoto ha reso possibile il funzionamento coordinato dei peer in una rete senza la necessità di controllare il loro accesso al sistema stesso, ovvero un sistema decentralizzato transazionale permissionless. Le transazioni vengono inserite in un blocco, che tutti gli altri peer accettano solo se questo "risolve un puzzle". Per risolvere questo "puzzle crittografico", è necessario un intenso lavoro di calcolo che consuma tempo. In questo modo si crea un consenso, ossia un ordine all'interno della decentralizzazione, cioè una catena di blocchi.

### È utile?

> Una parte critica di una blockchain permissionless è che chiunque può partecipare al meccanismo di consenso, e quindi non si ha un punto di riferimento per porre la propria **fiducia** [7].

La blockchain ha portato con sé molte critiche, prima fra tutte la questione della fiducia. Per molti versi, il tentativo delle blockchain di sostituire la fiducia con il codice, ovvero il codice sorgente che implementa l'algoritmo di consenso della rete, rende queste tecnologie meno affidabili rispetto ai sistemi non blockchain. In effetti, si può affermare che molte blockchain non sono veramente decentralizzate e la loro inevitabile centralizzazione è dannosa perché è in gran parte emergente e mal definita [7]. Bruce Scheiner sostiene che i sistemi non blockchain si basano su altri meccanismi generali che gli esseri umani utilizzano per incentivare un comportamento affidabile e che rendono superflui i meccanismi di consenso: la moralità, la reputazione, le istituzioni e i meccanismi di sicurezza. Pertanto, i meccanismi di consenso delle blockchain spostano parte della fiducia nelle persone e nelle istituzioni verso la fiducia nella tecnologia. Quando questa fiducia si rivela mal riposta, non c'è possibilità di ricorso.
Inoltre, in un ambiente talmente permissionless, potrebbe essere impossibile incentivare i partecipanti a fornire adeguatamente funzioni come il controllo di qualità o il coordinamento dello sviluppo e dell'evoluzione del sistema. Emerge quindi una centralizzazione di fatto [3], come la gerarchia del piccolo numero di sviluppatori che controllano il software della blockchain o il numero esiguo di reti centralizzate che controllano l'esecuzione del meccanismo di consenso, ovvero le mining pools [8].

### Le blockchain permissioned vengono in soccorso

> Nelle blockchain permissioned, i nodi che eseguono il meccanismo di consenso sono **identificati** e l'accesso alla rete P2P **limitato**.

Le blockchain permissioned rischiano di assomigliare a database distribuiti "completamente senza interesse" [7]. Tuttavia, a differenza di un database tradizionale, nessuna entità centrale gestisce le informazioni, ma diverse parti interessate controllano, mantengono e custodiscono le informazioni memorizzate. Vari attori con interessi diversi (eventualmente in contrasto tra loro) monitorano costantemente i loro "avversari-peer" e controllano se uno di loro tenta di alterare o modificare inavvertitamente informazioni precedentemente concordate. Questi sistemi consentono la fiducia tra un insieme di parti, le negoziazioni e la convalida degli obblighi contrattuali, con relazioni commerciali chiare che richiedono già fiducia e reputazione [3,4]. L'affidamento a più validatori per la manutenzione della blockchain consente al sistema di indurre le singole parti a non deviare dal protocollo. Un sistema decentralizzato permissioned come la blockchain, quindi, diventa particolarmente efficace quando viene utilizzato come struttura per la collaborazione in scenari di competizione [9].

### Risolvere una minaccia alla volta: de-centralizzare la gestione dei dati personali

> Le blockchain possono fornire agli individui funzionalità impossibili da attuare nei servizi cloud tradizionali. In particolare, favoriscono la creazione di **sistemi decentralizzati di gestione delle informazioni personali (PIMS)**, garantendo, per design, la sovranità dei dati e consentendo agli utenti di controllare quali dati personali vogliono condividere.

I sistemi decentralizzati permissioned, comprese le blockchain, possono essere fondamentali per mettere gli individui al centro della gestione dei dati personali e per alleviare l'assenza di strumenti tecnici e standard che rendano l'esercizio dei propri diritti semplice e non eccessivamente oneroso (come previsto dalla European strategy for data [10]).
I PIMS decentralizzati possono essere considerati strumenti di gestione del consenso o sistemi fiduciari costruiti su architetture software distribuite che agiscono come nuovi intermediari neutrali nell'economia dei dati personali. Questi sistemi mettono a disposizione degli individui strumenti e mezzi per decidere a livello granulare cosa fare dei loro dati, fornendo, tra i molti vantaggi, una maggiore supervisione e trasparenza sui dati.
Tali sistemi decentralizzati consentirebbero inoltre ai responsabili della raccolta dei dati di dimostrare la propria conformità alle normative. Non solo, ma potrebbero anche favorire la creazione di un mercato unico dei dati che capitalizzi l'interoperabilità dei dati tra gli spazi dati per il bene sociale ed economico [10]. La prassi attuale dei responsabili della raccolta dei dati, infatti, è quella di immagazzinarli in silos scollegati tra loro, inaccessibili ai servizi innovativi, ai ricercatori e spesso anche agli stessi individui che li hanno generati.

### La creazione di un nuovo servizio di intermediazione dei dati decent(ralizzato)

> Un intermediario di dati può essere definito come un mediatore tra coloro che desiderano rendere disponibili i propri dati e coloro che cercano di utilizzarli, fornendo un certo **grado di fiducia** sulle modalità di utilizzo dei dati [11].

I servizi di intermediazione dei dati (DIS) possono essere costruiti sulla base di sistemi decentralizzati permissioned per evitare l'insorgere naturale di gerarchie di dominanza nello scambio e nella gestione dei dati personali. Gli intermediari in un **Decent**(ralized) **DIS** mirano a fornire un servizio neutrale rispetto allo sfruttamento dei dati degli individui, vale a dire che la somma delle forze che minacciano la privacy nel sistema di intermediari è uguale a zero. Una blockchain permissioned mantiene questo equilibrio. La capacità principale che un sistema decentralizzato permissioned può portare in questo caso agli utenti finali è "ottenere la verità attraverso la capacità di condividere i dati in modo sicuro" [12]:

- una blockchain può fornire un'unica fonte di verità verificabile tra le varie organizzazioni e un certo livello di automazione appropriata dell'elaborazione dei dati.
- le organizzazioni possono organizzare una forma di governance per decidere le fonti distribuite di fiducia e moderare tali sistemi permissioned.
- l'autorità del sistema può essere distribuita tra molti attori fidati, in modo che la compromissione di una o anche di poche autorità non distrugga il consenso generale.
- le proprietà crittografiche intrinseche delle blockchain possono consentire una computazione sicura distribuita e la minimizzazione dei dati.
- l'ambiente di collaborazione in rete può essere facilmente sfruttato per la verifica e la responsabilità delle operazioni.
- Le reti P2P offrono una soluzione essenziale per la resilienza e la scalabilità dei dati.

### L'implementazione di DecentDIS

Questo progetto mira a creare un'infrastruttura per la gestione congiunta dei servizi di intermediazione dei dati. Una rete permissioned di intermediari fornisce

1. uno spazio dati personale (Personal Data Space, PDS) basato sul protocollo IPFS [13] per archiviare i dati,
2. una blockchain privata basata su Ethereum [14] per fornire un meccanismo di autorizzazione distribuito e
3. un'esecuzione distribuita di policy codificate basate su ontologie standard per rispondere alle richieste di dati.

I dati sono crittografati e archiviati nel PDS, mentre gli smart contract della blockchain ne regolano l'accesso. I soggetti interessati selezionano le loro politiche di condivisione dei dati in modo intelligibile e machine-readable. I titolari dei dati (o i soggetti stessi) gestiscono i dati e le chiavi di crittografia attraverso un crittosistema a threshold. Gli intermediari assistono entrambi eseguendo le politiche attraverso smart contract e distribuendo le chiavi ai destinatari dei dati idonei. Gli URI basati su hash, insieme a una rappresentazione di token sulla blockchain, consentono l'indicizzazione e la convalida dei dati, delle policy e delle loro relazioni. La blockchain privata consente di tracciare l'accesso ai dati e le policy, e la sua immutabilità è rafforzata da un'architettura multi-DLT, in cui gli impegni periodici sono memorizzati in una DLT permissionless.

Il relativo software open source è disponibile in Zenodo:

##### Ethereum smart contract authorization using a Threshold Proxy Re-Encryption scheme in Rust

DOI: [10.5281/zenodo.6548262](https://doi.org/10.5281/zenodo.6548262)  
In questa implementazione, una rete di nodi fornisce l'accesso ai destinatari dei dati idonei rilasciando le chiavi utilizzate per crittografare i dati personali memorizzati in un PDS. Una blockchain permissioned privata di Ethereum viene utilizzata come sidechain e la DLT pubblica permissionless di audit come mainchain dove memorizzare periodic commitments.
L'uso principale della blockchain permissioned è l'esecuzione di smart contract che implementano il controllo dell'accesso ai dati personali. L'accesso ai dati personali memorizzati nella PDS può essere consentito dal titolare dei dati tramite smart contract attraverso una struttura di dati, ovvero una lista di controllo degli accessi (ACL).
Per la fase di cifratura, decifratura e distribuzione delle chiavi, viene utilizzato uno schema di Threshold Proxy Re-Encryption (TPRE). In questo scenario, i nodi della rete mantengono frammenti di una chiave. Tali frammenti vengono ricifrati utilizzando una chiave di ricifratura generata dal titolare dei dati a favore di un destinatario idoneo.

##### Identità e certificazione intelligibili decentralizzate basate su DID e VC e archiviazione IPFS

DOI: [10.5281/zenodo.7132777](https://doi.org/10.5281/zenodo.7132777)
L'insieme delle tecnologie di Intelligible Identity consente a qualsiasi soggetto di condividere informazioni con terze parti dimostrando a queste ultime di possedere determinate attestazioni o attributi auto-asseriti o rilasciati da un'entità fidata. Tale modello è una specializzazione di un Decentralized Identifier (DID) [15], ovvero un tipo di identificatore per la verifica delle identità digitali self-sovereign identity (SSI). La Intelligible Identity permette di portare con sé il contesto operativo e legale rilevante di questa identità e di tracciare facilmente i processi che la coinvolgono.
Il modello di Intelligible Identity è una combinazione di: (i) coppie di chiavi di crittografia asimmetrica, ossia una chiave pubblica e una privata; (ii) un Non Fungible Token memorizzato su una blockchain; (iii) un documento di metadati. In questo documento, l'intelligibilità viene trasmessa collegando (i) le risorse che compongono il documento o che ne definiscono il contesto legale, (ii) gli agenti coinvolti nel ciclo di vita del documento e (iii) le risorse digitali che descrivono come eseguire operazioni con le identità. Le informazioni sono memorizzate in IPFS sotto forma di IPFS objects. Questi sono identificati da un CID (Content IDentifier), cioè il risultato dell'applicazione di una funzione di hash a un file che rappresenta l'oggetto.

##### Policy di gestione negli smart contract basate sul controllo degli accessi e sull'ontologia DPV

DOI: [10.5281/zenodo.7132775](https://doi.org/10.5281/zenodo.7132775)
L'idea generale è quella di applicare policy e attivare meccanismi di controllo degli accessi e mantenere un registro non manomettibile degli accessi ai dati. Le policy possono essere espresse utilizzando ontologie standard per il controllo degli accessi, come ODRL [16] o il framework MPEG-21 [17]. Queste sono integrate con il Data Privacy Vocabulary (DPV) [18], cioè una specifica che contiene tassonomie relative al dominio della privacy e della protezione dei dati e che specifica termini quali le finalità del trattamento o la base giuridica. Ad esempio:

```
<ipfs://someCID/Pippo>
        a           dpv:DataProcessor ;
        rdfs:label  "Data Processor" .
<ipfs://someCID/Catullo>
        a           dpv:DataController ;
        rdfs:label  "Data Controller" .
<ipfs://someCID/Susy>
        a           dpv:DataSubject ;
        rdfs:label  "Data Subject" .
<ipfs://someCID/permission0>
        a                       mvco:Permission ;
        mco-core:implements     <ipfs://someCID/textClause1> ;
        mvco:issuedBy           <ipfs://someCID/Catullo> ;
        mco-core:permitsAction  <ipfs://someCID/actionConsult> ;
        mco-core:hasRequired    <ipfs://someCID/factConsent>.
<ipfs://someCID/latLonXY>
        a               dpv:PseudoAnonymisedData .
<ipfs://someCID/locationDataZ>
        a                       dpv:SensitivePersonalData ;
        mvco:isMadeUpOf         <ipfs://someCID/latLonXY> ;
<ipfs://someCID/actionConsult>
        a               dpv:Consult ;
        mvco:actedBy    <ipfs://someCID/Pippo> ;
        mvco:actedOver  <ipfs://someCID/locationDataZ> .
<ipfs://someCID/factConsent>
        a                       dpv:Consent ;
        dpv:hasDataSubject      <ipfs://someCID/Susy> ;
        dpv:hasDataController   <ipfs://someCID/Catullo> ;
        dpv:hasPurpose          <ipfs://someCID/purpose1> ;
        dpv:hasProcessing       <ipfs://someCID/processing1> .
<ipfs://someCID/purpose1>
        a               dpv:SocialMediaMarketing .
<ipfs://someCID/processing1>
        a               dpv:Consult .
```

### References

1. Wikipedia community. _Single point of failure._ (2022).
   [ipfs:///zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/Single_point_of_failure](https://ipfs.io/ipfs/zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/Single_point_of_failure)
2. Galloway, Alexander R. _Protocol: How control exists after decentralization._ MIT press, 2004.
3. Bakos, Yannis, Hanna Halaburda, and Christoph Mueller-Bloch. _"When permissioned blockchains deliver more decentralization than permissionless."_ Communications of the ACM 64.2 (2021): 20-22.
4. Lopez, Pedro Garcia, Alberto Montresor, and Anwitaman Datta. _"Please, do not decentralize the Internet with (permissionless) blockchains!."_ 2019 IEEE 39th International Conference on Distributed Computing Systems (ICDCS). IEEE, 2019.
5. Wikipedia community. _Decentralised system._ (2022).
   [ipfs:///zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/Decentralised\_
   system](https://ipfs.io/ipfs/zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/Decentralised_system)
6. Nakamoto, Satoshi. _"A peer-to-peer electronic cash system."_ (2008).
7. Schneier, Bruce. _Blockchain and trust._ (2019). [https://www.schneier.com/blog/archives/2019/02/blockchain*and*.html](https://www.schneier.com/blog/archives/2019/02/blockchain_and_.html)
8. Trail of Bits (2022). _Are blockchains decentralized?_ [https://assets-global.website-files.com/5fd11235b3950c2c1a3b6df4/62af6c641a672b3329b9a480_Unintended_Centralities_in_Distributed_Ledgers.pdf](https://assets-global.website-files.com/5fd11235b3950c2c1a3b6df4/62af6c641a672b3329b9a480_Unintended_Centralities_in_Distributed_Ledgers.pdf)
9. Bakarich, Kathleen. _"Using a Permissioned Blockchain?."_ The CPA Journal 91.6/7 (2021): 48-51.
10. European Commission. _A European Strategy for data._ (2020). [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52020DC0066](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52020DC0066)
11. Janssen, Heleen and Jatinder Singh. _"Data intermediary"._ Internet Policy Review 11.1 (2022). [https://policyreview.info/glossary/data-intermediary](https://policyreview.info/glossary/data-intermediary)
12. Hardjono, Thomas, David L. Shrier, and Alex Pentland. _Trusted Data, revised and expanded edition: A New Framework for Identity and Data Sharing._ MIT Press, 2019.
13. InterPlanetary File System (IPFS), [https://ipfs.io/](https://ipfs.io/)
14. Ethereum, [https://ethereum.org/](https://ethereum.org/)
15. Decentralized Identifier (DID), [https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)
16. Open Digital Rights Language (ODRL), [https://www.w3.org/TR/odrl-model/](https://www.w3.org/TR/odrl-model/)
17. Wikipedia community. _MPEG-21._ (2022).
    [ipfs:///zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/MPEG-21](https://ipfs.io/ipfs/zdj7WX5pBeuj18FDbNqxv55msheeEwFnmcRExintmC2men7ZS/wiki/MPEG-21)
18. Data Privacy Vocabulary (DPV), [https://w3c.github.io/dpv/dpv/](https://w3c.github.io/dpv/dpv/)
