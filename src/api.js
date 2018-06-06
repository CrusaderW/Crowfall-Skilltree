// API Lib for Vue app

// `import` is forbidden here
let axios = require('axios');

const host = 'http://localhost';
const port = 3000;

function buildUrl(apiCall) {
  return host + ':' + port  + '/api/' + apiCall;
}

export function fetchSkills() {
  let req = buildUrl('skills');
  return axios.get(req)
    .then(response => {
      return response.data;
    })
    .catch( error => { console.log(error); });
}