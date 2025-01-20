import React, { useState } from "react";
import { motion } from "framer-motion";

const mapImage = "/assets/map.png"; // 맵 배경 이미지
const castleImage = "/assets/castle.png"; // 성 이미지
const characterImage = "/assets/character.png"; // 캐릭터 이미지
const bookcaseImage = "/assets/bookcase.png"; // 책꽂이 이미지
const bookImage = "/assets/book.png"; // 책 이미지

interface Book {
  id: string;
  title: string;
  questions: { text: string; options: string[]; answer: string }[];
}

const books: Book[] = [
  {
    id: "book1",
    title: "Adventures of Huckleberry Finn",
    questions: [
      {
        text: "Who is the main character?",
        options: ["Huck Finn", "Tom Sawyer", "Jim"],
        answer: "Huck Finn",
      },
      {
        text: "What is the main setting of the story?",
        options: ["A raft", "A castle", "A city"],
        answer: "A raft",
      },
    ],
  },
  {
    id: "book2",
    title: "The Prince and the Pauper",
    questions: [
      {
        text: "Who is the prince in the story?",
        options: ["Tom Canty", "Edward Tudor", "Henry VIII"],
        answer: "Edward Tudor",
      },
      {
        text: "Where was Tom Canty born?",
        options: ["Offal Court, London", "Westminster Abbey", "Tower of London"],
        answer: "Offal Court, London",
      },
    ],
  },
];

const BeyondThePages: React.FC = () => {
  const [characterPosition] = useState({ x: 0, y: 500 });
  const [currentStep, setCurrentStep] = useState("outside"); // "outside", "inside", "question"
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleMapClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 성 영역 좌표 (이 값은 성 이미지의 위치와 크기에 따라 조정)
    const castleBounds = { left: 700, top: 50, right: 800, bottom: 150 };

    if (
      clickX >= castleBounds.left &&
      clickX <= castleBounds.right &&
      clickY >= castleBounds.top &&
      clickY <= castleBounds.bottom
    ) {
      setCurrentStep("inside"); // 성 내부로 전환
    }
  };

  const handleBookSelect = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setQuestionIndex(0);
      setCurrentStep("question");
    }
  };

  const handleAnswer = (option: string) => {
    if (!selectedBook) return;

    const currentQuestion = selectedBook.questions[questionIndex];
    if (option === currentQuestion.answer) {
      setScore(score + 10);
    }

    if (questionIndex < selectedBook.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setCurrentStep("inside"); // 질문 종료 후 성 내부로 복귀
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200">
      {/* 성 외부 */}
      {currentStep === "outside" && (
        <div
          className="relative"
          onClick={handleMapClick} // 클릭 이벤트 추가
        >
          <img src={mapImage} alt="Map" className="w-full h-auto" />
          <motion.img
            src={characterImage}
            alt="Character"
            className="absolute"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: "32px",
              height: "32px",
            }}
          />
          <img
            src={castleImage}
            alt="Castle"
            className="absolute"
            style={{ left: "700px", top: "50px", width: "100px", height: "100px" }}
          />
        </div>
      )}

      {/* 성 내부 */}
      {currentStep === "inside" && (
        <div className="relative">
          <img src={bookcaseImage} alt="Bookcase" className="w-full h-auto" />
          <div className="absolute grid grid-cols-2 gap-4 p-8">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookSelect(book.id)}
                className="p-4 bg-blue-100 rounded-lg shadow hover:bg-blue-200"
              >
                <img src={bookImage} alt="Book" className="w-16 h-16 mx-auto mb-2" />
                {book.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 질문 화면 */}
      {currentStep === "question" && selectedBook && (
        <div className="relative text-center p-8">
          <p className="text-lg font-semibold mb-4">{selectedBook.questions[questionIndex].text}</p>
          <div className="flex space-x-4">
            {selectedBook.questions[questionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-gray-700">Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default BeyondThePages;