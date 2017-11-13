'use strict';
module.exports = function(app) {
  var projectList = require('../controllers/projectListController');

  // projectList Routes
  app.route('/projects')
  .get(projectList.list_all_projects);


  app.route('/projects/:projectId')
  .get(projectList.read_a_project);
};