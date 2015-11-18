const Transform = require('stream').Transform,
  kinesis = require('kinesis');

kinesis.listStreams( { region: 'eu-west-1' }, function( err, streams ) {
  if ( err ) {
    throw err;
  }

  console.log( 'Streams found: ', streams );
} );


const kinesisSource = kinesis.stream( { name: 'identity-geo', region: 'eu-west-1', oldest: true } );

const stringify = new Transform( { objectMode: true } );
stringify._transform = function bufferTransform( record, encoding, cb ) {
  cb( null, record.Data.toString( encoding ) );
};

exports.stream = kinesisSource.pipe( stringify );
