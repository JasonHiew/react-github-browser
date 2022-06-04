import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import { getData } from "../services";
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from "../constants";

function* fetchUsersSaga() {
  yield takeLatest(
    [actions.GET_USERS, actions.GET_NEXT_USERS_BATCH],
    function* ({ type }) {
      try {
        const { currentPage, isEndOfCatalogue } = yield select(
          (state) => state.users
        );

        if (isEndOfCatalogue) {
          const itemsReminder = MAX_CATALOGUE_LENGTH % BATCH_SIZE;
          if (itemsReminder === 0) {
            return;
          }

          const users = yield call(
            getData,
            `https://randomuser.me/api/?page=${currentPage}&results=${itemsReminder}`
            // `https://api.github.com/orgs/reactjs/repos`
          );

          yield put(actions.getUsersSuccess(users));
        }

        const users = yield call(
          getData,
          `https://randomuser.me/api/?page=${currentPage}&results=${BATCH_SIZE}`
          // `https://api.github.com/orgs/reactjs/repos`
        );

        if (type === actions.GET_USERS) {
          yield put(actions.getUsersSuccess(users));
        } else {
          yield put(actions.getNextUsersBatchSuccess(users));
        }

        if (type === actions.GET_USERS) {
          yield put(actions.getNextUsersBatch());
        }
      } catch (error) {
        if (type === actions.GET_USERS) {
          yield put(actions.getUsersFailure());
        } else {
          yield put(actions.getNextUsersBatchFailure());
        }
      }
    }
  );
}

export default function* rootSaga() {
  yield takeEvery([actions.GET_USERS, actions.GET_NEXT_USERS_BATCH], fetchUsersSaga);
  // yield takeLatest('CREATE_USER', createUser);
}

