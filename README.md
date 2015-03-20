# plumage landing page

> Landing page for plumage. Splendid.

[ ![Codeship Status for plumageio/site](https://codeship.com/projects/edd5e270-b189-0132-1c49-3edef27c5b65/status?branch=master)](https://codeship.com/projects/69877)

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Browser support

Generally, templates are supported in the current and last 2 versions of all modern browsers. Specifically, they're supposed to work (but not look identical) and tested in the following browsers which aligns with ezeep's web app browser compatibility:

- *Desktop*: IE 9+, Chrome 27+, Firefox 24+, Safari 5+, Opera 12+
- *Mobile*: Mobile Safari 6+, Chrome for Android/iOS 26+, Android Browser 4.1+

## Prerequisites

- [node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
- [Bower](http://bower.io/)


To get all dependencies run:
```bash
npm install
```

This will install all required npm packages and bower components in one go.


## Development

This compiles and builds everything into the `dist/` folder and starts up a watching & live-reloading web server:

```bash
grunt server
```

The site will open [localhost:1337](http://localhost:1337) automatically in your default browser.

Note: The easiest way to get livereload to work is to install the [browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).


## Build

This will put everything together and output it in the `dist/` folder:

```bash
grunt build
```
