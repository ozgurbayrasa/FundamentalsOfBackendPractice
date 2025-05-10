const express = require("express");
const app = express();
const PORT = 3000;

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");


  let counter = 0;

  const intervalId = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify({ message: "Merhaba", count: counter })}\n\n`);
  }, 1000);


  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server listening at http://localhost:${PORT}`);
});