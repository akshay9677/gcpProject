const projectid = require("./constants");

async function crt(seconds) {
  const { CloudTasksClient } = require("@google-cloud/tasks");

  const client = new CloudTasksClient();

  const project = projectid;
  const queue = "init-queue";
  const location = "asia-south1";
  const payload = "hello";

  const parent = client.queuePath(project, location, queue);

  const task = {
    appEngineHttpRequest: {
      httpMethod: "POST",
      relativeUri: "/log_payload",
    },
  };

  if (payload) {
    task.appEngineHttpRequest.body = Buffer.from(payload).toString("base64");
  }

  if (seconds) {
    task.scheduleTime = {
      seconds: seconds + Date.now() / 1000,
    };
  }

  const request = {
    parent: parent,
    task: task,
  };

  console.log("Sending task:");
  console.log(task);
  const [response] = await client.createTask(request);
  const name = response.name;
  console.log(`Created task ${name}`);
}

crt(5);
