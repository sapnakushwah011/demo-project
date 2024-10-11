import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import "./LoginCss.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Fixed typo
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if( username && email && password === confirmPassword ) {
     alert("Sign up successfully");

     // reset 
     setUsername("");
     setEmail("");
     setPassword("");
     setConfirmPassword("");
     setError("");
    }
    else
    {
     setError("Email and password wrong")
    }
  };

  return (
    <>
      <div className="container">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
            height: "470px",
            padding: "30px",
            background: "white",
            gap: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 1.15rem)", fontWeight: "bold", textAlign: "center" }}
          >
            SIGN UP
          </Typography>
          <FormControl style={{ gap: 10 }}>
            <FormLabel htmlFor="username">Enter username</FormLabel>
            <TextField
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              required
              fullWidth
              variant="outlined"
              color={"primary"}
            />
            <FormLabel htmlFor="email">Enter email address</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color={"primary"}
            />
            <FormLabel htmlFor="password">Create Password</FormLabel>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              color={"primary"}
            />
            <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
            <TextField
              name="confirm_password"
              placeholder="••••••"
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="outlined"
              color={"primary"}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
          {error && <Typography style={{ color: "red", marginTop: 3 }}>{error}</Typography>}
        </Box>
      </div>
    </>
  );
};

export default Login;
