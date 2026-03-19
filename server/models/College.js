const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({

name:String,
type:String,
location:String,

streams:[String],

description:String,

courses:[String],

facilities:[String],

placements:[
{
name:String,
logo:String
}
],

fees:[
{
course:String,
duration:String,
amount:String
}
],

status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending"
},

addedBy: {
  type: String, // "admin" ya "user"
  default: "admin"
},
userId: String,

image:String,
images:[String],

seoTitle: String,
seoDescription: String,
seoTags: [String],

});

module.exports = mongoose.model("College",collegeSchema);