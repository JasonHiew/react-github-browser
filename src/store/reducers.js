import * as actions from './actions';
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from 'constants/constants';

/**
 * Check if number of items exceeds the desired end of catalogue.
 *
 * @param {number} currentPage.
 * @param {number} batchSize.
 * @param {number} maxCatalogueLength.
 * @returns {boolean}
 */
export function checkEndOfCatalogue(
  currentPage,
  batchSize,
  maxCatalogueLength
) {
  return batchSize * currentPage > maxCatalogueLength;
}

// repos state: Has all the repos
const initialState = {
  isFetching: true,
  hasErrored: false,
  isEndOfCatalogue: false,
  items: [],
  nextItemsBatch: [],
  currentPage: 1,
};

// org state: Has organization details
const initialOrgState = {
  isFetching: true,
  hasErrored: false,
  items: [],
};

// repo state: Has a specific repo details
const initialRepoState = {
  isFetching: true,
  hasErrored: false,
  name: '',
  items: [],
};

// searchRepos state: Has the search results
const initialSearchState = {
  isFetching: true,
  hasErrored: false,
  searchedName: '',
  totalCount: 0,
  incompleteResults: false,
  items: [],
};

/**
 * Get organization.
 *
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
export const org = (state = initialOrgState, action) => {
  switch (action.type) {
    case actions.GET_ORG:
      return {
        ...state,
        isFetching: true,
        hasErrored: false,
      };
    case actions.GET_ORG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        items: [...state.items, action.org], //org is a single object. Don't use the spread (...) operator.
      };
    case actions.GET_ORG_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    default:
      return state;
  }
};

/**
 * Get repos.
 *
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
export const repos = (state = initialState, action) => {
  const isEndOfCatalogue = checkEndOfCatalogue(
    BATCH_SIZE,
    state.currentPage,
    MAX_CATALOGUE_LENGTH
  );
  switch (action.type) {
    case actions.GET_REPOS:
      return {
        ...state,
        isFetching: true,
        hasErrored: false,
      };
    case actions.GET_REPOS_SUCCESS:
      if (isEndOfCatalogue) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false,
          isEndOfCatalogue: true,
        };
      }
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        isEndOfCatalogue: false,
        items: [...state.items, ...action.repos],
        currentPage: state.currentPage + 1,
      };
    case actions.GET_REPOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    case actions.GET_NEXT_REPOS_BATCH_SUCCESS:
      if (isEndOfCatalogue) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false,
          isEndOfCatalogue: true,
        };
      }

      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        nextItemsBatch: action.repos,
        currentPage: state.currentPage + 1,
      };
    case actions.GET_NEXT_REPOS_BATCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    case actions.ADD_NEXT_REPOS_BATCH:
      return {
        ...state,
        items: [...state.items, ...state.nextItemsBatch],
        nextItemsBatch: [],
      };
    default:
      return state;
  }
};

/**
 * Get specific repository's details.
 *
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
export const repoDetails = (state = initialRepoState, action) => {
  switch (action.type) {
    case actions.GET_SPECIFIC_REPO:
      return {
        ...state,
        name: action.name,
        isFetching: true,
        hasErrored: false,
      };
    case actions.GET_SPECIFIC_REPO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        items: [action.repoDetails], //Don't need to keep old items. Just replace them.
      };
    case actions.GET_SPECIFIC_REPO_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    default:
      return state;
  }
};

/**
 * Search repos.
 *
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
export const searchRepos = (state = initialSearchState, action) => {
  switch (action.type) {
    case actions.SEARCH_REPO:
      return {
        ...state,
        searchedName: action.searchedName,
        isFetching: true,
        hasErrored: false,
      };
    case actions.SEARCH_REPO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        totalCount: action.repos.total_count,
        incompleteResults: action.repos.incomplete_results,
        items: [...action.repos.items],
      };
    case actions.SEARCH_REPO_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    case actions.CLEAR_SEARCH_REPO_SUCCESS:
      return {
        ...initialSearchState,
      };
    case actions.CLEAR_SEARCH_REPO_FAILURE:
      return {
        isFetching: initialSearchState.isFetching,
        hasErrored: true,
        totalCount: initialSearchState.totalCount,
        incompleteResults: initialSearchState.incompleteResults,
        items: initialSearchState.items,
      };
    default:
      return state;
  }
};
