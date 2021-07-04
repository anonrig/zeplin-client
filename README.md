**Due to the lack of support and Zeplin's internal policies, we stopped working on Zeplin iOS application. More information can be found through https://twitter.com/yagiznizipli/status/1238143337661640706**


So, apparently instead of replying to our emails Zeplin decided with promoting non-open sourced version of zeplin client (https://blog.zeplin.io/making-zeplin-mobile-with-zeplin-api-2db73dc2a0dd…) What a good time to be an open source contributor!

-----

# Zeplin OAuth NodeJs API Client

[![greenkeeper: enabled](https://badges.greenkeeper.io/relevantfruit/zeplin-client.svg)](https://greenkeeper.io/)
[![build: status](https://travis-ci.org/relevantfruit/zeplin-client.svg?branch=master)](https://travis-ci.org/relevantfruit/zeplin-client)
[![codecov: percent](https://codecov.io/gh/relevantfruit/zeplin-client/branch/master/graph/badge.svg)](https://codecov.io/gh/relevantfruit/zeplin-client)
[![commitizen: friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://semantic-release.gitbook.io/semantic-release/)
[![linter: eslint](https://img.shields.io/badge/linter-eslint-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)
[![docs: gh-pages](https://img.shields.io/badge/docs-gh--pages-blue.svg)](https://relevantfruit.github.io/zeplin-client/)
[![npm (scoped)](https://img.shields.io/npm/v/zeplin-client?label=npm%20package)](https://www.npmjs.com/package/zeplin-client)

## Prerequisites

You will require the following to make use of this boilerplate.

1. [Github](https://github.com/) account.
1. [Node.js](https://nodejs.org/en/) installed on your local machine and optionally yarn.
1. [Git](https://git-scm.com/) installed on your local machine.
1. An IDE with javascript/typescript support.

## Recommended IDE

You should be using [Visual Studio Code](https://code.visualstudio.com/) because its simple, fast, extensible and beloved by many developers.

Make sure to install all the [recommended extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_recommended-extensions) that come with the repository for the best possible coding experience.

## Quick Start

Install package using `npm i --save zeplin-client`

```typescript
import Client, { Types } from 'zeplin-client'

const client = new Client('app-id', 'app-secret', 'https://api.relevantfruit.com')

const pagination: Types.Pagination = { limit: 100, offset: 0 }
client
  .getScreens('my-access-token', pagination)
  .then(console.log)
  .catch(console.error)
```
