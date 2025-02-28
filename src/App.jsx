import { useState,useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import useCurrencyInfo from "./hooks/currencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyType, setCurrencyType] = useState([]); 
  const [fromSelectedCurrency,setFromSelectedCurrency] = useState("USD");
  const [toSelectedCurrency,setToSelectedCurrency] = useState("BDT");

  const currency = useCurrencyInfo(fromSelectedCurrency)


  useEffect(() => {
    if (currency && currency.rates) {
      // Populate the currency types when rates are available
      if (currencyType.length === 0) {
        setCurrencyType(Object.keys(currency.rates));
      }

      // Set the converted amount only when rates are available
      if (currency.rates[toSelectedCurrency]) {
        setConvertedAmount(amount * currency.rates[toSelectedCurrency]);
      }
    }
  }, [currency, amount, fromSelectedCurrency, toSelectedCurrency]);

  const handleSwap = () => {
    setFromSelectedCurrency(toSelectedCurrency);
    setToSelectedCurrency(fromSelectedCurrency);
  };

 
  return (
    <>
      <div className="w-screen h-screen bg-[url('https://plus.unsplash.com/premium_photo-1669927131902-a64115445f0f?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover flex justify-center items-center">
        <div className="min-w-[500px] max-w-[700px] w-[50%] h-[330px] bg-[rgba(255,255,255,.6)] p-4 rounded-xl border-2 border-indigo-600 text-center">
          <h1 className="uppercase text-green-900 font-bold text-3xl mb-3">currency converter</h1>
          <div className=" relative">
              <InputField 
                label={'From'}
                currencyType={currencyType}
                amount={amount}
                setAmount={setAmount}
                selectedCurrency={fromSelectedCurrency}
                setSelectedCurrency={setFromSelectedCurrency}
                isAmountDisabled={false}
              />
              <button 
                type="button" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 px-3 py-1 rounded-lg text-white capitalize cursor-pointer"
                onClick={handleSwap}
                >swap
              </button>
              <InputField
                label={'To'}
                currencyType={currencyType}
                amount={convertedAmount} 
                selectedCurrency={toSelectedCurrency}
                setSelectedCurrency={setToSelectedCurrency}
                isAmountDisabled={true}
              />
          </div>
        <button 
          type="button" 
          className="bg-orange-500 p-4 text-white font-medium capitalize mt-5 rounded-md cursor-pointer"
          onClick={() => setConvertedAmount(amount * currency.rates[toSelectedCurrency])}
        >
            convert {fromSelectedCurrency} to {toSelectedCurrency} currency
        </button>
        </div>
      </div>
    </>
  );
}

export default App;
