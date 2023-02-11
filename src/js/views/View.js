export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return Error;

    this._data = data;
    console.log("this._data", this._data);
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    console.log("this._parentEl", this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
