const koa = require( 'koa' ),
  Jade = require( 'koa-jade' ),

  app = koa(),
  jade = new Jade( {
    viewPath: './views',
    debug: false,
    pretty: true
  } );


app.use( jade.middleware );

app.use( function* testMiddleware( next ) {
  this.render( 'index' );
  yield next;
} );

app.listen( 3000 );
