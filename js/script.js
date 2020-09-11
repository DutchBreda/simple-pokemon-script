// Wrapped array in an IIFE and assigned as an empty array
var pokemonRepository = (function () {
var repository = [];
var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=175';

// Adding the pokemons
function add(pokemon) {
repository.push(pokemon);
}

// retrieving the data the data
function getAll() {
  return repository;
}

// Adding a new listItem for every pokemon
function addListItem(pokemon) {
  var $pokemonList = document.querySelector('ul');
  // To create a new li-element that contains a button for each pokemon:
  var $listItem = document.createElement('li');
  var $button = document.createElement('button');
  // Appending list item to the unordered list as a child
  $pokemonList.appendChild($listItem);
  // To append the button to the list item as its child:
  $listItem.appendChild($button);
  // Shows name
  $button.textContent = pokemon.name.toUpperCase();
  $button.classList.add('list-button');
  // To style the buttons in css
  $listItem.classList.add('button-class');
  // Button click function
  $button.addEventListener('click', function(event) {
  // Showing details attributes of pokemon
  showDetails(pokemon);
})
}

// Function to load pokemon list from apiUrl:
function loadList() {
  return fetch(apiUrl).then(function (response) {
    // JSON: the most common data format used when exchanging data with external sources.
    return response.json();
    // If the promise is resolved, then (function(passed parameter) {...
    }).then(function (json) {
    json.results.forEach(function (item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
// If the promise is rejected, catch (function(passed parameter) {...
}).catch(function(error) {
  console.error(error);
})
}

// Function to load pokemon details
function loadDetails(item) {
  var url = item.detailsUrl;
  return fetch(url).then(function(response) {
  return response.json();
  }).then(function (details) {

// To add the details to each item:
  item.imageUrl = details.sprites.front_default;
  item.height = details.height;
  item.types = Object.keys(details.types);
}).catch(function (error) {
  console.error(error);
});
}
// Function to return Pokedex object array:
  function catchAll() {
  return repository;
  }

// Function to show details of each pokemon in alert window:
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
    alert('Height:' + ' ' + item.height + ' ' + 'Type: ' + ' ' + item.types);
    });
  }

// To return the values wich can be accessed to outside the IIFE:
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// To create list of pokemon with pokemon's name on the button:
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});
});
