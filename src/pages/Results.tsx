import { Link } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

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

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Assessment Results</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        {/* Overall Score */}
        <div className="text-center p-6 bg-blue-50 rounded-lg mb-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">{scores.overall}%</h2>
          <p className="text-gray-600">Overall Score</p>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-lg">Detailed Breakdown</h3>
          {Object.entries(scores.domains).map(([domain, data]) => (
            <div key={domain} className="p-4 border rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
                <span>{data.value}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.value}%` }} />
              </div>
              {Object.entries(data.subCategories).map(([subCat, score]) => (
                <div key={subCat} className="flex justify-between mb-1 text-sm">
                  <span>{subCat.charAt(0).toUpperCase() + subCat.slice(1)}</span>
                  <span>{score}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <h3 className="font-medium text-lg mb-3">Performance Visualization</h3>
          <Radar data={radarData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        </div>

        {/* Strengths and Weaknesses */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <h3 className="font-medium text-lg mb-3">Strengths & Weaknesses</h3>
          <p><strong>Strengths:</strong> {analytics.strengths.join(", ")}</p>
          <p><strong>Weaknesses:</strong> {analytics.weaknesses.join(", ")}</p>
        </div>

        {/* Growth Comparisons */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <h3 className="font-medium text-lg mb-3">Growth & Comparisons</h3>
          <p>Weekly Growth: {analytics.progress.weekly}%</p>
          <p>Monthly Growth: {analytics.progress.monthly}%</p>
          <p>Peer Comparison: {analytics.comparisons.peerGroup} percentile</p>
          <p>Grade Level Comparison: {analytics.comparisons.gradeLevel} percentile</p>
        </div>

        {/* Navigation to Activity */}
        <div className="text-center mt-6">
          <Link
            to="/activity"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Proceed to Next Activity
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Results;