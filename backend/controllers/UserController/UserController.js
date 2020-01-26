var express = require("express");
const jsonParser = express.json();
const pool = require("../../module/db-config");
const userRoute = express.Router();

// выслать дату с всеми юзерами
userRoute.route('/').get((req, res) => {
  pool.query("SELECT u.*, a.name as role FROM users u LEFT JOIN access a ON u.access_id = a.id", (err, data) => {
    if(err) {
      return console.log(err)
    } else {
      res.json(data);
      console.log(data);
    }
  });
})

userRoute.route('/roles').get((req, res) => {
  pool.query("SELECT * FROM access", (err, data) => {
      //console.log(data);
      if(err) {
        return console.log(err)
      } else {
        res.json(data);
        console.log(data);
      }
  });
});

userRoute.route('/create').post((req, res, next) => {
  //console.log('create', req.body.name, req.body.role);
  if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const access = req.body.role;
    //console.log(access)
    pool.query(
        "INSERT INTO users (name, access_id) VALUES (?,?)", [name, access], (err, data) => {
          if (err) {
            return next(err)
          } else {
            res.json(data)
          }
        }
    );
});

userRoute.route('/update/:id').get((req, res) => {
  const id = req.params.id;
  //console.log(id)
  pool.query("SELECT u.*, a.name as role FROM users u LEFT JOIN access a ON u.access_id = a.id WHERE u.id = ?", [id], (err, data) => {
      //console.log(data);
      if(err) {
        return console.log(err)
      } else {
        res.json(data);
        //console.log(data);
      }
  });
});

// Update user
userRoute.route('/:id').put((req, res, next) => {
  console.log(req.body);
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const access = req.body.role;
  const id = req.body.id;
  let dataAccess = null;
  pool.query(
    "SELECT * FROM access WHERE name = ?", [access], (err, data) => {
      if (err) return console.log(`update error ${err}`);
      dataAccess = parseInt(data[0].id, 10);
      console.log(dataAccess);
      pool.query("UPDATE users SET name=?, access_id=? WHERE id=?", [name, dataAccess, id], (err, data) => {
        if (err) {
          return next(err);
          console.log(err)
        } else {
          res.json(data)
          console.log('Data updated successfully')
        }
        }
      );
    }
  );
})

userRoute.route('/:id').delete((req, res, next) => {
  const id = req.params.id;
  console.log('server delete ok', id);
  pool.query("DELETE FROM users WHERE id=?", [id], function(err, data) {
    if (err) return console.log(err);
  });
  res.status(200);
})

module.exports = userRoute;
