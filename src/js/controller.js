import view from './views/View.js';

const controlSearchResults = async function (e) {
    try {
        // 1) Get search query
        const query = view.getQuery();

        // 2) Console search result
        const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=2eaf4c1b5b594a09a576c6008073c3a0`);
        const data = await res.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
};

view.addHandlerSearch(controlSearchResults);