import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import BeyondThePages from "../Games/BeyondThePages";
import ReadingForestChallenge from "./Challenges/Reading_Forest";
import SingaporeAdventure from "../Games/singapore-adventure/Game";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Constants
const LEVELS = ["Novice Reader", "Story Explorer", "Literary Master"];
const ONTARIO_CRITERIA = ["Reading", "Writing", "Oral Communication", "Media Literacy"];
const USER_SCORES = [75, 85, 90, 80];
const PEER_SCORES = [70, 80, 85, 78];
const POSTS_PER_PAGE = 10;
const GAME_ELEMENTS = {
    companions: [
        { name: "Lexi the Explorer", role: "Reading Guide", personality: "Encouraging, adventurous" },
        { name: "Professor Owl", role: "Academic Mentor", personality: "Wise, patient" },
    ],
};
const INTERACTIVE_FEATURES = {
    storyMap: {
        locations: ["Reading Forest", "Grammar Castle", "Culture Bridge"],
        challenges: ["Story Puzzles", "Language Quests", "Cultural Missions"],
    },
    rewards: {
        items: ["Magic Bookmarks", "Knowledge Crystals"],
        badges: ["Reading Champion", "Culture Explorer"],
        powers: ["Hint Boost", "Skip Challenge"],
    },
};
// Component
const Activity = () => {
    // State
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
    const [achievements, setAchievements] = useState([]);
    const [selectedTab, setSelectedTab] = useState("activity");
    const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
    // Generate mock posts
    const mockPosts = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        user: `User${index + 1}`,
        time: `${Math.floor(Math.random() * 60)} min ago`,
        content: `This is a sample post from User${index + 1}. It's a great day to read books and explore!`,
    }));
    // Handlers
    const handleCompanionHelp = (companionName) => {
        const companion = GAME_ELEMENTS.companions.find((c) => c.name === companionName);
        if (companion) {
            alert(`${companion.name} says: Here's some advice!`);
        }
    };
    const startChallenge = (challenge) => {
        setCurrentChallenge(challenge);
    };
    const completeChallenge = () => {
        if (currentChallenge) {
            setAchievements(prev => [...prev, currentChallenge]);
            setCurrentChallenge(null);
            if (achievements.length + 1 >= 3) {
                const nextLevelIndex = LEVELS.indexOf(currentLevel) + 1;
                if (nextLevelIndex < LEVELS.length) {
                    setCurrentLevel(LEVELS[nextLevelIndex]);
                }
            }
        }
    };
    const loadMorePosts = () => {
        setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, mockPosts.length));
    };
    // Components
    const CompanionsSection = () => (_jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Companions" }), _jsx("div", { className: "flex space-x-4 overflow-x-auto pb-2", children: GAME_ELEMENTS.companions.map((companion) => (_jsxs("button", { onClick: () => handleCompanionHelp(companion.name), className: "p-3 bg-white rounded-full shadow flex-shrink-0 w-24 h-24 text-center hover:bg-blue-200", children: [_jsx("p", { className: "text-xs font-bold", children: companion.name }), _jsx("p", { className: "text-xs", children: companion.role })] }, companion.name))) })] }));
    const ChallengesSection = () => (_jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Choose a Challenge" }), _jsx("div", { className: "grid grid-cols-3 gap-4", children: INTERACTIVE_FEATURES.storyMap.locations.map((location, index) => (_jsxs("button", { onClick: () => startChallenge(location), className: "p-4 bg-blue-100 rounded-lg text-center shadow hover:bg-blue-200 transition", children: [_jsx("h3", { className: "font-bold text-sm", children: location }), _jsx("p", { className: "text-xs text-gray-500", children: INTERACTIVE_FEATURES.storyMap.challenges[index] })] }, location))) })] }));
    const InventorySection = () => (_jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Your Inventory" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-white rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Your Avatar" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-green-300 rounded-full flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold", children: "Level 2 Explorer" }), _jsx("p", { className: "text-gray-500", children: "XP: 150 / 300" })] })] })] }), _jsxs("div", { className: "p-4 bg-white rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Your Items" }), _jsx("ul", { className: "list-disc list-inside text-gray-700", children: INTERACTIVE_FEATURES.rewards.items.map((item, index) => (_jsx("li", { children: item }, index))) })] }), _jsxs("div", { className: "p-4 bg-white rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Your Cash" }), _jsx("p", { className: "text-gray-700 mb-4", children: "\uD83D\uDCB0 500 Coins" }), _jsx("button", { onClick: () => alert("You bought a new item!"), className: "px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600", children: "Buy Magic Bookmark (100 Coins)" })] })] })] }));
    const FriendsSection = () => (_jsxs("section", { className: "mb-6 px-4 text-center", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Friends' Progress" }), _jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-blue-300 rounded-full flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold", children: "Your Avatar" }), _jsx("p", { className: "text-gray-500", children: "Level 2" })] })] }) }), _jsx("div", { className: "space-y-4", children: ["Alice", "Bob", "Charlie"].map((friend) => (_jsxs("div", { className: "p-3 bg-white rounded-lg shadow flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-pink-300 rounded-full flex-shrink-0" }), _jsxs("div", { children: [_jsx("span", { className: "font-semibold text-sm", children: friend }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Level ", Math.floor(Math.random() * 3) + 1] })] })] }), _jsx("button", { onClick: () => alert(`You sent a message to ${friend}!`), className: "px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600", children: "Send Message" })] }, friend))) })] }));
    const FeedSection = () => (_jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Activity Feed" }), _jsxs("div", { className: "p-4 bg-white rounded-lg shadow mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Performance Overview" }), _jsx(Bar, { data: {
                            labels: ONTARIO_CRITERIA,
                            datasets: [
                                {
                                    label: "Your Scores",
                                    data: USER_SCORES,
                                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                                    borderColor: "rgba(75, 192, 192, 1)",
                                    borderWidth: 1,
                                },
                                {
                                    label: "Peers' Average Scores",
                                    data: PEER_SCORES,
                                    backgroundColor: "rgba(192, 75, 75, 0.6)",
                                    borderColor: "rgba(192, 75, 75, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        }, options: {
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                                title: {
                                    display: true,
                                    text: "Performance Comparison",
                                },
                            },
                        } })] }), _jsxs("ul", { className: "space-y-3 mb-6", children: [_jsx("li", { className: "p-3 bg-white rounded-lg shadow", children: "\uD83C\uDF89 You completed \"Story Puzzles\" challenge!" }), _jsx("li", { className: "p-3 bg-white rounded-lg shadow", children: "\uD83C\uDFC6 You earned \"Reading Champion\" badge!" }), _jsxs("li", { className: "p-3 bg-white rounded-lg shadow", children: ["\uD83C\uDF93 You've advanced to \"", currentLevel, "\" level!"] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "User Posts" }), _jsx("div", { className: "space-y-4", children: mockPosts.slice(0, visiblePosts).map((post) => (_jsxs("div", { className: "p-4 bg-white rounded-lg shadow flex space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-blue-300 rounded-full flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold text-sm", children: post.user }), _jsx("span", { className: "text-xs text-gray-500", children: post.time })] }), _jsx("p", { className: "text-sm mt-2 text-gray-700", children: post.content })] })] }, post.id))) }), visiblePosts < mockPosts.length && (_jsx("div", { className: "text-center mt-4", children: _jsx("button", { onClick: loadMorePosts, className: "px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600", children: "Load More" }) }))] })] }));
    return (_jsxs("div", { className: "h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100", children: [_jsx("header", { className: "w-full bg-white shadow-md fixed top-0 z-10", children: _jsx("h1", { className: "text-xl font-bold text-center py-3", children: "Adventure Time!" }) }), _jsxs("main", { className: "flex-1 pt-16 pb-16 px-4 overflow-y-auto", children: [selectedTab === "activity" && (_jsx("div", { children: currentChallenge === "Reading Forest" ? (_jsx(ReadingForestChallenge, {})) : (_jsxs(_Fragment, { children: [_jsx(CompanionsSection, {}), _jsx(ChallengesSection, {}), currentChallenge && (_jsx("section", { className: "mb-6", children: _jsxs("div", { className: "p-4 bg-yellow-100 rounded-lg text-center", children: [_jsx("p", { className: "mb-2", children: currentChallenge }), _jsx("button", { onClick: completeChallenge, className: "mt-2 px-4 py-2 bg-green-500 text-white rounded-full font-semibold", children: "Complete Challenge" })] }) })), _jsx(InventorySection, {})] })) })), selectedTab === "friends" && _jsx(FriendsSection, {}), selectedTab === "feed" && _jsx(FeedSection, {}), selectedTab === "game" && _jsx(BeyondThePages, {}), selectedTab === "SingaporeAdventure" && _jsx(SingaporeAdventure, {})] }), _jsx("footer", { className: "w-full bg-white shadow-md fixed bottom-0 z-10", children: _jsx("div", { className: "flex justify-around py-3", children: ["activity", "friends", "feed", "game", "SingaporeAdventure"].map((tab) => (_jsx("button", { onClick: () => setSelectedTab(tab), className: `text-sm ${selectedTab === tab ? "text-green-500 font-semibold" : "text-gray-400"}`, children: tab.charAt(0).toUpperCase() + tab.slice(1) }, tab))) }) })] }));
};
export default Activity;
