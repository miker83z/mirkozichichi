---
layout: post
title: A Decent DIS? Building a Decentralized Data Intermediation Service
date: 2022-10-01 21:08:00 +0200
categories: projects
---

> **Single point of failure**: part of a system that, if it fails, will stop the entire system from working [1].

Arguably, the existence of a single point of failure involves our lives in many ways. The centralization of power in a few entities' hands is likely to threaten many aspects of our daily lives significantly. Life on the Internet now covers most of our day-to-day routines, and, in this very system consisting of computer networks, the founding principle is control and not freedom, as desired at its inception [2]. This may be due to many factors, such as the spontaneous emergence of hierarchies in natural systems [3] or market dynamics effects, such as preferential attachment and the manifestation of the power law [4].

### But what can its opposite, i.e., _de_-centralization, do? What does decentralization mean?

> In systems theory, a system is **decentralized** when lower-level components operate on local information to achieve global goals. Such a system operates through the emergent behavior of its component parts rather than as a result of the influence of a centralized part [5].

In a more technical definition, systems are decentralized in the sense that their architecture is such that it seeks to avoid single points of failure.
With the advent of Bitcoin [6] as the first system providing a Peer-to-Peer (P2P) cryptocurrency, there has been a new wave of development of decentralized systems to combat the single point of failure issue. The first widely used systems of this type, in fact, date back to the start of the new millennium for making it possible to share and exchange resources such as text files, music, and video, e.g., BitTorrent, Emule, Gnutella, and Napster.
To date, Nakamoto's blockchain has brought a revolution in many industries, and his invention has influenced financial sectors. In addition, this new P2P wave has brought optimism for incentivizing participation models, resource contribution, and consensus that could provide a substrate for a decentralized Internet, i.e., the Web3.
Nakamoto has made possible the coordinated operation of peers in a network without needing to control their access to the system itself, i.e., a permissionless transactional decentralized system. Transactions are placed in a block, which all the other peers accept only if it "solves a puzzle." To make it solving this ``crypto-puzzle,'' it is required intensive computation work that consumes time. This creates a consensus, an order within decentralization, i.e., a chain of blocks.

### Is it any good?

> A critical part of a permissionless blockchain is that anyone can participate in the consensus mechanism, and thus one does not have a point of reference for placing its **trust** [7].

The blockchain brought many criticisms as well, above all, the issue of trust. In many ways, blockchains' attempt to replace trust with code, i.e., the source code that implements the network consensus algorithm, makes these technologies less trustworthy than non-blockchain systems. Indeed, it can be argued that many blockchains are not truly decentralized, and their inevitable centralization is detrimental because it is largely emergent and ill-defined [7]. Bruce Scheiner argues that non-blockchain systems are based on other general mechanisms humans use to incentivize trustworthy behavior that make consensus mechanisms unnecessary: morals, reputation, institutions, and security mechanisms. Thus, what blockchains' consensus mechanisms do is shift some of the trust in people and institutions to trust in the technology. When that trust turns out to be misplaced, there is no recourse.
Moreover, in such a permissionless environment, it may be infeasible to incentivize participants to adequately provide functions like quality control or coordination of system development and evolution. Thus centralization emerges de facto [3], such as the hierarchy of the small number of developers controlling the blockchain software or the few numbers of centralized networks that control the consensus mechanism execution, i.e., mining pools [8].

### Permissioned blockchains to the rescue

> In permissioned blockchain, the nodes executing the consensus mechanism are **identified** and the access to the P2P network **restricted**.

Permissioned blockchains might resemble append-only distributed databases that are _"completely uninteresting"_ [7]. However, unlike a traditional database, no central entity manages the information, but different interested parties control, maintain and guard the information that is stored on it. Different actors with different interests (possibly clashing between themselves) constantly monitor their "adversary-peers" and control if one of them attempts to alter or inadvertently change previously agreed-upon information. These systems enable confidence between a collection of parties, negotiations, and validation of contractual obligations, with clear business relations that already require trust and reputation [3,4]. Relying on multiple validators for blockchain maintenance allows the system to induce single parties not to deviate from the protocol. A permissioned decentralized system such as a blockchain, thus, becomes uniquely effective when used as a framework for collaboration in competition scenarios [9].

### Solving one threat at a time: de-centralize personal data management

> Blockchains can provide individuals with impossible functionalities in traditional cloud services. In particular, they favor the creation of decentralized Personal Information Management Systems (PIMS), guaranteeing, by design, data sovereignty and enabling users to control what personal data they want to share.

Permissioned decentralized systems, including blockchains, can be pivotal in placing individuals at the center of personal data management and in relieving the absence of technical instruments and standards that make the exercise of one’s rights simple and not excessively burdensome (as envisioned in the European strategy for data [10]).
Decentralized PIMS can be considered consent management tools or trusts built on distributed software architectures that act as new neutral intermediaries in the personal data economy. These empower individuals with tools and means to decide at a granular level what is done with their data to provide, among many benefits, greater oversight and transparency over the data.
These decentralized systems would also allow data collectors to prove their compliance with regulations. Not only that, but it could also benefit the creation of a single data market that capitalizes on data interoperability between data spaces for the social and economic good [10]. The current practice of data collectors, in fact, is to store data in disconnected silos that are inaccessible to innovative services, researchers, and often to the individual who generated them.

### The creation of a new Decent(ralized) Data Intermediation Service

> A data intermediary can be defined as a mediator between those who wish to make their data available and those who seek to use them while providing some **degree of confidence** about how the data will be used [11].

Data intermediary services (DIS) can be built based on permissioned decentralized systems to avoid the natural rise of dominance hierarchies in the exchange and handling of personal data. Intermediaries in a **Decent**(ralized) **DIS** aim to provide a neutral service with respect to the exploitation of individuals' data, i.e., the sum of the privacy threat forces in the system of intermediaries is equal to zero. A permissioned blockchain maintains this balance. The primary ability that a permissioned decentralized system can bring in this case to the final users is "gaining truth through the ability to share data safely" [12]:

- a blockchain can provide a single source of verifiable truth among organizations and some level of appropriate automation of data processing.
- organizations can arrange a form of governance to decide the distributed sources of trust and moderate such permissioned systems.
- the system authority can be distributed among many trusted actors so that the compromise of one or even a few authorities does not destroy the consensus.
- intrinsic cryptographical properties of blockchains can enable distributed safe computation and data minimization.
- the networked collaboration environment can be easily exploited for the audit and accountability of operations.
- P2P networks offer an essential solution for data resiliency and scalability.

### The DecentDIS implementation

This project aims to create an infrastructure for the joint management of data intermediary services. A permissioned network of intermediaries provides:

1. an IPFS-protocol-based Personal Data Space (PDS) to store data,
2. an Ethereum-based private blockchain to provide a distributed authorization mechanism, and
3. a distributed execution of codified policies based on standard ontologies to reply to data requests.

Data are encrypted and stored in the PDS, while blockchain's smart contracts govern their access. Data subjects select their data-sharing policies in an intelligible and machine-readable way. Data holders (or subjects themselves) manage data and encryption keys through a threshold cryptosystem. Intermediaries assist both by executing policies through smart contracts and distributing keys to eligible data recipients. Hash-based URIs, together with an on-chain token representation, enable the indexing and validation of data, policies, and their relation. The private blockchain enables the tracing of data access and policies, and its untamperability is strengthened through a multi-DLT architecture, in which periodical commitments are stored in a permissionless DLT.

The relevant open source software can be found in Zenodo:

##### Ethereum smart contract authorization using a Threshold Proxy Re-Encryption scheme in Rust

DOI: [10.5281/zenodo.6548262](https://doi.org/10.5281/zenodo.6548262)  
In this implementation, a network of nodes provides access to eligible data recipients by releasing the keys used to encrypt personal data stored in a PDS. An Ethereum private permissioned blockchain is used as a sidechain, and the public permissionless audit DLT as the mainchain where to store periodic commitments.
The primary use of the permissioned blockchain is the execution of smart contracts implementing personal data access control. Access to the personal data stored in PDS can be allowed by the data holder through smart contracts through a data structure, namely an access control list (ACL).
For the encryption, decryption, and keys distribution phase, a Threshold Proxy Re-Encryption (TPRE) scheme is used. In this scene, network nodes maintain fragments of a key. Such fragments are re-encrypted using a re-encryption key generated by the data holder in favor of an eligible recipient.

##### Decentralized intelligible identity and certification based on DID and VC and IPFS storage

DOI: [10.5281/zenodo.7132777](https://doi.org/10.5281/zenodo.7132777)
The Intelligible Identity set of technologies enables any subject to share information with third parties by proving to those the ownership of certain attestations or attributes that are self-asserted or issued by a trusted entity. Such a model is a specialization of a Decentralized Identifier (DID), i.e., a type of identifier for verifiable self-sovereign digital identity. The intelligible identity allows it to bring with it the relevant operational and legal context of this identity and to trace the processes that involve it easily.
The Intelligible Identity model is a combination of: (i) asymmetric cryptography key pairs, i.e., a public key and a private key; (ii) a Non Fungible Token stored on a blockchain. Intelligibility is conveyed by linking (i) the resources that make up the document or define their legal contexts, (ii) the agents that are involved in the document life cycle, and (iii) the digital resources that describe how to perform operations with the identities. Information is stored on the InterPlanetary File System (IPFS) in the form of IPFS objects. These are identified by a CID (Content IDentifier), i.e., the result of applying a hash function to a file representing the object.

##### Handling policies in smart contracts based on access control and DPV ontology

DOI: [10.5281/zenodo.7132775](https://doi.org/10.5281/zenodo.7132775)
The general idea is to enforce policies and enable access control mechanisms and maintain an untamperable log of data accesses. Policies can be expressed using standard ontologies for access control, such as ODRL or the MPEG-21 framework. Those are integrated with the Data Privacy Vocabulary (DPV), i.e., a specification containing taxonomies related to the privacy and data protection domain and specifying terms such as processing purposes or legal basis. For instance:

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

## References

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
