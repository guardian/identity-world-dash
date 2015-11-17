const WebSocketServer = require( 'ws' ).Server;

exports.init = function init( server ) {
  const wss = new WebSocketServer( { server: server } );

  wss.on( 'connection', connectionHandler );
};


// handle an incomming connection
function connectionHandler( ws ) {
  ws.on( 'message', function incoming( message ) {
    console.log( 'received: %s', message );
  } );

  ws.send( 'something' );
}
