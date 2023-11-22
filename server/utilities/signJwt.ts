import jwt from "jsonwebtoken";

export const signJwt = (id: number, type:string, expiresIn?: number | string) => {
  const payload = {
    sub: id,
    type,
    iat: Date.now(),
  };
  const token = jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn
  });
  return token;
};
