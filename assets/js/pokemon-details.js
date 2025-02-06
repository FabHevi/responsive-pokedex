// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Retorna o valor do parâmetro 'id' na URL
}

// Função para converter os detalhes da API para o modelo Pokemon
function convertDetailsPokeApiTo(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

// Função para carregar os detalhes do Pokémon
async function loadPokemonDetails() {
    const pokemonId = getPokemonIdFromUrl();

    if (!pokemonId) {
        alert('Pokémon não encontrado.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado.');
        }

        const pokemonDetails = await response.json();
        const pokemon = convertDetailsPokeApiTo(pokemonDetails);

        // Exibir os detalhes do Pokémon
        displayPokemonDetails(pokemon);
    } catch (error) {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
        alert('Erro ao carregar detalhes do Pokémon.');
    }
}


function displayPokemonDetails(pokemon) {
    const pokemonName = document.getElementById('pokemonName');
    const pokemonDetails = document.getElementById('pokemonDetails');

    // Detalhes do Pokémon
    pokemonDetails.innerHTML = `
        <div class="pokemon ${pokemon.type}">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    `;
}

window.onload = loadPokemonDetails;