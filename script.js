import { artesEN, artesPT, artesES } from "./artes.js";

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
  resetButton.style.display = "none";
}

function getRandomIndexFromRemaining() {
  const remainingIndexes = allArtIndexes.filter(
    (index) => !displayedArtIndexes.includes(index)
  );
  if (remainingIndexes.length === 0) {
    return undefined;
  }
  const randomIndex =
    remainingIndexes[Math.floor(Math.random() * remainingIndexes.length)];
  return randomIndex;
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

  let endOfGalleryMessage;
  switch (currentLanguage) {
    case "EN":
      endOfGalleryMessage =
        "You've reached the end!<br>Click the button to reset the gallery<br><br>Thank you for reaching here.<br>I would greatly appreciate your feedback, you can message me on Instagram @Caiorossi.dev";
      break;
    case "PT":
      endOfGalleryMessage =
        "Você chegou ao final!<br>Clique no botão para reiniciar a galeria<br><br>Obrigado por chegar até aqui.<br>Gostaria muito do seu feedback, você pode me mandar mensagem pelo instagram @Caiorossi.dev";
      break;
    case "ES":
      endOfGalleryMessage =
        "¡Has llegado al final!<br>Haz clic en el botón para reiniciar la galería<br><br>Gracias por llegar hasta aquí.<br>Apreciaría mucho tus comentarios, puedes enviarme un mensaje en Instagram @Caiorossi.dev";
      break;
  }

  const remainingIndexes = allArtIndexes.filter(
    (index) => !displayedArtIndexes.includes(index)
  );

  if (remainingIndexes.length === 0) {
    artList.innerHTML = endOfGalleryMessage;
    artList.style.marginTop = "2em";
    resetButton.style.display = "block";
    return;
  }

  const randomIndex = getRandomIndexFromRemaining();
  if (randomIndex === undefined) {
    artList.innerHTML = endOfGalleryMessage;
    artList.style.marginTop = "2em";
    resetButton.style.display = "block";
    return;
  }

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

    if (remainingIndexes.length === 0) {
      resetButton.style.display = "block";
    } else {
      resetButton.style.display = "none";
    }
  }
}

function getArtByLanguage(index) {
  switch (currentLanguage) {
    case "EN":
      return artesEN[index];
    case "PT":
      return artesPT[index];
    case "ES":
      return artesES[index];
    default:
      return artesPT[index];
  }
}

const randomNextButton = document.createElement("button");
randomNextButton.id = "randomnext";
randomNextButton.innerHTML = `<i class="fa-solid fa-forward"></i>`;

const lowerDiv = document.querySelector(".lower");

randomNextButton.addEventListener("click", displayRandomArt);

const resetButton = document.createElement("button");
resetButton.id = "resetButton";
resetButton.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
resetButton.style.display = "none";
resetButton.style.width = "fit-content";

resetButton.addEventListener("click", () => {
  resetDisplayedArtIndexes();
  displayRandomArt();
});

lowerDiv.appendChild(resetButton);
lowerDiv.appendChild(randomNextButton);

document.addEventListener("DOMContentLoaded", function () {
  const hideButton = document.querySelector(".hide");
  const hideableElements = document.querySelectorAll(".hideable");

  hideButton.addEventListener("click", function () {
    hideableElements.forEach((element) => {
      element.classList.toggle("hidden");
    });
  });

  const menuIcon = document.getElementById("menuIcon");
  const menu = document.getElementById("menu");

  menuIcon.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

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
