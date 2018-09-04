# plumage landing page

> Landing page for plumage. Splendid.

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Prerequisites for Development

- [node.js](http://nodejs.org/)
- [npm](https://npmjs.org/)

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

Open [localhost:1337](http://localhost:1337) in your browser.

## Build

This will put everything together, minifies & optimizes a bunch of stuff and output it in the `dist/` folder:

```bash
gulp build
```

## Deployment

Deployment happens through a simple rsync sync:

```bash
./deploy.sh
```

Requires the following environment variables to be set before executing:

```bash
DEPLOY_OWNER
DEPLOY_OWNERGROUP
DEPLOY_SRC
DEPLOY_USER
DEPLOY_SERVER
DEPLOY_PATH
```
