export const SingaporeBotanicGardenMap = {
    locations: [
        {
            id: "entrance",
            name: "Garden Entrance",
            description: "The grand entrance of the Enchanted Garden. The journey begins here!",
            npc: {
                id: 1,
                level: 1,
                speaker: "Garden Guide",
                text: "Welcome, traveler! This garden is full of wonders. Flowers bloom, trees stretch towards the sky, and hidden knowledge awaits. Are you ready to explore?",
                options: ["Yes, let's go!", "No, I need more time."],
                correctAnswer: "Yes, let's go!",
                nextLocation: "orchid_garden"
            }
        },
        {
            id: "orchid_garden",
            name: "Orchid Garden",
            description: "A vibrant garden filled with different species of orchids.",
            npc: {
                id: 2,
                level: 2,
                speaker: "Orchid Guardian",
                text: "Ah, you've arrived at the Orchid Garden! Did you know that orchids are one of the largest plant families in the world? There are over 25,000 species! Some even mimic insects to attract pollinators. Why do you think orchids have such bright colors?",
                options: ["To attract pollinators", "For decoration"],
                correctAnswer: "To attract pollinators",
                quest: "Observe an orchid closely and describe its structure.",
                hint: "Orchids use colors and scents to attract bees, butterflies, and even birds!",
                onSuccess: {
                    reward: "Botanist’s Notebook",
                    nextLocation: "pond_area"
                }
            },
            interactive: {
                action: "Pick a flower",
                response: {
                    text: "You gently pick a vibrant purple orchid. The Orchid Guardian smiles and says, 'Be careful! Orchids are delicate. Can you describe the flower’s shape?'",
                    options: ["It has symmetrical petals and a lip-like structure.", "It has round petals and a thorny stem."],
                    correctAnswer: "It has symmetrical petals and a lip-like structure.",
                    reward: "Rare Orchid Sample"
                }
            }
        },
        {
            id: "pond_area",
            name: "Lotus Pond",
            description: "A peaceful pond filled with floating lotus flowers.",
            npc: {
                id: 3,
                level: 4,
                speaker: "Lotus Spirit",
                text: "Welcome to the Lotus Pond. Unlike orchids, lotuses grow in water. Do you know how they stay afloat?",
                options: ["They have air-filled spaces in their leaves.", "They are held up by fish."],
                correctAnswer: "They have air-filled spaces in their leaves.",
                quest: "Find a lotus leaf and examine its surface.",
                hint: "Lotus leaves are hydrophobic, which means they repel water!",
                onSuccess: {
                    reward: "Hydrophobic Leaf Sample",
                    nextLocation: "library"
                }
            },
            interactive: {
                action: "Touch the water surface",
                response: {
                    text: "You notice water droplets rolling off the lotus leaves like tiny pearls. Why does this happen?",
                    options: ["Because of the hydrophobic nature of the leaf.", "Because the pond is magical."],
                    correctAnswer: "Because of the hydrophobic nature of the leaf.",
                    reward: "Botanic Research Notes"
                }
            }
        },
        {
            id: "library",
            name: "Ancient Library",
            description: "An old library filled with books about the garden's history.",
            npc: {
                id: 4,
                level: 5,
                speaker: "Ancient Librarian",
                text: "Ah, a curious traveler! This library holds the wisdom of the natural world. Can you tell me how plants produce their own food?",
                options: ["Through photosynthesis", "By absorbing nutrients from the air"],
                correctAnswer: "Through photosynthesis",
                quest: "Read a book about plant metabolism and summarize your findings.",
                hint: "Plants use sunlight, carbon dioxide, and water to create energy.",
                onSuccess: {
                    reward: "Photosynthesis Guide",
                    nextLocation: "grammar_goblin"
                }
            }
        },
        {
            id: "grammar_goblin",
            name: "Grammar Goblin's Lair",
            description: "A mischievous goblin who loves wordplay and tricky grammar.",
            npc: {
                id: 5,
                level: 6,
                speaker: "Grammar Goblin",
                text: "You dare enter my lair? Prove your knowledge! Fix my sentence: 'The tree have green leaves.'",
                options: ["The tree has green leaves.", "The trees has green leaves."],
                correctAnswer: "The tree has green leaves.",
                quest: "Correct three more grammar mistakes to pass.",
                hint: "Singular subjects require singular verbs.",
                onSuccess: {
                    reward: "Grammar Scroll",
                    nextLocation: "mini_game_1"
                }
            }
        },
        {
            id: "mini_game_1",
            name: "Mini-Game Challenge",
            description: "A special challenge to test your language skills.",
            miniGame: {
                id: 6,
                level: 7,
                type: "sentence_rearrange",
                text: "Rearrange the words into a correct sentence: 'oxygen / produces / plants'.",
                options: ["Plants produce oxygen.", "Plants produces oxygen."],
                correctAnswer: "Plants produce oxygen.",
                reward: "EXP +10, Special Key",
                nextLocation: "final_gate"
            }
        },
        {
            id: "final_gate",
            name: "Gatekeeper's Final Test",
            description: "The final challenge before leaving the enchanted garden.",
            npc: {
                id: 7,
                level: 8,
                speaker: "Gatekeeper of the Magic Sentence",
                text: "Only the wise may leave this garden. Complete this: 'Singapore Botanic Gardens is famous for its vast collection of ______.'",
                options: ["plants and flowers", "cars and buildings"],
                correctAnswer: "plants and flowers",
                quest: "Prove your knowledge by answering three more questions.",
                hint: "This garden is home to many exotic plant species.",
                onSuccess: {
                    reward: "Exit Key",
                    nextLocation: "final_mini_game"
                }
            }
        }
    ]
};
