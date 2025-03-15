export const NPCDialogues = [
    {
        id: 1,
        speaker: "Tour Guide",
        text: "Welcome to the Singapore Botanic Gardens! Where do you want to go first?",
        options: ["The lake", "The greenhouse"],
        correctAnswer: "The greenhouse",
        onSuccess: {
            reward: "Garden Map",
            nextLocation: "orchid_garden", // 🔥 선택에 따라 다음 위치로 이동
        },
    },
    {
        id: 2,
        speaker: "Tour Guide",
        text: "Do you know when this garden was founded?",
        options: ["1859", "1901", "1950"],
        correctAnswer: "1859",
        onSuccess: {
            reward: "Historical Brochure",
            nextLocation: "pond_area",
        },
    },
    {
        id: 3,
        speaker: "Tour Guide",
        text: "This garden is famous for?",
        options: ["Orchids", "Tulips", "Cacti"],
        correctAnswer: "Orchids",
        onSuccess: {
            reward: "Orchid Guide",
            nextLocation: "library",
        },
    },
    {
        id: 4,
        speaker: "Orchid Guardian",
        text: "Ah, you've arrived at the Orchid Garden! Why do you think orchids have such bright colors?",
        options: ["To attract pollinators", "For decoration"],
        correctAnswer: "To attract pollinators",
        onSuccess: {
            reward: "Botanist’s Notebook",
            nextLocation: "pond_area",
        },
    },
    {
        id: 5,
        speaker: "Lotus Spirit",
        text: "Welcome to the Lotus Pond. Do you know how lotus flowers stay afloat?",
        options: ["They have air-filled spaces in their leaves.", "They are held up by fish."],
        correctAnswer: "They have air-filled spaces in their leaves.",
        onSuccess: {
            reward: "Hydrophobic Leaf Sample",
            nextLocation: "library",
        },
    },
    {
        id: 6,
        speaker: "Ancient Librarian",
        text: "Can you tell me how plants produce their own food?",
        options: ["Through photosynthesis", "By absorbing nutrients from the air"],
        correctAnswer: "Through photosynthesis",
        onSuccess: {
            reward: "Photosynthesis Guide",
            nextLocation: "grammar_goblin",
        },
    },
    {
        id: 7,
        speaker: "Grammar Goblin",
        text: "You dare enter my lair? Fix my sentence: 'The tree have green leaves.'",
        options: ["The tree has green leaves.", "The trees has green leaves."],
        correctAnswer: "The tree has green leaves.",
        onSuccess: {
            reward: "Grammar Scroll",
            nextLocation: "mini_game_1",
        },
    },
    {
        id: 8,
        speaker: "Gatekeeper of the Magic Sentence",
        text: "Only the wise may leave this garden. Complete this: 'Singapore Botanic Gardens is famous for its vast collection of ______.'",
        options: ["plants and flowers", "cars and buildings"],
        correctAnswer: "plants and flowers",
        onSuccess: {
            reward: "Exit Key",
            nextLocation: "final_mini_game",
        },
    },
];
