import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signin";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import MainPage from "./pages/MainPage";
import Activity from "./pages/Activity";
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainPage, {}) }), _jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/assessment", element: _jsx(Assessment, {}) }), _jsx(Route, { path: "/results", element: _jsx(Results, {}) }), _jsx(Route, { path: "/activity", element: _jsx(Activity, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
export default App;
