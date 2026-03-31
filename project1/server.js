const express = require('express');
const cookieParser = require('cookie-parser');
const controller = require('./controller')
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))
app.use(cookieParser());
app.use(controller);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));