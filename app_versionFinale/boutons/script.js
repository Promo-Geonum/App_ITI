//Déclaration variables (les listes sont provisoires et ont vocation à être remplacées par les requêtes SQL)
//ainsi le nombre de boutons sera corrélé aux sélections spatiales successives
//localStorage.dep = "7.14518 43.99156"
//localStorage.arr = "7.342542 43.808902"

//Fonction de construction de l'url pour les requêtes WFS GeoServer
function function_url(type) {
	url1 = 'http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3A'
	url2 = '&maxFeatures=50&outputFormat=application%2Fjson'
	params = '&viewparams=dep:' + localStorage.dep + ';arr:' + localStorage.arr + ';saison_code:' + localStorage.saison + ';milieu_code:' + localStorage.milieu + ';sport_code:' + localStorage.sport
	console.log(url1 + type + url2 + params)
	return url1 + type + url2 + params
}

//Construction des boutons : une div bouton est créée pour chaque élément des features collections récupérées via GeoServer, et ajoutée au container HTML correspondant
//Évènement onclick sur chaque div renvoyant vers la fonction clickbutton
//les deux arguments étant la var "xxx_code" de la donnée requêtée, et l'argument de la fonction get_fun (saison, milieu ou sport)
function get_fun(type){
	function getJson(data) {
		if (type == 'etape') {
			//console.log(data)
			var random = Math.floor(Math.random() * (data.features.length));
			localStorage.setItem('etape', JSON.stringify(data.features[random]))
			//var etape_random = localStorage.getItem('etape')
			//console.log('etape: ', JSON.parse(etape_random))
			location.replace("../carte/index.html")
		} else {
			var html = ""
			for (let i = 0; i < data.features.length; i++) {
				html += '<button class="boutonSelection" onclick="clickbutton(\'' + data.features[i].properties[type + '_code'] + '\',\'' + type + '\')">' + data.features[i].properties[type] + '</button>';
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
		localStorage.saison = arg
		console.log("saison : ", localStorage.saison)
	} else if (type == 'milieu') {
		localStorage.milieu = arg
		console.log("milieu : ", localStorage.milieu)
	} else {
		localStorage.sport = arg
		console.log("sport : ", localStorage.sport)
	}
}


//Affichage des boutons saison
function chargement() {
	meta = document.getElementById('id_page')
	if (meta.getAttribute('content') == 'adresses') {
		//console.log(localStorage.dep)
		//console.log(localStorage.arr)
		localStorage.dep = localStorage.arr = localStorage.saison = localStorage.milieu = localStorage.sport = ""
	} else if (meta.getAttribute('content') == 'saison') {
		localStorage.saison = localStorage.milieu = localStorage.sport = ""
		get_fun('saison')
	} else if (meta.getAttribute('content') == 'milieu') {
		localStorage.milieu = localStorage.sport = ""
		get_fun('milieu')
	} else if (meta.getAttribute('content') == 'sport') {
		localStorage.sport = ""
		get_fun('sport')
	}
}

function verifierChoix(arg) {
	if (arg == 'adresses') {
		if (localStorage.dep == '' || localStorage.arr == '') {
			alert('Veuillez choisir un point de départ et une destination')
		} else {
			location.replace('saison.html')
		}
	} else if (arg == 'saison') {
		if (localStorage.saison == '') {
			alert('Veuillez choisir une saison')
		} else {
			location.replace('milieu.html')
		}
	} else if (arg == 'milieu') {
		if (localStorage.milieu == '') {
			alert('Veuillez choisir un milieu de pratique')
		} else {
			location.replace('sport.html')
		}
	} else if (arg == 'sport') {
		if (localStorage.sport == '') {
			alert('Veuillez choisir une activité sportive')
		} else {
			get_fun('etape')
		}
	}

}

chargement()
