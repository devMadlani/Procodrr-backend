use("todoApp");

const todosCollection = db.getCollection("todos");

for (let i = 0; i <= 10; i++) {
  todosCollection.insertOne({
    title: `Task ${i}`,
    completed: i % 2 === 0,
  });
}
