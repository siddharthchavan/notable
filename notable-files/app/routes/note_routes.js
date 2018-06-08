var ObjectID = require("mongodb").ObjectID

module.exports = function(app, db) {
  app.get("/notes/:id", (req, res) => {
    var id = req.params.id;
    var details = {"_id": new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ "err": "Error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.delete("/notes/:id", (req, res) => {
    var id = req.params.id;
    var details = {"_id": new ObjectID(id) };
    db.collection("notes").remove(details, (err, item) => {
      if (err) {
        res.send({ "err": "Error has occurred" });
      } else {
        res.send("Note " + id + " deleted");
      }
    });
  });

  app.put("/notes/:id", (req, res) => {
    var id = req.params.id;
    var details = {"_id": new ObjectID(id) };
    var note = { text: req.body.body, title: req.body.title };
    db.collection("notes").update(details, note, (err, item) => {
      if (err) {
        res.send({ "err": "Error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.post("/notes", (req, res) => {
    var note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ "err": "Error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
