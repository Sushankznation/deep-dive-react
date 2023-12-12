import { InputBox } from "./components";
import useCurrencyInfo from "./customHook/useCurrencyInfo";
import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConverted] = useState(0);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
