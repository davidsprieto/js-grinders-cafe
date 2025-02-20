"use strict";

// constant variables not to be reassigned values
const bodyMainDiv = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const coffeeSearch = document.querySelector('#coffee-selection');
const coffees_deserialized = JSON.parse(localStorage.getItem('coffees'));

// Function returns html to render and display the coffees on the page
function renderCoffee(coffee) {
    let html = '<div id="coffees" class="coffee">';
    html += '<span class="badge badge-warning">' + '#' + coffee.id + ":" + '</span>';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// Function loops through the coffees object and passes the data into renderCoffees to be displayed on the page
function renderCoffees(coffees) {
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Function displays the coffees by roast selection
function updateCoffeesByRoast() {
    let selectedRoast = roastSelection.value;
    let filteredCoffeeRoasts = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffeeRoasts.push(coffee);
            bodyMainDiv.innerHTML = renderCoffees(filteredCoffeeRoasts);
        } else if ('All Roasts' === selectedRoast) {
            bodyMainDiv.innerHTML = renderCoffees(coffees);
        }
    });
}

// Function displays the coffees by name selection
function updateCoffeesByName() {
    let selectedCoffee = coffeeSearch.value;
    let filteredCoffeeNames = [];
    coffees.forEach(function (coffee) {
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

// Function
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

// Function sorts coffees by id from smallest to largest
function sort() {
    coffees.sort((a, b) => {
        return (b.id - a.id);
    });
}

sort();

// when the user adds a new coffee to the list, the 'coffees' object gets saved in local storage with the new coffee added to it.
// This retrieves the 'coffees' object in local storage and displays it on the page.
if (coffees_deserialized != null && coffees_deserialized.length >= 14) {
    bodyMainDiv.innerHTML = renderCoffees(JSON.parse(localStorage.getItem('coffees')));
} else {
    bodyMainDiv.innerHTML = renderCoffees(coffees); // renders and displays hard coded 'coffees' object.
}

// Event listeners
roastSelection.addEventListener('change', updateCoffeesByRoast);
submitButton.addEventListener('click', addACoffee);
coffeeSearch.addEventListener('keyup', updateCoffeesByName);
