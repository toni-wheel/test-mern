const express = require("express"); // основной модуль EXPRESS
const config = require("config"); // для получения параметров конфигов
const mongoose = require("mongoose"); // взаимодействие EXPRESS и MONGODB

const app = express(); // создаем приложение EXPRESS

app.use(express.json({ extended: true })); // поддержка JSON
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/users", require("./routes/users.routes"));

app.get("/", (req, res) => {
  res.status(200).json("Hello world!");
});

const PORT = config.get("port") || 5000; // получаем номер порта

// подключение к базе данных
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Server error ", e.message);
    process.exit(1);
  }
}

start();

// прослушиваем запросы на порту
app.listen(PORT, () => {
  console.log(`App has been started on PORT ${PORT}`);
});
