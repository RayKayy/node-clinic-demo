const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.static(path.join(__dirname)));

const sleep = (ms) => {
  const sleepEnd = Date.now() + ms;
  // Processing Data Sync; Read File Sync Etc.
  while (Date.now() < sleepEnd);
};

const sleepAsync = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

app.get("/block", async (req, res) => {
  const start = Date.now();
  // Any synchronous work
  // sleep(5000);
  await sleepAsync(5000);
  // Fast Synchronous
  // const hash = bcrypt.hashSync(password, 5);
  // Slow Synchronous
  // const hash = bcrypt.hashSync(password, 17);
  // Delegate asyncchronous
  // const hash = await new Promise((resolve, reject) => {
  //   bcrypt.hash(password, 17, (err, encrypted) => {
  //     if (err) reject(err);
  //     resolve(encrypted);
  //   });
  // });
  // const rounds = bcrypt.getRounds(hash);
  res.send({ time_elapsed: Date.now() - start });
});

app.get("/counter", async (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });
  // Flush Headers to Establish Connection
  res.flushHeaders();
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    res.write("event: message\n");
    res.write(`data: ${counter}\n\n`);
  }, 1000);
  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});
app.listen(3000);
