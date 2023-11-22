import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { pool } from "./postgres";
import dotenv from "dotenv";

//For env File
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

const refreshStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const id = payload.sub;
    const type = payload.type;
    if (type !== "refresh") {
      throw new Error("Invalid token type")
    }
    const userQuery = await pool.query("SELECT * FROM accounts WHERE id=$1", [id]);
    const user = userQuery.rows[0];
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const accessStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const id = payload.sub;
    const type = payload.type;
    if (type !== "access") {
      throw new Error("Invalid token type")
    }
    const userQuery = await pool.query("SELECT * FROM accounts WHERE id=$1", [id]);
    const user = userQuery.rows[0];
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use("refresh", refreshStrategy);
passport.use("access", accessStrategy);

export { passport };
