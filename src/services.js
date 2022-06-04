import axios from "axios";

/**
 *  Fetch data from REST API via HTTP request.
 *
 * @param {string} endpoint.
 * @returns {JSON} response from API.
 */
const getData = (endpoint) => {
  return axios.get(endpoint)
    .then((response) => {
      if (!response) throw new Error(response.statusText);
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(
        `There was the following problem: ${err} while fetching ${endpoint}`
      );
    });
};

export { getData };
