const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/welcome.html'));
});
router.get('/memorygame', function (req, res) {
    res.sendFile(path.join(__dirname + '/memorygame.html'));
});

router.get('/countdown', function (req, res) {
    res.sendFile(path.join(__dirname + '/countdown.html'));
});
router.get('/thegame', function (req, res) {
    res.sendFile(path.join(__dirname + '/thegame.html'));
});

//add the router
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.port || 3000);

// const express = require('express');
// const app = express();
// app.use(express.static("public"));
// app.set('view engine', "ejs");
// app.get('/',(req, res) =>{
//     console.log('here');
//     res.render("index");
// })

//app.listen(3000);