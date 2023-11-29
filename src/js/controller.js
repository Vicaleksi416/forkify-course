import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) update selected result in result view
    resultsView.update(model.getSearchResultPage());

    // 1) Loading
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // console.log(model.state.recipe);

    // 3) update bookmark view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(err);
    console.error(`${err} 😒😒`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search
    await model.loadSearchs(query);
    // console.log(model.state.search.results);

    // 3) render result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) render pag button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  // 1) render new result
  resultsView.render(model.getSearchResultPage(gotoPage));

  // 4) render new pag button
  paginationView.render(model.state.search);
};

const controlServing = function (n) {
  // update the recipe servings (in state)
  model.updateServings(n);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  // 1) add/delete bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update view
  recipeView.update(model.state.recipe);

  // 3) update bookmark list
  bookmarksView.render(model.state.bookmarks);
};

const initBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(initBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmarks(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  console.log('testing congfig');
};

init();
