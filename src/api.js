// API Lib

let axios = require('axios'); // `import` is forbidden here

const host = "http://localhost";
const port = 3000;

function buildUrl(apiPath) {
  return host + ':' + port  + "/api/" + apiPath;
}

export function fetchSkills() {
  let req = buildUrl('skills');

  return new Promise( (resolve, reject) => {
    axios.get(req).then(response => {
      // Pass back the data
      resolve(response.data)
    })
    .catch( error => { reject(error) });
  });
}

export function createSkill(skillName, skillValue, skillTarget) {
  let req = {
    method: 'post',
    url: buildUrl("skills"),
    data: {
      name: skillName,
      value: skillValue,
      target: skillTarget,
    }
  }

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      // Pass new skill data
      resolve(response.data)
    })
    .catch( error => { reject(error) });
  });
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
      resolve()
    })
    .catch( error => { reject(error) });
  });
}

export function deleteSkill(skillId) {
  let req = {
    method: 'delete',
    url: buildUrl("skills/" + skillId),
  }

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      resolve()
    })
    .catch( error => { reject(error) });
  });
}