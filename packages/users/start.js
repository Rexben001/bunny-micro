const app = require('./index');

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`App running on ${PORT}`));
