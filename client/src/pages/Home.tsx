import { Landing } from "./Landing";
import { Dashboard } from "./Dashboard";
import { useAppSelector } from "@/hooks";

export const Home = () => {
  const account = useAppSelector((state) => state.account);
  return account.id === null ? <Dashboard /> : <Landing />;
};
