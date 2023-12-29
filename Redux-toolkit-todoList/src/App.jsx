import { store } from "./App/store";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="flex-1">
        <h1 className="text-center font-bold">Todo App </h1>
        <Todo />
      </div>
    </Provider>
  );
}

export default App;
