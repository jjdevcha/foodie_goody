import View from "./View.js";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
          <a href="#${this._data.id}" class="preview__link 
            ${this._data.id === id ? "preview__link--active" : ""}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
            </div>
          </a>
        </li>     
        `;
  }
}
export default new PreviewView();
