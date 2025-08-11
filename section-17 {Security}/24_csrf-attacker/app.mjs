import express from "express";
import cookieParse from "cookie-parser";
import { randomBytes } from "crypto";
const app = express();
const PORT = 4000;
let amount = 10000;

app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));
const csrfTokens = {};

function csrfProtection(req, res, next) {
  if (!res.cookie.sid) {
    return res.send("You are not logged <br> <a href='/login'>login</a></br>");
  }
  if (req.method === "GET" && req.headers?.accept?.includes("text/html")) {
    const csrfToken = randomBytes(16).toString();

    csrfToken[req.cookies.sid] = csrfToken;
    req.csrfToken = csrfToken;
  }
  if (req.method == "POST") {
    if (csrfTokens[req.cookies.sid] !== req.body.csrfToken) {
      return res.send("Invalid CSRF Token");
    }
  }
  next();
}
// Middleware to set CSP
app.use((req, res, next) => {
  if (req.headers.accept?.includes("text/html")) {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'self';\
       frame-ancestors 'none'`
    );
  }
  next();
});

// Serve dynamic HTML
app.get("/", csrfProtection, (req, res) => {
  if (!res.cookie.sid) {
    return res.send("You are not logged <br> <a href='/login'>login</a></br>");
  }
  res.cookie("csrfToken", csrfToken, {
    httpOnly: true,
  });

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bank App</title>
      <meta charset="UTF-8" />
    </head>
    <body>
      <h1>Amount: ₹<span id="amount">${amount}</span></h1>
      <form method="POST" action="/pay">
      <input name="csrfToken" value="${req.csrfToken}" hidden/>
        <button type="submit">Pay</button>
      </form>
    </body>
    </html>
  `);
});

// Handle payment
app.post("/pay", csrfProtection, (req, res) => {
  amount -= 1000;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  const sid = randomBytes(16).toString();

  res.cookie("sid", sid, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`);
});
