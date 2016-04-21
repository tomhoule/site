# plumage landing page

> Landing page for plumage. Splendid.

[ ![GitLab CI Status for plumage/site](https://www.git.berlin/plumage/site/badges/master/build.svg)](https://www.git.berlin/plumage/site/builds)

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Prerequisites for Development

- [node.js](http://nodejs.org/)
- [npm](https://npmjs.org/)
- [Bower](http://bower.io/)

To get all dependencies run:
```bash
npm install
```

This will install all required npm packages and bower components in one go.

## Development

This compiles and builds everything into the `dist/` folder and starts up a watching & live-reloading web server:

```bash
gulp
```

The site will open [localhost:1337](http://localhost:1337) automatically in your default browser.

## Build

This will put everything together, minifies & optimizes a bunch of stuff and output it in the `dist/` folder:

```bash
gulp build
```

## Continuous Deployment

All changes to the master branch will trigger an automatic build & deployment via [GitLab](https://www.git.berlin/). After successful build the contents of `/dist` are synced with `rsync` to [kretschmann.io server](https://kretschmann.io/).

If all goes well this is how the auto build & deploy looks like:

![](http://media.tumblr.com/d2cea9bff3b4dcb11d7bc3c9c3a11829/tumblr_inline_njhdq1yXtK1raprkq.gif)
