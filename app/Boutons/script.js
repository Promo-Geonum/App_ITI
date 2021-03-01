//Déclaration variables (les listes sont provisoires et ont vocation à être remplacées par les requêtes SQL
//ainsi le nombre de boutons sera corrélé aux sélections spatiales successives

url1 = 'http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3A'
url2 = '&maxFeatures=50&outputFormat=application%2Fjson'
params = '&viewparams=saison_code:'

let user_saison
let user_milieu
let user_sport

//Fonction de construction de l'url pour les requêtes WFS GeoServer
function url_fun(type) {
	if (type == 'saison') {
		url = url1 + type + url2
		return url
	} else if (type == 'milieu') {
		url = url1 + type + url2 + params + user_saison
		return url
	} else if (type == 'sport') {
		url = url1 + type + url2 + params + user_saison + ';milieu_code:' + user_milieu
		return url
	}
}


//Construction des boutons : une div bouton est créée pour chaque élément des features collections récupérées via GeoServer, et ajoutée au container HTML correspondant
//Évènement onclick sur chaque div renvoyant vers la fonction clickbutton
//les deux arguments étant la var "xxx_code" de la donnée requêtée, et l'argument de la fonction get_fun (saison, milieu ou sport)
function get_fun(type){
	function getJson(data) {
		var html = ""
		for (var i = 0; i < data.features.length; i++) {
			html += '<div role="button" onclick="clickbutton(\'' + data.features[i].properties[type + '_code'] + '\',\'' + type + '\')">' + data.features[i].properties[type] + '</div>';
		}
		var container = document.getElementById("container_" + type);    
		container.innerHTML = html;
        //console.log(saison);
    }
    $.ajax({
        type: 'GET', 
        url: url_fun(type),
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
	}
}


//Affichage des boutons saison
get_fun('saison')