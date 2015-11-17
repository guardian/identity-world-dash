const koa = require( 'koa' ),
  Router = require( 'koa-router' ),
  Jade = require( 'koa-jade' ),

  ws = require( './lib/ws' ),

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

const server = app.listen( 3000 );

ws.init( server );
