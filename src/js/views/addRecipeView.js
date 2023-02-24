import View from "./View.js";

class AddRecipeView extends View {
  _btn = document.querySelector(".btn--close-modal");
  _overlay = document.querySelector(".overlay");
  _myRecipeBtn = document.querySelector(".nav__btn");

  addHandlerClose(handler) {
    this._btn.addEventListener("click", handler);
    this._overlay.addEventListener("click", handler);
  }

  addHandlerOpen(handler) {
    this._myRecipeBtn.addEventListener("click", handler);
  }
}

export default new AddRecipeView();
