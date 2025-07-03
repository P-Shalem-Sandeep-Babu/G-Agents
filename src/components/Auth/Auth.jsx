import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FiMail, FiPhone, FiLock, FiUser } from "react-icons/fi";
import logo from "@/assets/logo.png";

const Auth = () => {
  const { 
    signup, 
    login, 
    phoneLogin, 
    confirmOTP, 
    passwordReset, 
    signout, 
    currentUser 
  } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [error, setError] = useState("");
  
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
        // In a real app, you would also save the user's name to Firestore
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!confirmationResult) {
        // Initialize recaptcha verifier
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {}
        });
        
        const result = await phoneLogin(phoneNumber, window.recaptchaVerifier);
        setConfirmationResult(result);
      } else {
        await confirmOTP(confirmationResult, otp);
        setConfirmationResult(null);
        setOtp("");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await passwordReset(resetEmail);
      alert("Password reset email sent. Please check your inbox.");
      setShowReset(false);
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (currentUser) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-medium mb-4">Welcome, {currentUser.email || "User"}!</h2>
        <p className="mb-6">You are now logged in to Sandy.</p>
        <button
          onClick={signout}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full"
        >
          Logout
        </button>
      </div>
    );
  }
  
  if (showReset) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-xl font-medium mb-4">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="reset-email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex-1"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  if (isPhoneAuth) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-xl font-medium mb-4">
          {confirmationResult ? "Enter OTP" : "Login with Phone"}
        </h2>
        <form onSubmit={handlePhoneAuth} className="space-y-4">
          {!confirmationResult ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                6-digit OTP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123456"
                />
              </div>
            </div>
          )}
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div id="recaptcha-container"></div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full"
          >
            {confirmationResult ? "Verify OTP" : "Send OTP"}
          </button>
          
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsPhoneAuth(false);
                setConfirmationResult(null);
              }}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Use Email Instead
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-medium mb-4">
        {isLogin ? "Login to Sandy" : "Create an Account"}
      </h2>
      <form onSubmit={handleEmailAuth} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Name"
              />
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••"
            />
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        
        <div className="text-center text-sm space-y-2">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800 block w-full"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
          </button>
          
          <button
            type="button"
            onClick={() => setIsPhoneAuth(true)}
            className="text-indigo-600 hover:text-indigo-800 block w-full"
          >
            Login with Phone Number
          </button>
          
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="text-indigo-600 hover:text-indigo-800 block w-full"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;