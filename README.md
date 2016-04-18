# plumage landing page

> Landing page for plumage. Splendid.

[ ![GitLab CI Status for plumage/site](https://gitlab.kremalicious.com/plumage/site/badges/master/build.svg)](https://gitlab.kremalicious.com/plumage/site/builds)

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Ground Rules

1. Don't push directly into master
2. Master must always be stable and able to be deployed at any time
3. Always work in feature branches or your own fork
4. Always make a pull request against master to be reviewed by a peer

Added bonus: you'll see if the build went through successfully via Codeship under each pull request.

### Rebase

The rebase command will replay your changes on top of upstream/master but inside your branch. Always do that before creating a pull request:

```
git pull --rebase upstream master
```

or (if your local master is already synchronised with upstream):

```
git rebase master
```

and use the force to rewrite history for pushing back to your remote or feature branch:

```
git push origin my-branch-whatever -f
```

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
grunt server
```

The site will open [localhost:1337](http://localhost:1337) automatically in your default browser.

Note: The easiest way to get livereload to work is to install the [browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

## Build

This will put everything together, minifies & optimizes a bunch of stuff and output it in the `dist/` folder:

```bash
gulp build
```

## Continuous Deployment

All changes to the master branch will trigger an automatic build & deployment via [GitLab](https://git.kremalicious.com/). After successful build the contents of `/dist` are synced with `rsync` to [kretschmann.io server](https://kretschmann.io/) with this manual deploy script setup in GitLab:

```
rsync --recursive --delete --exclude 'magazine' --checksum --verbose -e "ssh" ~/clone/dist/ kremalicious.com@kremalicious.com:/nfs/c08/h04/mnt/126308/domains/plumage.io/html/
```

If all goes well this is how the auto build & deploy looks like:

![](http://media.tumblr.com/d2cea9bff3b4dcb11d7bc3c9c3a11829/tumblr_inline_njhdq1yXtK1raprkq.gif)

## Browser support

Generally, templates are supported in the current and last 2 versions of all modern browsers. Specifically, they're supposed to work (but not look identical) and tested in the following browsers:

- *Desktop*: IE 9+, Chrome 27+, Firefox 24+, Safari 5+, Opera 12+
- *Mobile*: Mobile Safari 6+, Chrome for Android/iOS 26+, Android Browser 4.1+
