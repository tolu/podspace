
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
  items: Rss2JsonItem[]

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

interface MyRssItem {
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

/* interfaces for using rss2json api */
interface Rss2JsonResponse {
  feed: {
    author: string      // "The New York Times"
    description: string //"This moment demands an explanation. This show is on a mission to find it. Only what you want to know, none of what you don’t. Hosted by Michael Barbaro. Powered by New York Times journalism. Twenty minutes a day, five days a week, ready by 6 a.m."
    image: string       // "https://dfkfj8j276wwv.cloudfront.net/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg"
    link: string        // "https://art19.com/shows/the-daily"
    title: string       // "The Daily"
    url: string         // "http://feeds.podtrac.com/zKq6WZZLTlbM"
  }
  items: Rss2JsonItem[]
}
interface Rss2JsonItem {
  title: string       // "Tuesday, Aug. 15, 2017",
  pubDate: string     // "2017-08-15 09:23:24",
  link: string        // "https://www.nytimes.com/2017/08/15/podcasts/the-daily/charlottesville-trump.html",
  guid: string        // "gid://art19-episode-locator/V0/0wFIo1YVJg8yCsWQ8YLBNQK3qLKCWelHv3Prb8z17WY",
  author: string      // "The New York Times",
  thumbnail: string   // "",
  description: string // "<p>In 2012, a woman asked if the city of Charlottesville, Va., should consider removing a statue of a Confederate general from a local park. That question set off a chain of events that led to the deadly violence on Saturday. Also, President Trump, after two days of equivocal remarks about the violence in Charlottesville, made a new statement on Monday: “Racism is evil.” Guests: Kristin Szakos, a city councillor in Charlottesville, Va.; Glenn Thrush, a White House correspondent for The Times. For more information on today’s episode, visit nytimes.com/thedaily. </p>",
  content: string     // "<p>In 2012, a woman asked if the city of Charlottesville, Va., should consider removing a statue of a Confederate general from a local park. That question set off a chain of events that led to the deadly violence on Saturday. Also, President Trump, after two days of equivocal remarks about the violence in Charlottesville, made a new statement on Monday: “Racism is evil.” Guests: Kristin Szakos, a city councillor in Charlottesville, Va.; Glenn Thrush, a White House correspondent for The Times. For more information on today’s episode, visit nytimes.com/thedaily. </p>",
  enclosure: {
    link: string // "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/39743a3f-8c66-497f-af60-a48cc5b73cc7.mp3",
    type: string // "audio/mpeg",
    length: number // 19612734,
    duration: number // 1255,
    // "rating": { "scheme": "urn:itunes", "value": "no" }
  },
  // "categories": []
}

/* yql query interfaces */
/*
interface YqlJsonResponse {
  query: {
    count: number
    results: {
      item: YqlJsonItem[]
    }
  }
}
interface YqlJsonItem {
  title: string //  "Tuesday, Aug. 15, 2017",
  description: string //  "<p>In 2012, a woman asked if the city of Charlottesville, Va., should consider removing a statue of a Confederate general from a local park. That question set off a chain of events that led to the deadly violence on Saturday. Also, President Trump, after two days of equivocal remarks about the violence in Charlottesville, made a new statement on Monday: “Racism is evil.” Guests: Kristin Szakos, a city councillor in Charlottesville, Va.; Glenn Thrush, a White House correspondent for The Times. For more information on today’s episode, visit nytimes.com/thedaily.&nbsp;</p>",
  summary: string //  "<p>In 2012, a woman asked if the city of Charlottesville, Va., should consider removing a statue of a Confederate general from a local park. That question set off a chain of events that led to the deadly violence on Saturday. Also, President Trump, after two days of equivocal remarks about the violence in Charlottesville, made a new statement on Monday: “Racism is evil.” Guests: Kristin Szakos, a city councillor in Charlottesville, Va.; Glenn Thrush, a White House correspondent for The Times. For more information on today’s episode, visit nytimes.com/thedaily.&nbsp;</p>",
  pubDate: string // "Tue, 15 Aug 2017 09:23:24 -0000",
  link: string // "https://www.nytimes.com/2017/08/15/podcasts/the-daily/charlottesville-trump.html",
  image: {
    href: string // "https://dfkfj8j276wwv.cloudfront.net/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg"
  },
  duration: string // "00:20:55",
  enclosure: {
    length: string // "19612734",
    type: string // "audio/mpeg",
    url: string // "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/39743a3f-8c66-497f-af60-a48cc5b73cc7.mp3"
  }
}
*/
