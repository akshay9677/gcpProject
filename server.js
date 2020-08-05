const express = require("express");
const app = express();
const { Datastore } = require("@google-cloud/datastore");

const datastore = new Datastore({
  projectId: "nodeproject-285406",
});

const kind = "Task";
var taskId = 161608;

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

app.get("/add", (req, res) => {
  const taskKey = datastore.key([kind, taskId]);
  const task = {
    key: taskKey,
    data: {
      name: "John",
      age: 20,
      number: "8148851066",
      active: true,
    },
  };
  datastore
    .save(task)
    .then(() => {
      res.send(`Saved : ${task.data.name}`);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
});

app.get("/update", async (req, res) => {
  const taskKey = datastore.key([kind, taskId]);
  const task = {
    key: taskKey,
    data: {
      name: "John.D",
      age: 20,
      number: "8148851066",
      active: true,
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

app.get("/delete", async (req, res) => {
  const taskKey = datastore.key(["Task", taskId]);
  await datastore.delete(taskKey);
  res.send("Deleted data");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
