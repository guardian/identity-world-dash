const Transform = require('stream').Transform,
  kinesis = require('kinesis');

kinesis.listStreams( { region: 'us-east-1' }, function( err, streams ) {
  if ( err ) {
    throw err;
  }

  console.log( 'Streams found: ', streams );
} );


const kinesisSource = kinesis.stream( { name: 'identity-geo', oldest: true } );

const stringify = new Transform( { objectMode: true } );
stringify._transform = function bufferTransform( record, encoding, cb ) {
  cb( null, record.Data.toString( encoding ) );
};

exports.stream = kinesisSource.pipe( stringify );
