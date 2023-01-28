// роут для работы с пользователем

const { Router } = require("express"); // импортируем роутер
const User = require("../models/User"); // импортируем модель пользователя
const router = Router(); // создаем роутер

// api/users/
router.post("/", async (req, res) => {
  const { status } = req.body;
  const candidate = await User.find({ status: status });
  res.status(200).json(candidate);
});

module.exports = router;
