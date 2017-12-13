'use strict';

var fs = require('fs');

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
// function(req, res, next) {
//   console.log(req.files);
//
//   if(req.files){
//     req.files.forEach(function(file) {
//       console.log(file);
//       // fs.rename(file.path, )
//     })
//   }
// }

exports.create_a_project = function(req, res, next) {
  
  if (req.files) {
    req.files.forEach(function(file) {
      req.body.name = req.body.name.replace(/\s+/g,"-");
      var new_project = new Project(req.body);
      new_project.picture.data = fs.readFileSync(file.path);
      new_project.picture.contentType = 'image/png';
      new_project.save(function(err, project) {
        if (err)
          res.send(err);
        res.json(project);
      });
    });
  } else {
    req.body.name = req.body.name.replace(/\s+/g,"-");
    var new_project = new Project(req.body);
    new_project.save(function(err, project) {
      if (err)
        res.send(err);
      res.json(project);
    });
  }
  
};

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
  }).catch(function() {
    res.status(404).send('Bad Request');
  });
};

exports.read_a_project_by_name = function(req, res) {
  Project.find({name:req.params.projectName}).then(function(project) {
    project[0].name.replace(/-/g, " ");
    res.send(project);
  }).catch(function() {
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
