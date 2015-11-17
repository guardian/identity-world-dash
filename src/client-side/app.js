/*global WebSocket */

var ws = new WebSocket( 'ws://' + window.location.host );
ws.onmessage = function( event ) {
  console.log( 'message received: ', event );
};


function sendMessage( data ) {
  var d = ( typeof data === 'string' ) ? data : JSON.stringify( data );

  ws.send( d );
}
