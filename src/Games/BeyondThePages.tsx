import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const mapImage = "/assets/map.png";
const castleImage = "/assets/castle.png";
const characterImage = "/assets/character.png";
const bookcaseImage = "/assets/bookcase.png";
const bookImage = "/assets/book.png";


interface Book {
  id: string;
  title: string;
  culture: string;
  content: string;
  questions: { text: string; options: string[]; answer: string }[];
}

const books: Book[] = [
  {
    id: "book1",
    title: "삼국지 (Romance of the Three Kingdoms)",
    culture: "Chinese",
    content:
      "Zhuge Liang, the Sleeping Dragon, was a master strategist who helped Liu Bei establish his kingdom...",
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
    content:
      "The Tale of Genji, often considered the world's first novel, explores courtly life and relationships in Heian Japan...",
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
    content:
      "Hong Gil-dong, a legendary figure in Korean literature, fights against social injustice and seeks equality...",
    questions: [
      {
        text: "What central theme is explored in The Tale of Hong Gil-dong?",
        options: ["Revenge", "Social Equality", "Political Power"],
        answer: "Social Equality",
      },
    ],
  },
];

const BeyondThePages: React.FC = () => {
  const [currentStep, setCurrentStep] = useState("outside");
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 500 });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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

  const handleAnswer = (answer: string) => {
    if (selectedBook) {
      if (answer === selectedBook.questions[questionIndex].answer) {
        setScore(score + 1);
      }
      if (questionIndex + 1 < selectedBook.questions.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setSelectedBook(null);
        setShowQuiz(false);
        setQuestionIndex(0);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200">
      {currentStep === "outside" && (
        <div className="relative">
          <p className="absolute top-4 left-4 p-4 bg-white rounded-lg shadow">
            "The castle stands, an ageless might, in twilight's golden hue, \n
            Within its halls, the whispers call, of legends old and true."
          </p>
          <img src={mapImage} alt="Map" className="w-full h-auto" />
          <motion.img
            src={characterImage}
            alt="Character"
            className="absolute"
            style={{ left: `${characterPosition.x}px`, top: `${characterPosition.y}px` }}
          />
          <img
            src={castleImage}
            alt="Castle"
            className="absolute"
            style={{ left: "700px", top: "50px", width: "100px" }}
            onClick={() => setCurrentStep("inside")}
          />
        </div>
      )}

      {currentStep === "inside" && !selectedBook && (
        <div className="relative">
          <img src={bookcaseImage} alt="Bookcase" className="w-full h-auto" />
          <div className="absolute grid grid-cols-3 gap-4 p-8">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200"
              >
                <img src={bookImage} alt="Book" className="w-16 h-16 mx-auto mb-2" />
                {book.title} ({book.culture})
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedBook && !showQuiz && (
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2>{selectedBook.title}</h2>
          <p>{selectedBook.content}</p>
          <button onClick={() => setShowQuiz(true)}>Take Quiz</button>
        </div>
      )}

      {showQuiz && selectedBook && (
        <div className="p-8 bg-white rounded-lg shadow-md">
          <p>{selectedBook.questions[questionIndex].text}</p>
          {selectedBook.questions[questionIndex].options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeyondThePages;
