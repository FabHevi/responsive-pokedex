const loadMoreButton = document.getElementById('moreItems');
const pokemonOl = document.getElementById('pokemonList');

const limit = 12;
let offset = 0;

// Trava os pokemons na segunda geração
const maxRecords = 251;


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(pokemon =>
            `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
        
            </li>
            `
        ).join('');

        pokemonOl.innerHTML += newHtml;

        // Adicionar evento de clique para cada card de Pokémon
        document.querySelectorAll('.pokemon').forEach((pokemonCard) => {
            pokemonCard.addEventListener('click', () => {
                const pokemonId = pokemonCard.getAttribute('data-id');
                window.location.href = `desc.html?id=${pokemonId}`;
            });
        });
    });
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit 

    if (qtdRecordsNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})



