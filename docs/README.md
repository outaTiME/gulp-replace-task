# gulp-replace-task [![Build Status](https://secure.travis-ci.org/outaTiME/gulp-replace-task.png?branch=master&cb=_)](http://travis-ci.org/outaTiME/gulp-replace-task)

> Replace text patterns using [pattern-replace](https://github.com/outaTiME/pattern-replace).



## Install

From NPM:

```shell
npm install gulp-replace-task --save-dev
```

## Replace Task

Assuming installation via NPM, you can use `gulp-replace-task` in your gulpfile like this:

```javascript
var gulp = require('gulp');
var replace = require('gulp-replace-task');

gulp.task('default', function() {
  gulp.src('src/index.html')
    .pipe(replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

### Options

@@options

### Usage Examples

#### Basic

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

gulpfile:

```js
gulp.task('default', function() {
  gulp.src('src/manifest.appcache')
    .pipe(replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

#### Multiple matching

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

File `src/humans.txt`:

```
              __     _
   _    _/__  /./|,//_`
  /_//_// /_|///  //_, outaTiME v.@@version

/* TEAM */
  Web Developer / Graphic Designer: Ariel Oscar Falduto
  Site: http://www.outa.im
  Twitter: @outa7iME
  Contact: afalduto at gmail dot com
  From: Buenos Aires, Argentina

/* SITE */
  Last update: @@timestamp
  Standards: HTML5, CSS3, robotstxt.org, humanstxt.org
  Components: H5BP, Modernizr, jQuery, Twitter Bootstrap, LESS, Jade, Grunt
  Software: Sublime Text 2, Photoshop, LiveReload

```

gulpfile:

```js
var pkg = require('./package.json');
gulp.task('default', function() {
  gulp.src(['src/manifest.appcache', 'src/humans.txt'])
    .pipe(replace({
      patterns: [
        {
          match: 'version',
          replacement: pkg.version
        },
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

#### Cache busting

File `src/index.html`:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

gulpfile:

```js
gulp.task('default', function() {
  gulp.src('src/index.html')
    .pipe(replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

#### Include file

File `src/index.html`:

```html
<body>
  @@include
</body>
```

gulpfile:

```js
var fs = require('fs');
gulp.task('default', function() {
  gulp.src('src/index.html')
    .pipe(replace({
      patterns: [
        {
          match: 'include',
          replacement: fs.readFileSync('./includes/content.html', 'utf8')
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

#### Regular expression

File `src/username.txt`:

```
John Smith
```

gulpfile:

```js
gulp.task('default', function() {
  gulp.src('src/username.txt')
    .pipe(replace({
      patterns: [
        {
          match: /(\w+)\s(\w+)/,
          replacement: '$2, $1' // replaces "John Smith" to "Smith, John"
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});
```

#### Lookup for `foo` instead of `@@foo`

The `String` matching type or `expression` in `false` generates a simple variable lookup mechanism `@@string`, to skip this mode use one of the below rules ... make your choice:

gulpfile:

```js
gulp.task('default', function() {
  gulp.src('src/foo.txt')

    // option 1 (explicitly using an regexp)
    .pipe(replace({
      patterns: [
        {
          match: /foo/g,
          replacement: 'bar'
        }
      ]
    }))

    // option 2 (easy way)
    .pipe(replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      usePrefix: false
    }))

    // option 3 (old way)
    .pipe(replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      prefix: '' // remove prefix
    }))

    .pipe(gulp.dest('build'));
});
```

## Release History

 * 2014-03-20   v0.0.1   Initial version.

---

Task submitted by [Ariel Falduto](http://outa.im/)
