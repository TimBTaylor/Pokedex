let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'squirtle',
      height: .5 ,
      types: ['rain', 'torrent']
    },
    {
      name: 'weedle',
      height: .3 ,
      types:['shield', 'run']
    },
    {
      name: 'arbok',
      height: 3.5 ,
      types:['intimidate', 'unnerve']
    },
    {
      name: 'ekans',
      height: 2 ,
      types: ['shed-skin', 'fast']
    }
  ];

  function add(item) {
    pokemonList.push(item)
  }

  function getAll() {
    return pokemonList
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button')
    listItem.appendChild(button)
    pokemonList.appendChild(listItem)
    //when the name is clicked it prints it to the console//
    button.addEventListener('click', function(){
      showDetails(pokemon.name)
    });
    }
//function that logs pokemon to the console//
    function showDetails(pokemon) {
      console.log(pokemon)
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  }


})();

//adds list of pokemons to the screen//
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
