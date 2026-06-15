import express, { Application } from "express";
import cors from "cors";
import { listLogFiles } from "./helper/listLogFiles";
import path from "path";
import fs from "fs";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/success/:log", (req, res) => {
  const log = req.params.log;
  console.log(log);

  const filePath = path.join(process.cwd(), "logs", "wiston", "success", log);

  const data = fs.readFileSync(filePath, "utf-8");
  res.send(`
    <html>
      <head>
        <title>success nessage</title>
      </head>
      <body>
       ${data}
      </body>
    </html>
  `);
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Home</title>
      </head>
      <body>
        <h1>Welcome to my server 2.0 heheheheheheeh</h1>
        <p>This is HTML response from Express</p>
        <a href="/success">Success</a>
        <a href="/error">error</a>
      </body>
    </html>
  `);
});

app.get("/success", (req, res) => {
  const successes = listLogFiles("success");
  res.send(`
   <html>
  <head>
    <title>Success logs</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        background: #0f172a;
        color: #e2e8f0;
        padding: 20px;
      }

      h1 {
        color: #22c55e;
        margin-bottom: 20px;
      }

      .log-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      a {
        display: block;
        padding: 10px 15px;
        background: #1e293b;
        color: #38bdf8;
        text-decoration: none;
        border-radius: 8px;
        transition: 0.2s;
      }

      a:hover {
        background: #334155;
        transform: translateX(5px);
      }
    </style>
  </head>

  <body>
    <h1>Success logs</h1>

    <div class="log-container">
      ${successes
        ?.map(
          (log) => `
          <a href="/success/${log}">
            ${log}
          </a>
        `,
        )
        .join("")}
    </div>
  </body>
</html>
  `);
});

export default app;
