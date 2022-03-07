// BUILD YOUR SERVER HERE

const { nanoid } = require("nanoid");

function getId() {
  return nanoid().slice(0, 5);
}

const initializeUsers = () => [
  { id: getId(), name: "Ed Carter", bio: "hero" },
  { id: getId(), name: "Mary Edwards", bio: "super hero" },
];

// FAKE IN-MEMORY USERS "TABLE"
let users = initializeUsers();

module.exports = {
  async find() {
    // SELECT * FROM users;
    return Promise.resolve(users);
  },

  async findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find((d) => d.id === id);
    return Promise.resolve(user);
  },

  async insert({ name, bio }) {
    // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
    const newUser = { id: getId(), name, bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  async update(id, changes) {
    // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    const updatedUser = { ...changes, id };
    users = users.map((d) => (d.id === id ? updatedUser : d));
    return Promise.resolve(updatedUser);
  },

  async remove(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    users = users.filter((d) => d.id !== id);
    return Promise.resolve(user);
  },
}; // EXPORT YOUR SERVER instead of {}
