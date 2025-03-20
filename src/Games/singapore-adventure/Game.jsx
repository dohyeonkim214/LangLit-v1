import React, { useEffect, useRef, useState } from "react";
import Matter, { World, Bodies, Body, Vector } from "matter-js";
import darwinChunks from "./books/darwin_variation_chunks.json";
// 맵 데이터 업데이트: 향상된 서사구조로 수정
const SingaporeBotanicGardenMap = {
  prologue: "Welcome to Singapore. As a first-time visitor, you're on a special mission to find a rare lost seed at the Natural History Museum.",
  locations: [
    {
      id: "hub",
      name: "Central Hub",
      description: "The main area connects to four different locations in Singapore.",
      npc: {
        text: "Welcome to Singapore! I'm your guide, Mei Lin. We need your help to find a lost rare seed that disappeared from our Natural History Museum. To find it, you'll need to explore four key locations and collect special items from each. Are you ready for this adventure?",
        options: ["I'm ready to help!"],
        correctAnswer: "I'm ready to help!",
        onSuccess: {
          knowledge: "Great! Visit all four areas and collect the special items. Once you have all of them, you'll be able to find the lost seed!"
        }
      },
      obstacles: [
        // Four different shapes representing different game areas
        { 
          type: "singaporeanRoom", 
          x: 300, 
          y: 200, 
          width: 150,
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
      name: "Peranakan Heritage Room",
      description: "A room showcasing the rich Peranakan culture of Singapore.",
      npc: {
        text: "Welcome to the Peranakan Heritage Room! I'm Mrs. Tan, a keeper of Peranakan traditions. Our porcelain pieces tell stories about our culture. Based on the text about Singapore's cultural diversity, can you tell me what makes Peranakan culture special?",
        quiz: {
          question: "What makes Peranakan culture significant in Singapore's heritage?",
          options: [
            "It's a unique blend of Chinese and Malay traditions",
            "It originated from European colonizers",
            "It's only found in Singapore's museums",
            "It's a recent cultural phenomenon"
          ],
          correctAnswer: "It's a unique blend of Chinese and Malay traditions"
        },
        onSuccess: { 
          nextLocation: "hub", 
          reward: "peranakan_porcelain",
          message: "Excellent! You've earned this authentic Peranakan porcelain piece. It's one of the four items you'll need to find the lost seed."
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "botanicLesson",
      name: "Singapore Botanic Gardens",
      description: "Singapore's famous botanical gardens with rare plants.",
      npc: {
        text: "Hello, I'm Dr. Wong, a botanist at Singapore's Botanic Gardens. We're home to over 10,000 plant species, including many endangered ones. After reading about plant domestication in the text, please share your thoughts on plant conservation in urban environments like Singapore:",
        writing: true,
        onSuccess: { 
          nextLocation: "hub", 
          reward: "rare_plant_cutting",
          message: "Thank you for your thoughtful response! Here's a cutting from one of our rare plants. It's the second item you'll need for your quest."
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "mysteryRoom",
      name: "Culinary Heritage Center",
      description: "A room showcasing Singapore's rich food culture.",
      npc: {
        text: "Welcome to Singapore's Culinary Heritage Center! I'm Chef Abdullah. Singapore's food culture is as diverse as its people. Many of our traditional dishes use local plants and spices. After reading the text, can you tell me which of these is NOT a traditional food plant in Singapore?",
        quiz: {
          question: "Which of these is NOT a traditional food plant used in Singapore cuisine?",
          options: [
            "Pandan leaves",
            "Galangal",
            "Quinoa",
            "Laksa leaves"
          ],
          correctAnswer: "Quinoa"
        },
        onSuccess: { 
          nextLocation: "hub", 
          reward: "golden_merlion_statue",
          message: "Correct! Quinoa is not traditionally used in Singapore cooking. Here's a Golden Merlion Statue - the third item for your collection!"
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "laneToFinish",
      name: "National Museum of Singapore",
      description: "The final path of your Singapore journey.",
      npc: {
        text: "Welcome to the National Museum of Singapore. I'm Curator Lee. Singapore's journey to independence is a fascinating story. Based on historical records, can you answer this question about our nation's past?",
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
        onSuccess: { 
          nextLocation: "hub", 
          reward: "declaration_copy",
          message: "Correct! On August 9, 1965, Singapore became an independent nation. Here's a copy of our Declaration of Independence - the final item for your collection!"
        }
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
    const [currentQuest, setCurrentQuest] = useState("Find the lost rare seed by exploring Singapore");
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0); // 다윈 텍스트 인덱스
    const [showRewardAnimation, setShowRewardAnimation] = useState(false);
    const [completedTests, setCompletedTests] = useState([]);
    const [randomTextChunk, setRandomTextChunk] = useState("");
    const [writingInput, setWritingInput] = useState(""); // Add this state for writing input
    const [welcomeDismissed, setWelcomeDismissed] = useState(false);
    const [debugLog, setDebugLog] = useState("Welcome to Singapore! Use arrow keys to move or click the colored areas.");
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
    // Matter.js 초기화와 update 함수를 한 번에 처리하는 useEffect
    useEffect(() => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        // 엔진 초기화
        const engine = Matter.Engine.create();
        engine.gravity.y = 0;
        engineRef.current = engine;

        const render = Matter.Render.create({
            element: canvasRef.current,
            engine,
            options: {
                width: 1000,
                height: 800,
                wireframes: false,
                background: "#d0f0c0",
            },
        });
        renderRef.current = render;

        // 플레이어 설정
        const player = Bodies.circle(500, 400, 20, {
            restitution: 0.0,
            friction: 0.01,
            frictionAir: 0.001,
            density: 0.005,
            render: { fillStyle: "blue" },
        });
        playerRef.current = player;
        World.add(engine.world, player);

        // 경계 설정
        const boundaries = [
            Bodies.rectangle(500, -25, 1000, 50, { isStatic: true }),
            Bodies.rectangle(500, 825, 1000, 50, { isStatic: true }),
            Bodies.rectangle(-25, 400, 50, 800, { isStatic: true }),
            Bodies.rectangle(1025, 400, 50, 800, { isStatic: true }),
        ];
        World.add(engine.world, boundaries);

        // 초기 씬 설정 함수 호출
        updateSceneObjects(engine);
        
        // Render 실행
        Matter.Render.run(render);
        
        // 게임 루프 정의 - 이 함수만 사용
        const gameLoop = () => {
            if (engine && playerRef.current && gameState === "playing") {
                Matter.Engine.update(engine, 1000 / 60);
                
                // 플레이어 움직임 처리 - 직접 이동 방식으로 변경
                const keys = movementKeysRef.current;
                const speed = 3;
                const currentPos = playerRef.current.position;
                let newX = currentPos.x;
                let newY = currentPos.y;
                
                if (keys.ArrowUp || keys.w) newY -= speed;
                if (keys.ArrowDown || keys.s) newY += speed;
                if (keys.ArrowLeft || keys.a) newX -= speed;
                if (keys.ArrowRight || keys.d) newX += speed;
                Matter.Body.setStatic(playerRef.current, true);
                
                // 위치가 변경되었으면 직접 위치 업데이트
                if (newX !== currentPos.x || newY !== currentPos.y) {
                    Body.setPosition(playerRef.current, { x: newX, y: newY });
                    
                    // 키 상태 로그
                    console.log("이동 중:", Object.entries(movementKeysRef.current)
                        .filter(([_, v]) => v)
                        .map(([k]) => k)
                    );
                    
                    // 디버그 정보 업데이트
                    setDebugLog(`위치: x=${Math.round(newX)}, y=${Math.round(newY)}`);
                }
                
                // 트리거 충돌 감지
                triggersRef.current.forEach((trigger) => {
                    // 트리거 충돌 체크 및 처리
                    if (Matter.Bounds.contains(trigger.bounds, playerRef.current.position)) {
                        console.log(`트리거 충돌: ${trigger.label}`);
                        
                        switch(trigger.label) {
                            case "enterSingaporeanRoom":
                                setCurrentLocation("singaporeanRoom");
                                break;
                            // 나머지 케이스...
                        }
                    }
                });
            }
            
            rafRef.current = requestAnimationFrame(gameLoop);
        };
        
        // 게임 루프 시작 - 이것만 유지
        rafRef.current = requestAnimationFrame(gameLoop);
        
        // 정리 함수
        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
            cancelAnimationFrame(rafRef.current);
        };
    }, [gameState]);

    // 위치 변경 시 장면 업데이트
    useEffect(() => {
        // 위치가 변경되면 장애물/트리거 업데이트
        if (engineRef.current && playerRef.current && isInitializedRef.current) {
            // 기존 장애물과 트리거 제거
            obstaclesRef.current.forEach((obs) => World.remove(engineRef.current.world, obs));
            triggersRef.current.forEach((trig) => World.remove(engineRef.current.world, trig));
            obstaclesRef.current = [];
            triggersRef.current = [];
            
            // 새 장애물/트리거 추가
            locationData?.obstacles?.forEach((obs) => {
                let body;
                if (obs.type === "singaporeanRoom" || obs.type === "botanicLesson" || 
                    obs.type === "mysteryRoom" || obs.type === "laneToFinish") {
                  body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
                    isStatic: true, 
                    isSensor: true,
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
            });
            
            // 위치 초기화는 장소가 바뀔 때만
            if (currentLocation !== "hub") {
              Body.setPosition(playerRef.current, { x: 500, y: 400 });
              Body.setVelocity(playerRef.current, { x: 0, y: 0 });
              
              // 랜덤 텍스트 설정
              const randomIndex = Math.floor(Math.random() * chunks.length);
              setCurrentChunkIndex(randomIndex);
              setRandomTextChunk(chunks[randomIndex].text);
            }
        }
    }, [currentLocation]);
    // 키보드 입력 수정 - 키 누름과 키 놓음 모두 처리
useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = true;
      console.log(`키 누름: ${key}`); // 디버깅용 로그
      e.preventDefault();
    }
  };
  
  const handleKeyUp = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = false;
      console.log(`키 해제: ${key}`); // 디버깅용 로그
      e.preventDefault();
    }
  };

  
  
  console.log("키보드 이벤트 리스너 등록됨"); // 디버깅용
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp); // 여기 빠진 것 추가
  };
}, []);
    // NPC 답변/퀴즈 처리 함수 수정
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
      if (currentLocation === "hub" && answer === "I'm ready to help!") {
        setWelcomeDismissed(true);
        setDebugLog("Let's start exploring Singapore!");
        return; // Exit early, no location change needed
      }
      
      // 퀴즈/쓰기 성공 처리
      const { nextLocation, reward, message } = locationData.npc.onSuccess || {};
      
      // Add location to completed tests
      if (!completedTests.includes(currentLocation)) {
        setCompletedTests((prev) => [...prev, currentLocation]);
      }
      
      // Add reward to inventory
      if (reward) {
        setInventory((prev) => [...new Set([...prev, reward])]);
        setShowRewardAnimation(true);
        
        setTimeout(() => setShowRewardAnimation(false), 1000);
      }
      
      // Show success message if available
      if (message) {
        setDebugLog(message);
      }
      
      // Check if this was the last location and player has all items
      const allLocationsCompleted = ["singaporeanRoom", "botanicLesson", "mysteryRoom", "laneToFinish"]
        .every(loc => completedTests.includes(loc) || loc === currentLocation);
        
      if (currentLocation === "laneToFinish" && allLocationsCompleted) {
        // Display victory sequence with timeout to let the player read the message
        setTimeout(() => {
          setGameState("gameOver");
        }, 2500);
        
        // Show celebration message
        setDebugLog("Congratulations! You've found all the items needed to complete your mission!");
      }
      else if (nextLocation) {
        // Regular quest completion - return to the specified location
        setTimeout(() => {
          setCurrentLocation(nextLocation);
        }, 1500);
      }
    } else {
      alert("Incorrect! Please try again.");
      setScore((prev) => Math.max(0, prev - 5));
    }
};
// 장면 업데이트 함수를 컴포넌트 내부에 독립적인 함수로 정의
const updateSceneObjects = (engine) => {
    if (!engineRef.current) return;
    
    const currentEngine = engine || engineRef.current;
    
    // 기존 장애물과 트리거 제거
    obstaclesRef.current.forEach((obs) => World.remove(currentEngine.world, obs));
    triggersRef.current.forEach((trig) => World.remove(currentEngine.world, trig));
    obstaclesRef.current = [];
    triggersRef.current = [];
    
    // 장애물과 트리거 추가...
    // 위치에 따라 적절한 설정...
};
// 1. 클릭으로 방문할 수 있는 임시 함수 추가
const visitRoom = (roomId) => {
  console.log(`직접 방문: ${roomId}`);
  setCurrentLocation(roomId);
  setDebugLog(`이동: ${roomId}`);
  
  switch(roomId) {
    case "singaporeanRoom":
      setCurrentQuest("Learn about Singaporean culture");
      break;
    case "botanicLesson":
      setCurrentQuest("Learn about Singapore's unique plants");
      break;
    case "mysteryRoom":
      setCurrentQuest("Solve the linguistic puzzle");
      break;
    case "laneToFinish":
      setCurrentQuest("Complete the Singapore history challenge");
      break;
    default:
      setCurrentQuest("Choose an area to explore");
  }
};

// 2. 디버그 옵션 추가 (문제 진단을 위함)
const resetPlayer = () => {
  if (playerRef.current) {
    Body.setPosition(playerRef.current, { x: 500, y: 400 });
    Body.setVelocity(playerRef.current, { x: 0, y: 0 });
    setDebugLog("플레이어 위치 초기화됨");
  }
};

// 3. 공간 트리거 완전히 수정
useEffect(() => {
  // 이전 useEffect 내용은 그대로 유지하고, 트리거 부분만 수정
  
  // 게임 루프 내 트리거 충돌 감지 부분 수정
  triggersRef.current.forEach((trigger) => {
    const playerPos = playerRef.current?.position;
    if (!playerPos) return;
    
    const triggerBounds = trigger.bounds;
    
    if (playerPos.x > triggerBounds.min.x &&
        playerPos.x < triggerBounds.max.x &&
        playerPos.y > triggerBounds.min.y &&
        playerPos.y < triggerBounds.max.y) {
      
      console.log(`트리거 충돌: ${trigger.label}`);
      
      switch(trigger.label) {
        case "enterSingaporeanRoom":
          setCurrentLocation("singaporeanRoom");
          setCurrentQuest("Learn about Singaporean culture");
          break;
        case "enterBotanicLesson":
          setCurrentLocation("botanicLesson");
          setCurrentQuest("Learn about Singapore's unique plants");
          break;
        case "enterMysteryRoom":
          setCurrentLocation("mysteryRoom");
          setCurrentQuest("Solve the linguistic puzzle");
          break;
        case "enterLaneToFinish":
          setCurrentLocation("laneToFinish");
          setCurrentQuest("Complete the Singapore history challenge");
          break;
        case "returnToHub":
          setCurrentLocation("hub");
          setCurrentQuest("Choose another location to explore");
          break;
      }
    }
  });
}, []);
// 모든 중복 return 문을 제거하고 아래 return 문만 남깁니다
return (
  <div className="flex flex-col items-center p-4">
    {/* HUD */}
    <div className="w-[1000px] bg-gray-100 p-2 mb-2 rounded flex justify-between items-center">
      <div>점수: {score} | 경험치: {xp} | 레벨: {level}</div>
      <div>인벤토리: {inventory.join(", ") || "없음"}</div>
      <div className="font-bold text-green-600">현재 테스트: {currentQuest}</div>
      <div>독해 진행: {currentChunkIndex + 1} / {chunks.length}</div>
      <button onClick={() => setGameState(gameState === "playing" ? "일시정지" : "playing")} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        {gameState === "playing" ? "일시정지" : "재개"}
      </button>
    </div>
    
    {/* 게임 캔버스 수정 - 색상 영역을 클릭 가능하게 */}
    <div ref={canvasRef} className="border rounded shadow w-[1000px] h-[800px] relative">
      {/* 디버그 컨트롤 UI 추가 */}
      <div className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 text-xs z-10">
        <div>DEBUG: {debugLog}</div>
        <div>Position: {playerRef.current ? `x=${Math.round(playerRef.current.position?.x || 0)}, y=${Math.round(playerRef.current.position?.y || 0)}` : "N/A"}</div>
        <div className="text-xs mt-1 mb-2">
          <strong>키 상태:</strong> 
          {Object.entries(movementKeysRef.current)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(", ") || "없음"}
        </div>
        <button 
          onClick={resetPlayer}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded mb-2 w-full"
        >
          Reset Player
        </button>
        <div className="text-center font-bold mb-1">빠른 이동:</div>
        <div className="grid grid-cols-2 gap-1">
          <button 
            onClick={() => visitRoom("singaporeanRoom")} 
            className="px-1 py-1 bg-red-500 text-white text-xs rounded"
          >
            Singaporean's Room
          </button>
          <button 
            onClick={() => visitRoom("botanicLesson")}
            className="px-1 py-1 bg-green-500 text-white text-xs rounded"
          >
            Botanic Lesson
          </button>
          <button 
            onClick={() => visitRoom("mysteryRoom")}
            className="px-1 py-1 bg-purple-500 text-white text-xs rounded"
          >
            Mystery Room
          </button>
          <button 
            onClick={() => visitRoom("laneToFinish")}
            className="px-1 py-1 bg-orange-500 text-white text-xs rounded"
          >
            Lane to Finish
          </button>
          <button 
            onClick={() => visitRoom("hub")}
            className="px-1 py-1 bg-gray-500 text-white text-xs rounded col-span-2"
          >
            Return to Hub
          </button>
        </div>
      </div>
      
      {/* 나머지 UI 요소들... */}
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
    
    {/* 게임 종료 시 표시할 개선된 엔딩 시퀀스 */}
    {gameState === "gameOver" && (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h1>
          <p className="text-xl mb-6">You've completed your Singapore adventure!</p>
          
          <div className="mb-6 bg-gray-50 p-4 rounded">
            <p className="italic">With the four special items collected - the Peranakan porcelain, the rare plant cutting, the golden Merlion statue, and the copy of Singapore's Declaration of Independence - you've unlocked the hidden chamber at the Natural History Museum.</p>
            <p className="italic mt-2">Inside, just as Mei Lin predicted, you find the lost seed of the Singapore Corpse Lily, one of the rarest plants in the world!</p>
          </div>
          
          <div className="mb-6">
            <p className="mb-2 font-semibold">Your achievements:</p>
            <ul className="text-left inline-block">
              <li>✓ Final score: {score} points</li>
              <li>✓ Texts read: {currentChunkIndex + 1} / {chunks.length}</li>
              <li>✓ Items collected: {inventory.length} / 4</li>
              <li>✓ Final level reached: {level}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded mb-6">
            <p className="text-lg font-semibold text-green-700 mb-2">Special Invitation</p>
            <p>For your extraordinary help, you've been invited to a special ceremony at the Singapore Gardens by the Bay, where you'll witness a traditional performance and the planting of the recovered rare seed!</p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
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
              <span>Mystery Room {completedTests.includes("mysteryRoom") && "✓"}</span></div>
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
