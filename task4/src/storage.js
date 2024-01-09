export function setDefaultCardsInStorage() {
    localStorage.setItem('cards', JSON.stringify(defaultArray));
    return defaultArray;
}

export function saveCardInStorage(card) {
    if (!card) return;
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    if (!card.id) {
        card.id = cards.length + 1;
        cards.push(card);
    } else {
        const index = cards.findIndex((x) => Number(x.id) === Number(card.id));
        cards[index] = card;
    }
    console.log("cards", cards);
    localStorage.setItem('cards', JSON.stringify(cards));
    return card;
}

export function delCardFromStorage(id) {
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    localStorage.setItem('cards', JSON.stringify(cards.filter(card => card.id !== id)));
}

export function getCardsFromStorage() {
    const cards = localStorage.getItem('cards');
    if (!cards) return setDefaultCardsInStorage();
    return JSON.parse(localStorage.getItem('cards') || '[]');
}

export function getCardFromStorage(id) {
    return JSON.parse(localStorage.getItem('cards') || '[]').find(card => card.id === id);
}


const defaultArray = [
    {
        id: 1,
        img: "https://nazya.com/anyimage/ae01.alicdn.com/kf/HTB15Y7FyWmWBuNjy1Xaq6xCbXXaa/2018.jpg",
        name: "Кеды 1",
        description: "Описание описание\n описание",
        provider: "Поставщик 1",
        code: 2314324
    },
    {
        id: 2,
        img: "https://ae01.alicdn.com/kf/HTB1vD32XOzxK1Rjy1zkq6yHrVXaQ/-.jpg",
        name: "Кеды 2",
        description: "Описание описание\n описание",
        provider: "Поставщик 2",
        code: 1223432
    },
    {
        id: 3,
        img: "https://ae01.alicdn.com/kf/HTB1QPGVcy6guuRkSmLyq6AulFXa3/Canvas-Children-Sport-Flat-Shoes-Breathable-Boys-Girls-Sneakers-Kids-Flats-Shoes-for-Girls-Jeans-Denim.jpg",
        name: "Кеды 3",
        description: "Описание описание\n описание",
        provider: "Поставщик 3",
        code: 5435436
    },
    {
        id: 4,
        img: "http://lamcdn.net/furfurmag.ru/post-cover/AmEAJrRXAnJlkIFoC7ahfg-default.jpg",
        name: "Кеды 4",
        description: "Описание описание\n описание",
        provider: "Поставщик 4",
        code: 43276765
    },
    {
        id: 5,
        img: "https://ae04.alicdn.com/kf/H1ef3094fe1d640da8d5f385a563f23ddT.jpg",
        name: "Кеды 5",
        description: "Описание описание\n описание",
        provider: "Поставщик 5",
        code: 4534534
    },
]