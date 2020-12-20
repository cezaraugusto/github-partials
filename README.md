[action-image]: https://github.com/cezaraugusto/github-partials/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/github-partials/actions
[npm-image]: https://img.shields.io/npm/v/github-partials.svg
[npm-url]: https://npmjs.org/package/github-partials

# github-partials [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> Download any subdirectory of a GitHub repository

## Installation

```
npm install github-partials
```

## Usage

```js
const githubPartials = require('github-partials')

// cwd is ~/mydevspace/

githubPartials('https://github.com/some-org-or-user/some-project/some/other/project/folder')
// copied remote content to ~/mydevspace/folder

githubPartials('https://github.com/some-org-or-user/some-project/README.md')
// copied remote content to ~/mydevspace/README.md
```

## Also works as a CLI tool

```sh
# cwd is ~/mydevspace/

npx github-partials https://github.some-org-or-user/some-project/some/other/project/folder
# copied remote content to ~/mydevspace/some-project

npx github-partials https://github.some-org-or-user/some-project/README.md
# copied remote content to ~/mydevspace/README.md
```

## API

### githubPartials(url, outputDir?)

#### url

Type: `string`

The URL to the path you want to download. If a folder, will download its content as well.

#### outputDir

Type: `string`

Custom path to the outputDir (defaults to the working directorya)
## License

MIT (c) Cezar Augusto.
