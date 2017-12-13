'use strict';
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

module.exports = function(app) {
  var projectList = require('../controllers/projectListController');
  
  // projectList Routes
  app.route('/projects')
  .get(projectList.list_all_projects)
  .post(upload.any(), projectList.create_a_project);
  
  app.route('/projects/:projectId')
  .get(projectList.read_a_project);
  
  app.route('/projects/name/:projectName')
  .get(projectList.read_a_project_by_name);
};
