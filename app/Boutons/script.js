//Déclaration variables (les listes sont provisoires et ont vocation à être remplacées par les requêtes SQL)
//ainsi le nombre de boutons sera corrélé aux sélections spatiales successives
var dep = "7.14518 43.99156"
var arr = "7.342542 43.808902"

let user_saison
let user_milieu
let user_sport
let etape_random


//Fonction de construction de l'url pour les requêtes WFS GeoServer
function function_url(type) {
	url1 = 'http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3A'
	url2 = '&maxFeatures=50&outputFormat=application%2Fjson'
	params = '&viewparams=dep:' + dep + ';arr:' + arr + ';saison_code:' + user_saison + ';milieu_code:' + user_milieu + ';sport_code:' + user_sport
	console.log(url1 + type + url2 + params)
	return url1 + type + url2 + params
}

//Construction des boutons : une div bouton est créée pour chaque élément des features collections récupérées via GeoServer, et ajoutée au container HTML correspondant
//Évènement onclick sur chaque div renvoyant vers la fonction clickbutton
//les deux arguments étant la var "xxx_code" de la donnée requêtée, et l'argument de la fonction get_fun (saison, milieu ou sport)
function get_fun(type){
	function getJson(data) {
		if (type == 'etape') {
			console.log(data)
			var random = Math.floor(Math.random() * (data.features.length));
			console.log(random)
			etape_random = data.features[random]
			console.log(etape_random)
		} else {
			var html = ""
			for (var i = 0; i < data.features.length; i++) {
				html += '<div role="button" onclick="clickbutton(\'' + data.features[i].properties[type + '_code'] + '\',\'' + type + '\')">' + data.features[i].properties[type] + '</div>';
			}
			var container = document.getElementById("container_" + type);
			container.innerHTML = html;
		}
    }
    $.ajax({
        type: 'GET', 
        url: function_url(type),
        dataType: 'JSON',
        success: getJson
    });
}

//Fonction de remplissage des variables correspondant aux choix utilisateurs avec le contenu HTML du bouton cliqué
function clickbutton(arg, type) {
	if(type == 'saison'){
		user_saison = []
		user_saison = [arg]
		console.log("saison : ", user_saison)
		get_fun('milieu')
	} else if (type == 'milieu') {
		user_milieu = []
		user_milieu = [arg]
		console.log("milieu : ", user_milieu)
		get_fun('sport')
	} else {
		user_sport = []
		user_sport = [arg]
		console.log("sport : ", user_sport)
		get_fun('etape')
	}
}


//Affichage des boutons saison
get_fun('saison')