const http = require("http");
const hostname = "localhost";
const port = 3000;

let users = ["User 1", "User 2", "User 3"];

const server = http.createServer((req, res) => {
  // --------------- NUMBER 2 ---------------
  if (req.url.startsWith("/number2")) {
    switch (req.url) {
      case "/number2":
        res.writeHead(200);
        res.end("<h1>Welcome to our website!</h1>");
        break;
      case "/number2/users":
        res.writeHead(200);
        res.end(`
          <h1>User List</h1>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        `);
        break;
      default:
        res.writeHead(404);
        res.end("<h1>Page not found</h1>");
        break;
    }
  }

  // --------------- NUMBER 3 ---------------
  else if (req.url.startsWith("/number3")) {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      switch (req.url) {
        case "/number3":
          res.writeHead(200);
          res.end(`
            <h1>Welcome to our website!</h1>
            <form action="/number3/create-user" method="POST">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username">
              <button type="submit">Submit</button>
            </form>
          `);
          break;
        case "/number3/users":
          res.writeHead(200);
          res.end(`
            <h1>User List</h1>
            <ul>
              <li>User 1</li>
              <li>User 2</li>
              <li>User 3</li>
            </ul>
          `);
          break;
        default:
          res.writeHead(404);
          res.end("<h1>Page not found</h1>");
          break;
      }
    } else if (req.method === "POST" && req.url === "/number3/create-user") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const parsedBody = new URLSearchParams(body);
        const username = parsedBody.get("username");

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>User ${username} created successfully!</h1>`);
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/html" });
      res.end("<h1>Method Not Allowed</h1>");
    }
  }

  // --------------- NUMBER 4 ---------------
  else if (req.url.startsWith("/number4")) {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      switch (req.url) {
        case "/number4":
          res.writeHead(200);
          res.end(`
            <h1>Welcome to our website!</h1>
          `);
          break;
        case "/number4/create-user":
          res.writeHead(200);
          res.end(`
            <h1>Welcome to our website!</h1>
            <form action="/number4/create-user" method="POST">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username">
              <button type="submit">Submit</button>
            </form>
          `);
          break;
        case "/number4/users":
          res.writeHead(200);
          res.end(`
            <h1>User List</h1>
            <ul>
              ${users.map((user) => `<li>${user}</li>`).join("")}
            </ul>
          `);
          break;
        default:
          res.writeHead(404);
          res.end("<h1>Page not found</h1>");
          break;
      }
    } else if (req.method === "POST" && req.url === "/number4/create-user") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const parsedBody = new URLSearchParams(body);
        const username = parsedBody.get("username");

        console.log(`Username: ${username}`);

        users.push(username);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <script>
            window.location.href = "/number4/users";
            console.log("Username: ${username}");
          </script>
        `);
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/html" });
      res.end("<h1>Method Not Allowed</h1>");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
