const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');

app.use(cors({ origin: 'https://deathcal.onrender.com' }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
});


app.post('/post',(req,res)=>{
    console.log("works");
    console.log(req.headers.body);

    let LifeInfo = calculate(req.headers.body);

    res.send({birthdayear:LifeInfo.year,dayslived:Math.floor(LifeInfo.redSquaresAmount*7),weekslived:Math.floor(LifeInfo.redSquaresAmount),weeksleft:4174-Math.floor(LifeInfo.redSquaresAmount),offset:LifeInfo.offset});
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


function calculate(date)
{
    let birthday = new Date(date);
    let newYearDate = new Date(Date.UTC((date.split("-")[0]), 11, 31, 23, 59, 59));
    let week = 604800000;
    let time_passed = Date.now() - birthday.getTime();
    let offset = (newYearDate.getTime() - birthday.getTime())/week;
    console.log(newYearDate);
    console.log(offset);
    console.log(time_passed/week);
    return {redSquaresAmount:Math.floor(time_passed/week),offset:Math.ceil(offset),year:birthday.getFullYear()};
}