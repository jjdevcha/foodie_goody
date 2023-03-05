import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import recipeView from "./views/recipeView.js";
import * as model from "./model.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //Updating bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Load Recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};
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

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/ remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update recipe view
  recipeView.render(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);

  // Having a issue that bookmark view is not getting updated straight away after deleting the bookmark
  // The result appears when I refresh the page, it's just not automatically doing it :(
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function () {
  const overlay = document.querySelector(".overlay");
  const addRecipeForm = document.querySelector(".add-recipe-window");

  overlay.classList.toggle("hidden");
  addRecipeForm.classList.toggle("hidden");
};

bookmarksView.addHandlerRender(controlBookmarks);
searchView.addHandlerSearch(controlSearchResults);
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookmark);
addRecipeView.addHandlerClose(controlAddRecipe);
addRecipeView.addHandlerOpen(controlAddRecipe);
