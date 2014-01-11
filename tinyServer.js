/* The require method is part of node's module system.  It helps you
    split your programs up into multiple files for organization.
    Read this line as, "Somewhere there's a file, http.js, which contains
    the code for creating a running an http server" */
var http = require('http')
  , url = require('url');

/* A request is what a browser sends to a server.
    A response is what a server sends back to a browser */
function requestHandler (request, response) {

  // http responses have "headers" which tell the browser what kind of information to expect
  response.writeHead(200, {'Content-Type': 'text/plain'});

  var requestInfo = url.parse(request.url);
  if(requestInfo.path === '/')
  {
    rootHandler(request, response);
  }
  else if(requestInfo.path === '/time')
  {
    timeHandler(request, response);
  }
}

function rootHandler(request, response) {
  // responses also have a body which is what the browser actually renders to the window.
  // response.write appends bytes to an array that makes up the response body.
  // You can call this method as many times as you want before ending the response.
  response.write('Hello World\n');

  // tell the response we're ready to transmit it to the browser that made the request.
  response.end();
}

function timeHandler(request, response) {
  response.write((new Date()).toString());
  response.end();
}

/* Create an HTTP server which will wait for HTTP Requests from web browsers.
    When we get a request from a browser, call requestHandler with the request. */
var server = http.createServer(requestHandler);

/* Start the HTTP server and tell it to listen for requests at "http://127.0.0.1:1337/". */
server.listen(1337, '127.0.0.1');

/* console.log writes strings to the terminal.  Helpful for debugging and status messages. */
console.log('Server running at http://127.0.0.1:1337/');