import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import { getData } from "../services";
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from "../constants";

function* fetchOrgSaga({ type }) {
  try {
    const org = yield call(
      getData,
      // `https://randomuser.me/api/?page=${currentPage}&results=${BATCH_SIZE}`
      `https://api.github.com/orgs/reactjs`
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
        // `https://randomuser.me/api/?page=${currentPage}&results=${itemsReminder}`
        `https://api.github.com/orgs/reactjs/repos?per_page=${BATCH_SIZE}&page=${currentPage}`
      );

      yield put(actions.getReposSuccess(repos));
    }

    const repos = yield call(
      getData,
      // `https://randomuser.me/api/?page=${currentPage}&results=${BATCH_SIZE}`
      `https://api.github.com/orgs/reactjs/repos?per_page=${BATCH_SIZE}&page=${currentPage}`
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

export default function* rootSaga() {
  yield takeLatest(actions.GET_ORG, fetchOrgSaga);
  yield takeLatest(
    [actions.GET_REPOS, actions.GET_NEXT_REPOS_BATCH],
    fetchReposSaga
  );
  // yield takeLatest('CREATE_USER', createUser);
}
