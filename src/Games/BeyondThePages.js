import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const mapImage = "/assets/map.png";
const castleImage = "/assets/castle.png";
const characterImage = "/assets/character.png";
const bookcaseImage = "/assets/bookcase.png";
const bookImage = "/assets/book.png";
const books = [
    {
        id: "book1",
        title: "삼국지 (Romance of the Three Kingdoms)",
        culture: "Chinese",
        content: "Zhuge Liang, the Sleeping Dragon, was a master strategist who helped Liu Bei establish his kingdom...",
        questions: [
            {
                text: "Fill in the blank: Zhuge Liang was known as the ______ Dragon.",
                options: ["Sleeping", "Golden", "Flying"],
                answer: "Sleeping",
            },
        ],
    },
    {
        id: "book2",
        title: "겐지 이야기 (The Tale of Genji)",
        culture: "Japanese",
        content: "The Tale of Genji, often considered the world's first novel, explores courtly life and relationships in Heian Japan...",
        questions: [
            {
                text: "Which literary device is primarily used in The Tale of Genji?",
                options: ["Metaphor", "Stream of Consciousness", "Allegory"],
                answer: "Stream of Consciousness",
            },
        ],
    },
    {
        id: "book3",
        title: "홍길동전 (The Tale of Hong Gil-dong)",
        culture: "Korean",
        content: "Hong Gil-dong, a legendary figure in Korean literature, fights against social injustice and seeks equality...",
        questions: [
            {
                text: "What central theme is explored in The Tale of Hong Gil-dong?",
                options: ["Revenge", "Social Equality", "Political Power"],
                answer: "Social Equality",
            },
        ],
    },
];
const BeyondThePages = () => {
    const [currentStep, setCurrentStep] = useState("outside");
    const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 500 });
    const [selectedBook, setSelectedBook] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    useEffect(() => {
        const handleKeyPress = (event) => {
            setCharacterPosition((prev) => {
                const speed = 20;
                switch (event.key) {
                    case "ArrowUp":
                        return { ...prev, y: Math.max(0, prev.y - speed) };
                    case "ArrowDown":
                        return { ...prev, y: Math.min(500, prev.y + speed) };
                    case "ArrowLeft":
                        return { ...prev, x: Math.max(0, prev.x - speed) };
                    case "ArrowRight":
                        return { ...prev, x: Math.min(800, prev.x + speed) };
                    default:
                        return prev;
                }
            });
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);
    const handleAnswer = (answer) => {
        if (selectedBook) {
            if (answer === selectedBook.questions[questionIndex].answer) {
                setScore(score + 1);
            }
            if (questionIndex + 1 < selectedBook.questions.length) {
                setQuestionIndex(questionIndex + 1);
            }
            else {
                setSelectedBook(null);
                setShowQuiz(false);
                setQuestionIndex(0);
            }
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen bg-gray-200", children: [currentStep === "outside" && (_jsxs("div", { className: "relative", children: [_jsx("p", { className: "absolute top-4 left-4 p-4 bg-white rounded-lg shadow", children: "\"The castle stands, an ageless might, in twilight's golden hue, \\n Within its halls, the whispers call, of legends old and true.\"" }), _jsx("img", { src: mapImage, alt: "Map", className: "w-full h-auto" }), _jsx(motion.img, { src: characterImage, alt: "Character", className: "absolute", style: { left: `${characterPosition.x}px`, top: `${characterPosition.y}px` } }), _jsx("img", { src: castleImage, alt: "Castle", className: "absolute", style: { left: "700px", top: "50px", width: "100px" }, onClick: () => setCurrentStep("inside") })] })), currentStep === "inside" && !selectedBook && (_jsxs("div", { className: "relative", children: [_jsx("img", { src: bookcaseImage, alt: "Bookcase", className: "w-full h-auto" }), _jsx("div", { className: "absolute grid grid-cols-3 gap-4 p-8", children: books.map((book) => (_jsxs("button", { onClick: () => setSelectedBook(book), className: "p-4 bg-blue-100 rounded-lg hover:bg-blue-200", children: [_jsx("img", { src: bookImage, alt: "Book", className: "w-16 h-16 mx-auto mb-2" }), book.title, " (", book.culture, ")"] }, book.id))) })] })), selectedBook && !showQuiz && (_jsxs("div", { className: "p-8 bg-white rounded-lg shadow-md", children: [_jsx("h2", { children: selectedBook.title }), _jsx("p", { children: selectedBook.content }), _jsx("button", { onClick: () => setShowQuiz(true), children: "Take Quiz" })] })), showQuiz && selectedBook && (_jsxs("div", { className: "p-8 bg-white rounded-lg shadow-md", children: [_jsx("p", { children: selectedBook.questions[questionIndex].text }), selectedBook.questions[questionIndex].options.map((option) => (_jsx("button", { onClick: () => handleAnswer(option), children: option }, option)))] }))] }));
};
export default BeyondThePages;
