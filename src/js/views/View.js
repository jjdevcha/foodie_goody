export default class View {

    addHandlerSearch(handler) {
      this._parentElement.addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
    }
  }
  
