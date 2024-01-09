// import './style.css'

import {delCardFromStorage, getCardsFromStorage, getUserInfo, saveCardInStorage, setDefaultCardsInStorage, updateCardInStorage} from "./storage.js";

// setupCounter(document.querySelector('#counter'))
const catalog = document.getElementById("catalog");
const cardTemplate = document.getElementById("card-template");
const preloaderTemplate = document.getElementById("card-preloader-template");
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
            submitFunction(newCard, modal);
        }
        // const saveCard = saveCardInStorage(newCard);
        // if (saveCard) {
        //   addCard(saveCard)
        // }
    })
}

addBtn.addEventListener('click', () => {
    openModal(undefined, addCard)
})

defaultBtn.addEventListener('click', async () => {
    setPreloader(catalog)
    const cards = await setDefaultCardsInStorage();
    setCards(cards, catalog)

})

function setCards(cards, catalog) {
  catalog.replaceChildren();
  for (const card of cards) {
    addCardInInterface(card, catalog)
  }
}

function openModal(card, submitCallback) {
    modal.querySelector("[name='sending']").style.display = 'none'
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

function addCardInInterface(card, catalog) {
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
        openModal(card, (updCard, modal) => updateCard(updCard, clone, modal));
    })

    const delBtn = clone.querySelector('[name="delBtn"]');
    delBtn.addEventListener('click', () => {
        deleteCard(card.id, clone);
    })
    catalog.appendChild(clone);
}

async function deleteCard(id, card) {
    try {
        card.querySelector("[name='deleting']").style.display = 'flex'
        await delCardFromStorage(card)
        card.remove();
    } catch (e) {
        console.error(e);
    } finally {
        modal.style.display = 'none';
        if (card) {
            card.querySelector("[name='deleting']").style.display = 'none'
        }
    }

    delCardFromStorage(id);
    card.remove();
}

async function addCard(card, modal) {
    try {
        modal.querySelector("[name='sending']").style.display = 'flex'
        const saveCard = await (await saveCardInStorage(card)).json()
        if (!saveCard) return;
            addCardInInterface(saveCard, catalog)
    } catch (e) {
        console.error(e);
    } finally {
        modal.style.display = 'none';
    }
}

async function updateCard(card, clone, modal) {
    try {
        modal.querySelector("[name='sending']").style.display = 'flex'
        const saveCard = await (await updateCardInStorage(card)).json()
        console.log('saveCard', saveCard);
        if (!saveCard) return;
        updateCardInInterface(clone, saveCard)
    } catch (e) {
        console.error(e);
    } finally {
        modal.style.display = 'none';
    }
}

function setPreloader(catalog) {
    catalog.replaceChildren()
    const clone = preloaderTemplate.content.firstElementChild.cloneNode(true);
    catalog.appendChild(preloaderTemplate.content.firstElementChild.cloneNode(true));
    catalog.appendChild(preloaderTemplate.content.firstElementChild.cloneNode(true));
    catalog.appendChild(preloaderTemplate.content.firstElementChild.cloneNode(true));
    catalog.appendChild(preloaderTemplate.content.firstElementChild.cloneNode(true));
    catalog.appendChild(preloaderTemplate.content.firstElementChild.cloneNode(true));
    
}

async function mounted() {
    setupModal(modal);
    try {
        const user = await (await getUserInfo()).json()
        const header = document.getElementById("header");
        header.querySelector("[name='infoPL']").style.display = 'none';
        header.querySelector("[name='gitPL']").style.display = 'none';
        const info = header.querySelector("[name='info']");
        info.querySelector("[name='fio']").textContent = user.name
        info.querySelector("[name='group']").textContent = user.group
        info.style.display = 'block'
        const git = header.querySelector("[name='git']");
        git.textContent = user.repo;
        git.setAttribute("href", user.repo);
        git.style.display = 'block'
        const cards = await (await getCardsFromStorage()).json()
        if (!cards) return;
            setCards(cards, catalog);
    } catch (e) {
        console.error(e);
    }
    // getCardsFromStorage()
    //     .then(cards => {
    //         if (!cards || !cards.length) return;

    //         setCards(cards, catalog);
    //     })
}

mounted()
