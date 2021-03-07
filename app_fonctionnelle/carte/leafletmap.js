//Loading of base layer from OSM
var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: 'ITI - Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>',
	});

//Loading of previous data
etape = JSON.parse(localStorage.getItem('etape'))
dep_coords = localStorage.dep.split(' ') // 'coord coord' => [coord, coord]
arr_coords = localStorage.arr.split(' ') // 'coord coord' => [coord, coord]
etape_coords = etape.geometry.coordinates

//Creation and settings of the map
var mymap = L.map('mapid').fitBounds([[dep_coords[1], dep_coords[0]], [arr_coords[1], arr_coords[0]]], {padding: [20, 20]});

 
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

//Custom icons for departure and arrival
arrivee_icon = new L.icon ({
	iconUrl: "../img/marker_arrivee.png",
	iconSize: [30, 30],
	iconAnchor: [16, 30]
})

depart_icon = new L.icon ({
	iconUrl: "../img/marker_depart.png",
	iconSize: [30, 30],
	iconAnchor: [16, 30]
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

/*var geocoder = L.Control.geocoder({
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
geocoder.addTo(mymap);*/






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
	} else if (typePoint == arr_coords) {
		target_id = features[0].properties.id;
		target_coords = features[0].geometry.coordinates
	} else {
		source_id = features[0].properties.id;
		source_coords = features[0].geometry.coordinates
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


getVertex(etape_coords)
getVertex(dep_coords)
getVertex(arr_coords)

//Creation markers for the stage, the departure and the arrival
etape_marker = new L.marker([etape.geometry.coordinates[1], etape.geometry.coordinates[0]]).addTo(mymap)

depart_marker = new L.marker([source_coords[1], source_coords[0]],
	{icon: depart_icon,
	 draggable: true}).on("dragend", function(e) {
	 						dep_coords = [e.target.getLatLng().lng, e.target.getLatLng().lat]
	 						console.log(e.target.getLatLng().lng)
	 						console.log(e.target.getLatLng().lat)
	 						console.log(dep_coords)
	 						getVertex(dep_coords)
	 						pathLayer.clearLayers()
	 						getRoute(source_id, etape_id)
	 						getRoute(etape_id, target_id)
						}).addTo(mymap)

arrivee_marker = new L.marker([target_coords[1], target_coords[0]],
	{icon: arrivee_icon,
	 draggable: true}).on("dragend", function(e) {
							arr_coords = [e.target.getLatLng().lng, e.target.getLatLng().lat]
	 						console.log(e.target.getLatLng().lng)
	 						console.log(e.target.getLatLng().lat)
	 						console.log(arr_coords)
	 						getVertex(arr_coords)
	 						pathLayer.clearLayers()
	 						getRoute(source_id, etape_id)
	 						getRoute(etape_id, target_id)
						}).addTo(mymap)


getRoute(source_id, etape_id)
getRoute(etape_id, target_id)