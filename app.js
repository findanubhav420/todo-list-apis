const express = require('express')
const app = express()
app.use(express.json())

const port = 3000
const tasks = [];

// to get 
app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.get('/tasks/active', (req, res) => {
  const temp = tasks.filter(obj => obj.isComplete === false);
  (temp.length > 0) ? res.send(temp) : res.send("No active tasks")
})

app.get('/tasks/completed', (req, res) => {
  const temp = tasks.filter(obj => obj.isComplete === true);
  (temp.length > 0) ? res.send(temp) : res.send("No completed tasks")
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  const temp = tasks.filter(obj => obj.id === Number(id));
  (temp.length > 0) ? res.send(temp) : res.send("No such tasks available")
})

app.post("/tasks", (req, res) => {
  const data = req.body;
  tasks.push({
    ...req.body,
    id:tasks.length + 1,
    isComplete: false
  });
  res.send(data);
})

app.put('/tasks/:id', (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const index = tasks.findIndex(obj => obj.id === Number(id))
    (index > -1) ? tasks[index] =  { ...tasks[index], ...data } : res.send("Invalid Id")
  res.send(tasks);
})

app.patch('/tasks/:id', (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const index = tasks.findIndex(obj => obj.id === Number(id));
  tasks[index] = { ...tasks[index], ...data };
  res.send(tasks);
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  const index = tasks.findIndex(obj => obj.id === Number(id));
  (index > -1) ? tasks.splice(index, 1) : res.send("this object is not available")
  res.send(`tasks with id= ${id} has been deleted`)
})

app.delete('/tasks', (req, res) => {
  tasks.length = 0
  res.send("list has been deleted")
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})