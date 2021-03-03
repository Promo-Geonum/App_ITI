// var count = 1;
// function information_fun() {
//   if (count%2 == 1) {
//     document.getElementById("info_text").innerHTML = "ITI est une application web-cartographique de création d'itinéraire";
//   } else {document.getElementById("info_text").innerHTML = "";}
//   count += 1;
// }


function mouseOver() {
  document.getElementById("information").innerHTML = "ITI est une application développé par 4 étudiants du Master GeoNum. Elle a pour objectif de proposer un itinéraire personnalisé prenant en compte les goûts sportifs de chaque utilisateur";
}

function mouseOut() {
  document.getElementById("information").innerHTML = "i";
}
