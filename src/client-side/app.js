/*global WebSocket, ko */

var ws = new WebSocket( 'ws://' + window.location.host ),

  messages = ko.observableArray( [] );


ws.onmessage = function( event ) {
  console.log( 'message received: ', event );

  outputMessageInBody( event.data );
};


function sendMessage( data ) {
  var d = ( typeof data === 'string' ) ? data : JSON.stringify( data );

  ws.send( d );
}

function outputMessageInBody( data ) {
  messages.push( data );
}

ko.applyBindings( {
  messages: messages
} );
