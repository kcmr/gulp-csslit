# gulp-csslit [![Build Status](https://travis-ci.org/kcmr/gulp-csslit.svg?branch=master)](https://travis-ci.org/kcmr/gulp-csslit.svg?branch=master) [![Version](https://img.shields.io/npm/v/gulp-csslit.svg)](https://npmjs.org/package/gulp-csslit)

[![NPM](https://nodei.co/npm/gulp-csslit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-csslit/)

> Writes CSS contents into a JavaScript file ready to be imported by a [LitElement](https://lit-element.polymer-project.org/) component.

## Install

```
$ npm i -D gulp-csslit
```

## Usage

_Note_: use [**gulp-rename**](https://www.npmjs.com/package/gulp-rename) or a similar plugin to change the file name or extension.

```js
const gulp = require('gulp');
const csslit = require('gulp-csslit');
const rename = require('gulp-rename');

gulp.task('styles', () => {
  return gulp.src('styles.css')
    .pipe(csslit())
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('dist'));
});
```

## Output

The generated file exports a `styles` property.

```js
import {css} from 'lit-element';
export const styles = css`
  /* your styles */
`;
```

## Import and use it

```js
import {html, css, LitElement} from 'lit-element';
import {styles} from './styles.js';

class MyComponent extends LitElement {
  static get styles() {
    return css`${styles}`;
  }
}
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
