const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://2300030474cse2_db_user:test123@cluster0.3rgkupi.mongodb.net/?appName=Cluster0"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));