import resultsView from './views/resultsView.js';
import * as model from './model.js';


const controlSearchResults = async function (e) {
    try {
        // 1) Get search query
        const query = resultsView.getQuery();

        // 2) Console search result
        await model.loadSearchResult(query);

        // 3) Render search result
        

    } catch (error) {
        console.log(error);
    }
};

resultsView.addHandlerSearch(controlSearchResults);