export const GET_ORG = "GET_ORG";
export const GET_ORG_SUCCESS = "GET_ORG_SUCCESS";
export const GET_ORG_FAILURE = "GET_ORG_FAILURE";

export const GET_REPOS = "GET_REPOS";
export const GET_REPOS_SUCCESS = "GET_REPOS_SUCCESS";
export const GET_REPOS_FAILURE = "GET_REPOS_FAILURE";

export const GET_NEXT_REPOS_BATCH = "GET_NEXT_REPOS_BATCH";
export const GET_NEXT_REPOS_BATCH_SUCCESS = "GET_NEXT_REPOS_BATCH_SUCCESS";
export const GET_NEXT_REPOS_BATCH_FAILURE = "GET_NEXT_REPOS_BATCH_FAILURE";
export const ADD_NEXT_REPOS_BATCH = "ADD_NEXT_REPOS_BATCH";

/**
 * Get organization.
 *
 * @returns {Object} action.
 */
 export const getOrg = () => {
  return {
    type: GET_ORG
  };
};

/**
 *  Organization successfully received.
 *
 * @param {Object} org.
 * @returns {Object} action.
 */
export const getOrgSuccess = (org) => {
  return {
    type: GET_ORG_SUCCESS,
    org
  };
};

/**
 * Failed to get organization.
 *
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getOrgFailure = (errors) => {
  return {
    type: GET_ORG_FAILURE,
    errors
  };
};

/**
 * Get Repos.
 *
 * @returns {Object} action.
 */
export const getRepos = () => {
  return {
    type: GET_REPOS
  };
};

/**
 *  Repos successfully received.
 *
 * @param {Object} repos.
 * @returns {Object} action.
 */
export const getReposSuccess = (repos) => {
  return {
    type: GET_REPOS_SUCCESS,
    repos
  };
};

/**
 * Failed to get repos.
 *
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getReposFailure = (errors) => {
  return {
    type: GET_REPOS_FAILURE,
    errors
  };
};

/**
 * Get Next Repos batch.
 *
 * @returns {Object} action.
 */
export const getNextReposBatch = () => {
  return {
    type: GET_NEXT_REPOS_BATCH
  };
};

/**
 *  Next batch of Repos successfully received.
 *
 * @param {Object} repos.
 * @returns {Object} action.
 */
export const getNextReposBatchSuccess = (repos) => {
  return {
    type: GET_NEXT_REPOS_BATCH_SUCCESS,
    repos
  };
};

/**
 * Failed to get next repos batch.
 *
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getNextReposBatchFailure = (errors) => {
  return {
    type: GET_NEXT_REPOS_BATCH_FAILURE,
    errors
  };
};

/**
 * Add next items batch to items state.
 *
 * @returns {Object} action.
 */
export const addNextReposBatch = () => {
  return {
    type: ADD_NEXT_REPOS_BATCH
  };
};
