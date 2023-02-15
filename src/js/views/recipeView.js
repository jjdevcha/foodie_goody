import View from "./View.js";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
            <figure class="recipe__fig">
                <img class="recipe__img" src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img">
                <h1 class="recipe__title">
                <span>${this._data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <i class="fa-regular fa-clock"></i>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      this._data.readyInMinutes
                    }</span>
                    <span class="recipe__info-text">minutes</span>
                </div>

                <div class="recipe__info">
                    <i class="fa-solid fa-person"></i>
                    <span class="recipe__info-data recipe__info-data--people">${
                      this._data.servings
                    }</span>
                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn--tiny btn--update-servings" data-update-to="${
                          this._data.servings - 1
                        }">
                        <i class="fa-sharp fa-solid fa-circle-minus"></i>
                        </button>
                        <button class="btn--tiny btn--update-servings" data-update-to="${
                          this._data.servings + 1
                        }">
                        <i class="fa-sharp fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                </div>

                <button class="btn--round">
                <i class="fa-regular fa-bookmark btn--bookmark"></i>
                <!-- <i class="fa-solid fa-bookmark"></i> filled -->
                </button>

            </div>
            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this._data.ingredients
                      .map(this._generateMarkupIngredient)
                      .join("")}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__source">${
                      this._data.sourceName
                    }</span>. Please check out directions at their website.
                </p>
                <a href="${
                  this._data.sourceUrl
                }" class="btn--small recipe_btn" target="_blank">
                    <span>Directions</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>

            
        `;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="recipe__ingredient">
                <i class="fa-solid fa-check"></i>
                <div class="recipe__quantity">${
                  ing.amount ? fracty(ing.amount) : ""
                }</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    <span class="recipe__ing">${ing.name}</span>
                </div>
            </li>
        `;
  }
}

export default new RecipeView();
