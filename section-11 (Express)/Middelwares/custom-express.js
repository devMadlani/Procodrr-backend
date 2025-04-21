function createApp() {
  const middlewares = [];

  // Method to register middleware
  function use(middleware) {
    middlewares.push(middleware);
  }

  // Method to simulate request
  function handleRequest(req, res) {
    let index = 0;

    function next() {
      //   console.log(middlewares);

      if (index < middlewares.length) {
        const currentMiddleware = middlewares[index];
        index++;
        console.log(currentMiddleware);
        currentMiddleware(req, res, next); // Call current middleware
      }
    }

    next(); // Start processing
    console.log("after next");
  }

  return { use, handleRequest };
}

const app = createApp();

app.use((req, res, next) => {
  console.log("Middleware 1");
  req.user = "Dev";
  res.send("Hello " + req.user);
  console.log("----------------------------------------");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  console.log("User:", req.user);
  console.log("----------------------------------------");

  next();
});

app.use((req, res, next) => {
  console.log("Final handler, sending response");
  res.send("Hello " + req.user);
});

// Simulate a request
const req = { url: "/login" };
const res = {
  send: (data) => console.log("Response:", data),
};

app.handleRequest(req, res);
