import { useState, useRef, useEffect } from "react";
import OtpInput from "../OtpInput";
import "./index.css";

const Home = () => {
  const [nmbr, setNmbr] = useState("");
  const [showOtpComponent, setOtpComponent] = useState(false);
  const onChangeNmbr = (e) => {
    setNmbr(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[0-9]+$/;
    if (!regex.test(nmbr) || nmbr.length < 10) {
      alert("Please enter a valid mobile number");
    } else {
      setOtpComponent(true);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const inputRef = useRef();

  const onSubmitHandler = (otp) => {
    console.log("login successfully with ", otp);
  };

  // make number hide

  const hideNmbr = nmbr.substring(0, 2) + "*******" + nmbr.slice(-2);

  return (
    <div className="home-container">
      {!showOtpComponent ? (
        <form onSubmit={handleSubmit} className="form-card">
          <h1 className="heading">Enter Mobile Number</h1>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Number"
            onChange={onChangeNmbr}
            className="input"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      ) : (
        <div className="otp-container">
          <p className="heading">Otp sent to your mobile number: {hideNmbr} </p>
          <OtpInput length={4} onSubmitHandler={onSubmitHandler} />
        </div>
      )}
    </div>
  );
};

export default Home;
