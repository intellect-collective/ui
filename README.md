# UI Components #

[![Build Status](https://travis-ci.org/intellect-collective/ui.svg?branch=master)](https://travis-ci.org/intellect-collective/ui) [![Coverage Status](https://coveralls.io/repos/github/intellect-collective/ui/badge.svg?branch=master)](https://coveralls.io/github/intellect-collective/ui?branch=master)

Provides a uniform set of UI components. Used and maintained by the Intellect Collective for their projects, and made freely available to the public.


## Overview ##

This project is driven by the following requirements:

* Minimal size
* Simple theming, [without css-in-js]()
* Consistency
* Complete testing
* Server-side-rendering
* Support the dreaded IE8 (in most cases)


## Development ##

To quickly spin up a Docker container:

```
docker run -it --rm -v $PWD:/usr/src/app -w /usr/src/app -p '3000:3000' node:11-alpine sh
apk --no-cache add --virtual native-deps \
    g++ \
    make \
    python \
 && npm i --quiet \
 && apk del native-deps
```

We need to add `g++`, `make`, and `python` temporarily in order to build `node-gyp` and `node-sass`. They are otherwise unnecessary.