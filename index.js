const port = 9000;

// START YOUR SERVER HERE
const Users = require("./api/users/model.js");

const express = require("express");
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
    return;
  }
  Users.update(req.params.id, user)
    .then((user) => {
      if (user == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      if (user == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.post("/api/users", (req, res) => {
  const body = req.body;

  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
    return;
  }

  Users.insert(body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

server.listen(port, () => {
  console.log("server is running!");
});
