//express( és minden más) package importálása - a benne lévő parancsok csak így működnek
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//expressz alapú alkalmazás létrehozása
const app = express();


app.use(express.json())
const EmployeeSchema = new Schema({
    name: String,
    age: Number,
    isActive: Boolean
});
const Employee = mongoose.model('Employee', EmployeeSchema);

app.post('/', async (req, res) => {

    const newEmployee = new Employee(req.body);
    await newEmployee.save() // a save functionnel teszem bele a databasebe az adatokat
    console.log('save to database');
    console.log('create végpont');
    res.status(200).send(newEmployee._id);
});

app.get('/', async (req, res) => {
    const employees = await Employee.find({});
    res.status(200).send(employees);
});

app.patch('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const isAct = req.body.isActive;
    console.log(isAct);
    await Employee.findByIdAndUpdate(id, { isActive: isAct });
    res.status(200).send(id);
});

//url alapján tudjuk az id-t és úgy töröljük
app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Employee.findByIdAndDelete(id);
    res.status(200).send('delete');
});



//adatbázis elérési útvonala
var url = "mongodb://localhost:27017/feladat";

const port = 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}...`)// nem aposztróf hanem ctrl7
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log('connected to database'));
