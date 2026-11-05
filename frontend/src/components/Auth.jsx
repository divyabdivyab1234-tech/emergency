
import { useState } from "react";
import {
  Siren, Mail, Lock, UserRound, Eye, EyeOff,
  ArrowRight, ShieldCheck, ChevronLeft
} from "lucide-react";

function Auth({ onLogin, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("User");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Demo only: no real account is created or authenticated.
    onLogin({
      name: form.name || form.email.split("@")[0],
      email: form.email,
      role
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <button className="auth-back" onClick={onBack}>
          <ChevronLeft size={18} /> Back to dashboard
        </button>

        <div className="auth-brand">
          <div className="auth-logo"><Siren size={30} /></div>
          <div>
            <h2>SMART<span>RESCUE</span></h2>
            <p>EMERGENCY RESPONSE SYSTEM</p>
          </div>
        </div>

        <div className="auth-message">
          <span className="eyebrow">SMARTER EMERGENCY COORDINATION</span>
          <h1>Connecting help.<br /><span>When it matters.</span></h1>
          <p>
            Access emergency reporting, hospital information
            and response coordination through one platform.
          </p>
          <div className="auth-feature">
            <ShieldCheck size={20} />
            <span>A unified emergency response platform</span>
          </div>
        </div>

        <p className="auth-footer-text">
          Academic project prototype · SDG 3
        </p>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-mobile-brand">
            <div className="auth-logo"><Siren size={25} /></div>
            <strong>SMART<span>RESCUE</span></strong>
          </div>

          <span className="eyebrow">
            {isLogin ? "WELCOME BACK" : "JOIN SMARTRESCUE"}
          </span>

          <h2>{isLogin ? "Sign in to your account" : "Create your account"}</h2>
          <p className="auth-subtitle">
            {isLogin
              ? "Enter your details to access your dashboard."
              : "Register to explore the SmartRescue platform."}
          </p>

          <div className="auth-tabs">
            <button
              className={isLogin ? "selected" : ""}
              onClick={() => { setIsLogin(true); setError(""); }}
            >Login</button>
            <button
              className={!isLogin ? "selected" : ""}
              onClick={() => { setIsLogin(false); setError(""); }}
            >Register</button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="auth-label">
                Full name
                <div className="auth-input">
                  <UserRound size={18} />
                  <input
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={updateForm}
                  />
                </div>
              </label>
            )}

            <label className="auth-label">
              Email address
              <div className="auth-input">
                <Mail size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={updateForm}
                />
              </div>
            </label>

            <label className="auth-label">
              Password
              <div className="auth-input">
                <Lock size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  value={form.password}
                  onChange={updateForm}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {!isLogin && (
              <label className="auth-label">
                Confirm password
                <div className="auth-input">
                  <Lock size={18} />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={updateForm}
                  />
                </div>
              </label>
            )}

            <label className="auth-label">
              Account type
              <select
                className="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin (Demo)</option>
              </select>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-submit" type="submit">
              {isLogin ? "Login to dashboard" : "Create account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-legal">
            Demo authentication only. No credentials are stored or verified.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
