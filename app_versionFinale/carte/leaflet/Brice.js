function Brice() {
	BriceIcon = new L.icon ({
		iconUrl: "../img/picto_sport/SURF.png",
		iconSize: [25, 25]
	})
	Brice_marker = L.marker([43.69227, 7.29045], {icon: BriceIcon}).on("click", function(e) {
		alert('T\'as cru que t\'allais pouvoir surfer à Nice ??')
		window.open('https://www.youtube.com/watch?v=xEwfYR8ihEA', '_blank')
	})
	Brice_marker.addTo(mymap)
}

Brice()
