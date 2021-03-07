//Fonction de requête Nominatim
//Filtre des données selon leur type (political, disused)
//construction d'un format d'adresse personnalisé
//alimentation d'un bouton select avec chacune des options obtenues
function addr_search(arg) {
    var inp = document.getElementById("adr_" + arg);

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&viewbox=6.530757121,44.388548321,7.746819282,43.409038384&bounded=1&limit=15&q=' + inp.value, function(data) {
        var items = []
        var first_result_array = []

        $.each(data, function(key, val) {
            let name_clean = ''
            if (val.type != 'political' && val.type != 'disused') {
                let name = []
                
                //obtention de toutes les métadonnées nécessaires
                amenity = val.address.amenity
                natural = val.address.natural
                waterway = val.address.waterway
                building = val.address.building
                house_number = val.address.house_number
                road = val.address.road
                suburb = val.address.suburb
                hamlet = val.address.hamlet
                locality = val.address.locality
                town = val.address.town
                village = val.address.village
                city = val.address.city
                postcode = val.address.postcode
                adresse = [amenity, natural, waterway, building, house_number, road, suburb, hamlet, locality, village, town, city, postcode]
                
                //itération dans la liste des métadonnées et construction d'une array avec l'ensemble des métadonnées existantes pour l'adresse itérée
                for (let i = 0; i<adresse.length; i++) {
                    if (typeof adresse[i] != 'undefined' && adresse[i] != 'undefined' && adresse[i] !== undefined) {
                        console.log(typeof name)
                        name.push(adresse[i])
                    }
                }
                name_clean = name.join(', ')
            }

            //création d'options d'une liste select avec fonction chooseAddr
            if (name_clean && name_clean != '') {
                items.push('<option value ="' + name_clean + '" onclick="chooseAddr(\'' + arg + '\',' + val.lat + ',' + val.lon +');return false;">' + name_clean + '</option>');
                first_result_array.push(val.lon)
                first_result_array.push(val.lat)
            }
            
        });

        //Attribution des coords du premier résultat aux variables locales,
        //permettant la bonne continuité de l'application si l'utilisateur ne choisit pas activement une option
        if (arg == 'dep') {
            localStorage.dep = first_result_array[0] + " " + first_result_array[1]
        } else {
            localStorage.arr = first_result_array[0] + " " + first_result_array[1]
        }

        //alimentation de la div results correspondante
		$('#results_' + arg).empty();
        if (items.length != 0) {
            $('<label for="select_' + arg + '">Résultats de la recherche : </label>').appendTo('#results_' + arg);
            $('<select/>', {
                'id': 'select_' + arg,
                'class': 'select',
                html: items.join('')
            }).appendTo('#results_' + arg);
        } else {
            $('<p>', { html: "Pas de résultats trouvés" }).appendTo('#results_' + arg);
            if (arg == 'dep') {
                localStorage.dep = ''
            }
            if (arg == 'arr') {
                localStorage.arr = ''
            }
        }
    });
}

//Fonction se déclenchant à la sélection d'une adresse, et remplaçant les variables locales constituées jusqu'ici du premier résultat
function chooseAddr(arg, lat, lon) {
    if (arg == 'dep') {
        localStorage.dep = lon + " " + lat
        console.log("localStorage.dep : ", localStorage.dep)
    } else {
        localStorage.arr = lon + " " + lat
        console.log("localStorage.arr : ", localStorage.arr)
    }
}