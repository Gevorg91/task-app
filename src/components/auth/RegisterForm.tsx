import React, { useState } from "react";

interface RegisterFormProps {
  onRegister: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    passwordConfirm: string,
  ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      // Handle the password mismatch error here, e.g., show a toast, modal, or inline message
      alert("Passwords do not match.");
      return;
    }
    onRegister(email, password, firstName, lastName, passwordConfirm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
