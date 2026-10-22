const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authMiddleware");
const Patient = require("./models/Patient");
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const PatientDoctor = require("./models/PatientDoctor");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientDoctorRoutes = require("./routes/patientDoctorRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/mappings", patientDoctorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Healthcare Backend API is running",
  });
});
app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully!");
    PatientDoctor.belongsTo(Patient, {
      foreignKey: "patientId",
    });

    PatientDoctor.belongsTo(Doctor, {
      foreignKey: "doctorId",
    });

    await sequelize.sync();

    console.log("Database synchronized!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};
startServer();
