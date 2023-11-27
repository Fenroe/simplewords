import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider as StateProvider } from "react-redux";
import { store } from "./data/store";

const App = () => {
  return (
    <StateProvider store={store}>
      <RouterProvider router={router} />
    </StateProvider>
  );
};

export default App;
