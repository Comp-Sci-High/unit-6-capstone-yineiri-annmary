const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, default: "https://media4.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy_s.gif?cid=6c09b952i68b0nho6sz7d7ate2gpuittg1r68ttl5z59ef70&ep=v1_gifs_search&rid=giphy_s.gif&ct=g" },
        grades: { type: Number, default: 9 },
        description: {type: String}
    }
);
const eventSchema= new mongoose.Schema(
  {
    title:{type:String,required:true},
    dateTime:{type:String},
    location:{type:String},
    shortDescription:{type:String},
    video:{type:String},
  }
)


const Student = mongoose.model("Student", studentSchema, "Students")
const Event =mongoose.model("Event", eventSchema, "Events")



app.get("/", async (req,res)=>{
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/team", async (req, res) => {
    const students = await Student.find({});
    res.render("team.ejs", { students });
  });
  
  app.get("/event", async (req, res) => {
    const events = await Event.find({});
    res.render("event.ejs", { events });
  });
  
  //events

app.post("/student/save", async (req, res) => {
const student1 = await new Student({
 name: req.body.name,
 image: req.body.image,
 grades: req.body.grades,
 description: req.body.description
}).save()
   res.json(student1);
 });


 app.post("/add", async (req,res)=>{
  res.sendFile(__dirname + "/public/mickey.html")
})




app.post("/event/save", async (req, res) => {
const event1 = await new Event({
 title: req.body.title,
 dateTime: req.body.dateTime,
 location: req.body.location,
 shortDescription: req.body.shortDescription,
video:req.body.video
}).save()
   res.json(event1);
 });




app.patch("/update/:name",async (req,res)=>{
const updateStudent= await Student.findOneAndUpdate(
  {
    name:req.params.name
  }, 
  req.body
)
res.json(updateStudent)
})

app.patch("/update/:id",async (req,res)=>{
const updateEvent= await Event.findOneAndUpdate(
  {
    id:req.params.id
  }, 
  req.body
)
res.json(updateEvent)
})



app.delete("/delete/:id",async(req,res)=>{
const deleteEvent= await Event.findOneAndDelete({
  id:req.params.id
})
res.json(deleteEvent)
}) 




async function startServer() {
  
   
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.d60x7.mongodb.net/FV25?retryWrites=true&w=majority&appName=Cluster0");

  app.listen(3000, () => {
    console.log("Server is running");
  });
}

startServer();