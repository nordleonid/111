const express = require("express");
const jsonParser = express.json();
const pool = require("../../module/db-config");
const roleRoute = express.Router();

roleRoute.route('/roles').get((req, res) => {
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

roleRoute.route('/update/:id').get((req, res) => {
    const id = req.params.id;
    console.log(id);
    pool.query("SELECT * FROM access WHERE id=?", [id], (err, data) => {
      if(err) {
        return console.log(err)
      } else {
        res.json(data);
        console.log(data);
      }
  });
});


roleRoute.route('/create').post((req, res, next) => {
  console.log('create', req.body.name);
  if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    //let dataAccess = null;
    console.log(name)
    pool.query(
      "INSERT INTO access (name) VALUES (?)", [name], (err, data) => {
        if (err) {
          return next(err)
        } else {
          res.json(data)
        }
      }
    );
});

roleRoute.route('/:id').put((req, res) => {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const id = req.body.id;
  console.log(req.body);
  pool.query("UPDATE access SET name=? WHERE id=?", [name, id], (err, data) => {
    if (err) return console.log(`update error ${err}`);
  });
  res.json("ok");
});

roleRoute.route('/:id').delete((req, res) => {
  const access_id = req.params.id;
  const defaultAccess = 3;
  console.log('access_id to delete', access_id);
  pool.query(
    "SELECT * FROM users WHERE access_id = ?", [access_id], (err, data) => {
      if (err) return console.log(`delete error ${err}`);
      console.log('data to delete=', data);

      if (data == '') {
        console.log("empty", data);
        pool.query(
          "DELETE FROM access WHERE id=?", [access_id], (err, data) => {
            if (err) return console.log('error delete empty string', err);
              console.log('id delete in user table=', access_id);
          });
        } else {
          data.forEach((id, i, data) => {
          console.log(`i= ${i}`);
          id = parseInt(data[i].id, 10);
          console.log('id',id);

          pool.query("UPDATE users SET access_id=? WHERE id=?", [defaultAccess, id], (err, data) => {
            if (err) return console.log('error update table user', err);
            console.log('id update=', id, 'defaultAccess=', defaultAccess);
            pool.query("DELETE FROM access WHERE id=?", [access_id], (err, data) => {
              if (err) return console.log('delete error after update', err);
              console.log('delete from access', access_id);
            });
          });
      });
    }
  });
  res.status(200);
});

module.exports = roleRoute;
