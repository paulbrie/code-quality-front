import { CODE_VALIDATOR_API_URL } from '../../config/api';
import { getHeaders } from './apiUtils'; 

export function lintCode(data) {
  const options = {
    headers: getHeaders(),
    method: 'POST',
    // mode: 'cors',
    body: data ? JSON.stringify(data) : null
  };

//   const url = 'http://localhost:8080'
  return fetch(CODE_VALIDATOR_API_URL, options)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data[0];
    })
}

