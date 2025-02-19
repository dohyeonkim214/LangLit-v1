import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { SingaporeBotanicGardenMap } from "./MapData";

const SingaporeAdventureGame: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState("entrance");
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [score, setScore] = useState(0);
  const [inventory, setInventory] = useState<string[]>([]);
  const canvasRef = useRef(null);

  const locationData = SingaporeBotanicGardenMap.locations.find(
    (loc) => loc.id === currentLocation
  );

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    const render = Matter.Render.create({
      element: canvasRef.current!,
      engine: engine,
      options: { width: 1000, height: 800, wireframes: false },
    });

    // 플레이어 생성
    const player = Matter.Bodies.circle(100, 100, 20, { restitution: 0.5 });
    Matter.World.add(world, player);

    // 키보드 컨트롤
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp")
        Matter.Body.setVelocity(player, { x: 0, y: -5 });
      if (event.key === "ArrowDown")
        Matter.Body.setVelocity(player, { x: 0, y: 5 });
      if (event.key === "ArrowLeft")
        Matter.Body.setVelocity(player, { x: -5, y: 0 });
      if (event.key === "ArrowRight")
        Matter.Body.setVelocity(player, { x: 5, y: 0 });
    };
    window.addEventListener("keydown", handleKeyPress);

    Matter.Engine.run(engine);
    Matter.Render.run(render);

    return () => {
      // 키 이벤트 리스너 제거
      window.removeEventListener("keydown", handleKeyPress);
    
      // Matter.js 엔진 및 월드 정리
      Matter.Render.stop(render);
    
      // Matter.World.clear()에서 keepStatic 인자 추가
      Matter.World.clear(world, false); // 'false'로 모든 오브젝트 삭제 (또는 'true'로 고정 오브젝트 유지)
    
      // Matter.js 엔진 정리
      Matter.Engine.clear(engine);
    };
  }, []);

  const handleAnswer = (answer: string) => {
    if (locationData?.npc && answer === locationData.npc.correctAnswer) {
      setScore((prev) => prev + 1);
  
      const nextLocation = locationData?.npc?.onSuccess?.nextLocation;
  
      if (nextLocation) {
        console.log(`✅ Moving to next location: ${nextLocation}`);
        setCurrentLocation(nextLocation);
      } else {
        console.warn("⚠️ No next location defined for this NPC!");
      }
  
      // 보상 추가 (onSuccess가 있는 경우만)
      const reward = locationData?.npc?.onSuccess?.reward;
      if (reward) {
        setInventory((prev) => [...prev, reward]);
      }
    } else {
      alert("Wrong answer! Try again.");
    }
  };
  
  // currentLocation 변경을 감지하고 locationData 업데이트
  useEffect(() => {
    console.log(`📍 Current location updated: ${currentLocation}`);
  }, [currentLocation]);
  // 인터랙티브 요소 처리
  const handleInteraction = (answer: string) => {
    if (
      locationData?.interactive &&
      answer === locationData.interactive.response.correctAnswer
    ) {
      setInventory((prev) => [
        ...prev,
        locationData.interactive.response.reward,
      ]);
      alert("You have received a reward: " + locationData.interactive.response.reward);
    } else {
      alert("Incorrect choice! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={canvasRef} className="border w-[1000px] h-[800px]"></div>

      {/* 현재 위치 설명 */}
      <div className="bg-white p-4 rounded shadow text-center mt-4">
        <h2 className="text-lg font-bold">{locationData?.name}</h2>
        <p>{locationData?.description}</p>
      </div>

      {/* NPC 대화 */}
      {locationData?.npc && (
        <div className="bg-white p-4 rounded shadow mt-4">
          <p className="mb-4">{locationData.npc.text}</p>
          <div className="space-y-2">
            {locationData.npc.options.map((option) => (
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

      {/* 인터랙티브 요소 */}
      {locationData?.interactive && (
        <div className="bg-white p-4 rounded shadow mt-4">
          <p>{locationData.interactive.response.text}</p>
          <div className="space-y-2">
            {locationData.interactive.response.options.map((option) => (
              <button
                key={option}
                onClick={() => handleInteraction(option)}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 미니게임 */}
      {locationData?.miniGame && (
        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-lg font-bold">Mini-Game Challenge</h2>
          <p>{locationData.miniGame.text}</p>
          <div className="space-y-2">
            {locationData.miniGame.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 현재 점수 및 인벤토리 */}
      <div className="bg-gray-100 p-4 rounded shadow mt-4 text-center">
        <h2 className="text-lg font-bold">Adventure Progress</h2>
        <p>Score: {score}</p>
        <p>Inventory: {inventory.length > 0 ? inventory.join(", ") : "None"}</p>
      </div>
    </div>
  );
};

export default SingaporeAdventureGame;