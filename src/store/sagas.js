import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import { getData } from 'services/services';
import {
  BATCH_SIZE,
  MAX_CATALOGUE_LENGTH,
  ORGANIZATION,
} from 'constants/constants';
import { push } from 'redux-first-history';

function* fetchOrgSaga({ type }) {
  try {
    const org = yield call(
      getData,
      `https://api.github.com/orgs/${ORGANIZATION}`
    );

    if (type === actions.GET_ORG) {
      yield put(actions.getOrgSuccess(org));
    }
  } catch (error) {
    if (type === actions.GET_ORG) {
      yield put(actions.getOrgFailure());
    }
  }
}

function* fetchSpecificRepoSaga({ type }) {
  try {
    const { name } = yield select((state) => state.repoDetails);
    const repoDetails = yield call(
      getData,
      `https://api.github.com/repos/${ORGANIZATION}/${name}`
    );

    if (type === actions.GET_SPECIFIC_REPO) {
      yield put(actions.getSpecificRepoSuccess(repoDetails));
      yield put(push(`/details/${name}`));
    }
  } catch (error) {
    if (type === actions.GET_SPECIFIC_REPO) {
      yield put(actions.getSpecificRepoFailure());
    }
  }
}

function* fetchReposSaga({ type }) {
  try {
    const { currentPage, isEndOfCatalogue } = yield select(
      (state) => state.repos
    );

    if (isEndOfCatalogue) {
      const itemsReminder = MAX_CATALOGUE_LENGTH % BATCH_SIZE;
      if (itemsReminder === 0) {
        return;
      }

      const repos = yield call(
        getData,
        `https://api.github.com/orgs/${ORGANIZATION}/repos?per_page=${BATCH_SIZE}&page=${currentPage}`
      );

      yield put(actions.getReposSuccess(repos));
    }

    const repos = yield call(
      getData,
      `https://api.github.com/orgs/${ORGANIZATION}/repos?per_page=${BATCH_SIZE}&page=${currentPage}`
    );

    if (type === actions.GET_REPOS) {
      yield put(actions.getReposSuccess(repos));
    } else {
      yield put(actions.getNextReposBatchSuccess(repos));
    }

    if (type === actions.GET_REPOS) {
      yield put(actions.getNextReposBatch());
    }
  } catch (error) {
    if (type === actions.GET_REPOS) {
      yield put(actions.getReposFailure());
    } else {
      yield put(actions.getNextReposBatchFailure());
    }
  }
}

function* searchRepoSaga({ type }) {
  try {
    const { searchedName } = yield select((state) => state.searchRepos);

    const repos = yield call(
      getData,
      `https://api.github.com/search/repositories?q=${searchedName}+in:name+org:${ORGANIZATION}`
    );

    if (type === actions.SEARCH_REPO) {
      yield put(actions.searchRepoSuccess(repos));
    }
  } catch (error) {
    if (type === actions.SEARCH_REPO) {
      yield put(actions.searchRepoFailure());
    }
  }
}

function* clearSearchRepoSaga({ type }) {
  try {
    if (type === actions.CLEAR_SEARCH_REPO) {
      yield put(actions.clearSearchRepoSuccess());
    }
  } catch (error) {
    if (type === actions.CLEAR_SEARCH_REPO) {
      yield put(actions.clearSearchRepoFailure());
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.GET_ORG, fetchOrgSaga);
  yield takeLatest(actions.GET_SPECIFIC_REPO, fetchSpecificRepoSaga);
  yield takeEvery(
    [actions.GET_REPOS, actions.GET_NEXT_REPOS_BATCH],
    fetchReposSaga
  );
  yield takeEvery(actions.SEARCH_REPO, searchRepoSaga);
  yield takeEvery(actions.CLEAR_SEARCH_REPO, clearSearchRepoSaga);
}
