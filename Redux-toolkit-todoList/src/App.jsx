import { store } from "./App/store";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <h1>Hello From APP</h1>
      <Todo />
    </Provider>
  );
}

export default App;
