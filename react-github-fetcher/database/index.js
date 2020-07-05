const mongoose = require('mongoose');
mongoose.connect('mongodb://shehu:Elmagnanimo96@ds225375.mlab.com:25375/heroku_4fl1l06w');

let repoSchema = mongoose.Schema({
  repo_user: String,
  repo_name: String,
  html_url: String,
  clone_url: String,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

repoSchema.path('repo_name').validate(function(value, done) {
  this.model('Repo').count({ repo_name: value }, function(err, count) {
      if (err) {
          return done(err.message);
      }
      done(!count);
  });
}, 'Repo already exists');


let save = (githubData, callback) => {
  githubData.forEach(element => {
    var repo = new Repo({
      repo_user: element.owner.login,
      repo_name: element.full_name,
      html_url: element.html_url,
      clone_url: element.clone_url,
      forks: element.forks_count,
      watchers: element.watchers
    });
    
    repo.save((err) => {
      if (err) {
        callback(err)
      } else {
        callback('Done saving ' + element.full_name);
      }
    });
  })
}

let getTop25Forks = (callback) => {
  Repo.find({}, (err, docs) => {
    if (err) {
      callback(err)
    } else {
      callback(null, docs)
    }
  }).sort({forks: -1}).limit(25);
}

module.exports = {
  save: save,
  getTop25Forks
}