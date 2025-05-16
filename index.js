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



const Student = mongoose.model("Student", studentSchema, "Students")

app.get("/student", async (req, res) => {
    const students = await Student.find({});
     res.json(students)
});

app.get("/team", async (req, res) => {
    const students = await Student.find({});
    res.render("team.ejs", { students });
});



app.post("/student/save", async (req, res) => {
const student1 = await new Student({
 name: req.body.name,
 image: req.body.image,
 grades: req.body.grades,
 description: req.body.description
}).save()
   res.json(student1);
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


app.delete("/delete/:name",async(req,res)=>{
const deleteStudent= await Student.findOneAndDelete({
  name:req.params.name
})
res.json(deleteStudent)
})


async function startServer() {
  
   
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.d60x7.mongodb.net/FV25?retryWrites=true&w=majority&appName=Cluster0");

  app.listen(3000, () => {
    console.log("Server is running");
  });
}

startServer();