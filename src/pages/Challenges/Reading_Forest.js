import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const books = [
    {
        id: 1,
        title: "The Beauty of Nature",
        excerpt: `Forests are home to diverse species and play a crucial role in maintaining Earth's ecological balance. Trees absorb carbon dioxide, release oxygen, and provide habitat for countless animals.`,
        questions: [
            {
                id: 1,
                text: "What role do forests play in the ecosystem?",
                options: ["They absorb oxygen.", "They provide homes for animals.", "They emit carbon dioxide."],
                answer: "They provide homes for animals.",
            },
            {
                id: 2,
                text: "What do trees release into the atmosphere?",
                options: ["Nitrogen", "Oxygen", "Carbon dioxide"],
                answer: "Oxygen",
            },
        ],
    },
    {
        id: 2,
        title: "The Adventures of the Great North",
        excerpt: `The northern lights, or Aurora Borealis, dance across the sky with vibrant colors. These lights are a result of charged particles colliding in the Earth's atmosphere.`,
        questions: [
            {
                id: 1,
                text: "What causes the northern lights?",
                options: ["Clouds reflecting sunlight", "Charged particles colliding", "Volcanic eruptions"],
                answer: "Charged particles colliding",
            },
            {
                id: 2,
                text: "What is another name for the northern lights?",
                options: ["Solar Eclipse", "Aurora Borealis", "Milky Way"],
                answer: "Aurora Borealis",
            },
        ],
    },
];
const ReadingForestChallenge = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCompleted(false);
    };
    const handleAnswer = (selectedOption) => {
        if (selectedBook) {
            const currentQuestion = selectedBook.questions[currentQuestionIndex];
            if (selectedOption === currentQuestion.answer) {
                setScore((prev) => prev + 1);
            }
            if (currentQuestionIndex < selectedBook.questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            }
            else {
                setCompleted(true);
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-green-100 flex flex-col items-center justify-center", children: [!selectedBook && (_jsxs("div", { className: "w-full max-w-md p-4 bg-white rounded shadow", children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: "Choose a Book to Start" }), _jsx("div", { className: "space-y-4", children: books.map((book) => (_jsx("button", { onClick: () => handleSelectBook(book), className: "w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", children: book.title }, book.id))) })] })), selectedBook && !completed && (_jsxs("div", { className: "w-full max-w-md p-4 bg-white rounded shadow", children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: selectedBook.title }), _jsx("p", { className: "italic mb-4", children: selectedBook.excerpt }), _jsx("p", { className: "mb-4", children: selectedBook.questions[currentQuestionIndex].text }), _jsx("div", { className: "space-y-2", children: selectedBook.questions[currentQuestionIndex].options.map((option) => (_jsx("button", { onClick: () => handleAnswer(option), className: "w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", children: option }, option))) })] })), completed && (_jsxs("div", { className: "w-full max-w-md p-4 bg-white rounded shadow text-center", children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: "Challenge Complete!" }), _jsxs("p", { children: ["Your score: ", score, " / ", selectedBook?.questions.length] }), _jsx("button", { onClick: () => setSelectedBook(null), className: "mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600", children: "Choose Another Book" })] }))] }));
};
export default ReadingForestChallenge;
