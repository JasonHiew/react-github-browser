import * as actions from "./actions";
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from "../constants";

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

const initialOrgState = {
  isFetching: true,
  hasErrored: false,
  items: [],
};

const initialState = {
  isFetching: true,
  hasErrored: false,
  isEndOfCatalogue: false,
  items: [],
  nextItemsBatch: [],
  currentPage: 1,
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
