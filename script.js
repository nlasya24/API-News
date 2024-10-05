
const apiUrl = 'news.json'; 
const newsContainer = document.getElementById('news-container');
let articles = [];

async function fetchNews() {
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched articles:", data.articles);
        articles = shuffleArray(data.articles);
        renderNews();
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching articles.</p>';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderNews() {
    newsContainer.innerHTML = '';
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="${article.title}">
        `;
        articleElement.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        newsContainer.appendChild(articleElement);
    } else {
        newsContainer.innerHTML = '<p>No articles available.</p>';
    }
}

function refreshNews() {
    renderNews();
}

document.getElementById('refresh-button').addEventListener('click', refreshNews);

fetchNews();