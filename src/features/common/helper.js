import axios from 'axios';

function makeRequest(url, beginConst, successConst, failureConst, id) {
  return (dispatch) => {
    dispatch({
      type: beginConst,
      id: id,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(url);
      doRequest.then(
        (res) => {
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
  return makeRequest(url, beginConst, successConst, failureConst, id);
}

export function milisecToDate(timeLong) {
  timeLong *= 1000;
  let date = new Date(timeLong);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const mon = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  return `${mon} ${day}, ${year}`;
}
