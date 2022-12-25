var net = require('net');
var os = require("os"); 
var server = net.createServer();    
server.on('connection', handleConnection);
server.listen(9123,"0.0.0.0", function() {    
  console.log('server listening to %j', server.address());  
});
function handleConnection(conn) {    
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
  console.log('new client connection from %s', remoteAddress);
  conn.setEncoding('utf8');
  conn.on('data', onConnData);  
  conn.once('close', onConnClose);  
  conn.on('error', onConnError);

  var hostname = os.hostname();
  conn.write(hostname+'\n'); // sending back hostname

  function onConnData(d) {  
    console.log('connection data from %s: %j', remoteAddress, d);  
    conn.write(hostname+'\n'); // sending back hostname
  }
  function onConnClose() {  
    console.log('connection from %s closed', remoteAddress);  
  }
  function onConnError(err) {  
    console.log('Connection %s error: %s', remoteAddress, err.message);  
  }  
}