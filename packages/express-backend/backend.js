// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

function deleteUserById(id) {
  const idx = users["users_list"].findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users["users_list"].splice(idx, 1);
  return true;
}

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const removed = deleteUserById(id);

  if (!removed) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).end();
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.get("/users", (req, res) => {
  res.send(users);
});

function generateId() {
  return Math.floor(Math.random() * 1_000_000).toString();
}

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let id = generateId();
  while (users["users_list"].some((u) => u.id === id)) {
    id = generateId();
  }
  userToAdd.id = id;
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
