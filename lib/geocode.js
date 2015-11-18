const geocoder = require( 'node-geocoder' )( 'openstreetmap' );

exports.decode = function decode( input ) {
  return geocoder.geocode( input )
    .then( res => {
      if ( Array.isArray( res ) ) {
        const item = res[ 0 ];

        if ( item && item.latitude && item.longitude ) {
          return [ item.latitude, item.longitude ];
        }
      }

      console.warn( `unknown response from osm api for "${input}"`, res );
    } );
};
