import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import * as model from "./model.js";

const controlSearchResults = async function (e) {
  try {
    // 1) Get search query
    const query = searchView.getQuery();

    // 2) Console search result
    await model.loadSearchResult(query);

    // 3) Render search result
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

searchView.addHandlerSearch(controlSearchResults);
