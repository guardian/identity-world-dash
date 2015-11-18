const WebSocketServer = require( 'ws' ).Server,
  geocode = require( './geocode' );


const testCities = [
  {
    name: 'London'
  },
  {
    name: 'Bristol'
  },
  {
    name: 'Cardiff'
  },
  {
    name: 'Manchester'
  },
  {
    name: 'Birmingham'
  }
].map( city => {
  geocode.decode( city.name + ' UK' ).then( r => {
    city.coords = r;
  } );
  return city;
} );


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
