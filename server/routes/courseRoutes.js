const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

/* GET COURSES */

router.get("/", async(req,res)=>{
const courses = await Course.find();
res.json(courses);
});

/* ADD COURSE */

router.post("/add", async(req,res)=>{

const course = new Course({
name:req.body.name,
stream:req.body.stream
});

await course.save();

res.json(course);

});
/* DELETE COURSE */

router.delete("/:id", async(req,res)=>{
await Course.findByIdAndDelete(req.params.id);
res.json({message:"Deleted"});
});

/* UPDATE COURSE */

router.put("/:id", async(req,res)=>{

await Course.findByIdAndUpdate(req.params.id,{
name:req.body.name,
stream:req.body.stream
});

res.json({message:"Updated"});

});

module.exports = router;