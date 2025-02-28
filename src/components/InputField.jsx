import React, { useId } from 'react'

function InputField({
  label,
  isAmountDisabled,
  currencyType=[],
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency
}) {
  const uniqueId = useId()

  return (
    <div className='bg-white p-3 mb-2 rounded-lg flex justify-around items-center'>
      <div className='flex flex-col items-start'>
        <label htmlFor={uniqueId}>{label}:</label>
        <input 
          type='number'
          className='border-0 outline-0'
          disabled = {isAmountDisabled}
          value={amount}
          id={uniqueId}
          onChange={(e)=> {
            if (e.target.value < 0) {
              setAmount(0)
            } else {
              setAmount(Number(e.target.value))
            }
            
          }} 
          
        />
      </div>
      <div className='flex flex-col items-end'>
        <label>Currency Type:</label>
        <select 
          className='border border-fuchsia-600 rounded-md outline-0 cursor-pointer h-full '
          value={selectedCurrency}
          
          onChange={(e)=> setSelectedCurrency(e.target.value)}
        >
        {currencyType.map((currency) => (
            <option className='text-center' key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default InputField
