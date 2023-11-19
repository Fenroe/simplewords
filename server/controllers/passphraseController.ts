import { NextFunction, Request, Response } from "express";
import { openai } from "../config";

const getPassphraseWithDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numberOfWords = req.query.number;
    const description = decodeURIComponent(req.query.description as string);
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Given the following description, please generate ${numberOfWords} words to describe the person that relate to their description. Please only respond with these words, with a comma separating them and no other grammar or space between the words whatsoever. Additionally, please do not include words separated by a '-' or similar symbols, and avoid using words included in the description itself: "${description}"`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    let personalPassphraseWords = response.choices[0].message.content || "";
    console.log(personalPassphraseWords);
    return res.status(200).send({ personalPassphraseWords });
  } catch (err) {
    return next(err);
  }
};

export const passphraseController = { getPassphraseWithDescription };
