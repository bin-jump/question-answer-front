import axios from 'axios';
import { COMMON_SHOW_ERROR } from './redux/constants';

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

  let req = null;
  if (method === 'GET') {
    req = axios.get(url, config);
  } else if (method === 'POST') {
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
  extra = null,
}) {
  return (dispatch) => {
    dispatch({
      type: beginConst,
      id,
      extra,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = requestFromMethod({ url, method, data });
      doRequest.then(
        (res) => {
          //console.log(res);
          dispatch({
            type: successConst,
            data: res.data,
            id,
            extra,
          });

          if (res.data.status != 'SUCCESS') {
            dispatch({ type: COMMON_SHOW_ERROR, message: res.data.msg });
          }
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: failureConst,
            data: { error: err },
            id,
            extra,
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function getRequest(
  url,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function postRequest(
  url,
  data,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    data,
    method: 'POST',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function putRequest(
  url,
  data,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    data,
    method: 'PUT',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function deleteRequest(
  url,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    method: 'DELETE',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
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

export function milisecToMonDay(timeLong) {
  timeLong *= 1000;
  let date = new Date(timeLong);
  //const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const mon = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  return `${mon}/${day}`;
}

export function milisecToTime(timeLong) {
  timeLong *= 1000;
  let date = new Date(timeLong);
  //const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const hour = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    hour12: false,
  }).format(date);
  const min = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(date);
  return `${hour}:${min}`;
}

export function extractUrlKey(path) {
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  let key = path.split('/').slice(-1)[0];
  return key;
}
