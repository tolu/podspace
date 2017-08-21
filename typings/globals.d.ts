
interface SearchResults {
  total_results: number
  page: number
  results_per_page: number
  results: Podcast[]
}
interface Podcast {
  id: number
  title: string
  network: {
    name: string
  }
  description: string
  rss_url: string //  "http://feed.thisamericanlife.org/talpodcast",
  image_files?: [{
    file: {
      url: string
      thumb: {
        url: string
      }
    }
  }]
  image_urls: {
    thumb: string
    full: string
  }
  items: Episode[]
}
interface Episode {
  id: 707989,
  title: string //  "Ruben Östlund",
  description: string //  "REGISSÖR. – Mitt program kommer att handla om \"Rutan\" – en symbolladdad plats som skall påminna oss om vår roll som ansvarstagande medmänniskor. När programmet sänds finns det redan tre \"rutor\" i världen. En i Värnamo, en i Grimstad, Norge och en i Vestfossen, Norge. Kanske kommer jag också berätta lite om hur \"Rutan\" blev långfilmen \"The Square\" och hur det känns att vinna Guldpalmen i Cannes.",
  date_created: string //  "2017-08-19",
  date_added: string //  "2017-08-19T06:12:21.228Z",
  identifier: string //  "http://sverigesradio.se/sommar_i_p1_20170819_0700_256000d.mp3",
  rss_url: string //  "http://api.sr.se/api/rss/pod/4023",
  show_id: number // 28971,
  show_title: string //  "Sommar & Vinter i P1",
  digital_location: string //  "http://sverigesradio.se/sida/avsnitt/927254?programid=2071",
  duration: number // 3440,
  updated_at: string //  "2017-08-19T06:12:23.929Z",
  itunes_episode: number // 391221322,
  itunes_show_id: number // 284610981,
  // "categories": [{"id": 5,"parent_id": null,"name": "Society & Culture","parent_name": null}],
  audio_files: [
    {
      id: number // 705325,
      mp3: string //  "https://www.audiosear.ch/media/628aec9b3a36da6aed37ee5027e17698/0/public/audio_file/705325/6194382.mp3",
      audiosearch_mp3: string //  "https://d2u1padl9j7w5j.cloudfront.net/ruben-ostlund.x4lEif.audiosear.ch/6194382.mp3",
      duration: string //  "00:57:20",
      url_title: string //  "ruben-stlund",
      listenlen: string //  "long"
    }
  ],
  image_urls: {
    full: string //  "https://d2u1padl9j7w5j.cloudfront.net/sommar-vinter-i-p1.E6FxWP.audiosear.ch/600x600bb.jpg",
    thumb: string //  "https://d2u1padl9j7w5j.cloudfront.net/sommar-vinter-i-p1.E6FxWP.audiosear.ch/thumb_600x600bb.jpg"
  },
  show_image_urls: {
    full: string //  "https://d2u1padl9j7w5j.cloudfront.net/sommar-vinter-i-p1.E6FxWP.audiosear.ch/600x600bb.jpg",
    thumb: string //  "https://d2u1padl9j7w5j.cloudfront.net/sommar-vinter-i-p1.E6FxWP.audiosear.ch/thumb_600x600bb.jpg"
  },
  urls: {
    self: string //  "https://www.audiosear.ch/api/episodes/707989",
    ui: string //  "https://www.audiosear.ch/a/acd95/ruben-stlund"
  }
}

/*  MEDIA SESSION EXTENSION
---------------------------------------------- */
interface Navigator {
  mediaSession: {
    metadata: MediaMetadata
    setActionHandler(event: MediaSessionEvent, handler: Function)
  }
}
type MediaSessionEvent = 'play' | 'pause' | 'seekbackward' | 'seekforward' | 'previoustrack' | 'nexttrack';
interface MediaMetadataObject {
  title: string
  artist: string
  album: string
  artwork: [{
    src: string
    sizes: string
    type: string
  }]
}
declare class MediaMetadata {
  constructor(metadata: MediaMetadataObject)
}
