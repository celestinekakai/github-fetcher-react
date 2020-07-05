const Sequelize = require('sequelize');
const sequelize = new Sequelize('fetcher', 'root', 'magnanimus', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// class Repos extends Model {}
// Repos.init({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   repo_user: Sequelize.STRING,
//   repo_name: { 
//     type: Sequelize.STRING, 
//     unique: true},
//   html_url: Sequelize.STRING,
//   clone_url: Sequelize.STRING,
//   forks: Sequelize.INTEGER,
//   watchers: Sequelize.INTEGER
// }, { sequelize })

const Repos = sequelize.define('Repos', {
  // attributes
  repo_user: Sequelize.STRING,
  repo_name: { 
    type: Sequelize.STRING, 
    unique: true},
  html_url: Sequelize.STRING,
  clone_url: Sequelize.STRING,
  forks: Sequelize.INTEGER,
  watchers: Sequelize.INTEGER
});

let save = (githubData, callback) => {
  
  githubData.forEach(element => {
    // console.log(element)
    Repos.create({ 
      repo_user: element.owner.login,
      repo_name: element.full_name,
      html_url: element.html_url,
      clone_url: element.clone_url,
      forks: element.forks_count,
      watchers: element.watchers
    })
    .then(() => {
      callback('Done saving ' + element.full_name);
    })
    .catch((err) => {
      callback(err.message)
    })
  })
}

let getTop25Forks = (callback) => {
  Repos.findAll({limit: 25, order: [['forks', 'DESC']]})
  .then((projects) => {
    // console.log(projects)
    callback(null, projects)
  })
  .catch((err) => {
    callback(err.message)
  })
}

module.exports = {
  save: save,
  getTop25Forks: getTop25Forks
}