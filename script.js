const buscaPokemon = document.querySelector("#entrada-pokemon");
const btnBusca = document.querySelector(".btn-busca");
const pokeContainer = document.querySelector(".poke-container");
let page = 20;
const modalImage = document.querySelector("#modal-image");
const modalName = document.querySelector("#poke-name");
const modalId = document.querySelector("#poke-id");
const modalDescription = document.querySelector("#poke-description");


const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
}

const pokeCont = 20;

const initPokemon = async () => {
    for(let i = 1; i <= pokeCont; i++) {
        await getPokemon(i);
    }
};


const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonBox(data);
};



const createPokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;
    const type = pokemon.types[0].type.name;
    let type2 = "";
    try{type2 = pokemon.types[1].type.name}
    catch{type2 = ""}
    const color = colors[type];

    const pokemonEl = document.createElement("div");
        pokemonEl.classList.add("caixa-poke")
            pokemonEl.style.backgroundColor = `${color}`;
            pokemonEl.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${name} image">
                <h4 class="poke-name">${name}</h4>
                <p class="poke-id">#${id}</p>
                <p class="poke-class">Type: ${type} ${type2}</p>
                `;

        pokeContainer.appendChild(pokemonEl);
    

    const cards = document.querySelectorAll(".caixa-poke");
    const modal = document.querySelector("#modal-overlay");


    cards.forEach((card) => {
        card.addEventListener("click", async function(event){
          const cardElement = event.path.filter((item) => item.className == "card");
          const Idcard = card.querySelector(".poke-id").innerText.replace("#","");
          const resp2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${Idcard}`);
          const dados2 = await resp2.json();
          const url = `https://pokeapi.co/api/v2/pokemon/${Idcard}`;
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
            
          modal.style.display = 'flex'
          modalImage.setAttribute("src", data.sprites.other["official-artwork"].front_default);
          modalName.innerText = data.name;
          modalId.innerText = `#${Idcard.toString().padStart(3, "0")}`

            let descricao = "";
            for (let i = 0; i < 2000; i++) {
              if (dados2.flavor_text_entries[i].language.name == "en") {
                descricao = dados2.flavor_text_entries[i].flavor_text;
              };
            
            descricao = descricao
              .replace("", "")
              .replace("POKéMON", "Pokemon")
              .replace("POKéMON", "Pokemon")
              .replace("POKéMON", "Pokemon");
    
            modalDescription.innerText = descricao;
            }   
        });

        window.addEventListener("click", function(event){
            if(!event.target.classList.contains("modal-item")){
                modal.style.display = "none"
            }
          })

      });

      
    
};


initPokemon();
async function viewmore(){
    const pageIni = page;
    page+= 20;
    const pagefin = page;
    for(let i = (pageIni+1); i <= pagefin;i++){
        await getPokemon(i);
        
    }
}



buscaPokemon.addEventListener("input", function (e){
    const pokeNames = document.querySelectorAll(".poke-name")
    const busca = buscaPokemon.value;
    console.log(busca);
    
    pokeNames.forEach((pokeName) => {
        pokeName.parentElement.style.display = "block";

        if(!pokeName.innerHTML.toLowerCase().includes(busca)) {
            pokeName.parentElement.style.display = "none";
        }
    });
    
});
