/*global window, WebSocket, ko, L */

var
  ws = new WebSocket( 'ws://' + window.location.host ),

  messages = ko.observableArray( [] );

ws.onmessage = function( event ) {
  console.log( 'message received: ', event );

  outputMessageInBody( event.data );

  try {
    renderPing( JSON.parse( event.data ) );
  } catch (err) {
    // ignore
  }
};


function sendMessage( data ) {
  var d = ( typeof data === 'string' ) ? data : JSON.stringify( data );

  ws.send( d );
}

// ************* render with knockout **************** //

function outputMessageInBody( data ) {
  messages.push( data );
}

ko.applyBindings( {
  messages: messages
} );



// ************* render map with leaflet **************** //

// map.invalidateSize() to resize the thing

var london = [ 51.507351, -0.127758 ];
var center = london;

var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
var osm = L.tileLayer( osmUrl, { maxZoom: 18, attribution: osmAttrib } );

var map = new L.Map( 'map', {
  layers: [ osm ],
  center: center,
  zoom: 6 }
);

var group = L.layerGroup();

group.addTo( map );

function createMarker( coords ) {
  return L.circleMarker( coords, 15000, { className: 'ping' } );
}

function renderPing( data ) {
  var marker;
  if ( data && data.city && Array.isArray( data.city.coords ) ) {
    marker = createMarker( data.city.coords );

    group.addLayer( marker );
  }
}
