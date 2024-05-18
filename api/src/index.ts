const express = require("express");
import { Request, Response } from "express";
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  models: { User, Role },
} = require("./models");
const { Strategy, ExtractJwt } = passportJWT;

const app = express();
app.use(bodyParser.json());
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "my_key",
};

interface passport {
  time: number;
  id: number;
}

passport.use(
  new Strategy(jwtOptions, async (payload: passport, done: any) => {
    const currentTime = Date.now();
    //set 5 minute expair token time
    if (payload.time + 1000 * 60 * 5 < currentTime) {
      return done(null, false);
    } else {
      const user = await User.findOne({
        where: { id: payload.id },
        rows: true,
      });

      if (user) {
        const { RoleId } = user;
        const Dbroles = await Role.findOne({
          where: { id: RoleId },
          rows: true,
        });

        return done(null, {
          id: user.id,
          userName: user.userName,
          role: Dbroles.role,
        });
      } else {
        return done(null, false);
      }
    }
  })
);
app.use("/user", passport.authenticate("jwt", { session: false }), require("./routes/user"));
interface TypedRequestBody<T> extends Request {
  body: T;
}
app.post("/login", async (req: TypedRequestBody<{ username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { [Op.and]: [{ userName: username }, { password: password }] } });
  if (user) {
    const time = Date.now();
    const token = jwt.sign({ id: user.id, time: time }, jwtOptions.secretOrKey);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
