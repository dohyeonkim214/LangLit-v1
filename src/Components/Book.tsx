import React from "react";

interface BookProps {
  title: string;
  onClick: () => void;
}

const Book: React.FC<BookProps> = ({ title, onClick }) => {
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img src="/assets/book.png" alt={title} style={{ width: "100px" }} />
      <p>{title}</p>
    </div>
  );
};

export default Book;