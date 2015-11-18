const WebSocketServer = require( 'ws' ).Server,
  geocode = require( './geocode' ),

  testCities = [ 'London', 'Bristol', 'Cardiff', 'Manchester', 'Birmingham' ],

  stream = require( './kinesis' ).stream;


var wss;

exports.init = function init( server ) {
  wss = new WebSocketServer( { server: server } );

  wss.on( 'connection', connectionHandler );

  sendTestData();
};

function sendTestData() {
  const testData = [];

  testCities.forEach( c => {
    decorateLocationFromSearch( c + ' uk' )
      .then( d => testData.push( d ) );
  } );

  setInterval( () => {
    const msg = testData[ Math.floor( ( Math.random() * testData.length ) ) ];

    msg.testData = true;

    broadcast( msg );
  }, 5000 );
}


// handle an incomming connection
function connectionHandler( ws ) {
  ws.on( 'message', function incoming( message ) {
    console.log( 'received: %s', message );
  } );

  ws.send( 'something' );
}


function broadcast( data ) {
  const payload = typeof data !== 'string' ? JSON.stringify( data ) : data;
  console.log( 'Broadcasting: ', payload );
  wss.clients.forEach( client => {
    client.send( payload );
  } );
}


/** @return {Promise} */
function decorateLocationFromSearch( query ) {
  return geocode.decode( query ).then( r => {
    return {
      city: {
        name: r.city,
        country: r.country,
        query: query,
        coords: [ r.latitude, r.longitude ]
      }
    };
  } );
}


stream.on( 'readable', () => {
  const data = stream.read();

  try {
    const parsed = JSON.parse( data );

    const loc = parsed.location;
    const search = loc && loc.countryCode && loc.cityCode && ( `${loc.cityCode} ${loc.countryCode}` );

    if ( search ) {
      decorateLocationFromSearch( search )
        .then( broadcast );

    } else {
      console.error( 'Bad search: ' + search, parsed.location );
    }

  } catch ( err ) {
    console.error( `Kinesis stream: failed to parse input: "${data}"`, err );
  }
} );
