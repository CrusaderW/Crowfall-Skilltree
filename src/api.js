// API Lib

let axios = require('axios'); // `import` is forbidden here

const root = process.env.API_ROOT || "http://localhost/api";

function buildUrl(apiPath) {
  return root + "/" + apiPath;
}

export function fetchSkills() {
  let req = buildUrl('skills');

  return new Promise( (resolve, reject) => {
    axios.get(req).then(response => {
      // Pass back the data
      resolve(response.data);
    })
    .catch( error => { reject(error) });
  });
}

export function createSkill(info) {
  let reqUrl = (info.parent) ? buildUrl("skills/" + info.parent.id + "/children") : buildUrl("skills")

  console.log("Req UrL: " + reqUrl);

  let req = {
    method: 'post',
    url: reqUrl,
    data: {
      name: info.name,
      value: info.value,
      target: info.target,
    }
  };

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      // Pass new skill data
      resolve(response.data);
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
  };

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      resolve();
    })
    .catch( error => { reject(error) });
  });
}

export function deleteSkill(skillId) {
  let req = {
    method: 'delete',
    url: buildUrl("skills/" + skillId),
  };

  return new Promise( (resolve, reject) => {
    axios(req).then(response => {
      resolve();
    })
    .catch( error => { reject(error) });
  });
}