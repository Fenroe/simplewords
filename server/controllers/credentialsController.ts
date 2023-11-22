import { NextFunction, Request, Response } from "express";
import { ServerError, AppUser } from "../types";
import { pool } from "../config";
import { body, validationResult } from "express-validator";

// Get credentials fields associated with the user's account
const getFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user account information from the request
    const account = req.user as AppUser;

    // Query the database for credentials associated with the user's account
    const credentialsQuery = await pool.query(
      "SELECT (id, field) FROM credentials WHERE account=$1",
      [account.id]
    );

    // Extract credentials from the query result
    const credentials = credentialsQuery.rows;

    // Send a successful response with the retrieved credentials
    res
      .status(200)
      .send({ success: true, message: "Credentials were found", credentials });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err as ServerError);
  }
};

// Get password for a specific set of credentials
const getPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract credentialsId from the request parameters
    const { credentialsId } = req.params;

    // Query the database for the password associated with the specified credentialsId
    const passwordQuery = await pool.query(
      "SELECT password FROM credentials WHERE id=$1",
      [credentialsId]
    );

    // Extract the password from the query result
    const { password } = passwordQuery.rows[0];

    // Send a successful response with the retrieved password
    res
      .status(200)
      .send({ success: true, message: "Credentials were found", password });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err as ServerError);
  }
};

// Create new credentials for the user's account
const postCredentials = [
  // Validate the request body using express-validator
  body("field").notEmpty(),
  body("password").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If validation fails, throw an error with a validation failed message
        throw new Error("Validation failed") as ServerError;
      }

      // Extract field and password from the request body
      const { field, password } = req.body;

      // Extract user account information from the request
      const account = req.user as AppUser;

      // Insert new credentials into the database
      await pool.query(
        "INSERT INTO credentials (field, password, account_id) VALUES ($1, $2, $3)",
        [field, password, account.id]
      );

      // Send a successful response
      res
        .status(200)
        .send({ success: true, message: "Credentials were added" });
    } catch (err) {
      // Pass any errors to the error handling middleware
      next(err as ServerError);
    }
  },
];

// Update the password for a specific set of credentials
const updatePassword = [
  // Validate the request body using express-validator
  body("field").notEmpty(),
  body("password").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If validation fails, throw an error with a validation failed message
        throw new Error("Validation failed") as ServerError;
      }

      // Extract field, password, and credentialsId from the request
      const { field, password } = req.body;
      const { credentialsId } = req.params;

      // Update the credentials in the database
      await pool.query(
        "UPDATE credentials SET field=$1, password=$2 WHERE id=$3",
        [field, password, credentialsId]
      );

      // Send a successful response
      res
        .status(200)
        .send({ success: true, message: "Credentials were updated" });
    } catch (err) {
      // Pass any errors to the error handling middleware
      next(err as ServerError);
    }
  },
];

// Delete credentials associated with the user's account
const deleteCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user account information and credentialsId from the request
    const account = req.user as AppUser;
    const { credentialsId } = req.params;

    // Delete credentials from the database
    await pool.query("DELETE FROM credentials WHERE id=$1 AND account_id=$2", [
      credentialsId,
      account.id,
    ]);

    // Send a successful response
    res
      .status(200)
      .send({ success: true, message: "Credentials were deleted" });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err as ServerError);
  }
};

export const credentialsController = {
  getFields,
  getPassword,
  postCredentials,
  updatePassword,
  deleteCredentials
}