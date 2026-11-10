// News for <NewsWall />. Facts checked on 9–10 November 2026 (see VERIFICA.md); recheck the latest ones before the lecture.
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
  /** Short legal hook that fits one line of the card (about 30 characters), e.g. 'art. 615-ter c.p.'. */
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
    sintesi: 'Temperature alzate da remoto in oltre 20 punti vendita in Sicilia e in altre regioni, probabilmente attraverso software di telegestione esposti e non aggiornati.',
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
    gancio: 'd.lgs. 138/2024, art. 25',
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
    gancio: 'L. 90/2024 (cybersicurezza)',
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
    gancio: 'artt. 640 e 494 c.p.',
    fonte: 'Il Post, 11/2/2025',
    url: 'https://www.ilpost.it/2025/02/11/truffa-ministro-difesa-crosetto-indagini/',
  },
  {
    id: 'binance',
    data: '29 ott 2026',
    titolo: 'Binance: rubati 6,3 miliardi di dollari in criptovalute',
    sintesi: 'Tutto parte da un falso colloquio di lavoro: un malware, le credenziali degli ingegneri, poi i portafogli online. L’FBI accusa la Corea del Nord.',
    proprieta: ['riservatezza', 'integrità'],
    stato: 'confermato',
    gancio: 'Reg. (UE) 2023/1114, art. 75',
    fonte: 'Il Post, 3/11/2026',
    url: 'https://www.ilpost.it/2026/11/03/indagini-furto-attacco-binance/',
  },
]
