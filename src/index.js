require('dotenv').config();
require('./global');
const App = require('./app');
const app = new App();

app.init();
