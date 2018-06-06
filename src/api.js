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

export function updateSkill(skillId, skillName, skillValue, skillTarget) {
  let req = {
    method: 'put',
    url: buildUrl("skills/" + skillId),
    data: {
      name: skillName,
      value: skillValue,
      target: skillTarget,
    }
  }

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      resolve();
    })
    .catch( error => { reject(error); });
  });
}