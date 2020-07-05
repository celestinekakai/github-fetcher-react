const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index-sql')
let app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1128;
}

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  github.getReposByUsername(req.body.data, (info) => {
    db.save(info, (message) => {
      console.log(message);
      db.getTop25Forks((err, docs) => {
        if (err) {
          console.log(err.message);
        } else {
          res.end(JSON.stringify(docs));
        }
      })
    })
  }) 
});

app.get('/repos', function (req, res) {
  console.log('Asking for data...')
  db.getTop25Forks((err, docs) => {
    if (err) {
      console.log(err.message);
    } else {
      // console.log(docs);
      res.send(docs);
    }
  })
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

