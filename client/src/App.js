import { useState } from "react";
import "./App.css";
import catGif from "./assets/cat.gif";
import shrekGif from "./assets/shrek.gif";
function App() {
  const [step, setStep] = useState("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" });
  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 70) + 10;
    const randomLeft = Math.floor(Math.random() * 70) + 10;
    setNoPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };
  const getTimeComment = () => {
    if (!time) return "";
    const hour = Number(time.split(":")[0]);
    if (hour >= 6 && hour < 12) {
      return "Morning date? Bold choice ☀️";
    }
    if (hour >= 12 && hour < 17) {
      return "Cute afternoon plan 💕";
    }
    if (hour >= 17 && hour < 21) {
      return "Romantic evening detected 🌙";
    }
    return "Late night? Interesting... 👀";
  };
  const handleStart = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter your name and email");
      return;
    }
    setStep("question");
  };
  const handleYes = () => {
    setStep("activity");
  };
  const handleSendRequest = async () => {
    if (!activity || !date || !time) {
      alert("Please choose activity, date and time");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://dating-website-znad.onrender.com/api/date-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          activity,
          date,
          time,
          timeComment: getTimeComment(),
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setStep("success");
    } catch (error) {
      alert("Could not send the request. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app">
      {" "}
      {step === "form" && (
        <form className="card" onSubmit={handleStart}>
          {" "}
          <h1>Before we start 💌</h1>{" "}
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <button type="submit" className="main-btn">
            {" "}
            Continue{" "}
          </button>{" "}
        </form>
      )}{" "}
      {step === "question" && (
        <div className="question-screen">
          {" "}
          <img src={catGif} alt="Cute Cat" className="main-gif" />{" "}
          <h1>Would you go on a date with me? 🥺</h1>{" "}
          <button onClick={handleYes} className="yes-btn">
            {" "}
            Yes ❤️{" "}
          </button>{" "}
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="no-btn"
            style={{ top: noPosition.top, left: noPosition.left }}
          >
            {" "}
            No{" "}
          </button>{" "}
        </div>
      )}{" "}
      {step === "activity" && (
        <div className="card">
          {" "}
          <img src={shrekGif} alt="Shrek" className="main-gif" />{" "}
          <h1>What should we do? ❤️</h1>{" "}
          <div className="activities">
            {" "}
            {["Coffee ☕", "Pizza 🍕", "Walk 🚶", "Movie 🎬", "Drink 🍸"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    activity === item ? "activity-btn selected" : "activity-btn"
                  }
                  onClick={() => setActivity(item)}
                >
                  {" "}
                  {item}{" "}
                </button>
              ),
            )}{" "}
          </div>{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />{" "}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />{" "}
          {time && <p className="time-comment"> {getTimeComment()} </p>}{" "}
          <button
            onClick={handleSendRequest}
            className="main-btn"
            disabled={loading}
          >
            {" "}
            {loading ? "Sending..." : "Send request 💌"}{" "}
          </button>{" "}
        </div>
      )}{" "}
      {step === "success" && (
        <div className="card">
          {" "}
          <h1>You just made my day ❤️</h1>{" "}
          <p>Perfect, I’ll contact you soon!</p>{" "}
        </div>
      )}{" "}
    </div>
  );
}
export default App;
