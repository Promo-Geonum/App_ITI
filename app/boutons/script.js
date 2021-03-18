// URL building function for WFS GeoServer requests
function function_url(type) {
	url1 = 'http://localhost:8080/geoserver/ITI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ITI%3A'
	url2 = '&maxFeatures=50&outputFormat=application%2Fjson'
	params = '&viewparams=dep:' + localStorage.dep + ';arr:' + localStorage.arr + ';saison_code:' + localStorage.saison + ';milieu_code:' + localStorage.milieu + ';sport_code:' + localStorage.sport
	return url1 + type + url2 + params
}


// Buttons building: a button div is created for each element of features collections get via GeoServer, and added to corresponding HTML container
// Onclick event on each div calling the clickbutton() function
// The two args being var "xxx_code" of requested data, and arg of the get_fun() function (saison, milieu or sport)
function get_fun(type){
	function getJson(data) {
		if (type == 'etape') {
			var random = Math.floor(Math.random() * (data.features.length));
			localStorage.setItem('etape', JSON.stringify(data.features[random]))
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


// Function to fill the variables corresponding to the user choices with the HTML content of the clicked button
function clickbutton(arg, type) {
	if(type == 'saison'){
		localStorage.saison = arg
	} else if (type == 'milieu') {
		localStorage.milieu = arg
	} else {
		localStorage.sport = arg
	}
}


// Display of right buttons for the right page, depending on the page id
function chargement() {
	meta = document.getElementById('id_page')
	if (meta.getAttribute('content') == 'adresses') {
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


// Verify if the user has clicked on a button
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


// Launching of chargement() function on page loading
chargement()