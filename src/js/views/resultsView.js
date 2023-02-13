import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return this._data
      .map((result) => this._generateItemMarkup(result))
      .join("");
  }

  _generateItemMarkup(res) {
    return `
        <li class="preview">
          <a href="#${res.id}" class="preview__link">
            <figure class="preview__fig">
              <img src="${res.image}" alt="${res.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${res.title}</h4>
            </div>
          </a>
        </li>     
        `;
  }
}

export default new ResultsView();
