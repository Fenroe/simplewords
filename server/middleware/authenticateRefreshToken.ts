import { passport } from "../config";

export const authenticateRefreshToken = () => {
  const options = {
    session: false,
  };
  return passport.authenticate("refresh", options);
};
