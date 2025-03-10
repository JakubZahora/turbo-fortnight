"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="username">Username:</label><br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label><br />
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
      </div>

      {/* Button group */}
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
        <Link href="/users">
          <button
            style={{
              backgroundColor: "white",
              color: "black", // Button text is black
              border: "1px solid #ccc",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Back to Users
          </button>
        </Link>
        {/* You could add a Register button here, for example: */}
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => {
            // handle register action
            console.log("Register", { username, email, password, confirmPassword });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}