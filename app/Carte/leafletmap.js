//Loading of base layer from OSM
var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: 'ITI - Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>',
	});

//Creation and settings of the map
var mymap = L.map('mapid').setView([45.757523270000576, 4.831581115722656], 13);

//Add the osm layer to the map
osm_layer.addTo(mymap);

//Create empty layergroups which will host the markers
var depart_layer = L.layerGroup().addTo(mymap)
var arrivee_layer = L.layerGroup().addTo(mymap)

//Create empty vars for hosting GeoJSON objects of departure and arrival points
let depart_geoJSON
let arrivee_geoJSON

//Custom icon for the arrival point
arrivee_Icon = new L.icon ({
	iconUrl: "./img/flag-outline.svg",
	iconSize: [30, 30]
})


//Function of creation of a draggable marker which gives its dragend position to vars depart and arrivee
function generateMarker(layer, e) {
	let x = e.latlng.lng;
	let y = e.latlng.lat;
	if (layer == depart_layer) {
		depart_marker = new L.marker([y, x], {draggable : true})
						.on("dragend", function(e) {
							depart_geoJSON = e.target.toGeoJSON()
							console.log("depart :", depart_geoJSON)	
						})
						.addTo(layer)
		depart_geoJSON = depart_marker.toGeoJSON()
		console.log(depart_geoJSON)
	} else {
		arrivee_marker = new L.marker([y, x], {icon : arrivee_Icon, draggable : true})
						.on("dragend", function(e) {
							arrivee_geoJSON = e.target.toGeoJSON()
							console.log("arrivee :", arrivee_geoJSON)	
						})
						.addTo(layer)
		arrivee_geoJSON = arrivee_marker.toGeoJSON()
		console.log(arrivee_geoJSON)			
	}
}

//Function which listens ONLY to the first two clicks on the map, which create the departure and arrival markers
let count = 1
function onMapClick(e) {
	if (count == 1) {
		//depart_layer.clearLayers()
		generateMarker(depart_layer, e)		
	} if (count == 2) {
		//arrivee_layer.clearLayers()
		generateMarker(arrivee_layer, e)
	}
	count += 1
	/*console.log("depart :", depart)
	console.log("arrivee :", arrivee)*/
}
mymap.on('click', onMapClick);



//Geocoding with geocoder plugin: extraction of geocoding's result's center's coords.

var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
  collapsed: false,
})
  .on('markgeocode', function(e) {
    var center = e.geocode.center;
    let x = center.lng;
	let y = center.lat;
	console.log("Blabla")
	console.log(center)
	new L.marker([y, x]).addTo(mymap)   
  })
geocoder.addTo(mymap);