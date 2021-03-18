// Create the animation when hovering the information button
function mouseOver() {
  document.getElementById("information").innerHTML = '<p>Ashley, Idrissa, Maodo et Lubin, quatre étudiant.e.s du Master GéoNum sont fier.e.s de vous présenter ITI, une application de création d\'itinéraire.</p>'+ '<img class="logos" id="logoGeoNum" src="img/LogoGeoNum.png">' + '<img class="logos" id="logoLyon2" src="img/LogoLyon2.png">' + '<img class="logos" id="logoUJM" src="img/LogoUJM.png">' + '<img class="logos" id="logoENS" src="img/LogoENS.png">';
}

function mouseOut() {
  document.getElementById("information").innerHTML = "i";
}
