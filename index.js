const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy user data
const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: "password",
  },
];

// Signup route
app.post("/api/auth/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password,
  };
  users.push(newUser);

  res.status(201).json({ message: "Signup successful" });
});

// Login route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user based on the provided email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Check if the password is correct
  if (user.password !== password) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email }, "secret_key");

  // Return the token to the client
  res.json({ token });
});

// Profile route
app.get("/profile", verifyToken, (req, res) => {
  // The verifyToken middleware will ensure a valid token is present
  // If the token is valid, you can access the authenticated user's information from req.user

  // Find the user in the database based on the email stored in req.user
  const user = users.find((u) => u.email === req.user.email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    // If no token is provided, return an error
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      // If the token is invalid, return an error
      return res.status(403).json({ message: "Invalid token" });
    }

    // If the token is valid, save the decoded user information to the request object
    req.user = decoded;
    next(); // Call the next middleware
  });
}


// Start the server
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
