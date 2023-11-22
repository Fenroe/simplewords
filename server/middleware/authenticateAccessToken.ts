import { passport } from "../config";

export const authenticateAccessToken = () => {
  const options = {
    session: false,
  };
  return passport.authenticate("access", options);
};
