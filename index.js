const fetch = require('node-fetch');

const _creds = {
  key: 'eaba4b676cc5eab04d13c35fb011225b9e5e80dce75c68f80e7353e87e87062e',
  secret: 'b69ce384544464f6d8798872d6fb24b763fd6b1f9364a885520d0e9bb3c5fbe8',
  host: 'https://www.audiosear.ch',
};

function auth(){
  const unencoded_sig = _creds.key + ':' + _creds.secret;
  const signature = new Buffer(unencoded_sig).toString('base64');
  const url = `${_creds.host}/oauth/token`;
  const options = {
    body: 'grant_type=client_credentials',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${signature}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      console.log('AUTH DATA => ', data);
      return data;
  });
}

module.exports = async (req, res) => {
  if(/^\/token/.test(req.url)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return auth();
  }
  else {
    return 'WHAT???';
  }
}
