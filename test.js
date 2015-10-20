var test = require('tape');
var request = require('request');
var nock = require('nock');

var options = {allowUnmocked: true}
var scope = nock('http://google.com')
  .get('/maps')
  .reply(200, {
    ok: true,
  });

var scope2 = nock('http://google.com', options)
  .get('/maps')
  .reply(200, {
    ok: false,
  });

 test('ping fake google', function (t) {
   request('http://google.com/search', function (error, response, body) {
     t.equal(body, '{"ok":true}', 'body is true');
     t.end();
   });
 });

test('ping real google', function (t) {
  request('http://google.com/search', function (err, response, body) {
    t.equal(body, '{"ok":false}', 'body is false');
    t.end();
  });
})
//
// test('ping real google', function (t) {
//   request('http://google.com', function (err, response, body) {
//     console.log(arguments)
//     t.end();
//   });
// })
