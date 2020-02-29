const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({});
const express = require('express');
const router = express.Router();

const courses = [
    {id:1,name:'javascript'},
    {id:2,name:'html'},
    {id:3,name:'css'}
]


const Schema = Joi.object({
    name:Joi.string().required('name is mandatory')
})

router.get('/',(req,res) => {
res.status(200).send(courses);
})

router.get('/:id',(req,res) => {
   let course =  courses.find( c => c.id == req.params.id)
   if(!course) res.status(404).send('Course not Found');
    res.status(200).send(course)
})

router.post('/',validator.body(Schema),(req,res) => {
   let coure = {id: courses.length + 1 ,name:req.body.name}
   courses.push(coure);
    res.status(200).send(courses)
})

router.put('/:id',validator.body(Schema),(req,res) => {
    
    let course = courses.find(c => c.id == req.params.id)
    if (!course) res.status(404).send('Course not Found')
    else {
        course.name = req.body.name
        res.status(200).send('Course Updated');
    }
})

router.delete('/:id',(req,res) => {
    
    let course = courses.find(c => c.id == req.params.id)
    if (!course) res.status(404).send('Course not Found')
    else {
    let Index = courses.indexOf(course)
    courses.splice(Index,1)
    res.status(200).send('Course Deleted');
    }
})


module.exports = router;