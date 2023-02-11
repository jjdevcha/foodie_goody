import View from './View.js';

class ResultsView extends View {
    _parentElement = document.querySelector(".search");
  
    getQuery() {
      const query = this._parentElement.querySelector(".search__field").value;
      this._clearInput();
      return query;
    }
  
    _clearInput() {
      this._parentElement.querySelector(".search__field").value = "";
    }

    _generateResultItemMarkup(recipe) {
        return `
            <li class="results_item">
                <img src="${recipe.image}" alt="${recipe.title}">
                <span class="title">${recipe.title}</span>
            </li>        
        `;
    }
}

export default new ResultsView();

