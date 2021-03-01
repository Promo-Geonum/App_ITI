var count = 1;
function information_fun() {
  if (count%2 == 1) {
    document.getElementById("info_text").innerHTML = "ITI est une application web-cartographique de création d'itinéraire";
  } else {document.getElementById("info_text").innerHTML = "";}
  count += 1;
}
