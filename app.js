const express = require( 'express' ),
  app = express(),
  ws = require( './lib/ws' );

app.use( express.static( 'public' ) );

app.set( 'view engine', 'jade' );

app.get( '/', function indexRoute( req, res ) {
  res.render( 'index', { title: 'Hey', message: 'Hello there!' } );
} );

const server = app.listen( 3000 );

ws.init( server );
