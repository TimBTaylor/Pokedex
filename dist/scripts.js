let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
    n = document.querySelector('#search-bar');
  function o(e) {
    'object' == typeof e && 'name' in e && 'detailsUrl' in e && t.push(e);
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types),
          (t.weight = e.weight);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function l(t) {
    i(t).then(function() {
      let e = $('.modal-body'),
        n = $('.modal-title');
      $('.modal-header');
      n.empty(), e.empty();
      let o = $('<h1>' + t.name + '</h1>'),
        i = $('<img class="modal-img" style="width:50%">');
      i.attr('src', t.imageUrl);
      let l = $('<p>Height: ' + t.height + ' meter(s)</p>'),
        a = $('<p>Weight: ' + t.weight + ' kg(s)</p>');
      n.append(o), e.append(i), e.append(l), e.append(a);
    });
  }
  return (
    n.addEventListener('input', function() {
      let t = document.querySelectorAll('.list-group-item'),
        e = n.value.toUpperCase();
      t.forEach(function(t) {
        console.log(t.innerText),
          t.innerText.toUpperCase().indexOf(e) > -1
            ? (t.style.display = '')
            : (t.style.display = 'none');
      });
    }),
    {
      getAll: function() {
        return t;
      },
      add: o,
      addListItem: function(t) {
        let e = document.querySelector('.list-group'),
          n = document.createElement('li'),
          o = document.querySelector('.row');
        n.classList.add('col-6'),
          n.classList.add('col-md-4'),
          e.classList.add('container'),
          n.classList.add('list-group-item'),
          n.classList.add('list-group-item-action');
        let i = document.createElement('button');
        (i.innerText = t.name),
          i.classList.add('btn'),
          i.classList.add('btn-block'),
          i.setAttribute('data-target', '#pokemonModal'),
          i.setAttribute('data-toggle', 'modal'),
          n.appendChild(i),
          o.appendChild(n),
          e.appendChild(o),
          i.addEventListener('click', function() {
            l(t);
          });
      },
      loadList: function() {
        return fetch(e)
          .then(function(t) {
            return t.json();
          })
          .then(function(t) {
            t.results.forEach(function(t) {
              o({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function(t) {
            console.error(t);
          });
      },
      loadDetails: i,
      showDetails: l
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
