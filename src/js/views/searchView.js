class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const val = this.#parentElement.querySelector('.search__field').value;
    this._clearInput();
    return val;
  }

  _clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
