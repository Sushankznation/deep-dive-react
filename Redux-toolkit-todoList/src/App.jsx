import { store } from "./App/store";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <h1 className="text-center weight-400">Todo App </h1>
      <Todo />
    </Provider>
  );
}

export default App;
