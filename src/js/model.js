export const state = {
    recipe: {},
    search : {
        query: "",
        results: [],
        resultsPerPage: 10,
        page: 1,
    },
    bookmarks: [],
};

export const loadSearchResult = async function(query) {
    try {
        state.search.query = query;

        const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=2eaf4c1b5b594a09a576c6008073c3a0`);
        const data = await res.json();

        console.log(data);

        state.search.results = data.results.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                image: rec.image,
            }
        });

        state.search.page = 1;

    } catch (error) {
        console.log(error);
        throw error;
    }
}