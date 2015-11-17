const koa = require( 'koa' ),
  Router = require( 'koa-router' ),
  Jade = require( 'koa-jade' ),

  app = koa(),
  router = Router(),
  jade = new Jade( {
    viewPath: './views',
    debug: false,
    pretty: true
  } );

router.use( jade.middleware );

router.get( '/', function* indexRoute( next ) {
  this.render( 'index' );
  yield next;
} );


app
  .use( router.routes() )
  .use( router.allowedMethods() );

app.listen( 3000 );
