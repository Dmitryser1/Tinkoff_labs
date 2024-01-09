export async function setDefaultCardsInStorage() {
    const savedCards = []
    try {
        const allCards = await (await getCardsFromStorage()).json();
        for await (const card of allCards) {
            await delCardFromStorage(card.id)
        }
        for await (const card of defaultArray) {
            savedCards.push(await (await saveCardInStorage(card)).json())
        }
    } catch (e) {
        console.error(e);
    } finally {
        return savedCards;
    }
}

export function saveCardInStorage(card) {
    if (!card) return;
    
    return fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(card)
    });
}

export function updateCardInStorage(card) {
    if (!card || !card.id) return;
    
    return fetch(`http://localhost:3000/items/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(card)
    });
}

export function delCardFromStorage(id) {
    return fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
    });
}

export function getCardsFromStorage() {
    return fetch('http://localhost:3000/items')
}

export function getUserInfo() {
    return fetch('http://localhost:3000/creatorInfo')
}

const defaultArray = [
    {
        img: "https://nazya.com/anyimage/ae01.alicdn.com/kf/HTB15Y7FyWmWBuNjy1Xaq6xCbXXaa/2018.jpg",
        name: "Кеды 1",
        description: "Описание описание\n описание",
        provider: "Поставщик 1",
        code: 2314324
    },
    {
        img: "http://lamcdn.net/furfurmag.ru/post-cover/AmEAJrRXAnJlkIFoC7ahfg-default.jpg",
        name: "Кеды 2",
        description: "Описание описание\n описание",
        provider: "Поставщик 2",
        code: 987675
    },
    {
        img: "https://ae04.alicdn.com/kf/H1ef3094fe1d640da8d5f385a563f23ddT.jpg",
        name: "Кеды 3",
        description: "Описание описание\n описание",
        provider: "Поставщик 3",
        code: 58566
    }
]