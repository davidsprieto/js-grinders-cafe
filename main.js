"use strict";

function renderCoffee(coffee) {
    let html = '<div id="coffees" class="coffee">';
    html += '<span class="badge badge-warning">' + '#' + coffee.id + ":" + '</span>';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffeesByRoast() {
    let selectedRoast = roastSelection.value;
    let filteredCoffeeRoasts = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffeeRoasts.push(coffee);
            bodyMainDiv.innerHTML = renderCoffees(filteredCoffeeRoasts);
        } else if ('All Roasts' === selectedRoast) {
            bodyMainDiv.innerHTML = renderCoffees(coffees);
        }
    });
}

function updateCoffeesByName() {
    let selectedCoffee = coffeeSearch.value;
    let filteredCoffeeNames = [];
    coffees.forEach(function(coffee) {
        if (coffee.name === selectedCoffee || coffee.name.startsWith(selectedCoffee)
            || coffeeSearch.value.toLowerCase() === coffee.name.toLowerCase()
            || coffee.name.toLowerCase().startsWith(selectedCoffee.toLowerCase())
            || coffee.name.includes(selectedCoffee)
            || coffee.name.toLowerCase().includes(selectedCoffee.toLowerCase())) {
            filteredCoffeeNames.push(coffee);
        }
    });
    bodyMainDiv.innerHTML = renderCoffees(filteredCoffeeNames);
}

function addACoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let newCoffee = {
        id: coffees.length + 1,
        name: document.getElementById('new-coffee-selection').value,
        roast: document.getElementById('new-roast-selection').value
    }

    coffees.push(newCoffee);
    sort();
    updateCoffeesByRoast(e);
    updateCoffeesByName(e);
    alert('Your coffee was added to the list!');
    document.querySelector('#add-coffee').reset(); // clear the form for the next entries

    let coffees_serialized = JSON.stringify(coffees);
    localStorage.setItem('coffees', coffees_serialized); // sets/saves the new coffees the user adds to the 'coffees' object in local storage until the user clears cookies/search history
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'Light'},
    {id: 2, name: 'Half City', roast: 'Light'},
    {id: 3, name: 'Cinnamon', roast: 'Light'},
    {id: 4, name: 'City', roast: 'Medium'},
    {id: 5, name: 'American', roast: 'Medium'},
    {id: 6, name: 'Breakfast', roast: 'Medium'},
    {id: 7, name: 'High', roast: 'Dark'},
    {id: 8, name: 'Continental', roast: 'Dark'},
    {id: 9, name: 'New Orleans', roast: 'Dark'},
    {id: 10, name: 'European', roast: 'Dark'},
    {id: 11, name: 'Espresso', roast: 'Dark'},
    {id: 12, name: 'Viennese', roast: 'Dark'},
    {id: 13, name: 'Italian', roast: 'Dark'},
    {id: 14, name: 'French', roast: 'Dark'},
];

function sort() {
    coffees.sort((a, b) => {
        return (b.id - a.id);
    });
}
sort();

let bodyMainDiv = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#coffee-selection');

let coffees_deserialized = JSON.parse(localStorage.getItem('coffees'));

if (coffees_deserialized != null && coffees_deserialized.length >= 14) {
    bodyMainDiv.innerHTML = renderCoffees(JSON.parse(localStorage.getItem('coffees'))); // when the user adds a new coffee to the list, the 'coffees' object gets saved in local storage with that new coffee added to it. This retrieves the 'coffees' object in local storage and displays it on the page.
} else {
    bodyMainDiv.innerHTML = renderCoffees(coffees); // renders and displays hard coded 'coffees' object.
}

roastSelection.addEventListener('change', updateCoffeesByRoast);
submitButton.addEventListener('click', addACoffee);
coffeeSearch.addEventListener('keyup', updateCoffeesByName);
