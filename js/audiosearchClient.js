// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js

const appId = 'eaba4b676cc5eab04d13c35fb011225b9e5e80dce75c68f80e7353e87e87062e';
const secret = 'b69ce384544464f6d8798872d6fb24b763fd6b1f9364a885520d0e9bb3c5fbe8';
const credentials = {
  key: appId,
  secret,
  host: 'https://www.audiosear.ch',
};
let token = '39298c55c91317487f1f820c88f9fae025ac30879592b809b4f65fe1ff199d0a';

function authorize(){
  var params = 'grant_type=client_credentials';
  var unencoded_sig = credentials.key + ':' + credentials.secret;
  var signature = base64Encode(unencoded_sig);
  var options = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization': `Basic ${signature}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const url = `${credentials.host}/oauth/token`;
  console.info('authorize with', url, options);
  return fetch(url, options).then(res => res.json()).then((res) => {
    console.log('Got access token...');
    token = res.access_token;
    return token;
  });
}

function base64Encode(str){
  return btoa(str);
}

function get(path){
  var url = `${credentials.host}/api/${path}`;
  var options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'request'
    }
  };
  if(token) {
    return fetch(url, options).then(res => res.json());
  } else {
    return authorize().then(() => get(path));
  }
}

class AudioSearchClient {
  search(query){
    return get(`/search/shows/${encodeURI(query)}`)
  }
}

export default new AudioSearchClient();

/* example response from search */

/*
{
  "query": "this american",
  "total_results": 325,
  "page": 1,
  "results_per_page": 10,
  "results": [
    {
      "id": 27,
      "title": "This American Life",
      "network": {
        "id": 725,
        "name": "This American Life"
      },
      "categories": [
        {
          "id": "18",
          "parent_id": 5,
          "name": "Personal Journals"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        },
        {
          "id": "6",
          "parent_id": null,
          "name": "Arts"
        },
        {
          "id": "7",
          "parent_id": null,
          "name": "News & Politics"
        }
      ],
      "description": "This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 2.5 million people download the weekly podcast. It is hosted by Ira Glass, produced in collaboration with Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.",
      "hosts": [
        {
          "id": 48,
          "name": "Ira Glass"
        }
      ],
      "ui_url": "https://www.audiosear.ch/show/27/this-american-life",
      "rss_url": "http://feed.thisamericanlife.org/talpodcast",
      "buzz_score": "0.9473",
      "image_files": [
        {
          "id": 105760,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/this-american-life.FNCKSw.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/this-american-life.FNCKSw.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-11-27T23:01:23.316Z",
          "updated_at": "2016-11-27T23:01:23.316Z",
          "original_file_url": "http://is1.mzstatic.com/image/thumb/Music71/v4/03/3c/f1/033cf19b-a70e-108f-2d77-82c5b8c8cde0/source/600x600bb.jpg",
          "storage_id": 479,
          "imageable_id": 27,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "6f87baca45b0f20c15ce15b05bef5935"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 20454,
      "title": "American Fright",
      "network": null,
      "categories": [
        {
          "id": "26",
          "parent_id": null,
          "name": "TV & Film"
        }
      ],
      "description": "Podcast about American Horror films. We start in the seventies and move on up.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/20454/american-fright",
      "rss_url": "http://feeds.soundcloud.com/users/soundcloud:users:262116345/sounds.rss",
      "buzz_score": "0.30627",
      "image_files": [
        {
          "id": 187786,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-fright.f1f6DH.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-fright.f1f6DH.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2017-06-22T19:51:54.996Z",
          "updated_at": "2017-06-22T19:51:54.996Z",
          "original_file_url": "http://is1.mzstatic.com/image/thumb/Music127/v4/c2/00/0e/c2000ea2-7f03-4feb-acae-eeaeb5189523/source/600x600bb.jpg",
          "storage_id": 39366,
          "imageable_id": 20454,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "27142c01bd1f55a0e8bc07b0c151b7aa"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 7794,
      "title": "American Biography",
      "network": null,
      "categories": [
        {
          "id": "52",
          "parent_id": 5,
          "name": "History"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        }
      ],
      "description": "American biography is a podcast that looks at American history through a human prism by examining the lives of important, if less discussed, Americans who have exerted great influence upon the nation's development.\n\nIt's the American story told through Americans' stories.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/7794/american-biography",
      "rss_url": "http://rss.acast.com/americanbiography",
      "buzz_score": "0.39418",
      "image_files": [
        {
          "id": 168765,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-biography.5usBwL.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-biography.5usBwL.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2017-05-27T03:35:32.345Z",
          "updated_at": "2017-05-27T03:35:32.345Z",
          "original_file_url": "http://is5.mzstatic.com/image/thumb/Music117/v4/42/30/50/42305014-a494-2f96-90e2-d65d2bea4976/source/600x600bb.jpg",
          "storage_id": 26706,
          "imageable_id": 7794,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "b7671c230a2b24be5465a14cbc24b2eb"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 20057,
      "title": "American Snippets",
      "network": null,
      "categories": [
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        }
      ],
      "description": "American Snippets is the brain child of Entrepreneur Dave Brown, and Author & Speaker Barbara Allen. Dave and Barb have both found their way through difficult times, and to each other. Now they are finding their way to you in what will be an entertaining, informative, inspirational, and All-American enterprise. They and their all-star lineup of guests and contributors will lead the way; showing you the exceptional things being done by Americans all across this great nation.\n\nTogether, Dave and Barb are living, defending, and promoting the American Dream. Now they are sharing stories of people all over this great country who are inspiring and helping others by fulfilling their own dreams.\n\nSubscribe and listen in each week to find out more about American Snippets, and what listeners can look forward to. Get ready for a rousing ride!",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/20057/american-snippets",
      "rss_url": "http://feeds.soundcloud.com/users/soundcloud:users:294187823/sounds.rss",
      "buzz_score": "0.41616",
      "image_files": [
        {
          "id": 186019,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-snippets.PehL2A.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-snippets.PehL2A.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2017-06-21T17:05:21.506Z",
          "updated_at": "2017-06-21T17:05:21.506Z",
          "original_file_url": "http://is2.mzstatic.com/image/thumb/Music117/v4/a6/e8/71/a6e871db-f261-bd65-9613-7241d69c0582/source/600x600bb.jpg",
          "storage_id": 38969,
          "imageable_id": 20057,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "ab8b85b7c9145d7dc093ddc1356a8b61"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 8510,
      "title": "The Asian American Voice",
      "network": null,
      "categories": [
        {
          "id": "12",
          "parent_id": 3,
          "name": "Careers"
        },
        {
          "id": "3",
          "parent_id": null,
          "name": "Business"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        }
      ],
      "description": "Offering insight and inspiration to the current and aspiring Asian American entrepreneur. ",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/8510/the-asian-american-voice",
      "rss_url": "http://theasianamericanvoice.libsyn.com/taav",
      "buzz_score": "0.42968",
      "image_files": [
        {
          "id": 109887,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/the-asian-american-voice.FswiW4.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/the-asian-american-voice.FswiW4.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-11-30T00:05:49.870Z",
          "updated_at": "2016-11-30T00:05:49.870Z",
          "original_file_url": "http://is1.mzstatic.com/image/thumb/Music62/v4/d3/88/5a/d3885ab8-8ecb-1303-5802-178fb75d1e66/source/600x600bb.jpg",
          "storage_id": 27422,
          "imageable_id": 8510,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "7d3ddd4c64982116e61d1a686854e6be"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 7707,
      "title": "American Crime",
      "network": {
        "id": 697,
        "name": "PodcastOne"
      },
      "categories": [
        {
          "id": "26",
          "parent_id": null,
          "name": "TV & Film"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        }
      ],
      "description": "The American Crime Podcast, hosted by film critic and radio personality Elvis Mitchell, takes an in-depth look at the groundbreaking new television drama American Crime premiering Thursday, March 5th 10/9c on ABC. Each week will feature a candid conversation with the show's creator and Executive Producer (Oscar winning screenwriter John Ridley) along with an array of show talent as we discuss the latest episode, character storylines, and other timely topics and themes. We'll also share an insider's look at the creative and technical process that brings each episode to life, including scriptwriting, directing, editing, scoring, and more.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/7707/american-crime",
      "rss_url": "http://www.podcastone.com/podcast?categoryID2=724",
      "buzz_score": "0.32937",
      "image_files": [
        {
          "id": 119426,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-crime.WTooob.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-crime.WTooob.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-12-29T19:25:37.430Z",
          "updated_at": "2016-12-29T19:25:37.430Z",
          "original_file_url": "http://is5.mzstatic.com/image/thumb/Music62/v4/7c/09/21/7c092125-dbd3-ac3b-bbc2-1959baaef850/source/600x600bb.jpg",
          "storage_id": 26619,
          "imageable_id": 7707,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "f6f7b1ad867fac4b66c8aed4fc2e4216"
        },
        {
          "id": 121223,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-crime.WTooob.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-crime.WTooob.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-12-29T20:36:12.156Z",
          "updated_at": "2016-12-29T20:36:12.156Z",
          "original_file_url": "http://is5.mzstatic.com/image/thumb/Music62/v4/7c/09/21/7c092125-dbd3-ac3b-bbc2-1959baaef850/source/600x600bb.jpg",
          "storage_id": 26619,
          "imageable_id": 7707,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "f6f7b1ad867fac4b66c8aed4fc2e4216"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 8891,
      "title": "American Theatre's Offscript",
      "network": null,
      "categories": [
        {
          "id": "17",
          "parent_id": 6,
          "name": "Performing Arts"
        },
        {
          "id": "6",
          "parent_id": null,
          "name": "Arts"
        }
      ],
      "description": "The official podcast of AMERICAN THEATRE, the national publication for the American not-for-profit theatre. Range of topics include playwright interviews, critical roundtable discussions and the latest shows coming up as recommended by our staff.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/8891/american-theatre-s-offscript",
      "rss_url": "http://feeds.feedburner.com/AtOffscript",
      "buzz_score": "0.26971",
      "image_files": [
        {
          "id": 107218,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-theatre-s-offscript.ybrP74.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-theatre-s-offscript.ybrP74.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-11-28T12:11:35.750Z",
          "updated_at": "2016-11-28T12:11:35.750Z",
          "original_file_url": "http://is3.mzstatic.com/image/thumb/Music71/v4/c5/ac/c4/c5acc412-f64b-bc02-02c3-6645d770f0f2/source/600x600bb.jpg",
          "storage_id": 27803,
          "imageable_id": 8891,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "fa2848ee3dcd9fc05ba42239d84d7bf5"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 2286,
      "title": "American Mythology",
      "network": null,
      "categories": [
        {
          "id": "52",
          "parent_id": 5,
          "name": "History"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        }
      ],
      "description": "A podcast that blends storytelling and history to explore the mythology at the core of American identity, ideology, and policy. Each episode examines a unique aspect of our mythology in an attempt to discover who we are and define who we want to be.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/2286/american-mythology",
      "rss_url": "http://americanmythology.libsyn.com/rss",
      "buzz_score": "0.59498",
      "image_files": [
        {
          "id": 114958,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-mythology.AbjQfT.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-mythology.AbjQfT.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2016-12-16T03:23:59.147Z",
          "updated_at": "2016-12-16T03:23:59.147Z",
          "original_file_url": "http://is1.mzstatic.com/image/thumb/Music122/v4/9e/ec/86/9eec86fa-d034-9554-992c-ae3d084bc0fc/source/600x600bb.jpg",
          "storage_id": 21198,
          "imageable_id": 2286,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "0a384058d472c2587f701e2c5763c7f2"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 23202,
      "title": "American Gods Cast - An American Gods Podcast",
      "network": null,
      "categories": [
        {
          "id": "26",
          "parent_id": null,
          "name": "TV & Film"
        }
      ],
      "description": "Welcome to American Gods Cast with Michael and Kyle! Michael has read the book, and Kyle hasn't, but we're both itching to watch the t.v. interpretation of Neil Gaiman's classic novel and discuss it with you! Episodes coming weekly on Tuesday mornings with our opinions and thoughts on each episode as well as news and listener questions.\n\nTell us your thoughts on American Gods! We want to hear what you think about the show; you can reach us via email at americangodscast@gmail.com or you can check out our twitter @CastGods or on Facebook at American Gods Cast. Make your voice heard on our podcast!",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/23202/american-gods-cast--an-american-gods-podcast",
      "rss_url": "http://feeds.soundcloud.com/users/soundcloud:users:259988610/sounds.rss",
      "buzz_score": null,
      "image_files": [
        {
          "id": 201661,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-gods-cast-an-american-gods-podcast.Q63CmT.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-gods-cast-an-american-gods-podcast.Q63CmT.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2017-07-06T08:23:04.488Z",
          "updated_at": "2017-07-06T08:23:04.488Z",
          "original_file_url": "http://is3.mzstatic.com/image/thumb/Music111/v4/9c/30/7b/9c307bd9-19ef-c66c-f31d-e47b30e42d00/source/600x600bb.jpg",
          "storage_id": 42114,
          "imageable_id": 23202,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "afd3e58aef65a72c8eb1c72ece7923cd"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    },
    {
      "id": 22940,
      "title": "American Journey",
      "network": null,
      "categories": [
        {
          "id": "52",
          "parent_id": 5,
          "name": "History"
        },
        {
          "id": "5",
          "parent_id": null,
          "name": "Society & Culture"
        },
        {
          "id": "65",
          "parent_id": null,
          "name": "Science & Medicine"
        },
        {
          "id": "25",
          "parent_id": 65,
          "name": "Social Sciences"
        }
      ],
      "description": "We are a nation of immigrants! Some of us got here yesterday, some of us centuries ago, and some of us move about from state to state. Hosted by Jeremy Rishe, a New York based actor/writer, American Journey is an oral history of the people who inhabit the United States, and how they or their families came here. It is in our nature to explore and make better lives for ourselves. For many generations now the United States has been a place where people come from all over the world to do just that, either achieving their dreams or not. Our goal is to captures those stories.",
      "hosts": [],
      "ui_url": "https://www.audiosear.ch/show/22940/american-journey",
      "rss_url": "http://americanjourney.libsyn.com/rss",
      "buzz_score": null,
      "image_files": [
        {
          "id": 200204,
          "item_id": null,
          "file": {
            "url": "https://d2u1padl9j7w5j.cloudfront.net/american-journey.XUR6dx.audiosear.ch/600x600bb.jpg",
            "thumb": {
              "url": "https://d2u1padl9j7w5j.cloudfront.net/american-journey.XUR6dx.audiosear.ch/thumb_600x600bb.jpg"
            }
          },
          "is_uploaded": null,
          "upload_id": null,
          "created_at": "2017-07-04T23:38:20.080Z",
          "updated_at": "2017-07-04T23:38:20.080Z",
          "original_file_url": "http://is5.mzstatic.com/image/thumb/Music122/v4/7d/32/b7/7d32b7cb-c68f-fde9-8f85-f13a930c05ac/source/600x600bb.jpg",
          "storage_id": 41852,
          "imageable_id": 22940,
          "imageable_type": "Collection",
          "extra": {
            "type": "full"
          },
          "md5hash": "c0e26b462dce7eeaaedbed7ebeb0ab74"
        }
      ],
      "sc_feed": null,
      "web_profiles": null
    }
  ]
}

*/
