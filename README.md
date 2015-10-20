Nock lets you mock responses.

When you setup an interceptor for an URL and that interceptor is used, it is removed from the interceptor list. This means that you can intercept 2 or more calls to the same URL and return different things on each of them. It also means that you must setup one interceptor for each request you are going to have, otherwise nock will throw an error because that URL was not present in the interceptor list.


```js
var scope = nock('http://google.com')
  .get('/maps').reply(200, { ok: true });

  request('http://google.com/maps'...) // -> {ok: true}
```

You can also disable nock, to allow real requests with `{allowUnmocked: true}`. Your request path must be different to the path defined in your scope.

```js
var scope = nock('http://google.com', {allowUnmocked: true})
  .get('/maps').reply(200, { ok: true });

request('http://google.com/search'...) // -> real html body from Google
```

Again, if your request url and the path in your scope match, you will still receive a mocked response

```js
var scope = nock('http://google.com', {allowUnmocked: true})
  .get('/maps').reply(200, { ok: true });

  request('http://google.com/maps'...) // -> {ok: true}


```

We can allow a nice mix of mocked and real responses. The thing to remember here, is that regardless of whether or not you are making a mocked request or a real one, you need to define a scope for each request. Also, it looks as though {allowUnmocked: true} applies to the host URL and this will be carried across every instance of the host URL so in the below example {allowUnmocked: true} applies to both scope and scope2

```js
var options = {allowUnmocked: true}

var scope = nock('http://google.com', options)
  .get('/maps').reply(200, { ok: true });

var scope2 = nock('http://google.com')
  .get('/maps').reply(200, {ok: false });

request('http://google.com/search'...) // -> real html body from Google

request('http://google.com/search'...) // -> real html body from Google

```
