// News for <NewsWall />. Facts checked on 9 November 2026 (see VERIFICA.md); recheck the latest ones before the lecture.
// At most 6 cards fit on a slide (3 columns × 2 rows); <NewsWall :ids="[…]" /> picks and orders them.

export type Proprieta = 'riservatezza' | 'integrità' | 'disponibilità' | 'autenticità'

/** "rivendicato": the attackers say so, nobody has confirmed it yet. A claim is not proof. */
export type StatoNotizia = 'confermato' | 'rivendicato' | 'in verifica'

export interface Notizia {
  id: string
  /** Short date as shown on the card, e.g. '2 nov 2026'. */
  data: string
  titolo: string
  /** One or two lines. */
  sintesi: string
  /** Security properties violated (shown when the card is revealed). */
  proprieta: Proprieta[]
  stato: StatoNotizia
  /** Short legal hook, e.g. 'art. 615-ter c.p.'. */
  gancio: string
  /** Source label, e.g. the newspaper's name. */
  fonte: string
  url: string
}

export const notizie: Notizia[] = [
  {
    id: 'frigoriferi',
    data: '2 nov 2026',
    titolo: 'Frigoriferi manomessi nei supermercati, da Palermo a Trapani',
    sintesi: 'Temperature alzate da remoto in oltre 20 punti vendita in Sicilia e in altre regioni, sfruttando software di telegestione non aggiornati.',
    proprieta: ['integrità', 'disponibilità'],
    stato: 'confermato',
    gancio: 'art. 14 Cyber Resilience Act',
    fonte: 'Il Post, 3/11/2026',
    url: 'https://www.ilpost.it/2026/11/03/attacchi-informatici-hacker-supermercati/',
  },
  {
    id: 'farnesina',
    data: '8 ott 2026',
    titolo: 'Attacco al sito della Farnesina',
    sintesi: 'Un attacco DDoS, attribuito dalla stampa al gruppo filorusso NoName057(16), viene mitigato senza disservizi.',
    proprieta: ['disponibilità'],
    stato: 'confermato',
    gancio: 'd.lgs. 138/2024 (NIS2): notifica entro 24 ore',
    fonte: 'Open, 8/10/2026',
    url: 'https://www.open.online/2026/10/08/farnesina-attacco-hacker-indagini/',
  },
  {
    id: 'olimpiadi',
    data: '4 feb 2026',
    titolo: 'Milano-Cortina: attacchi ai siti dei Giochi',
    sintesi: 'Il governo dichiara sventati attacchi di origine russa a sedi diplomatiche e a siti legati alle Olimpiadi; NoName057(16) rivendica attacchi DDoS.',
    proprieta: ['disponibilità'],
    stato: 'confermato',
    gancio: 'L. 90/2024 sulla cybersicurezza nazionale',
    fonte: 'The Record, 5/2/2026',
    url: 'https://therecord.media/italy-blames-russia-linked-hackers-winter-games-cyberattack',
  },
  {
    id: 'paragon',
    data: '5 mar 2026',
    titolo: 'Spyware Paragon: le procure confermano',
    sintesi: 'Le procure di Roma e Napoli trovano tracce di malware sui telefoni di due attivisti e del direttore di Fanpage. Chi ha spiato il giornalista resta ignoto.',
    proprieta: ['riservatezza', 'integrità'],
    stato: 'confermato',
    gancio: 'art. 615-ter c.p. (accesso abusivo)',
    fonte: 'Internazionale, 12/3/2026',
    url: 'https://www.internazionale.it/magazine/stephanie-kirchgaessner/2026/03/12/la-procura-conferma-che-il-giornalista-era-spiato',
  },
  {
    id: 'crosetto',
    data: 'feb 2025',
    titolo: 'La voce clonata del ministro Crosetto',
    sintesi: 'Con una voce ricreata al computer, truffatori ottengono da un imprenditore circa 980.000 €, poi bloccati su un conto olandese.',
    proprieta: ['autenticità'],
    stato: 'confermato',
    gancio: 'artt. 640 e 494 c.p. (truffa, sostituzione di persona)',
    fonte: 'Il Post, 11/2/2025',
    url: 'https://www.ilpost.it/2025/02/11/truffa-ministro-difesa-crosetto-indagini/',
  },
  {
    id: 'dia',
    data: '9 nov 2026',
    titolo: 'File della DIA in vendita sul dark web?',
    sintesi: 'Un venditore offre 302 file attribuiti alla Direzione investigativa antimafia. Per gli inquirenti nessuna intrusione: solo dati già pubblici.',
    proprieta: ['riservatezza'],
    stato: 'rivendicato',
    gancio: 'una rivendicazione non è una prova',
    fonte: 'AGI, 9/11/2026',
    url: 'https://www.agi.it/cronaca/news/2026-11-09/hacker-dia-attacco-informatico-39947807/',
  },
]
