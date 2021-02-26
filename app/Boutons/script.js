//Déclaration variables (les listes sont provisoires et ont vocation à être remplacées par les requêtes SQL
//ainsi le nombre de boutons sera corrélé aux sélections spatiales successives
var saisons = ['Été', 'Hiver', 'Toutes saisons', 'Printemps', 'Été indien']
var milieux = ['Montagne', 'Mer', 'Urbain']
var sports = ['Natation', 'VTT', 'Boules', 'Ski', 'Randonnée', 'Sports nautiques', 'Terrains extérieurs', 'Parcours sportifs', 'Équitation', 'Golf', 'Skate park', 'Sports de glace']

url = 'http://localhost:8080/geoserver/projetgeonum/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=projetgeonum%3Asaisons&maxFeatures=50&outputFormat=application%2Fjson'

let user_saison
let user_milieu
let user_sport

//Construction des boutons saisons : une div bouton est créée pour chaque élément de la liste saisons, avec fonction onclick et remplissage du HTML
var htmlSaisons = "";

function saison_fun(){
	function getJson(data) {
		for (var i = 0; i < data.features.length; i++) {
			htmlSaisons += '<div role="button" id="saison' + i + '" onclick="clickbutton(\'saison' + i + '\')">' + data.features[i].properties['saison'] +'</div>';
		}
		var container_saisons = document.getElementById("container_saisons");
		container_saisons.innerHTML = htmlSaisons;
        //console.log(saison);
    }
    $.ajax({
        type: 'GET', 
        url: url,
        dataType: 'JSON',
        success: getJson
    });
}
saison_fun()

/*for (var i = 0; i < saisons.length; i++) {
   htmlSaisons += '<div role="button" id="saison' + i + '" onclick="clickbutton(\'saison' + i + '\')">' + saisons[i] +'</div>';
}
var container_saisons = document.getElementById("container_saisons");
container_saisons.innerHTML = htmlSaisons;*/


//Construction des boutons milieux : une div bouton est créée pour chaque élément de la liste saisons, avec fonction onclick et remplissage du HTML
var htmlMilieux = "";
for (var i = 0; i < milieux.length; i++) {
   htmlMilieux += '<div role="button" id="milieu' + i + '" onclick="clickbutton(\'milieu' + i + '\')">' + milieux[i] +'</div>';
}
var container_milieux = document.getElementById("container_milieux");
container_milieux.innerHTML = htmlMilieux;

//Construction des boutons sports : une div bouton est créée pour chaque élément de la liste saisons, avec fonction onclick et remplissage du HTML
var htmlSports = "";
for (var i = 0; i < sports.length; i++) {
   htmlSports += '<div role="button" id="sport' + i + '" onclick="clickbutton(\'sport' + i + '\')">' + sports[i] +'</div>';
}
var container_sports = document.getElementById("container_sports");
container_sports.innerHTML = htmlSports;


//Fonction de remplissage des variables correspondant aux choix utilisateurs avec le contenu HTML du bouton cliqué
function clickbutton(id) {
	if(id.includes('saison')){
		user_saison = []
		user_saison.push(document.getElementById(id).innerHTML)
		console.log("saison : ", user_saison)
	} else if (id.includes('milieu')) {
		user_milieu = []
		user_milieu.push(document.getElementById(id).innerHTML)
		console.log("milieu : ", user_milieu)
	} else {
		user_sport = []
		user_sport.push(document.getElementById(id).innerHTML)
		console.log("sport : ", user_sport)
	}
}