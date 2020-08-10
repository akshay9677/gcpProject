const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Datastore } = require("@google-cloud/datastore");

const schema = require("./validation");
const projectid = require("./constants");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const datastore = new Datastore({
  projectId: projectid,
});

const kind = "Task";

app.get("/", async (req, res) => {
  const query = datastore.createQuery("Task").order("name");
  const [tasks] = await datastore.runQuery(query);
  const names = tasks.map((a) => a.name);
  return res.send(names);
});

app.get("/query", async (req, res) => {
  const query = datastore
    .createQuery("Task")
    .filter("name", "=", "Akshay")
    .filter("age", ">", 20);
  const [tasks] = await datastore.runQuery(query);
  return res.send(tasks);
});

app.post("/:id", (req, res) => {
  const taskKey = datastore.key([kind, Number(req.params.id)]);
  const val = {
    name: req.body.name,
    age: req.body.age,
    number: req.body.number,
    active: req.body.active,
  };
  const { error, value } = schema.validate(val);
  if (!error) {
    const task = {
      key: taskKey,
      data: value,
    };

    datastore
      .save(task)
      .then(() => {
        res.send(`Saved : ${req.body.name}`);
      })
      .catch((err) => {
        res.send(`${res.statusCode} Error Occured : ${err}`);
      });
  } else {
    res.send(`Error Occured : ${error.details[0].message}`);
  }
});

app.put("/:id", async (req, res) => {
  const taskKey = datastore.key([kind, Number(req.params.id)]);
  const val = {
    name: req.body.name,
    age: req.body.age,
    number: req.body.number,
    active: req.body.active,
  };
  const { error, value } = schema.validate(val);
  if (!error) {
    const task = {
      key: taskKey,
      data: {
        name: req.body.name,
        age: req.body.age,
        number: req.body.number,
        active: req.body.active,
      },
    };
    datastore
      .save(task)
      .then(() => {
        res.send(`Updated : ${task.data.name} `);
      })
      .catch((err) => {
        res.send(`${res.statusCode} Error Occured : ${err}`);
      });
  } else {
    res.send(`${res.statusCode} Error Occured : ${err}`);
  }
});

app.delete("/:id", async (req, res) => {
  const taskKey = datastore.key(["Task", Number(req.params.id)]);
  datastore
    .delete(taskKey)
    .then(() => {
      res.status(200).send("Deleted data");
    })
    .catch((err) => {
      res.send(`${res.statusCode} Error Occured : ${err}`);
    });
});

module.exports = app;
