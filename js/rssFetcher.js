
//const domParser = new DOMParser();
// const parseXml = (xml) => domParser.parseFromString(xml, 'application/xml');

// default count for query is 20 items, boost if needed
const rssToJsonBasePath = 'https://api.rss2json.com/v1/api.json?api_key=s9rqg7dexqlsmnas7cuiohqoytogsff9skw3orew&count=20&rss_url=';
// const yqlBasePath = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22{{feedUrl}}%22&format=json&diagnostics=true&callback=';

export default (rssFeed) => {
  return getViaRss2Json(rssFeed);
  // getViaYqlQuery(rssFeed);
  // oldNodeProxySolution(rssFeed);
}

function getViaRss2Json(rssFeed){
  const timer = 'Rss2Json';
  console.time(timer);
  return fetch(`${rssToJsonBasePath}${encodeURIComponent(rssFeed)}`)
          .then(r => r.json())
          .then(json => {
            console.timeEnd(timer);
            console.info('rss2json', json);
            return json;
          });
}
/*
function getViaYqlQuery(rssFeed) {
  const timer = 'yql';
  console.time(timer);
  return fetch(yqlBasePath.replace('{{feedUrl}}', encodeURIComponent(rssFeed)))
          .then(r => r.json())
          .then(json => {
            console.timeEnd(timer);
            console.info('yql', json);
            return json;
          });
}

function oldNodeProxySolution(rssFeed){
  const timer = 'NodeJsProxy';
  console.time(timer);
  const feedProxyUrl = `/rss/${encodeURIComponent(rssFeed)}`;
  return fetch(feedProxyUrl)
  .then(res => res.text())
  .then((rss) => {
    const xml = parseXml(rss);
    const json = xmlToJson(xml);
    const show = json.rss.channel;
    // assign feed url as id and return
    show.id = rssFeed;
    console.timeEnd(timer);
    console.info('nodeProxy', json);
    return show;
  });
}

function xmlToJson(xml) {
  // based on: https://davidwalsh.name/convert-xml-json
  // Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
  }
  
	var nrOfChildren = xml.children.length;
	if (!nrOfChildren && xml.textContent.length) {
	    return xml.textContent;
	} else { // do children
		for(var i = 0; i < nrOfChildren; i++) {
			var item = xml.children.item(i);
      var nodeName = item.nodeName;
      if(/:/i.test(nodeName)){ // skip namespaced elements
        continue;
      }
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
          obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
*/
