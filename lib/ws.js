const WebSocketServer = require( 'ws' ).Server;

var wss;

exports.init = function init( server ) {
  wss = new WebSocketServer( { server: server } );

  wss.on( 'connection', connectionHandler );

  setInterval( () => {
    const msg = JSON.stringify( {
      'time': Date.now()
    } );


    broadcast( msg );
  }, 3000 );
};


// handle an incomming connection
function connectionHandler( ws ) {
  ws.on( 'message', function incoming( message ) {
    console.log( 'received: %s', message );
  } );

  ws.send( 'something' );
}


function broadcast( data ) {
  wss.clients.forEach( client => {
    client.send( data );
  } );
}
