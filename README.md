# go-martini-grunt-skeleton

> A skeleton Martini-based Golang web project using [Grunt](https://gruntjs.com/) for asset management.

## Motivation

Here at Carousell we use Go and Flask to power several of our internal and
public facing web projects.  While larger web frameworks often have third party
libraries such as `django-pipeline` for Django projects to handle asset
management, it can be harder to find such well tested libraries for Go.
Furthermore, each of these libraries have their own configuration style which
makes it harder for new team members learn.

To overcome this, we have integrated [Grunt](https://gruntjs.com/), a
Javascript based task runner which can perform asset management tasks for us
regardless of the web framework we use.

`grunt-usemin` updates references to unminified static assets in templates to
actual revisioned assets suitable for deployment to CDNs.

For example,

    # templates/index.tmpl

    <!-- build:css /css/all.min.css -->
    <link rel="stylesheet" href="/css/base.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <!-- endbuild -->


will become

    # dist/templates/index.tmpl

    <link rel="stylesheet" href="/css/all.min.a12j2.css"/>


Grunt tasks such as `cssmin` and `uglify` are used to compress and concatenate
static assets. In addition, filenames will be revisioned to avoid issues
with CDN caching.

This Grunt based tool can be used on any web projects which uses HTML text
templates with minimal changes, which makes it great for our developers as one
task runner is usable with all our projects.

Feedbacks are welcome!

## What's included and what's not

#### Included:

- Asset compression and automatic updates of compressed assets filenames in templates
- Grunt tasks for development and build (`grunt` for dev and `grunt build` for compressed assets and updated templates)

#### Not included:

- Asset deployment


## Installation

You will need `Go >= 1.2` and `npm` installed. Once done, you can clone this
skeleton project:

```
git clone https://github.com/carousell/go-martini-grunt-skeleton.git
```

To install the required dependencies for Go, ensure that your `GOPATH`
environment variable is set first.

```
cd proj
go get .
```

For grunt dependencies:

```
npm install -g grunt-cli # if grunt-cli is not installed
npm install
```

## Usage

### Development

For day to day development, simply run `grunt` to start the default go web server
using Martini as well as a Grunt watcher which monitors LESS files for changes
and compiles them to CSS files.

### Production

Run `grunt build` to concat+minify static assets. Templates updated by `usemin`
will be placed together with the assets in the `dist/` directory for you to deploy
using your own deployment tools.

## License

MIT License, see LICENSE.md.

Copyright Carousell Pte Ltd
