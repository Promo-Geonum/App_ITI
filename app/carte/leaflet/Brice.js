// LOL function, because there's no surfing in Nice (sorry Brice!)
function Brice() {
	BriceIcon = new L.icon ({
		iconUrl: "../img/picto_sport/SURF.png",
		iconSize: [25, 25]
	})
	Brice_marker = L.marker([43.69227, 7.29045], {icon: BriceIcon})
	.bindPopup('T\'as cru que t\'allais pouvoir surfer à Nice ?? <p><iframe width="560" height="315" src="https://www.youtube.com/embed/xEwfYR8ihEA?autoplay=1&controls=0&modestbranding=1;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>'
		, {maxWidth: "auto"})
	.openPopup()
	Brice_marker.addTo(mymap)
}

Brice()
