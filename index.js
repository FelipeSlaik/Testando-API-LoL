const apiKey = 'RGAPI-d1589321-30ba-45dd-a62f-16c0ae2b616a';

// Aqui exibe a lista de campeões
function displayChampionList(champions) {
    const containerChampions = document.getElementById('champions-lol');
    containerChampions.innerHTML = '';

    Object.values(champions).forEach(champion => {
        const name = champion.name;
        const imageURL = `http://ddragon.leagueoflegends.com/cdn/14.18.1/img/champion/${champion.image.full}`;
        const title = champion.title;

        const championDiv = document.createElement("div");
        championDiv.innerHTML = `
            <h3>${name}</h3>
            <img src="${imageURL}" alt="${name}" style="width: 100px; height: auto;">
            <p>${title}</p>
            <a href="campeao.html?name=${name}">Ver detalhes</a>
            <hr>
        `;
        containerChampions.appendChild(championDiv);
    });
}

// Aqui estou pegando o nome do campeão a partir da URL
function getChampionName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name');
}

// Aqui exibe os detalhes do campeão
function displayChampionDetails(champion) {
    const championNameElement = document.getElementById("champion-name");
    const championImageElement = document.getElementById("champion-image");
    const championLoreElement = document.getElementById("champion-lore");
    const containerChampions = document.getElementById("champions-lol");

    if (championNameElement && championImageElement && championLoreElement) {
        championNameElement.textContent = champion.name;
        championImageElement.src = `http://ddragon.leagueoflegends.com/cdn/14.18.1/img/champion/${champion.image.full}`;
        championLoreElement.textContent = champion.blurb;

    }
}

// Aqui está acontecendo a mágica do Fetch para obter os detalhes do campeão / Requisição à API
fetch(`https://ddragon.leagueoflegends.com/cdn/14.18.1/data/pt_BR/champion.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const champions = data.data;
        const championName = getChampionName();
        console.log(champions)

        if (championName) {
            const champion = champions[championName];
            if (champion) {
                displayChampionDetails(champion);
            } else {
                console.error('Campeão não encontrado.');
            }
        } else {
            displayChampionList(champions);
        }
    })
    .catch(error => console.error('Erro:', error));
