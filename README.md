[![Build Status](https://travis-ci.org/aquaraga/godash.svg?branch=master)](https://travis-ci.org/aquaraga/godash)

# GoCD dashboard

A minimal dashboard for GoCD builds.
Inspired from [dashy](https://github.com/chiku/dashy)

## Usage

__Configure GoCD URL and pipelines:__

Update config/config.js with the relevant parameters

__Install the dependencies:__

`npm install`

__Test:__

`npm run test`

__Development mode with livereload:__

`npm run watch`

__When you are done, create a production ready version of the JS bundle:__

`npm run build`

__To run the server__

`npm run start -- -p <port>`

If no port is specified, as in `npm run start`, then 8080 would be used.

## License

[MIT License](http://opensource.org/licenses/MIT)
