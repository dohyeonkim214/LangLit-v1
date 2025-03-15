import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, } from "chart.js";
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);
const mockData = {
    scores: {
        overall: 85,
        domains: {
            academic: { value: 90, subCategories: { reading: 92, writing: 88, comprehension: 90 } },
            cultural: { value: 80, subCategories: { contextual: 78, idiomatic: 82, references: 80 } },
            practical: { value: 75, subCategories: { daily: 80, social: 70, media: 75 } },
        },
    },
    levels: {
        current: { academic: "B", cultural: 3, practical: "Intermediate" },
        progress: { xp: 200, nextLevelThreshold: 500 },
    },
    analytics: {
        strengths: ["Reading Comprehension", "Academic Writing"],
        weaknesses: ["Social Interaction", "Idiomatic Expressions"],
        progress: { weekly: 2, monthly: 5 },
        comparisons: { peerGroup: 85, gradeLevel: 78 },
    },
    visualization: {
        radarChart: { academic: 90, cultural: 80, practical: 75, confidence: 85, engagement: 70 },
    },
};
function Results() {
    const { scores, analytics, visualization } = mockData;
    const radarData = {
        labels: ["Academic", "Cultural", "Practical", "Confidence", "Engagement"],
        datasets: [
            {
                label: "Your Performance",
                data: [
                    visualization.radarChart.academic,
                    visualization.radarChart.cultural,
                    visualization.radarChart.practical,
                    visualization.radarChart.confidence,
                    visualization.radarChart.engagement,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Peer Average",
                data: [80, 75, 70, 80, 75],
                backgroundColor: "rgba(192, 75, 75, 0.2)",
                borderColor: "rgba(192, 75, 75, 1)",
                borderWidth: 1,
            },
        ],
    };
    return (_jsx("main", { className: "min-h-screen bg-gray-50 p-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Your Assessment Results" }), _jsx("p", { className: "text-gray-600", children: "Here's how you performed" })] }), _jsxs("div", { className: "text-center p-6 bg-blue-50 rounded-lg mb-6", children: [_jsxs("h2", { className: "text-3xl font-bold text-blue-600 mb-2", children: [scores.overall, "%"] }), _jsx("p", { className: "text-gray-600", children: "Overall Score" })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsx("h3", { className: "font-medium text-lg", children: "Detailed Breakdown" }), Object.entries(scores.domains).map(([domain, data]) => (_jsxs("div", { className: "p-4 border rounded-lg mb-4", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "font-medium", children: domain.charAt(0).toUpperCase() + domain.slice(1) }), _jsxs("span", { children: [data.value, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 h-2 rounded-full mb-4", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${data.value}%` } }) }), Object.entries(data.subCategories).map(([subCat, score]) => (_jsxs("div", { className: "flex justify-between mb-1 text-sm", children: [_jsx("span", { children: subCat.charAt(0).toUpperCase() + subCat.slice(1) }), _jsxs("span", { children: [score, "%"] })] }, subCat)))] }, domain)))] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg mb-6", children: [_jsx("h3", { className: "font-medium text-lg mb-3", children: "Performance Visualization" }), _jsx(Radar, { data: radarData, options: { responsive: true, plugins: { legend: { position: "top" } } } })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg mb-6", children: [_jsx("h3", { className: "font-medium text-lg mb-3", children: "Strengths & Weaknesses" }), _jsxs("p", { children: [_jsx("strong", { children: "Strengths:" }), " ", analytics.strengths.join(", ")] }), _jsxs("p", { children: [_jsx("strong", { children: "Weaknesses:" }), " ", analytics.weaknesses.join(", ")] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg mb-6", children: [_jsx("h3", { className: "font-medium text-lg mb-3", children: "Growth & Comparisons" }), _jsxs("p", { children: ["Weekly Growth: ", analytics.progress.weekly, "%"] }), _jsxs("p", { children: ["Monthly Growth: ", analytics.progress.monthly, "%"] }), _jsxs("p", { children: ["Peer Comparison: ", analytics.comparisons.peerGroup, " percentile"] }), _jsxs("p", { children: ["Grade Level Comparison: ", analytics.comparisons.gradeLevel, " percentile"] })] }), _jsx("div", { className: "text-center mt-6", children: _jsx(Link, { to: "/activity", className: "inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold", children: "Proceed to Next Activity" }) })] }) }));
}
export default Results;
