var express = require("express");
var router = express.Router();
const jsonParser = express.json();
const pool = require("../../module/db-config");


router.get('/', (req, res) => {
  pool.query("SELECT * FROM access", (err, data) => {
    if(err) return console.log(err);
    res.send({
      roles: data
    });
  });
});

router.get("/:id", function(req, res){
    const id = req.params.id;
    pool.query("SELECT * FROM access WHERE id=?", [id], (err, data) => {
    //console.log(id);
    if(err) return console.log(err);
    res.send({
        role: data[0],
    });
  });
});

router.post("/", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  let dataAccess = null;
  pool.query(
        "INSERT INTO access (name) VALUES (?)", [name], (err, data) => {
        if (err) return console.log(`create role error${err}`);
        }
    );  
  res.json("ok");
});

router.put("/:id", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const id = req.body.id;
  console.log(req.body);
  pool.query("UPDATE access SET name=? WHERE id=?", [name, id], (err, data) => {
    if (err) return console.log(`update error ${err}`);
  });
  res.json("ok");
});


router.delete("/:id", function(req, res) {
  const access_id = req.params.id;
  const defaultAccess = 3;
  console.log(`access_id= ${access_id}`);
  pool.query(
    "SELECT * FROM users WHERE access_id = ?", [access_id], (err, data) => {
      if (err) return console.log(`update error ${err}`);
      console.log(`data= ${data}`);

      if (data == '') {
        console.log("Пусто");
        pool.query("DELETE FROM access WHERE id=?", [access_id], (err, data) => {
          if (err) return console.log(`update error ${err}`);
            console.log(`id delete= ${access_id}`);
        });
    } else {
        data.forEach((id, i, data) => {
        
        console.log(`i= ${i}`);
        
        id = parseInt(data[0].id, 10);
        
        console.log(`id= ${id}`);
        
        pool.query("UPDATE users SET access_id=? WHERE id=?", [defaultAccess, id], (err, data) => {
          if (err) return console.log(`update error ${err}`);
          
          console.log(`id update= ${id} defaultAccess= ${defaultAccess}`);

          pool.query("DELETE FROM access WHERE id=?", [access_id], (err, data) => {
            if (err) return console.log(`update error ${err}`);
              console.log(`id delete= ${access_id}`);
          });
        });
      });

    }      
  }); 
  res.json("ok");
});

module.exports = router;