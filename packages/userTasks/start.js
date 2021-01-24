const app = require('./server');

const PORT = process.env.PORT || 5003;

app.listen(PORT, console.log(`App running on ${PORT}`));
