
const domParser = new DOMParser();
const parseXml = (xml) => domParser.parseFromString(xml, 'application/xml');

export default (rssFeed) => {
  const feedProxyUrl = `/rss/${encodeURIComponent(rssFeed)}`;
  return fetch(feedProxyUrl)
  .then(res => res.text())
  .then((rss) => {
    const xml = parseXml(rss);
    const json = xmlToJson(xml);
    const show = json.rss.channel;
    // assign feed url as id and return
    show.id = rssFeed;
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
