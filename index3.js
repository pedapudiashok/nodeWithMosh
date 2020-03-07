/* MongoDB connection */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AtlasURL = `mongodb+srv://ashok:ashok@123@cluster0-wwm8s.mongodb.net/test?retryWrites=true&w=majority`

app.use(express.json());

mongoose.connect(AtlasURL,{ useNewUrlParser: true })
    .then(res => {
        console.log('SucessFully Connected');
    })
    .catch( error => {
        console.log('Error in Connection');
    })

    const courseSchema = new mongoose.Schema({
        name: String,
        author : String,
        tags:[String],
        date: {type:Date,default: Date.now},
        isPublised: Boolean
    })

    const Course = mongoose.model('course',courseSchema);
    const course = new Course({
        name:"React Course",
        author:"Ashok",
        tags:['React','frontend'],
        isPublised: true
    })

    async function SavingDoc() {
    const result = await course.save()
    console.log('Result',result);
    }

    //SavingDoc();

    async function getCourse(pgNo,pgSize,id=0) {
        const result = await Course.find({name:/.*r.*/i}).skip( (pgNo-1) * pgSize).limit(pgSize).select({name:1,author:1,tags:1,_id:false})
        console.log('Find Result',result);
    }

    /* Comparation Operator */
    // eq ne gt gte lt lte in nin

    /* Logical Operator */
    // or and

    /* Regular Expression */
    //  /pattern/i -- ^start  $end  contain .*--.* 

    //getCourse('5e6256740533ce4e23348179');

    /*let pgNo=2,pgSize=10;
    getCourse(pgNo,pgSize)*/

    async function updateCourse(id) {
        //const course = await Course.findById(id)
        //if(!course) return;
       
        // course.isPublised = false;
        
        // course.price = 100;

        /* course.set({
            price:100
        }) */

        /*course.save().then( res => {
            console.log('Update Sucessfully')
        })
        .catch( error => {
            console.log('Update Failed')
        })*/

        Course.update({_id:id},{price:100})
            .then( result => {
                console.log('Updated Sucessfully',result);
            })
            .catch( error => {
                console.log('Update Failed',error); 
            })
    }

    updateCourse('5e6260b657efb4520dbe35c9') //5e6260b657efb4520dbe35c9




const port = process.env.port || 3002;
app.listen(port,() => { console.log(`Listen at ${port} Port`)})