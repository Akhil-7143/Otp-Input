import { useState ,useEffect,useRef} from "react";

import './index.css'

const OtpInput=({length=4,onSubmitHandler=()=>{}})=>{
    const [otp,setOtp]=useState(new Array(length).fill(''))
   
    const inputRef=useRef([]);

    useEffect(()=>{
      if (inputRef.current[0]){
        inputRef.current[0].focus()
      }

    },[])

  const onChangeOtp=(e,index)=>{
    const value=e.target.value
    if (isNaN(value)) return;
    const newOtp=[...otp]
    newOtp[index]=value.substring(value.length-1)
    setOtp(newOtp)
    
    // check and combine otp
    const combine=newOtp.join("")
    if (combine.length===length){
      onSubmitHandler(combine)
    }

    // move to the next input field

    if (inputRef.current[index+1] && value && index<length-1){ 
      inputRef.current[index+1].focus() 
    }
  }
  // move  to previous input field
  const handleKeydown=(index,e)=>{
   if (e.key==='Backspace' && !otp[index] && index>0 && inputRef.current[index-1]) {
    inputRef.current[index-1].focus();
    console.log(otp,index,!otp[index]);
     console.log(otp[index])
   }
  }
    return( <div>
      
           {otp.map((value,index)=>{
                     return <input type="text"
                            ref={(input)=>(inputRef.current[index] = input)}
                            className="otp-input"
                            key={index}
                            value={value}
                            onChange={(e)=>onChangeOtp(e,index)}  
                            onKeyDown={(e)=>handleKeydown(index,e)}

                          />
                     })
                }

            </div>
    )

}

export default OtpInput