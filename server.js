import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server started...\nListening on port ${server.address().port}`)
})