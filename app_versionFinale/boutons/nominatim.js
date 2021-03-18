// Nominatim request function
function addr_search(arg) {
    var input = document.getElementById("addr_" + arg);

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&viewbox=6.530757121,44.388548321,7.746819282,43.409038384&bounded=1&limit=15&q='
        + input.value, function(data) {
        var items = []
        var first_result_array = []

        $.each(data, function(key, val) {
            let name_clean = ''
            // Getting rid of political and disused results
            if (val.type != 'political' && val.type != 'disused') {
                let name = []

                // Selection of interesting properties for the building of addresses
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

                // Iteration through metadata list and construction of a name_clean var with all existing metadata for the iterated address
                for (let i = 0; i<adresse.length; i++) {
                    if (typeof adresse[i] != 'undefined' && adresse[i] != 'undefined' && adresse[i] !== undefined) {
                        name.push(adresse[i])
                    }
                }
                name_clean = name.join(', ')
            }

            // Creation of options of a select list with function chooseAddr() on click
            if (name_clean && name_clean != '') {
                items.push('<option value ="' + name_clean + '" onclick="chooseAddr(\'' + arg + '\',' + val.lat + ',' + val.lon +');return false;">' + name_clean + '</option>');
                first_result_array.push(val.lon)
                first_result_array.push(val.lat)
            }

        });

        // Attribution of first result coords to localStorage var
        // allowing the user to continue to the next page even if they don't actively click on an option
        if (arg == 'dep') {
            localStorage.dep = first_result_array[0] + " " + first_result_array[1]
        } else {
            localStorage.arr = first_result_array[0] + " " + first_result_array[1]
        }

        // Supply of the corresponding results div
		$('#results_' + arg).empty();
        if (items.length != 0) {
            $('<label id="label_' + arg + '" for="select_' + arg + '">Résultats : </label>').appendTo('#results_' + arg);
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


// Function launched at click on an address, replacing the values of localStorage vars that had until now the coords of the first result
function chooseAddr(arg, lat, lon) {
    if (arg == 'dep') {
        localStorage.dep = lon + " " + lat
    } else {
        localStorage.arr = lon + " " + lat
    }
}


// Allows the user to select an address by pressing the enter key
function keyEnter() {
    document.getElementById('addr_dep').addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault()
            // Trigger the button element with a click
            document.getElementById('boutonrechDep').click()
        }
    })

    document.getElementById('addr_arr').addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            document.getElementById('boutonrechArr').click()
        }
    })
}

keyEnter()