//Loading of base layer from OSM
var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: 'ITI (<a href="https://mastergeonum.org/2021/02/24/venez-decouvrir-des-projets-geonum-eriques-des-etudiants-de-m2/" target = "_blank">Master Géonum</a> 2021) - Données <a href="https://geoservices.ign.fr/documentation/diffusion/telechargement-donnees-libres.html" target = "_blank">IGN (BD TOPO)</a> et <a href="https://www.insee.fr/fr/metadonnees/source/serie/s1161" target = "_blank">INSEE (BPE)</a> - Géocodage <a href="https://nominatim.org/" target = "_blank">API Nominatim</a> - Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>',
	});

var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: 'ITI (<a href="https://mastergeonum.org/2021/02/24/venez-decouvrir-des-projets-geonum-eriques-des-etudiants-de-m2/" target = "_blank">Master Géonum</a> 2021) - Données <a href="https://geoservices.ign.fr/documentation/diffusion/telechargement-donnees-libres.html" target = "_blank">IGN (BD TOPO)</a> et <a href="https://www.insee.fr/fr/metadonnees/source/serie/s1161" target = "_blank">INSEE (BPE)</a> - Géocodage <a href="https://nominatim.org/" target = "_blank">API Nominatim</a> - &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
});


var basemaps = {
	"Fonds de carte OpenStreetMap": osm_layer,
 	"Fonds de carte CartoDB Voyager" : CartoDB_Voyager,
}

//Loading of previous data
etape = JSON.parse(localStorage.getItem('etape'))
dep_coords = localStorage.dep.split(' ') // 'coord coord' => [coord, coord]
arr_coords = localStorage.arr.split(' ') // 'coord coord' => [coord, coord]
etape_coords = etape.geometry.coordinates

//Définition des fonctions à appliquer aux points
var pointToLayer = function (feature, latlng) {
				   	var myIcon = ""
					if (feature.properties.sport_code !== null) {
						myIcon = new L.icon ({
							iconUrl: '../img/picto_sport/' + feature.properties.sport_code + '.png',
							iconSize: [25, 25]
						})
					} else {myIcon = new L.Icon.Default ()
					}
					return L.marker(latlng, {icon: myIcon})
				   }

var onEachFeature = function (feature, layer) {
			var popup_content = ""
			if (feature.properties.sport) {
				popup_content +='<p><b>' + feature.properties.sport + '</b></p>'}
			if (feature.properties.milieu) {
				popup_content += '<p>' + feature.properties.milieu + '</p>'}
			if (feature.properties.saison_code == 'ETE'|| feature.properties.saison_code == 'Hiver') {
				popup_content += '<p>' + feature.properties.saison + '</p>'}
				else if (feature.properties.saison_code == 'TOUTES') {
					popup_content += '<p>' + feature.properties.saison + ' saisons </p>'}
			layer.bindPopup(popup_content)
				//console.log(popup_content)
		}

var routeFeature = function (feature, layer) {
	var popup_content = ""
	popup_content += '<p>Cette partie du trajet fait <b>' + Math.round(feature.properties.distance) + ' km</b></p>'
	layer.bindPopup(popup_content)
}

var routeStyle = function (feature, layer) {
	return {
		weight: 5,
		opacity: 0.8,
		color: 'green'
	}
}

//Custom icons for departure and arrival
arrivee_icon = new L.icon ({
	iconUrl: "../img/marker_arrivee.png",
	iconSize: [23, 30],
	iconAnchor: [12, 30]
})

depart_icon = new L.icon ({
	iconUrl: "../img/marker_depart.png",
	iconSize: [23, 30],
	iconAnchor: [12, 30]
})

//Définition des couches par sport, avec filtrage et application des fonctions pointToLayer et onEachFeature
var VTT = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "VTT");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var NAUT = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "NAUT");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var BOUL = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "BOUL");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var RANDO = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "RANDO");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var PARC = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "PARC");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var EQU = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "EQU");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var GLACE = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "GLACE");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var GOLF = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "GOLF");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var NATA = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "NATA");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var SKATE = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "SKATE");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var SKI = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "SKI");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var TERREXT = new L.geoJson(null, {
	filter: function(feature, layer) {
		return (feature.properties.sport_code === "TERREXT");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

var TOUT = new L.geoJson(null, {
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature
});

//Import données globales et ajout aux couches pour filtrage
$.getJSON("http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3Atout&maxFeatures=1000&outputFormat=application%2Fjson",
	function(data) {
		VTT.addData(data)
		NAUT.addData(data)
		SKI.addData(data)
		EQU.addData(data)
		TERREXT.addData(data)
		SKATE.addData(data)
		NATA.addData(data)
		GOLF.addData(data)
		GLACE.addData(data)
		PARC.addData(data)
		RANDO.addData(data)
		BOUL.addData(data)
		TOUT.addData(data)
});

//Couches par sport
var overlayMaps = {
	"Toutes les activités": TOUT,
	"Vélo Tout-Terrain<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/VTT.png'></span>": VTT,
	"Domaine skiable<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/SKI.png'></span>": SKI,
	"Boucle de randonnée<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/RANDO.png'></span>": RANDO,
	"Sports nautiques<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/NAUT.png'></span>": NAUT,
	"Natation<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/NATA.png'></span> 	": NATA,
	"Terrains extérieurs<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/TERREXT.png'></span>": TERREXT,
	"Skatepark<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/SKATE.png'></span>": SKATE,
	"Patinoire<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/GLACE.png'></span>": GLACE,
	"Équitation<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/EQU.png'></span>": EQU,
	"Parcours sportif<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/PARC.png'></span>": PARC,
	"Golf<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/GOLF.png'></span>": GOLF,
	"Boulodrome<span class='layers-control-img'><img class= 'layers-control-img' align='middle' src='../img/picto_sport/BOUL.png'></span>": BOUL
};

//Creation and settings of the map
var mymap = L.map('mapid', {
	layers: [TOUT], zoomSnap: 0.01, zoomControl: false})
.fitBounds([[dep_coords[1], dep_coords[0]], [arr_coords[1], arr_coords[0]]], {padding: [175, 175]});

//Ajout contrôle des couches
L.control.layers(basemaps, overlayMaps, {collapsed: false, hideSingleBase: true, position: 'bottomleft'}).addTo(mymap);

//Add the osm layer to the map
CartoDB_Voyager.addTo(mymap);



//Ajout d'un titre
var title = L.control({position: 'topcenter'});
title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'title'); // create a div with a class "title"
    div.innerHTML = '<h4>Voici l\'itinéraire calculé selon vos choix !</h4>';
    return div;
};
title.addTo(mymap);





//Passage du trajet au-dessus des marqueurs
mymap.getPane('overlayPane').style.zIndex = 630
var pathLayer = L.geoJSON(null)

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

var distance1 = 0
var distance2 = 0
var AB_leaflet, BC_leaflet

// function to get the shortest path from the give source and target nodes
// récupération de la propriété "distance" pour alimenter le volet d'informations
function getRoute(un, deux) {
	var url = `http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3Achemin&maxFeatures=50&outputFormat=application%2Fjson&viewparams=source:${un};target:${deux};`;
	if (un == source_id) {
		$.getJSON(url, function(data) {
			AB_leaflet = L.geoJSON(data, {onEachFeature: routeFeature, style: routeStyle})
			AB_leaflet.addTo(pathLayer);
			mymap.addLayer(pathLayer);
			distance1 = Math.round(data.features[0].properties.distance)
			info.update(distance1, distance2)
		})
	} else {
		$.getJSON(url, function(data) {
			BC_leaflet = L.geoJSON(data, {onEachFeature: routeFeature, style: routeStyle})
			BC_leaflet.addTo(pathLayer);
			mymap.addLayer(pathLayer);
			distance2 = Math.round(data.features[0].properties.distance)
			info.update(distance1, distance2)
	})
	}
}
//console.log('distance_out : ', distance)


//Getting vertexes for the three initial points
getVertex(etape_coords)
getVertex(dep_coords)
getVertex(arr_coords)

//Display of routes between the three initial points
getRoute(source_id, etape_id)
getRoute(etape_id, target_id)



//Fenêtre d'affichage des informations du trajet
var info = new L.control({position: 'topright'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (distance1, distance2) {
	distance = distance1 + distance2
    this._div.innerHTML = '<p>Votre trajet fait <b>' + distance + 'km</b>, dont <b>' + distance1 + 'km</b> de votre point de départ actuel <img class=\'dep_arr_img\' src=\'../img/marker_depart.png\'> à votre étape sportive et <b>' + distance2 + 'km</b> de votre étape sportive à votre destination actuelle <img class=\'dep_arr_img\' src=\'../img/marker_arrivee.png\'>.</p><p>À vélo, cela vous prendrait <b>' + (distance/10) + 'h</b> à raison de 10km/h de moyenne.</p><p>À pied, cela vous prendrait <b>' + (distance/2.5) + 'h</b> à raison de 2.5km/h de moyenne.</p><p><a href="#" download="Rando_AlpesMaritimes.gpx" id="exportGPX">Télécharger le tracé en fichier .GPX</a></p>';
};

info.addTo(mymap);


//Zoom
new L.Control.Zoom({ position: 'topleft' }).addTo(mymap);

//Logo
var logo = L.control({position: 'topleft'});
logo.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'logo'); // create a div with a class "logo"
    div.innerHTML = '<img id="logo" src="../img/logoITI.png"></a>';
    return div;
};
logo.addTo(mymap);

//Bouton retour
var retour = L.control({position: 'topleft'});
retour.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'retour'); // create a div with a class "retour"
    div.innerHTML = '<a href="../index.html"><img id="boutonRetour" src="../img/Picto_Recommencer.png" alt="Recommencer" title="Revenir au début"></a>';
    return div;
};
retour.addTo(mymap);



//Creation of markers for the stage, the departure and the arrival
//definition of ondragend functions, which update the routes with the new locations of markers
etape_marker = new L.circleMarker([etape.geometry.coordinates[1], etape.geometry.coordinates[0]], {radius : 13, color: 'green', fill: false, weight: 3}).addTo(mymap)

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



//Ajout d'une fenêtre d'explications de l'interactivité
var interaction = L.control({position: 'bottomright'});
interaction.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'interaction'); // create a div with a class "interaction"
    div.innerHTML = '<p>Vous pouvez modifier votre point de départ et d\'arrivée en restant cliqué dessus puis en les faisant glisser ailleurs, cela mettra à jour le trajet !</p><p>Cliquez sur les icônes présentes sur la carte pour avoir plus d\'informations sur celles-ci.</p>';
    return div;
};
interaction.addTo(mymap);


//EXPLIQUER
$("#exportGPX").on('click', function (event) {
	AB_geojson = AB_leaflet.toGeoJSON()
	BC_geojson = BC_leaflet.toGeoJSON()
	ABC_geojson = {
                  "type": "FeatureCollection",
                  "features": [
                    {
                      "type": "Feature",
                      "properties": {
                       "name": "Mon trajet en Alpes-Maritimes"
                      },
                      "geometry": {
                        "type": "MultiLineString",
                        "coordinates": AB_geojson.features[0].geometry.coordinates
                      }
                    },
                    {
                      "type": "Feature",
                      "properties": {
                       "name": "Mon trajet en Alpes-Maritimes"
                      },
                      "geometry": {
                        "type": "MultiLineString",
                        "coordinates": BC_geojson.features[0].geometry.coordinates
                      }
                    }]
                }
        ABC_GPX = togpx(ABC_geojson)

		data = 'data:text/xml;charset=utf-8,' + encodeURIComponent(ABC_GPX);

		$(this).attr({
			'href': data,
			'target': '_blank'
		});

	});
