const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Datastore } = require("@google-cloud/datastore");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const datastore = new Datastore({
  projectId: "nodeproject-285406",
});

const kind = "Task";

app.get("/", async (req, res) => {
  const query = datastore.createQuery("Task").order("age");
  const [tasks] = await datastore.runQuery(query);
  const names = [];
  for (const task of tasks) {
    const taskKey = task[datastore.KEY];
    names.push(task.name);
  }
  res.send(names);
});

app.post("/:id", (req, res) => {
  const taskKey = datastore.key([kind, Number(req.params.id)]);
  const name = req.body.name;
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
      res.send(`Saved : ${name}`);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
});

app.put("/:id", async (req, res) => {
  const taskKey = datastore.key([kind, Number(req.params.id)]);
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
      res.send(`Updated : ${task.data.name}`);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
});

app.delete("/:id", async (req, res) => {
  const taskKey = datastore.key(["Task", Number(req.params.id)]);
  await datastore.delete(taskKey);
  res.send("Deleted data");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
