import { useEffect, useState } from "react"

const useCurrencyInfo = (currency)=>{
    const [info, setInfo] = useState({})
    useEffect(()=>{
        // fetch data
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
           .then(res=>res.json())
           .then(data=>setInfo(data))
           .catch(error=>console.error(error))
    },[currency])
    return info;
}

export default useCurrencyInfo;