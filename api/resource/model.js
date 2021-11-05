// build your `Resource` model here
const db = require('../../data/dbConfig');

function getResources() {
  return db('resources');
}

async function addResource(resource) {
  const [resource_id] = await db('resources').insert(resource, [
    'resource_id',
    'resource_name',
    'resource_description',
  ]);
  return db('resources').where('resource_id', resource_id).first();
}
module.exports = {
  getResources,
  addResource,
};
