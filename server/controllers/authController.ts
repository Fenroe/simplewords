import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ServerError, AppUser } from "../types";
import { pool } from "../config";
import argon2 from "argon2";
import { signJwt } from "../utilities";

const signup = [
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation failed") as ServerError;
      }
      const { email, password } = req.body;
      // check for email
      const emailQuery = await pool.query(
        "SELECT email FROM accounts WHERE email=$1",
        [email]
      );
      const emailInUse = emailQuery.rows.length > 0;
      if (emailInUse === true) {
        throw new Error("Email is already being used") as ServerError;
      }
      // Hash password
      const hashedPassword = await argon2.hash(password);
      // Add credentials
      const newAccountQuery = await pool.query(
        "INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );
      const accountId = newAccountQuery.rows[0].id;
      // Sign JWT
      const refreshToken = signJwt(accountId, "refresh", 1800);
      const accessToken = signJwt(accountId, "access", 60);
      // Return token
      res.status(201).send({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  },
];

const login = [
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation failed") as ServerError;
      }
      const { email, password } = req.body;
      // check for email
      const accountQuery = await pool.query(
        "SELECT * FROM accounts WHERE email=$1",
        [email]
      );
      const accountNotFound = accountQuery.rows.length > 0;
      if (accountNotFound === true) {
        throw new Error("Invalid credentials") as ServerError;
      }

      // Compare passwords
      const account = accountQuery.rows[0];
      const hashedPassword = account.password;
      const passwordsMatch = await argon2.verify(hashedPassword, password);
      if (passwordsMatch === false) {
        throw new Error("Invalid credentials") as ServerError;
      }
      // Sign JWT
      const accountId = account.id;
      const refreshToken = signJwt(accountId, "refresh", 1800);
      const accessToken = signJwt(accountId, "access", 60);
      // Return token
      res.status(201).send({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  },
];

const verifyPassword = [
  body("password").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation failed") as ServerError;
      }
      const { password } = req.body;
      const account = req.user as AppUser;
      // Compare passwords
      const hashedPassword = account.password;
      const passwordsMatch = await argon2.verify(hashedPassword, password);
      if (passwordsMatch === false) {
        throw new Error("Invalid credentials") as ServerError;
      }
      const accountId = account.id;
      const accessToken = signJwt(accountId, "access", 60);
      res.status(200).send({ passwordsMatch, accessToken });
    } catch (err) {
      next(err);
    }
  },
];

export const authController = {
  signup,
  login,
  verifyPassword,
};
