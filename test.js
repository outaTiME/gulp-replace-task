var test = require('ava');
var Vinyl = require('vinyl');
var plugin = require('.');

test.cb('main', function (t) {
  var stream = plugin({
    variables: {
      key: 'value'
    }
  });

  stream.on('data', function (file) {
    t.is(file.contents.toString(), 'value');
    t.end();
  });

  stream.write(new Vinyl({
    contents: Buffer.from('@@key')
  }));

  stream.end();
});
