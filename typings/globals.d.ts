
interface Podcast {
  artistName: string              //  "Sveriges Radio"
  collectionName: string          //  "Sommar & Vinter i P1"
  feedUrl: string                 //  "http://api.sr.se/api/rss/pod/4023"
  artworkUrl30: string            //  "http://is4.mzstatic.com/image/thumb/Music111/v4/ce/58/eb/ce58eb43-ea59-eb6d-0f22-2669f1c78d36/source/30x30bb.jpg"
  artworkUrl60: string            //  "http://is4.mzstatic.com/image/thumb/Music111/v4/ce/58/eb/ce58eb43-ea59-eb6d-0f22-2669f1c78d36/source/60x60bb.jpg"
  artworkUrl100: string           //  "http://is4.mzstatic.com/image/thumb/Music111/v4/ce/58/eb/ce58eb43-ea59-eb6d-0f22-2669f1c78d36/source/100x100bb.jpg"
  artworkUrl600: string           //  "http://is4.mzstatic.com/image/thumb/Music111/v4/ce/58/eb/ce58eb43-ea59-eb6d-0f22-2669f1c78d36/source/600x600bb.jpg"
  releaseDate: string             //  "2017-08-14T11:00:00Z"
  trackCount: 298
  collectionId: number            // 284610981

  // added by us
  items: PodEpisode[]

  // ignored by us
  /*
   * collectionExplicitness: string  //  "cleaned"
   * trackViewUrl: string            //  "https://itunes.apple.com/us/podcast/sommar-vinter-i-p1/id284610981?mt=2&uo=4"
   * trackName: string               //  "Sommar & Vinter i P1"
   * collectionCensoredName: string  //  "Sommar & Vinter i P1"
   * trackCensoredName: string       //  "Sommar & Vinter i P1"
   * artistViewUrl: string           //  "https://itunes.apple.com/us/artist/sveriges-radio/id211312173?mt=2&uo=4"
   * collectionViewUrl: string       //  "https://itunes.apple.com/us/podcast/sommar-vinter-i-p1/id284610981?mt=2&uo=4"
   * artistId: 211312173
   * collectionId: 284610981
   * trackId: 284610981
   * wrapperType: string           //  "track"
   * kind: string                  //  "podcast"
   * collectionPrice: 0
   * trackPrice: 0
   * trackRentalPrice: 0
   * collectionHdPrice: 0
   * trackHdPrice: 0
   * trackHdRentalPrice: 0
   * trackExplicitness: string       //  "cleaned"
   * country: string                 //  "USA"
   * currency: string                //  "USD"
   * primaryGenreName: string        //  "Society & Culture"
   * contentAdvisoryRating: string   //  "Clean"
   * genres: string[] // ["Society & Culture", "Podcasts"]
   * genreIds: [ "1324", "26"]
   */
}
interface SearchResults {
  resultCount: number
  results: Podcast[]
}

interface PodEpisode {
  title: string
  description: string
  pubDate: string
  enclosure: {
    '@attributes': {
      length: string// "57510007"
      type: string// "audio/mpeg"
      url: string// "http://sverigesradio.se/topsy/ljudfil/6190014.mp3"
    }
  }
  // guid:"http://sverigesradio.se/sommar_i_p1_20170815_0700_36691a4.mp3"
  // link: "http://sverigesradio.se/sida/avsnitt/927250?programid=2071"
  // poddid:"4023"
  // programid:"2071"
}
