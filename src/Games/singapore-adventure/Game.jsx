import React, { useEffect, useRef, useState } from "react";
import Matter, { World, Bodies, Body, Vector } from "matter-js";
import darwinChunks from "./books/darwin_variation_chunks.json";
// Updated map data with a hub and four game areas
const SingaporeBotanicGardenMap = {
  prologue: "Welcome to Singapore Adventure. Explore the four locations to complete your journey.",
  locations: [
    {
      id: "hub",
      name: "Central Hub",
      description: "The main area connects to four different locations in Singapore.",
      npc: {
        text: "Welcome to Singapore! There are four interesting places to explore. Visit all of them to complete your journey.",
        options: ["I'll start exploring"],
        correctAnswer: "I'll start exploring",
        onSuccess: {
          knowledge: "Complete all four areas to earn a special reward!"
        }
      },
      obstacles: [
        // Four different shapes representing different game areas
        { 
          type: "singaporeanRoom", 
          x: 300, 
          y: 200, 
          width: 150, // width 속성이 누락됨
          height: 150, 
          color: "red" 
        },
        { 
          type: "botanicLesson", 
          x: 700, 
          y: 200, 
          width: 150, 
          height: 150, 
          color: "green" 
        },
        { 
          type: "mysteryRoom", 
          x: 300, 
          y: 600, 
          width: 150, 
          height: 150, 
          color: "purple" 
        },
        { 
          type: "laneToFinish", 
          x: 700, 
          y: 600, 
          width: 150, 
          height: 150, 
          color: "orange" 
        }
      ],
      triggers: [
        { x: 300, y: 200, width: 150, height: 150, action: "enterSingaporeanRoom" },
        { x: 700, y: 200, width: 150, height: 150, action: "enterBotanicLesson" },
        { x: 300, y: 600, width: 150, height: 150, action: "enterMysteryRoom" },
        { x: 700, y: 600, width: 150, height: 150, action: "enterLaneToFinish" }
      ]
    },
    {
      id: "singaporeanRoom",
      name: "Singaporean's Room",
      description: "A cozy room filled with Singaporean cultural items.",
      npc: {
        text: "Welcome to my home! Let me test your knowledge about Singapore culture.",
        quiz: {
          question: "Based on the text, what is significant about Singapore's cultural heritage?",
          options: ["Multicultural diversity", "Ancient monuments", "Single cultural identity", "Island isolation"],
          correctAnswer: "Multicultural diversity"
        },
        onSuccess: { nextLocation: "hub", reward: "singapore_souvenir" }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "botanicLesson",
      name: "Botanic Lesson",
      description: "Singapore's famous botanical gardens with rare plants.",
      npc: {
        text: "Welcome to the Botanic Gardens! Here, you can learn about the unique flora of Singapore. Please share your thoughts about conservation:",
        writing: true,
        onSuccess: { nextLocation: "hub", reward: "rare_plant_cutting" }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "mysteryRoom",
      name: "Mystery Room",
      description: "A room full of puzzles and mysteries about Singapore.",
      npc: {
        text: "Welcome to the Mystery Room! Solve this linguistic puzzle to proceed:",
        quiz: {
          question: "Which language is NOT one of Singapore's four official languages?",
          options: [
            "English",
            "Mandarin",
            "Malay",
            "Japanese"
          ],
          correctAnswer: "Japanese"
        },
        onSuccess: { nextLocation: "hub", reward: "mystery_key" }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "laneToFinish",
      name: "Lane to Finish",
      description: "The final path of your Singapore journey.",
      npc: {
        text: "You've reached the final challenge! Answer this question about Singapore's history:",
        quiz: {
          question: "When did Singapore gain independence from Malaysia?",
          options: [
            "1963",
            "1965",
            "1975",
            "1959"
          ],
          correctAnswer: "1965"
        },
        onSuccess: { nextLocation: "hub", reward: "singapore_flag" }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    }
  ]
};
// 게임 컴포넌트
const SingaporeAdventureGame = () => {
    const [currentLocation, setCurrentLocation] = useState("hub");
    const [score, setScore] = useState(0);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [inventory, setInventory] = useState([]);
    const [gameState, setGameState] = useState("playing");
    const [currentQuest, setCurrentQuest] = useState("Choose an assessment area");
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0); // 다윈 텍스트 인덱스
    const [showRewardAnimation, setShowRewardAnimation] = useState(false);
    const [completedTests, setCompletedTests] = useState([]);
    const [randomTextChunk, setRandomTextChunk] = useState("");
    const [writingInput, setWritingInput] = useState(""); // Add this state for writing input
    const [welcomeDismissed, setWelcomeDismissed] = useState(false);
    const [debugLog, setDebugLog] = useState("");
    const [directionControls, setDirectionControls] = useState({
      up: false,
      down: false,
      left: false,
      right: false
    });
    const movementKeysRef = useRef({
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      w: false,
      a: false,
      s: false,
      d: false
    });
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const playerRef = useRef(null);
    const obstaclesRef = useRef([]);
    const triggersRef = useRef([]);
    const rafRef = useRef(null);
    const isInitializedRef = useRef(false);
    const chunks = darwinChunks;
    const locationData = SingaporeBotanicGardenMap.locations.find((loc) => loc.id === currentLocation);
    // Matter.js 초기화
    useEffect(() => {
        if (isInitializedRef.current)
            return;
        isInitializedRef.current = true;
        const engine = Matter.Engine.create();
        engine.gravity.y = 0;
        engineRef.current = engine;
        const render = Matter.Render.create({
            element: canvasRef.current,
            engine: engine,
            options: {
                width: 1000,
                height: 800,
                wireframes: false,
                background: "#d0f0c0",
            },
        });
        renderRef.current = render;
        // 플레이어 물리 속성 수정
        const player = Bodies.circle(500, 400, 20, {
          restitution: 0.0,
          friction: 0.01,       // 마찰력 감소
          frictionAir: 0.001,   // 공기 마찰 대폭 감소
          density: 0.005,
          render: { fillStyle: "blue" },
        });
        playerRef.current = player;
        World.add(engine.world, player);
        const boundaries = [
            Bodies.rectangle(500, -25, 1000, 50, { isStatic: true }),
            Bodies.rectangle(500, 825, 1000, 50, { isStatic: true }),
            Bodies.rectangle(-25, 400, 50, 800, { isStatic: true }),
            Bodies.rectangle(1025, 400, 50, 800, { isStatic: true }),
        ];
        World.add(engine.world, boundaries);
        Matter.Render.run(render);
        
        // Use the global update function
        rafRef.current = requestAnimationFrame(update);
        
        return () => {
            if (renderRef.current)
                Matter.Render.stop(renderRef.current);
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
            }
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
    }, [gameState]);
    // 위치 변경 시 장애물/트리거 갱신
    useEffect(() => {
        if (!engineRef.current || !playerRef.current)
            return;
        
        // Clear existing obstacles and triggers
        obstaclesRef.current.forEach((obs) => World.remove(engineRef.current.world, obs));
        triggersRef.current.forEach((trig) => World.remove(engineRef.current.world, trig));
        obstaclesRef.current = [];
        triggersRef.current = [];
        
        // Add new obstacles based on current location
        locationData?.obstacles?.forEach((obs) => {
            let body;
            if (obs.type === "singaporeanRoom" || obs.type === "botanicLesson" || 
                obs.type === "mysteryRoom" || obs.type === "laneToFinish") {
              // 새 타입명으로 수정
              body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
                isStatic: true, 
                isSensor: true, // isSensor를 true로 설정하여 통과 가능하게 함
                render: { fillStyle: obs.color, opacity: 0.7 }
              });
            } else if (obs.type === "tree") {
              body = Bodies.circle(obs.x, obs.y, obs.radius, { 
                isStatic: true, 
                render: { fillStyle: "green" } 
              });
            } else {
              body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
                isStatic: true, 
                render: { fillStyle: "gray" } 
              });
            }
            obstaclesRef.current.push(body);
            World.add(engineRef.current.world, body);
        });
        locationData?.triggers?.forEach((trigger) => {
            const triggerBody = Bodies.rectangle(trigger.x, trigger.y, trigger.width, trigger.height, {
                isStatic: true,
                isSensor: true,
                label: trigger.action,
                render: { 
                  fillStyle: "rgba(255, 255, 0, 0.2)",
                  opacity: 0.3
                }
            });
            triggersRef.current.push(triggerBody);
            World.add(engineRef.current.world, triggerBody);
            console.log(`트리거 생성: ${trigger.action}, 위치: (${trigger.x}, ${trigger.y})`);
        });
        
        // 위치 초기화는 장소가 바뀔 때만
        if (currentLocation !== "hub") {
          Body.setPosition(playerRef.current, { x: 500, y: 400 });
          Body.setVelocity(playerRef.current, { x: 0, y: 0 });
        }
        
        // Get a random text chunk when entering a test area
        if (currentLocation !== "hub") {
          const randomIndex = Math.floor(Math.random() * chunks.length);
          setCurrentChunkIndex(randomIndex);
          setRandomTextChunk(chunks[randomIndex].text);
          
          // Update the reading quiz based on the random chunk if in reading area
          if (currentLocation === "readingArea") {
            const readingLocation = SingaporeBotanicGardenMap.locations.find(loc => loc.id === "readingArea");
            if (readingLocation && readingLocation.npc && readingLocation.npc.quiz) {
              // Dynamically set question based on the chunk content
              readingLocation.npc.quiz.question = `Based on the text, what is the main idea?`;
              
              // Simplified logic - in a real app you'd need more sophisticated analysis
              const topics = ["Natural selection", "Adaptation", "Inheritance", "Species variation"];
              readingLocation.npc.quiz.options = [...topics];
              readingLocation.npc.quiz.correctAnswer = topics[0]; // Simplification
            }
          }
        }
    }, [currentLocation]);
    // 키보드 입력 수정 - 키 누름과 키 놓음 모두 처리
useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = true;
      setDebugLog(`Key down: ${key}`);
      e.preventDefault();
    }
  };
  
  const handleKeyUp = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = false;
      e.preventDefault();
    }
  };
  
  // 이벤트 리스너 등록
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, []);
    // NPC 답변/퀴즈 처리
    const handleAnswer = (answer) => {
        if (!locationData?.npc) return;
        
        const isCorrect = locationData.npc.quiz
          ? answer === locationData.npc.quiz.correctAnswer
          : answer === locationData.npc.correctAnswer;
        
        if (isCorrect) {
          // Update score and XP
          setScore((prev) => prev + 10);
          setXp((prev) => {
            const newXp = prev + 10;
            if (newXp >= level * 20) setLevel((prev) => prev + 1);
            return newXp;
          });
          
          // Special handling for hub welcome message
          if (currentLocation === "hub" && answer === "I'll start exploring") {
            setWelcomeDismissed(true);
            return; // Exit early, no location change needed
          }
          
          // Get next location and reward information
          const nextLocation = locationData.npc.onSuccess?.nextLocation;
          const reward = locationData.npc.onSuccess?.reward;
          
          // Update completed tests list
          if (!completedTests.includes(currentLocation)) {
            setCompletedTests(prev => [...prev, currentLocation]);
          }
          
          // Change location if specified
          if (nextLocation) {
            setCurrentLocation(nextLocation);
            setCurrentQuest(
              nextLocation === "hub" 
                ? "Choose another assessment area" 
                : `Complete the ${nextLocation} assessment`
            );
          }
          
          // Check if all tests are completed
          if (completedTests.length + 1 >= 4) { // All 4 tests are completed
            setTimeout(() => {
              setGameState("gameOver");
              setCurrentQuest("All assessments completed! You earned a special reward!");
            }, 1000);
          }
          
          // Add reward to inventory
          if (reward) {
            setInventory((prev) => [...new Set([...prev, reward])]);
            setShowRewardAnimation(true);
            setTimeout(() => setShowRewardAnimation(false), 1000);
          }
        } else {
          alert("Incorrect! Please try again.");
          setScore((prev) => Math.max(0, prev - 5));
        }
      };
// update 함수를 더 간단하고 직접적으로 수정
const update = () => {
  if (engineRef.current && playerRef.current && gameState === "playing") {
    // 엔진 업데이트
    Matter.Engine.update(engineRef.current, 1000 / 60);
    
    // 직접적인 콘솔 로그 추가 (매 프레임마다)
    console.log("키 상태:", movementKeysRef.current);
    
    // 플레이어 속도 설정 - velocity 방식 사용
    const keys = movementKeysRef.current;
    const speed = 3;
    let xForce = 0;
    let yForce = 0;
    
    if (keys.ArrowUp || keys.w || directionControls.up) yForce = -speed;
    if (keys.ArrowDown || keys.s || directionControls.down) yForce = speed;
    if (keys.ArrowLeft || keys.a || directionControls.left) xForce = -speed;
    if (keys.ArrowRight || keys.d || directionControls.right) xForce = speed;
    
    // 위치를 강제로 변경
    if (xForce !== 0 || yForce !== 0) {
      const currentPos = playerRef.current.position;
      Body.setPosition(playerRef.current, { 
        x: currentPos.x + xForce, 
        y: currentPos.y + yForce 
      });
      setDebugLog(`이동 중: x=${Math.round(currentPos.x)}, y=${Math.round(currentPos.y)}, 방향: (${xForce}, ${yForce})`);
    }
    
    // 트리거 충돌 확인 코드...
  }
  
  rafRef.current = requestAnimationFrame(update);
};

// 모든 중복 return 문을 제거하고 아래 return 문만 남깁니다
return (
  <div className="flex flex-col items-center p-4">
    {/* HUD */}
    <div className="w-[1000px] bg-gray-100 p-2 mb-2 rounded flex justify-between items-center">
      <div>점수: {score} | 경험치: {xp} | 레벨: {level}</div>
      <div>인벤토리: {inventory.join(", ") || "없음"}</div>
      <div className="font-bold text-green-600">현재 테스트: {currentQuest}</div>
      <div>독해 진행: {currentChunkIndex + 1} / {chunks.length}</div>
      <button onClick={() => setGameState(gameState === "playing" ? "paused" : "playing")} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        {gameState === "playing" ? "일시정지" : "재개"}
      </button>
    </div>
    
    {/* 게임 캔버스 */}
    <div ref={canvasRef} className="border rounded shadow w-[1000px] h-[800px] relative">
      {showRewardAnimation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-yellow-500 animate-bounce">
          +{locationData?.npc?.onSuccess?.reward || "Reward"}!
        </div>
      )}
      
      {/* 디렉션 컨트롤러 */}
      <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-2">
        <div className="w-12 h-12"></div>
        <button 
          className="w-12 h-12 bg-blue-500 opacity-70 rounded-full flex items-center justify-center text-white text-2xl"
          onMouseDown={() => setDirectionControls(prev => ({...prev, up: true}))}
          onMouseUp={() => setDirectionControls(prev => ({...prev, up: false}))}
          onMouseLeave={() => setDirectionControls(prev => ({...prev, up: false}))}
          onTouchStart={() => setDirectionControls(prev => ({...prev, up: true}))}
          onTouchEnd={() => setDirectionControls(prev => ({...prev, up: false}))}
        >
          ↑
        </button>
        <div className="w-12 h-12"></div>
        <button 
          className="w-12 h-12 bg-blue-500 opacity-70 rounded-full flex items-center justify-center text-white text-2xl"
          onMouseDown={() => setDirectionControls(prev => ({...prev, left: true}))}
          onMouseUp={() => setDirectionControls(prev => ({...prev, left: false}))}
          onMouseLeave={() => setDirectionControls(prev => ({...prev, left: false}))}
          onTouchStart={() => setDirectionControls(prev => ({...prev, left: true}))}
          onTouchEnd={() => setDirectionControls(prev => ({...prev, left: false}))}
        >
          ←
        </button>
        <div className="w-12 h-12"></div>
        <button 
          className="w-12 h-12 bg-blue-500 opacity-70 rounded-full flex items-center justify-center text-white text-2xl"
          onMouseDown={() => setDirectionControls(prev => ({...prev, right: true}))}
          onMouseUp={() => setDirectionControls(prev => ({...prev, right: false}))}
          onMouseLeave={() => setDirectionControls(prev => ({...prev, right: false}))}
          onTouchStart={() => setDirectionControls(prev => ({...prev, right: true}))}
          onTouchEnd={() => setDirectionControls(prev => ({...prev, right: false}))}
        >
          →
        </button>
        <div className="w-12 h-12"></div>
        <button 
          className="w-12 h-12 bg-blue-500 opacity-70 rounded-full flex items-center justify-center text-white text-2xl"
          onMouseDown={() => setDirectionControls(prev => ({...prev, down: true}))}
          onMouseUp={() => setDirectionControls(prev => ({...prev, down: false}))}
          onMouseLeave={() => setDirectionControls(prev => ({...prev, down: false}))}
          onTouchStart={() => setDirectionControls(prev => ({...prev, down: true}))}
          onTouchEnd={() => setDirectionControls(prev => ({...prev, down: false}))}
        >
          ↓
        </button>
        <div className="w-12 h-12"></div>
      </div>
      
      {/* 디버깅 정보 */}
      <div className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 text-xs">
        <div>DEBUG: {debugLog}</div>
        <div>Position: {playerRef.current ? `x=${Math.round(playerRef.current.position.x)}, y=${Math.round(playerRef.current.position.y)}` : "N/A"}</div>
        <button 
          onClick={() => {
            if (playerRef.current) {
              Body.setPosition(playerRef.current, { x: 500, y: 400 });
              setDebugLog("Player reset to center");
            }
          }}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded mt-1"
        >
          Reset Player
        </button>
      </div>
    </div>
    
    {/* NPC 대화 - 나머지 부분은 유지 */}
    {locationData?.npc && gameState === "playing" && 
     !(currentLocation === "hub" && welcomeDismissed) && (
      <div className="bg-white p-4 rounded shadow mt-4 w-[600px]">
        <div className="flex items-start">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
          <div className="flex-1">
            <p className="mb-2 text-lg font-semibold">{locationData.npc.text}</p>
            {currentLocation !== "hub" && (
              <div className="mb-4 p-2 bg-gray-50 rounded">
                <p className="text-sm italic">"{randomTextChunk || chunks[currentChunkIndex].text}"</p>
                <p className="text-xs mt-1 text-gray-500">— Charles Darwin, "The Variation of Animals and Plants under Domestication"</p>
              </div>
            )}
            <div className="space-y-3">
              {locationData.npc.quiz ? (
                <>
                  <p className="font-medium">{locationData.npc.quiz.question}</p>
                  {locationData.npc.quiz.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </>
              ) : locationData.npc.writing ? (
                <div className="space-y-3">
                  <textarea
                    value={writingInput}
                    onChange={(e) => setWritingInput(e.target.value)}
                    placeholder="Write your response here..."
                    className="w-full p-2 border rounded h-32"
                  />
                  <button
                    onClick={() => {
                      if (writingInput.trim().length > 20) { // Simple validation
                        handleAnswer(writingInput);
                        setWritingInput("");
                      }
                      else {
                        alert("Please write a more detailed response (at least 20 characters)");
                      }
                    }}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Submit Response
                  </button>
                </div>
              ) : (
                locationData.npc.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {option}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    
    {/* 게임 종료 */}
    {gameState === "gameOver" && (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold">게임 종료!</h1>
        <p>최종 점수: {score}</p>
        <p>읽은 텍스트: {currentChunkIndex + 1} / {chunks.length}</p>
      </div>
    )}
    
    {/* 허브 정보 */}
    {currentLocation === "hub" && (
      <>
        {/* Area labels - positioned to match the colored rectangles */}
        <div className="absolute top-[150px] left-[275px] text-center text-white font-bold w-[200px] z-20">
          Singaporean's
          <br />
          Room
        </div>
        <div className="absolute top-[150px] left-[675px] text-center text-white font-bold w-[200px] z-20">
          Botanic
          <br />
          Lesson
        </div>
        <div className="absolute top-[550px] left-[275px] text-center text-white font-bold w-[200px] z-20">
          Mystery
          <br />
          Room
        </div>
        <div className="absolute top-[550px] left-[675px] text-center text-white font-bold w-[200px] z-20">
          Lane to
          <br />
          Finish
        </div>
        
        {/* Game information banner */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded shadow-lg z-10 text-center">
          <h2 className="text-xl font-bold mb-2">Singapore Adventure</h2>
          <p>Enter any colored area to explore different locations:</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span>Singaporean's Room {completedTests.includes("singaporeanRoom") && "✓"}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span>Botanic Lesson {completedTests.includes("botanicLesson") && "✓"}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 mr-2"></div>
              <span>Mystery Room {completedTests.includes("mysteryRoom") && "✓"}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 mr-2"></div>
              <span>Lane to Finish {completedTests.includes("laneToFinish") && "✓"}</span>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded shadow-lg z-10 text-center">
          <p className="text-lg">Use arrow keys to navigate to any colored area</p>
          <p className="text-sm text-gray-500">Complete all locations to finish your Singapore journey!</p>
        </div>
      </>
    )}
  </div>
);
};
export default SingaporeAdventureGame;
