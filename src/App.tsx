import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // reset previous messages

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        setMessage(res.message || "Signup failed. Please try again.");
        setMessageType("error");
        return;
      }
      setMessage(res.message || "Signup successful!");
      setMessageType("success");
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="form-container">
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Sign Up</h2>

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Sign Up"}
      </button>

      {message && (
        <p className={messageType === "success" ? "success-msg" : "error-msg"}>
          {message}
        </p>
      )}
    </form>
  </div>
);

}

export default App;
