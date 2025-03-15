import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const handleEmailLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/activity"); // 로그인 성공 시 이동할 경로
        }
        catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Google login successful!");
            navigate("/activity"); // Google 로그인 성공 시 이동할 경로
        }
        catch (error) {
            console.error("Google login error:", error);
            alert("Google login failed. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300", children: _jsxs("div", { className: "w-full max-w-md bg-white rounded-lg shadow-md p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-center text-blue-500", children: "Sign In" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-semibold mb-2", children: "Email" }), _jsx("input", { type: "email", id: "email", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-semibold mb-2", children: "Password" }), _jsx("input", { type: "password", id: "password", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: password, onChange: (e) => setPassword(e.target.value) })] }), _jsx("button", { onClick: handleEmailLogin, disabled: loading, className: `w-full px-4 py-2 text-white font-semibold rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`, children: loading ? "Logging in..." : "Sign In" }), _jsx("div", { className: "my-6 text-center text-gray-500", children: "or" }), _jsx("button", { onClick: handleGoogleLogin, disabled: loading, className: "w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600", children: loading ? "Signing in with Google..." : "Sign In with Google" }), _jsxs("p", { className: "mt-4 text-sm text-center", children: ["Don't have an account?", " ", _jsx("a", { href: "/signup", className: "text-blue-500 hover:underline", children: "Sign Up" })] })] }) }));
};
export default SignIn;
