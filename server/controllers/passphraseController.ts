import { NextFunction, Request, Response } from "express";
import { openai } from "../config";

const getPassphraseWithDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numberOfWords: string = req.query.number as string;
    const description: string = decodeURIComponent(
      req.query.description as string
    );
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
          Given the following description, please generate ${numberOfWords} common English words that are not included in the description and that would be memorable to the person who wrote it. Please only respond with these words, with a comma separating them and no other grammar or space between the words whatsoever. \n "${description}"`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    let personalPassphraseWords = response.choices[0].message.content || "";
    return res.status(200).send({ personalPassphraseWords });
  } catch (err) {
    return next(err);
  }
};

export const passphraseController = { getPassphraseWithDescription };
