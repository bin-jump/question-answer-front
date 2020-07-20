import axios from 'axios';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function requestFromMethod({
  url,
  method = 'GET',
  data = null,
  header = null,
}) {
  let config = {};
  if (header) {
    config.headers = {
      ...header,
    };
  }

  if (!methods.includes(method)) {
    throw new Error(`Invalid request method ${method}`);
  }

  let req = axios.get(url, config);

  if (method === 'POST') {
    req = axios.post(url, data, config);
  } else if (method === 'PUT') {
    req = axios.put(url, data, config);
  } else if (method === 'DELETE') {
    req = axios.delete(url, config);
  }

  return req;
}

function makeRequest({
  url,
  beginConst,
  successConst,
  failureConst,
  method = 'GET',
  data = null,
  id = null,
}) {
  return (dispatch) => {
    dispatch({
      type: beginConst,
      id: id,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = requestFromMethod({ url, method, data });
      doRequest.then(
        (res) => {
          //console.log(res);
          dispatch({
            type: successConst,
            data: res.data,
            id: id,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: failureConst,
            data: { error: err },
            id: id,
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function getRequest(url, beginConst, successConst, failureConst, id) {
  return makeRequest({ url, beginConst, successConst, failureConst, id });
}

export function postRequest(
  url,
  data,
  beginConst,
  successConst,
  failureConst,
  id,
) {
  return makeRequest({
    url,
    data,
    method: 'POST',
    beginConst,
    successConst,
    failureConst,
    id,
  });
}

export function milisecToDate(timeLong) {
  timeLong *= 1000;
  let date = new Date(timeLong);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const mon = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  return `${mon} ${day}, ${year}`;
}
