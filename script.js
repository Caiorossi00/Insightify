import { artesEN, artesPT, artesES, artesIT } from "./artes.js";

let currentLanguage = "PT";
let displayedArtIndexes = [];
let allArtIndexes = Array.from({ length: artesEN.length }, (_, index) => index);

let languageSelector = document.getElementById("languageSelector");
languageSelector.addEventListener("change", () => {
  currentLanguage = languageSelector.value;
  resetDisplayedArtIndexes();
  displayRandomArt();
});

function resetDisplayedArtIndexes() {
  displayedArtIndexes = [];
  allArtIndexes = Array.from({ length: artesEN.length }, (_, index) => index);
}

function displayRandomArt() {
  const artList = document.getElementById("artList");
  artList.innerHTML = "";

  const nomeObra = document.querySelector(".obra");
  nomeObra.innerHTML = "";

  const autor = document.querySelector(".autor");
  autor.innerHTML = "";

  const ano = document.querySelector(".ano");
  ano.innerHTML = "";

  if (allArtIndexes.length === 0) {
    resetDisplayedArtIndexes();
  }

  const randomIndex = getRandomIndexFromRemaining();
  const randomArt = getArtByLanguage(randomIndex);

  if (randomArt) {
    const listItem = document.createElement("li");
    const artName = document.createElement("strong");
    const artAuthor = document.createElement("span");
    const artSynopsis = document.createElement("p");

    nomeObra.textContent = randomArt.nome;
    autor.textContent = randomArt.autor;
    ano.textContent = randomArt.ano;
    artSynopsis.textContent = randomArt.sinopse;

    listItem.appendChild(artName);
    listItem.appendChild(artAuthor);
    listItem.appendChild(artSynopsis);
    artList.appendChild(listItem);

    document.body.classList.add("art-background");
    document.body.style.backgroundImage = `url('${randomArt.image}')`;

    displayedArtIndexes.push(randomIndex);
    console.log(allArtIndexes);
  }
}

function getRandomIndexFromRemaining() {
  const remainingIndexes = allArtIndexes.filter(
    (index) => !displayedArtIndexes.includes(index)
  );
  const randomIndex =
    remainingIndexes[Math.floor(Math.random() * remainingIndexes.length)];
  return randomIndex;
}

function getArtByLanguage(index) {
  switch (currentLanguage) {
    case "EN":
      return artesEN[index];
    case "PT":
      return artesPT[index];
    case "ES":
      return artesES[index];
    case "IT":
      return artesIT[index];
    default:
      return artesPT[index];
  }
}

function preloadImages() {
  const allImages = [...artesEN, ...artesPT].map((art) => art.image);
  return Promise.all(
    allImages.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );
}

preloadImages().then(() => {
  displayRandomArt();

  randomNextButton.addEventListener("click", displayRandomArt);
});

const randomNextButton = document.createElement("button");
randomNextButton.id = "randomnext";
randomNextButton.innerHTML = `<i class="fa-solid fa-forward"></i>`;

const lowerDiv = document.querySelector(".lower");

lowerDiv.appendChild(randomNextButton);

document.addEventListener("DOMContentLoaded", function () {
  const hideButton = document.querySelector(".hide");
  const hideableElements = document.querySelectorAll(".hideable");

  hideButton.addEventListener("click", function () {
    hideableElements.forEach((element) => {
      element.classList.toggle("hidden");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menuIcon");
  const menu = document.getElementById("menu");

  menuIcon.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const infosButton = document.querySelector(".infos");
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("closeModal");

  infosButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

displayRandomArt();
