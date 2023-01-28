const { Router } = require("express"); // импортируем роутер
const User = require("../models/User"); // импортируем модель пользователя
const bcrypt = require("bcrypt"); // для хеширования данных
const { check, validationResult } = require("express-validator"); // проверка данных
const jwt = require("jsonwebtoken"); // создание JWT
const config = require("config"); // для получения параметров конфигов

const router = Router(); // создаем роутер

// api/auth/register
router.post(
  "/register",
  // middleware для проверки полей
  // [
  //   check("email", "Некорректный email").isEmail(),
  //   check("password", "Минимальная длина пароля 6 символов").isLength({
  //     min: 6,
  //   }),
  // ],
  async (req, res) => {
    try {
      const { email, password, name, status } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      // есть ли уже пользователь с таким email ?
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      // регистрация нового пользователя

      // хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 12);
      // создание пользователя
      const user = new User({
        email,
        password: hashedPassword,
        name,
        status,
      });
      // ждем пока пользователь сохранится
      await user.save();
      // отвечаем - все успешно
      res.status(201).json({ message: "Пользователь создан успешно" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, посмотрите логи сервера" });
      console.log(e.message);
    }
  }
);

// api/auth/login
router.post(
  "/login",
  // проверка полей
  // [
  //   check("email", "Введите корректный email").normalizeEmail().isEmail(),
  //   check("password", "Введите пароль").exists(),
  // ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      // проверяем, совпадают ли пароли
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }
      // выдаем пользователю токен
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({
        token,
        userId: user.id,
        message: "Добро пожаловать!",
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
      console.log(e.message);
    }
  }
);

module.exports = router;
