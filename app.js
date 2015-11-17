const express = require( 'express' ),
  app = express(),
  browserify = require( 'browserify-express' ),

  ws = require( './lib/ws' ),

  bundle = browserify( {
    entry: __dirname + '/src/client-side/app.js',
    mount: '/js/app.js',
    bundle_opts: { debug: true }
  } );

app.use( bundle );

app.use( express.static( 'public' ) );

app.set( 'view engine', 'jade' );

app.get( '/', function indexRoute( req, res ) {
  res.render( 'index', { title: 'Hey', message: 'Hello there!' } );
} );

const server = app.listen( 3000 );

ws.init( server );
