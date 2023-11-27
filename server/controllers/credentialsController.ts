import { NextFunction, Request, Response } from "express";
import { ServerError, AppUser } from "../types";
import { pool } from "../config";
import { body, validationResult } from "express-validator";
import { assignErrorProperties } from "../utilities";

// Get credentials fields associated with the user's account
const getFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract user account information from the request
    const account = req.user as AppUser;

    // Query the database for credentials associated with the user's account
    const credentialsQuery = await pool.query(
      "SELECT (id, field, icon) FROM credentials WHERE account=$1",
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
    const completeError = assignErrorProperties(err as ServerError);
    next(completeError);
  }
};

// Get secret for a specific set of credentials
const getSecret = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract credentialsId from the request parameters
    const { credentialsId } = req.params;

    // Query the database for the secret associated with the specified credentialsId
    const passwordQuery = await pool.query(
      "SELECT secret FROM credentials WHERE id=$1",
      [credentialsId]
    );

    // Extract the secret from the query result
    const { secret } = passwordQuery.rows[0];

    // Send a successful response with the retrieved secret
    res.status(200).send({
      success: true,
      message: "Credentials were found",
      data: { secret },
    });
  } catch (err) {
    // Pass any errors to the error handling middleware
    const completeError = assignErrorProperties(err as ServerError);
    next(completeError);
  }
};

// Create new credentials for the user's account
const postCredentials = [
  // Validate the request body using express-validator
  body("field").notEmpty(),
  body("secret").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If validation fails, throw an error with a validation failed message
        throw new Error("Validation failed") as ServerError;
      }

      // Extract field and secret from the request body
      const { field, secret, icon } = req.body;

      // Extract user account information from the request
      const account = req.user as AppUser;

      // Insert new credentials into the database
      const credentialsQuery = await pool.query(
        "INSERT INTO credentials (field, secret, account_id, icon) VALUES ($1, $2, $3, $4) RETURNING id, field",
        [field, secret, account.id, icon]
      );
      const credentials = credentialsQuery.rows[0];
      // Send a successful response
      res.status(200).send({
        success: true,
        message: "Credentials were added",
        data: { credentials },
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
      const completeError = assignErrorProperties(err as ServerError);
      next(completeError);
    }
  },
];

// Update the secret for a specific set of credentials
const updateSecret = [
  // Validate the request body using express-validator
  body("field").notEmpty(),
  body("secret").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If validation fails, throw an error with a validation failed message
        throw new Error("Validation failed") as ServerError;
      }

      // Extract field, secret, and credentialsId from the request
      const { field, secret, icon } = req.body;
      const { credentialsId } = req.params;

      // Update the credentials in the database
      const credentialsQuery = await pool.query(
        "UPDATE credentials SET field=$1, secret=$2, icon=$3 WHERE id=$4 RETURNING id, field, icon",
        [field, secret, icon, credentialsId]
      );
      const credentials = credentialsQuery.rows[0];
      // Send a successful response
      res.status(200).send({
        success: true,
        message: "Credentials were updated",
        data: { credentials },
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
      const completeError = assignErrorProperties(err as ServerError);
      next(completeError);
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
    const credentialsQuery = await pool.query(
      "DELETE FROM credentials WHERE id=$1 AND account_id=$2 RETURNING id",
      [credentialsId, account.id]
    );
    const credentials = credentialsQuery.rows[0];
    // Send a successful response
    res.status(200).send({
      success: true,
      message: "Credentials were deleted",
      data: { credentials },
    });
  } catch (err) {
    // Pass any errors to the error handling middleware
    const completeError = assignErrorProperties(err as ServerError);
    next(completeError);
  }
};

export const credentialsController = {
  getFields,
  getSecret,
  postCredentials,
  updateSecret,
  deleteCredentials,
};
