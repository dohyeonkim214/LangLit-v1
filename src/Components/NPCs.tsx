import React from "react";

const NPCs: React.FC = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <img
        src="/assets/npc.png"
        alt="NPC"
        style={{
          width: "100px",
          borderRadius: "50%",
          border: "2px solid #ccc",
        }}
      />
      <p>Mysterious Librarian</p>
    </div>
  );
};

export default NPCs;