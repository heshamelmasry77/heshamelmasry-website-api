'use strict';


var mongoose = require('mongoose'),
  Project = mongoose.model('Projects');

exports.list_all_projects = function(req, res) {
  Project.find({}).then(function(projects) {
    res.send(projects);
  }).catch(function(error) {
     // console.error(error);
    res.status(404).send('Bad Request');
  });
};






//
// exports.create_a_project = function(req, res) {
//   var new_project = new Project(req.body);
//   new_project.save(function(err, project) {
//     if (err)
//       res.send(err);
//     res.json(project);
//   });
// };
//
//
// exports.read_a_project = function(req, res) {
//   Project.findById(req.params.projectId, function(err, project) {
//     if (err)
//       res.send(err);
//     res.json(project);
//   });
// };

exports.read_a_project = function(req, res) {
  Project.findById(req.params.projectId).then(function(project) {
    res.send(project);
  }).catch(function(error) {
    // console.error(error);
    res.status(404).send('Bad Request');
  });
};

//
// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

//
// exports.delete_a_task = function(req, res) {
//
//
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
