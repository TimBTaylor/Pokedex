let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#search-bar');

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
      pokemonList.push(item);
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let listDiv = document.querySelector('.row');
    listItem.classList.add('col-6');
    listItem.classList.add('col-md-4');
    pokemonList.classList.add('container');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-block');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    listDiv.appendChild(listItem);
    pokemonList.appendChild(listDiv);

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //function fetches list of pokemon from pokeapi
  function loadList() {
    return fetch(apiURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //function fetches details of pokemons from pokeapi
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');

      modalTitle.empty();
      modalBody.empty();

      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      let pokemonHeight = $(
        '<p>' + 'Height: ' + pokemon.height + ' meter(s)' + '</p>'
      );
      let pokemonWeight = $(
        '<p>' + 'Weight: ' + pokemon.weight + ' kg(s)' + '</p>'
      );

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
    });
  }

  searchInput.addEventListener('input', function() {
    let pokemonList = document.querySelectorAll('.list-group-item');
    let filterValue = searchInput.value.toUpperCase();

    pokemonList.forEach(function(pokemon) {
      console.log(pokemon.innerText);
      if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
