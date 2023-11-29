import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElemeents = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElemeents);
    // console.log(curElement);

    newElemeents.forEach((newEl, i) => {
      const curEl = curElement[i];
      //   console.log(curEl, newEl.isEqualNode(curEl));

      // update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('!!!!', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        //   console.log(curEl, curEl.attributes);
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // console.log(this._data);
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errMsg = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
           <svg>
             <use href="${icons}#icon-alert-triangle"></use>
           </svg>
        </div>
        <p>${errMsg}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderMsg() {
    const markup = `
    <div class="message">
      <div>
        <svg>
         <use href="src/img/${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${this._meassage}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
