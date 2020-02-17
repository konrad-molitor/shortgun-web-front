[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)

# Shortgun Web Client

Shortgun Web Client provides Web Client for [Shortgun URL Shortener](https://github.com/konrad-molitor/shortgun). 

![Shortgun in action](https://images2.imgbox.com/43/b9/4EGpcvks_o.gif)

## Requirements
* Latest LTS or current version of Node.js installed (for build purposes)
* __Nginx__ or another web server up and running
* __Shortgun__ server up and running
* __Git__ installed

## Installation

1. Clone this ropository to local machine
`git clone https://github.com/konrad-molitor/shortgun-web-front.git`

2. Navigate to `shortgun-web-front` directory
`cd shortgun-web-front`

3. Perform dependencies install
`npm install`

4. Build project
`npm run build`

5. Navigate to build directory
`cd build`

6. Copy files from this directory to web-server's directory.
7. Configure web-server to serve index.html for `/` path, upstream `/a/*` and `/s/*` requests to Shortgun API and serve Shortgun image thumbnails directory for `/images/`.

## Components

Essentially, Shortgun Web Client serves following routes:
* `/` - Starting route, will provide login/signup functionality (or shortcut creation form, if token exists in local storage)
* `/profile` - List of created shortcuts
* `/about` - Simple about page
* `/contacts` - Contacts page with direct message functionality

## Functionality

Take quick look over functionality.

### Storing token
If logged in, Shortgun Web Client will store current token in browser's local storage. Shortgun Web Client also checks browser's local storage for token on page load, so it will be no need to login again.
> Since JWT tokens issued by Shortgun are non-expiring, the only way to cancel login is to use "Logout" button

### Showing page preview
If provided and available Shortgun Web Client will show page previews. Hovewer previews can be only seen on screens that have >768px width. In most cases when using on mobile devices you can turn your device to landscape mode to view previews.

## Contributing
PRs are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Icons used
Icons courtesy of Alexander Kahlkopf, https://iconmonstr.com/

## License
Unless stated elsewhere, file headers or otherwise, the license as stated in LICENSE file.
