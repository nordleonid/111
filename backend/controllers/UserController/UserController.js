var express = require("express");
const jsonParser = express.json();
const pool = require("../../module/db-config");
const userRoute = express.Router();


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

userRoute.route('/').post((req, res, next) => {
  pool.query("SELECT * FROM access", (err, data) => {
    //console.log(data);
    if(err) return console.log(err);
    res.json({
    roles: data
    });
  });  
});


userRoute.route('/create').post((req, res, next) => {
  console.log('create', req.body.name, req.body.access);
  if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const access = req.body.access;
    console.log(access)
    pool.query(
        "INSERT INTO users (name, access_id) VALUES (?,?)", [name, access], (err, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        }
    );  
});

// Update user
userRoute.route('/:id').put((req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const access = parseInt(req.body.access, 10);
  const id = req.body.id;
  let dataAccess = null;
  console.log(req.body);
  pool.query(
    "SELECT * FROM access WHERE id = ?", [access], (err, data) => {
      if (err) return console.log(`update error ${err}`);
      dataAccess = parseInt(data[0].id, 10);
      //console.log(dataAccess);
      pool.query("UPDATE users SET name=?, access_id=? WHERE id=?", [name, dataAccess, id], (err, data) => {
        if (error) {
          return next(error);
          console.log(error)
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
  console.log('server', id);

  pool.query("DELETE FROM users WHERE id=?", [id], function(err, data) {
    if (err) return console.log(err);
  });
  res.status(200);
})

module.exports = userRoute;