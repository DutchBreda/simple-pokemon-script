// Wrapped array in an IIFE and assigned as an empty array
var pokemonRepository = (function() {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var modalContainer = document.querySelector('#modal-container');

    // Adding the pokemons
    function add(pokemon) {
        repository.push(pokemon);
    }

    // retrieving the data
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

    // Function to load pokemon list from apiUrl above
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            // JSON: the most common data format used when exchanging data with external sources.
            return response.json();
            // If the promise is resolved, then (function(passed parameter) {...
        }).then(function(json) {
            json.results.forEach(function(item) {
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
            }).then(function(details) {

                // To add the details to each item:
                item.imgUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = Object.keys(details.types);
            }).catch(function(error) {
                console.error(error);
            });
        }
        // Function to return Pokedex object array:

    function catchAll() {
        return repository;
    }

    // function to show the details of each Pokemon in pokemon repository window - thanks Jackson!
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        var modalContainer = document.querySelector('#modal-container');

        // Clear all the existing modal content
        modalContainer.innerHTML = '';

        var modal = document.createElement('div');
        modal.classList.add('modal');

        // Add new modal textContent
        var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        var titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        var contentElement = document.createElement('p');
        contentElement.innerText = pokemon.imgUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // Hiding the modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Clicking ESC to close the modal need to remember this!
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // Clicking outside the container to close modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal,
    };
})();
