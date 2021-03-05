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
let depart_marker
let arrivee_marker

//Custom icon for the arrival point
arrivee_Icon = new L.icon ({
	iconUrl: "./img/flag-outline.svg",
	iconSize: [30, 30]
})

var selectedPoint = null;



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
		depart_geoJSON = depart_geoJSON.geometry.coordinates[0] + " " + depart_geoJSON.geometry.coordinates[1]
		console.log(depart_geoJSON)

	} else {
		arrivee_marker = new L.marker([y, x], {icon : arrivee_Icon, draggable : true})
						.on("dragend", function(e) {
							arrivee_geoJSON = e.target.toGeoJSON()
							console.log("arrivee :", arrivee_geoJSON)
						})
						.addTo(layer)
		arrivee_geoJSON = arrivee_marker.toGeoJSON()
		arrivee_geoJSON = arrivee_geoJSON.geometry.coordinates[0] + " " + arrivee_geoJSON.geometry.coordinates[1]
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



//GESTION DONNEES PRECEDENTES
console.log('Saison :', localStorage.saison)
console.log('Milieu :', localStorage.milieu)
console.log('Sport :', localStorage.sport)

etape = JSON.parse(localStorage.getItem('etape'))
console.log('Etape :', etape)

new L.marker([etape.geometry.coordinates[1], etape.geometry.coordinates[0]]).addTo(mymap)
etape_coords = etape.geometry.coordinates


// empty geojson layer for the shortes path result
var pathLayer = L.geoJSON(null);

// draggable marker for starting point. Note the marker is initialized with an initial starting position
/*var sourceMarker = L.marker([43.716484655457045 , 7.257113456726074], {
	draggable: true
})
	.on("dragend", function(e) {
		selectedPoint = e.target.getLatLng();
		getVertex(selectedPoint);
		getRoute();
	})
	.addTo(mymap);

// draggbale marker for destination point.Note the marker is initialized with an initial destination positon
var targetMarker = L.marker([43.71330136382882, 7.26245641708374], {
	draggable: true
})
	.on("dragend", function(e) {
		selectedPoint = e.target.getLatLng();
		getVertex(selectedPoint);
		getRoute();
	})
	.addTo(mymap);*/


// function to get nearest vertex to the passed point
function getVertex(selectedPoint) {
	var url = `http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3Anoeud&maxFeatures=50&outputFormat=application%2Fjson&viewparams=x:${
		selectedPoint[0]
	};y:${selectedPoint[1]};`;
	$.ajax({
		url: url,
		async: false,
		success: function(data) {
			loadVertex(data, selectedPoint);
		}
	});
}


// function to update the source and target nodes as returned from geoserver for later querying
function loadVertex(response, typePoint) {
	var features = response.features;
	mymap.removeLayer(pathLayer);
	if (typePoint == etape_coords) {
		etape_id = features[0].properties.id;
	} else if (typePoint == arr) {
		target = features[0].properties.id;
	} else {
		source = features[0].properties.id;
	}
}

// function to get the shortest path from the give source and target nodes
function getRoute(un, deux) {
	var url = `http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3Achemin&maxFeatures=50&outputFormat=application%2Fjson&viewparams=source:${un};target:${deux};`;

	$.getJSON(url, function(data) {
		//mymap.removeLayer(pathLayer);
		L.geoJSON(data).addTo(pathLayer);
		mymap.addLayer(pathLayer);
	});
}

dep = localStorage.dep.split(' ') // 'coord coord' => [coord, coord]
arr = localStorage.arr.split(' ') // 'coord coord' => [coord, coord]

getVertex(etape_coords)
getVertex(dep)
getVertex(arr)
getRoute(source, etape_id)
getRoute(etape_id, target)