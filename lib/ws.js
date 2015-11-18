const WebSocketServer = require( 'ws' ).Server;

const testCities = [
  {
    name: 'London',
    coords: [ 51.507351, -0.127758 ]
  },
  {
    name: 'Bristol',
    coords: [ 51.454513, -2.587910 ]
  },
  {
    name: 'Cardiff',
    coords: [ 51.481581, -3.179090 ]
  },
  {
    name: 'Manchester',
    coords: [ 53.480759, -2.242631 ]
  }
];

var wss;

exports.init = function init( server ) {
  wss = new WebSocketServer( { server: server } );

  wss.on( 'connection', connectionHandler );

  setInterval( () => {
    const msg = JSON.stringify( {
      'time': Date.now(),
      'city': testCities[ Math.floor( ( Math.random() * testCities.length ) ) ]
    } );

    broadcast( msg );
  }, 5000 );
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
