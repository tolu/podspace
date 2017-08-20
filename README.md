# podspace
Podspace is (will be) a Progressive Web App for podcasts.

Available to test drive at: https://tolu.github.io/podspace
Note that you will need to use Chrome and enable
*Experimental Web Platform Features* under `chrome://flags` (<- enter in address bar)

### Development
App is written in typescript, found in `/src`.

To get going run `npm i && npm start`. This kicks off
* start http-server for `./` on `localhost:8080`
* starts the `token service` on `localhost:3000`
* watches `./src` for changes and
  * transpile all `*.ts` files into `./dist` using target `esnext`
  * create bundle (`./dist/es6_bundle.js`) with `webpack` and `ts-loader` using target `es2016`


### Resources
* https://www.audiosear.ch/docs
* https://jakearchibald.github.io/isserviceworkerready/resources.html
* https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
* https://serviceworke.rs/
* https://learnnextjs.com/basics/getting-started
*

### Credits
Idea and inspiration from the magnificent [Podspace](https://play.google.com/store/apps/details?id=io.davidkarlsson.podspace) app by David Karlsson

Micro services deployed with [Now.sh](https://zeit.co/now)

Uses [Audiosear.ch API](https://www.audiosear.ch/) for searching, listing and listening
