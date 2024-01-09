// import './style.css'

import { delCardFromStorage, getCardsFromStorage, saveCardInStorage, setDefaultCardsInStorage } from "./storage";

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
const catalog = document.getElementById("catalog");
const cardTemplate = document.getElementById("card-template");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-btn");
const defaultBtn = document.getElementById("default-btn");

let submitFunction = undefined;

function setupModal(modal) {
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  })
  
  modal.querySelector('#modal-window').addEventListener('click', (e) => {
    e.stopPropagation();
  })

  modal.querySelector('[name="img"]').addEventListener('blur', (e) => {
    console.log("blur", e.target.value);
    modal.querySelector('img').setAttribute("src", e.target.value);
  })

  modal.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newCard = {
      id: e.target.querySelector('[name="id"]').value,
      img: e.target.querySelector('[name="img"]').value,
      name: e.target.querySelector('[name="name"]').value,
      description: e.target.querySelector('[name="description"]').value,
      provider: e.target.querySelector('[name="provider"]').value,
      code: e.target.querySelector('[name="code"]').value,
    }
    if (submitFunction) {
      submitFunction(newCard);
    }
    // const saveCard = saveCardInStorage(newCard);
    // if (saveCard) {
    //   addCard(saveCard)
    // }

    modal.style.display = 'none';
  })
}

addBtn.addEventListener('click', () => {
  openModal(undefined, (addCard) => {
    const saveCard = saveCardInStorage(addCard);
    if (saveCard) {
      addCardInInterface(saveCard)
    }
  })
})

defaultBtn.addEventListener('click', () => {
  catalog.replaceChildren();
  const cards = setDefaultCardsInStorage();
  for(const card of cards) {
    addCardInInterface(card)
  }

})

function openModal(card, submitCallback) {
  modal.querySelector('img').setAttribute("src", card?.img || '');
  modal.querySelector('[name="id"]').value = card?.id || '';
  modal.querySelector('[name="img"]').value = card?.img || '';
  modal.querySelector('[name="name"]').value = card?.name || '';
  modal.querySelector('[name="description"]').value = card?.description || '';
  modal.querySelector('[name="provider"]').value = card?.provider || '';
  modal.querySelector('[name="code"]').value = card?.code || 0;

  modal.style.display = 'flex';

  submitFunction = submitCallback;
}

function updateCardInInterface(node, card) {
  const img = node.querySelector('[name="img"]');
  img.setAttribute("src", card.img);
  const name = node.querySelector('[name="name"]');
  name.textContent = card.name;  
  const description = node.querySelector('[name="description"]');
  description.textContent = card.description;
  const provider = node.querySelector('[name="provider"]');
  provider.textContent = card.provider;  
  const code = node.querySelector('[name="code"]');
  code.textContent = card.code;
}

function addCardInInterface(card) {
  const clone = cardTemplate.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector('[name="img"]');
  img.setAttribute("src", card.img);
  const name = clone.querySelector('[name="name"]');
  name.textContent = card.name;  
  const description = clone.querySelector('[name="description"]');
  description.textContent = card.description;
  const provider = clone.querySelector('[name="provider"]');
  provider.textContent = card.provider;  
  const code = clone.querySelector('[name="code"]');
  code.textContent = card.code;

  const editBtn = clone.querySelector('[name="editBtn"]');
  editBtn.addEventListener('click', () => {
    openModal(card, (updCard) => {
      const saveCard = saveCardInStorage(updCard);
      if (saveCard) {
        updateCardInInterface(clone, saveCard)
      }
    });
  })

  const delBtn = clone.querySelector('[name="delBtn"]');
  delBtn.addEventListener('click', () => {
    deleteCard(card.id, clone);
  })
  catalog.appendChild(clone);
}

function deleteCard(id, card) {
  delCardFromStorage(id);
  card.remove();
}

function mounted() {
  setupModal(modal);
  const cards = getCardsFromStorage();

  for(const card of cards) {
    addCardInInterface(card)
  }
}

mounted()