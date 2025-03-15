import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx("header", { className: "bg-white shadow-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center", children: [_jsx("div", { className: "flex items-center", children: _jsx("span", { className: "font-bold text-xl text-gray-800", children: "LingLat" }) }), _jsxs("nav", { className: "hidden md:flex space-x-4", children: [_jsx("a", { href: "#features", className: "text-gray-600 hover:text-gray-900", children: "Features" }), _jsx("a", { href: "#how-it-works", className: "text-gray-600 hover:text-gray-900", children: "How It Works" })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { onClick: () => navigate('/signin'), className: "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300", children: "Sign In" }), _jsx("button", { onClick: () => navigate('/assessment'), className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700", children: "Start Assessment" })] })] }) }), _jsx("section", { className: "bg-blue-600 text-white py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h1", { className: "text-4xl font-extrabold sm:text-5xl md:text-6xl", children: "Master English Through Textbooks" }), _jsx("p", { className: "mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl", children: "For CJK Heritage Students in North America" }), _jsx("div", { className: "mt-10", children: _jsx("button", { onClick: () => navigate('/assessment'), className: "bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100", children: "Start Your Journey" }) })] }) }), _jsx("section", { id: "features", className: "py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-3xl font-extrabold text-center mb-12", children: "Why Choose LingLat?" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
                                {
                                    title: 'AI-Powered Assessment',
                                    description: 'Personalized evaluation using advanced AI technology, grounded on Lingusitic features and theories.'
                                },
                                {
                                    title: 'Cultural Context',
                                    description: 'Understanding tailored to CJK heritage students'
                                },
                                {
                                    title: 'Progress Tracking',
                                    description: 'Detailed analysis and learning recommendations'
                                },
                            ].map((feature, index) => (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.title }), _jsx("p", { className: "text-gray-600", children: feature.description })] }, index))) })] }) }), _jsx("section", { id: "how-it-works", className: "bg-gray-50 py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-3xl font-extrabold text-center mb-12", children: "How It Works" }), _jsx("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8", children: [
                                { step: 1, title: 'Take Assessment', description: 'Complete our adaptive test' },
                                { step: 2, title: 'Get Analysis', description: 'Receive detailed feedback' },
                                { step: 3, title: 'Start Learning', description: 'Follow personalized recommendations' },
                            ].map((step, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4", children: step.step }), _jsx("h3", { className: "font-bold mb-2", children: step.title }), _jsx("p", { className: "text-gray-600", children: step.description })] }, index))) })] }) }), _jsx("footer", { className: "bg-gray-800 text-white py-8", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 text-center", children: _jsx("p", { className: "text-gray-400", children: "\u00A9 2024 LingLat. All rights reserved." }) }) })] }));
};
export default MainPage;
