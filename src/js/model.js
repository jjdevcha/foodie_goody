export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: 10,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const recipe = data;

  return {
    id: recipe.id,
    title: recipe.title,
    sourceName: recipe.sourceName,
    sourceUrl: recipe.sourceUrl,
    image: recipe.image,
    servings: recipe.servings,
    readyInMinutes: recipe.readyInMinutes,
    ingredients: recipe.extendedIngredients,
  };
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=2eaf4c1b5b594a09a576c6008073c3a0`
    );
    const data = await res.json();

    // console.log(data);

    state.search.results = data.results.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image,
      };
    });

    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=2eaf4c1b5b594a09a576c6008073c3a0`
    );
    const data = await res.json();

    // console.log(data);

    state.recipe = createRecipeObject(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.amount = (ing.amount / state.recipe.servings) * newServings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as Not bookmarked
  state.recipe.bookmarked = false;

  persistBookmarks();
};

const clearBookmarks = function () {
  localStorage.removeItem("bookmarks");
};

const storage = localStorage.getItem("bookmarks");
if (storage) state.bookmarks = JSON.parse(storage);
