import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

interface Book {
  id: number;
  title: string;
  excerpt: string;
  questions: Question[];
}

const books: Book[] = [
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

const ReadingForestChallenge: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = (selectedOption: string) => {
    if (selectedBook) {
      const currentQuestion = selectedBook.questions[currentQuestionIndex];
      if (selectedOption === currentQuestion.answer) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestionIndex < selectedBook.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      {!selectedBook && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-4">Choose a Book to Start</h2>
          <div className="space-y-4">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => handleSelectBook(book)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {book.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedBook && !completed && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-4">{selectedBook.title}</h2>
          <p className="italic mb-4">{selectedBook.excerpt}</p>
          <p className="mb-4">{selectedBook.questions[currentQuestionIndex].text}</p>
          <div className="space-y-2">
            {selectedBook.questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {completed && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow text-center">
          <h2 className="text-lg font-bold mb-4">Challenge Complete!</h2>
          <p>Your score: {score} / {selectedBook?.questions.length}</p>
          <button
            onClick={() => setSelectedBook(null)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Choose Another Book
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingForestChallenge;