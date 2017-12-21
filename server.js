const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 8080;

app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.listen(PORT , () => {
    console.log(`App listening at localhost:${PORT}`);
});
