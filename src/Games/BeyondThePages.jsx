import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Image paths
const mapImage = "/assets/map.png";
const libraryImage = "/assets/library.png";
const characterImage = "/assets/character.png";
const bookcaseImage = "/assets/bookcase.png";
const bookImage = "/assets/book.png";

// Book data with pages, mini-tasks, chapters, and rewards
const books = [
    {
        id: "book1",
        title: "Romance of the Three Kingdoms",
        culture: "Chinese",
        totalPages: 120,
        content: "Zhuge Liang, the Sleeping Dragon, was a master strategist who helped Liu Bei establish his kingdom during the tumultuous period of the Three Kingdoms...",
        questions: [
            {
                text: "Fill in the blank: Zhuge Liang was known as the ______ Dragon.",
                options: ["Sleeping", "Golden", "Flying"],
                answer: "Sleeping",
            },
        ],
        chapters: [
            { 
                title: "The Three Oath Brothers", 
                pages: 20, 
                miniTask: {
                    pageNumber: 15,
                    question: "What was the name of the peach garden where Liu Bei, Guan Yu, and Zhang Fei took their oath?",
                    options: ["Wulong Garden", "Eternal Peach Garden", "Heavenly Garden", "Imperial Garden"],
                    answer: "Eternal Peach Garden",
                    reward: 50,
                    literacySkill: "Historical Context"
                }
            },
            { 
                title: "Zhuge Liang's Strategies", 
                pages: 30, 
                miniTask: {
                    pageNumber: 38,
                    question: "Which strategy did Zhuge Liang use to acquire 100,000 arrows?",
                    options: ["Arrow Theft Strategy", "Empty Fort Strategy", "Borrowing Arrows with Straw Boats", "Night Ambush"],
                    answer: "Borrowing Arrows with Straw Boats",
                    reward: 60,
                    literacySkill: "Strategic Thinking"
                }
            },
            { 
                title: "Battle of Red Cliffs", 
                pages: 25,
                miniTask: {
                    pageNumber: 52,
                    question: "Who suggested the fire attack strategy at the Battle of Red Cliffs?",
                    options: ["Liu Bei", "Zhou Yu", "Zhuge Liang", "Sun Quan"],
                    answer: "Zhou Yu",
                    reward: 40,
                    literacySkill: "Character Analysis"
                }
            },
            { 
                title: "Rise and Fall of Kingdoms", 
                pages: 45,
                miniTask: {
                    pageNumber: 85,
                    question: "Which kingdom ultimately unified China after the Three Kingdoms period?",
                    options: ["Wei", "Shu", "Wu", "Jin"],
                    answer: "Jin",
                    reward: 70,
                    literacySkill: "Historical Outcome"
                }
            }
        ],
        reward: {
            title: "Master Strategist",
            description: "You've gained insights into ancient Chinese military strategy and politics",
            points: 200,
            badge: "🏆"
        }
    },
    {
        id: "book2",
        title: "The Tale of Genji",
        culture: "Japanese",
        totalPages: 150,
        content: "The Tale of Genji, often considered the world's first novel, explores courtly life and relationships in Heian Japan. Written by Lady Murasaki Shikibu in the early 11th century, it provides a fascinating glimpse into Japanese aristocratic society...",
        questions: [
            {
                text: "Which literary device is primarily used in The Tale of Genji?",
                options: ["Metaphor", "Stream of Consciousness", "Allegory"],
                answer: "Stream of Consciousness",
            },
        ],
        chapters: [
            { 
                title: "The Shining Prince", 
                pages: 35,
                miniTask: {
                    pageNumber: 22,
                    question: "What special quality made Genji known as 'the Shining Prince'?",
                    options: ["His wealth", "His beauty", "His intelligence", "His royal status"],
                    answer: "His beauty",
                    reward: 45,
                    literacySkill: "Character Description"
                }
            },
            { 
                title: "Court Intrigues", 
                pages: 40,
                miniTask: {
                    pageNumber: 65,
                    question: "What form of communication was frequently used for courtship in the Heian court?",
                    options: ["Dance performances", "Poetry exchange", "Gift giving", "Musical duets"],
                    answer: "Poetry exchange",
                    reward: 55,
                    literacySkill: "Cultural Context"
                }
            },
            { 
                title: "Exile and Return", 
                pages: 30,
                miniTask: {
                    pageNumber: 92,
                    question: "What natural phenomena often reflect emotion in The Tale of Genji?",
                    options: ["Earthquakes", "Seasons", "Ocean tides", "Wind direction"],
                    answer: "Seasons",
                    reward: 50,
                    literacySkill: "Symbolism"
                }
            },
            { 
                title: "The Legacy", 
                pages: 45,
                miniTask: {
                    pageNumber: 128,
                    question: "Who wrote The Tale of Genji?",
                    options: ["Lady Murasaki", "Princess Michiko", "Empress Suiko", "Lady Aoi"],
                    answer: "Lady Murasaki",
                    reward: 60,
                    literacySkill: "Literary History"
                }
            }
        ],
        reward: {
            title: "Court Poet",
            description: "You've mastered the art of Heian court literature and cultural nuances",
            points: 250,
            badge: "📜"
        }
    },
    {
        id: "book3",
        title: "The Tale of Hong Gil-dong",
        culture: "Korean",
        totalPages: 90,
        content: "Hong Gil-dong, a legendary figure in Korean literature, fights against social injustice and seeks equality. Written by Heo Gyun during the Joseon Dynasty, this tale is considered one of Korea's earliest novels and explores themes of social reform...",
        questions: [
            {
                text: "What central theme is explored in The Tale of Hong Gil-dong?",
                options: ["Revenge", "Social Equality", "Political Power"],
                answer: "Social Equality",
            },
        ],
        chapters: [
            { 
                title: "The Illegitimate Son", 
                pages: 20,
                miniTask: {
                    pageNumber: 12,
                    question: "Why couldn't Hong Gil-dong call his father 'father'?",
                    options: ["He was adopted", "He was born to a concubine", "He had a different father", "He was disowned"],
                    answer: "He was born to a concubine",
                    reward: 40,
                    literacySkill: "Social Structure"
                }
            },
            { 
                title: "Martial Arts Training", 
                pages: 15,
                miniTask: {
                    pageNumber: 28,
                    question: "Which martial art did Hong Gil-dong master?",
                    options: ["Taekwondo", "Ssireum", "Geomdo", "Taekkyon"],
                    answer: "Taekkyon",
                    reward: 35,
                    literacySkill: "Cultural Knowledge"
                }
            },
            { 
                title: "The Bandit Leader", 
                pages: 25,
                miniTask: {
                    pageNumber: 45,
                    question: "What was the name of Hong Gil-dong's bandit group?",
                    options: ["Hwalbindang", "Imjindang", "Hwarangdo", "Amogae"],
                    answer: "Hwalbindang",
                    reward: 45,
                    literacySkill: "Detail Retention"
                }
            },
            { 
                title: "The Ideal Society", 
                pages: 30,
                miniTask: {
                    pageNumber: 75,
                    question: "Where did Hong Gil-dong establish his ideal society?",
                    options: ["Jeju Island", "Yul Island", "Baekdu Mountain", "Hanyang City"],
                    answer: "Yul Island",
                    reward: 55,
                    literacySkill: "Thematic Understanding"
                }
            }
        ],
        reward: {
            title: "Social Reformer",
            description: "You've gained insights into traditional Korean concepts of justice and social reform",
            points: 180,
            badge: "⚖️"
        }
    },
];

// Achievement data
const achievementsList = [
    {
        id: "first_book",
        title: "First Discovery",
        description: "You've completed your first book!",
        condition: (stats) => stats.totalBooksCompleted >= 1,
        badge: "🔍",
        points: 100
    },
    {
        id: "speed_reader",
        title: "Speed Reader",
        description: "You completed a book in under 10 minutes!",
        condition: (stats, book, time) => time && time <= 10,
        badge: "⚡",
        points: 150
    },
    {
        id: "all_tasks",
        title: "Detail Expert",
        description: "You've completed all mini-tasks in a single book!",
        condition: (stats, book, time, completedTasks, totalTasks) => 
            completedTasks && totalTasks && completedTasks === totalTasks,
        badge: "🔎",
        points: 200
    },
    {
        id: "all_books", 
        title: "Literary Master",
        description: "You've completed all available books!",
        condition: (stats) => stats.totalBooksCompleted >= books.length,
        badge: "🏅",
        points: 500
    },
    {
        id: "culture_expert",
        title: "Cultural Expert",
        description: "You've read at least one book from each culture!",
        condition: (stats) => {
            const cultures = new Set(Object.keys(stats.culturesRead || {}));
            return cultures.size >= 3; // Chinese, Japanese, Korean
        },
        badge: "🌏",
        points: 300
    },
    {
        id: "literacy_master",
        title: "Literacy Master",
        description: "You've gained points in all literacy skills!",
        condition: (stats) => {
            const allSkills = [
                "Historical Context", "Strategic Thinking", "Character Analysis",
                "Historical Outcome", "Character Description", "Cultural Context",
                "Symbolism", "Literary History", "Social Structure",
                "Cultural Knowledge", "Detail Retention", "Thematic Understanding"
            ];
            
            const userSkills = Object.keys(stats.literacySkills || {});
            return allSkills.every(skill => userSkills.includes(skill));
        },
        badge: "📚",
        points: 400
    }
];

const BeyondThePages = () => {
    // Base state variables
    const [currentStep, setCurrentStep] = useState("outside");
    const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 500 });
    const [selectedBook, setSelectedBook] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    
    // Reading-related state variables
    const [readingRecords, setReadingRecords] = useState({});  // Records for each book
    const [currentPage, setCurrentPage] = useState(1);  // Current page
    const [readingSpeed, setReadingSpeed] = useState(1);  // Pages per second
    const [readingInterval, setReadingIntervalId] = useState(null);  // Auto-reading interval
    const [currentChapter, setCurrentChapter] = useState(0);  // Current chapter
    const [showMiniTask, setShowMiniTask] = useState(false);  // Show mini task
    const [currentMiniTask, setCurrentMiniTask] = useState(null);  // Current mini task
    const [achievements, setAchievements] = useState([]);  // Earned achievements
    const [showCompletedMessage, setShowCompletedMessage] = useState(false);  // Book completion message
    const [showReadingJournal, setShowReadingJournal] = useState(false);  // Reading journal display
    const [showAchievements, setShowAchievements] = useState(false);  // Achievements display
    const [readingStats, setReadingStats] = useState({  // Reading statistics
        totalPagesRead: 0,
        totalBooksCompleted: 0,
        totalReadingTime: 0,  // in minutes
        favoriteBook: null,
        literacySkills: {},
        culturesRead: {}
    });
    
    // Character movement handling
    useEffect(() => {
        const handleKeyPress = (event) => {
            setCharacterPosition((prev) => {
                const speed = 20;
                switch (event.key) {
                    case "ArrowUp":
                        return { ...prev, y: Math.max(0, prev.y - speed) };
                    case "ArrowDown":
                        return { ...prev, y: Math.min(700, prev.y + speed) };
                    case "ArrowLeft":
                        return { ...prev, x: Math.max(0, prev.x - speed) };
                    case "ArrowRight":
                        return { ...prev, x: Math.min(1200, prev.x + speed) };
                    default:
                        return prev;
                }
            });
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);
    
    // Book selection handler
    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setCurrentStep("reading");
        setCurrentPage(readingRecords[book.id]?.lastPage || 1);
        setCurrentChapter(getChapterFromPage(book, readingRecords[book.id]?.lastPage || 1));
        
        // Start auto reading
        startReading(book);
    };
    
    // Start auto reading
    const startReading = (book) => {
        // Stop existing reading if any
        if (readingInterval) {
            clearInterval(readingInterval);
        }
        
        // Start new reading
        const intervalId = setInterval(() => {
            setCurrentPage(prevPage => {
                const newPage = Math.min(prevPage + readingSpeed, book.totalPages);
                
                // Update page record
                updateReadingRecord(book.id, newPage);
                
                // Check for chapter change
                const newChapter = getChapterFromPage(book, newPage);
                if (newChapter !== currentChapter) {
                    setCurrentChapter(newChapter);
                }
                
                // Check for mini task
                const currentChapterData = book.chapters[newChapter];
                if (currentChapterData?.miniTask && newPage === currentChapterData.miniTask.pageNumber) {
                    // Show mini task
                    setCurrentMiniTask(currentChapterData.miniTask);
                    setShowMiniTask(true);
                    // Pause reading
                    clearInterval(readingInterval);
                    setReadingIntervalId(null);
                }
                
                // Check for book completion
                if (newPage === book.totalPages) {
                    // Stop auto reading
                    clearInterval(readingInterval);
                    setReadingIntervalId(null);
                    // Award book completion
                    completeBook(book);
                }
                
                // Return new page
                return newPage;
            });
            
            // Increment reading time
            setReadingStats(prev => ({
                ...prev,
                totalReadingTime: prev.totalReadingTime + (1/60) // Add 1 second = 1/60 minute
            }));
            
        }, 1000); // Update every second
        
        setReadingIntervalId(intervalId);
    };
    
    // Stop reading
    const stopReading = () => {
        if (readingInterval) {
            clearInterval(readingInterval);
            setReadingIntervalId(null);
        }
    };
    
    // Get chapter index from page number
    const getChapterFromPage = (book, page) => {
        let cumulativePages = 0;
        for (let i = 0; i < book.chapters.length; i++) {
            cumulativePages += book.chapters[i].pages;
            if (page <= cumulativePages) {
                return i;
            }
        }
        return book.chapters.length - 1; // Last chapter
    };
    
    // Update reading record
    const updateReadingRecord = (bookId, page) => {
        setReadingRecords(prev => {
            const bookRecord = prev[bookId] || { lastPage: 0, startTime: new Date(), completedTasks: [] };
            return {
                ...prev,
                [bookId]: {
                    ...bookRecord,
                    lastPage: Math.max(bookRecord.lastPage, page),
                    lastReadTime: new Date()
                }
            };
        });
        
        // Update total pages read
        setReadingStats(prev => ({
            ...prev,
            totalPagesRead: prev.totalPagesRead + 1
        }));
    };
    
    // Handle mini task answer
    const handleMiniTaskAnswer = (answer) => {
        const isCorrect = answer === currentMiniTask.answer;
        
        if (isCorrect) {
            // Handle correct answer and reward
            setScore(prev => prev + currentMiniTask.reward);
            
            // Record completed task
            setReadingRecords(prev => {
                const bookRecord = prev[selectedBook.id] || { lastPage: 0, startTime: new Date(), completedTasks: [] };
                return {
                    ...prev,
                    [selectedBook.id]: {
                        ...bookRecord,
                        completedTasks: [...bookRecord.completedTasks, currentMiniTask]
                    }
                };
            });
            
            // Update literacy skills
            setReadingStats(prev => {
                const literacySkills = {...prev.literacySkills};
                literacySkills[currentMiniTask.literacySkill] = (literacySkills[currentMiniTask.literacySkill] || 0) + 1;
                return {
                    ...prev,
                    literacySkills
                };
            });
            
            // Check for achievements
            checkAchievements("task_completed");
            
            // Show success message
            alert(`Correct! You earned ${currentMiniTask.reward} points. Your ${currentMiniTask.literacySkill} skill has improved!`);
        } else {
            // Handle wrong answer
            alert("That's not correct. Try exploring the book more carefully.");
        }
        
        // Close mini task
        setShowMiniTask(false);
        setCurrentMiniTask(null);
        
        // Resume auto reading
        startReading(selectedBook);
    };
    
    // Handle book completion
    const completeBook = (book) => {
        // Check if already completed
        const isAlreadyCompleted = readingStats.totalBooksCompleted > 0 && 
                                  achievements.some(a => a.bookId === book.id);
        
        if (!isAlreadyCompleted) {
            // Add achievement
            setAchievements(prev => [...prev, {
                id: `${book.id}-complete`,
                bookId: book.id,
                title: book.reward.title,
                description: book.reward.description,
                earnedAt: new Date(),
                badge: book.reward.badge
            }]);
            
            // Increment completed books count
            setReadingStats(prev => {
                // Mark culture as read
                const culturesRead = {...prev.culturesRead};
                culturesRead[book.culture] = (culturesRead[book.culture] || 0) + 1;
                
                return {
                    ...prev,
                    totalBooksCompleted: prev.totalBooksCompleted + 1,
                    favoriteBook: prev.favoriteBook ? prev.favoriteBook : book.id,
                    culturesRead
                };
            });
            
            // Add points
            setScore(prev => prev + book.reward.points);
            
            // Calculate reading time
            const startTime = readingRecords[book.id]?.startTime;
            const endTime = new Date();
            const readingTimeMinutes = startTime ? 
                Math.round((endTime - startTime) / 60000) : // Convert ms to minutes
                null;
            
            // Count completed mini tasks
            const completedTasks = readingRecords[book.id]?.completedTasks?.length || 0;
            const totalTasks = book.chapters.reduce((count, chapter) => chapter.miniTask ? count + 1 : count, 0);
            
            // Check for achievements
            checkAchievements("book_completed", book, readingTimeMinutes, completedTasks, totalTasks);
            
            // Show completion message
            setShowCompletedMessage(true);
            setTimeout(() => setShowCompletedMessage(false), 5000);
        }
    };
    
    // Check and award achievements
    const checkAchievements = (trigger, book, readingTimeMinutes, completedTasks, totalTasks) => {
        achievementsList.forEach(achievement => {
            // Check if already earned
            const alreadyEarned = achievements.some(a => a.id === achievement.id);
            if (alreadyEarned) return;
            
            // Check if condition is met
            const conditionMet = achievement.condition(
                readingStats, book, readingTimeMinutes, completedTasks, totalTasks
            );
            
            if (conditionMet) {
                // Award achievement
                setAchievements(prev => [...prev, {
                    ...achievement,
                    earnedAt: new Date()
                }]);
                
                // Award points
                setScore(prev => prev + achievement.points);
                
                // Show notification
                alert(`New Achievement Unlocked: ${achievement.title}! You earned ${achievement.points} points.`);
            }
        });
    };
    
    // Handle quiz answers (legacy)
    const handleAnswer = (answer) => {
        if (selectedBook) {
            const currentQuestion = selectedBook.questions[questionIndex];
            if (currentQuestion.answer === answer) {
                setScore((prev) => prev + 10);
                if (questionIndex < selectedBook.questions.length - 1) {
                    setQuestionIndex((prev) => prev + 1);
                } else {
                    setCurrentStep("library");
                    setShowQuiz(false);
                    setQuestionIndex(0);
                }
            } else {
                alert("Wrong answer! Try again.");
            }
        }
    };
    
    // Toggle reading journal display
    const toggleReadingJournal = () => {
        setShowReadingJournal(!showReadingJournal);
        setShowAchievements(false); // Close achievements if open
    };
    
    // Toggle achievements display
    const toggleAchievements = () => {
        setShowAchievements(!showAchievements);
        setShowReadingJournal(false); // Close reading journal if open
    };
    
    // Return to library
    const returnToLibrary = () => {
        stopReading();
        setCurrentStep("library");
        setSelectedBook(null);
    };
    
    // Return to map
    const returnToMap = () => {
        setCurrentStep("outside");
    };
    
    // Adjust reading speed
    const adjustReadingSpeed = (speed) => {
        setReadingSpeed(speed);
        if (readingInterval && selectedBook) {
            // Restart reading with new speed
            stopReading();
            startReading(selectedBook);
        }
    };
    
    // Calculate overall completion percentage
    const calculateOverallCompletion = () => {
        let totalPages = 0;
        let totalReadPages = 0;
        
        books.forEach(book => {
            totalPages += book.totalPages;
            totalReadPages += readingRecords[book.id]?.lastPage || 0;
        });
        
        return totalPages > 0 ? Math.round((totalReadPages / totalPages) * 100) : 0;
    };
    
    // Format reading time (minutes to hours:minutes)
    const formatReadingTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}h ${mins}m`;
    };
    
    // Format date
    const formatDate = (date) => {
        if (!date) return "-";
        return date.toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // UI Rendering
    return (
        <div className="relative w-full h-full bg-amber-50 overflow-hidden">
            {/* Top status bar - always visible */}
            <div className="absolute top-0 left-0 right-0 bg-amber-800 text-amber-50 p-4 flex justify-between items-center z-50">
                <div className="text-xl font-bold">Beyond The Pages</div>
                <div className="flex items-center space-x-4">
                    <div className="bg-amber-700 px-3 py-1 rounded-full">Score: {score}</div>
                    <button 
                        onClick={toggleReadingJournal} 
                        className="bg-amber-600 px-3 py-1 rounded hover:bg-amber-500"
                    >
                        Reading Journal 📖
                    </button>
                    <button 
                        onClick={toggleAchievements} 
                        className="bg-amber-600 px-3 py-1 rounded hover:bg-amber-500"
                    >
                        Achievements 🏆
                    </button>
                </div>
            </div>
            
            {/* Map (outside) */}
            {currentStep === "outside" && (
                <div className="w-full h-full p-16 flex items-center justify-center">
                    <motion.div
                        className="w-20 h-20 absolute"
                        style={{ left: characterPosition.x, top: characterPosition.y }}
                        animate={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <img src={characterImage} alt="Character" />
                    </motion.div>
                    
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setCurrentStep("library")}
                    >
                        <img src={libraryImage} alt="Library" />
                        <div className="absolute -bottom-6 left-0 right-0 text-center text-amber-800 font-bold">
                            Enter Cultural Library
                        </div>
                    </div>
                    
                    {/* Overall completion status */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-amber-100 p-4 rounded-lg shadow-lg">
                        <div className="font-bold text-center mb-2">Library Exploration Progress</div>
                        <div className="w-96 h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-amber-600 transition-all duration-500"
                                style={{ width: `${calculateOverallCompletion()}%` }}
                            ></div>
                        </div>
                        <div className="text-center mt-1 text-sm">{calculateOverallCompletion()}% Complete</div>
                    </div>
                </div>
            )}
            
            {/* Library */}
            {currentStep === "library" && (
                <div className="w-full h-full pt-16 px-8 pb-8">
                    <div className="flex h-full">
                        {/* Bookshelf */}
                        <div className="w-3/4 h-full bg-amber-100 rounded-lg p-4 overflow-y-auto grid grid-cols-3 gap-4">
                            {books.map((book) => {
                                // Calculate reading progress for each book
                                const progress = readingRecords[book.id]?.lastPage 
                                    ? Math.round((readingRecords[book.id].lastPage / book.totalPages) * 100) 
                                    : 0;
                                
                                // Calculate completed mini tasks
                                const completedTasks = readingRecords[book.id]?.completedTasks?.length || 0;
                                const totalTasks = book.chapters.reduce((count, chapter) => chapter.miniTask ? count + 1 : count, 0);
                                
                                // Book completion
                                const isCompleted = progress === 100;
                                const completionBadge = achievements.find(a => a.bookId === book.id)?.badge;
                                
                                return (
                                    <div
                                        key={book.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                                            isCompleted 
                                                ? "bg-amber-300 border-2 border-amber-600" 
                                                : "bg-white hover:bg-amber-50"
                                        }`}
                                        onClick={() => handleSelectBook(book)}
                                    >
                                        <div className="flex items-start mb-2">
                                            <div className="w-12 h-16 bg-amber-700 mr-3 flex items-center justify-center text-amber-100 text-xl">
                                                📚
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{book.title}</h3>
                                                <div className="text-sm text-gray-600">Culture: {book.culture}</div>
                                                <div className="text-sm text-gray-600">{book.totalPages} pages</div>
                                            </div>
                                            {completionBadge && (
                                                <div className="ml-2 text-2xl" title="Completion Achievement">{completionBadge}</div>
                                            )}
                                        </div>
                                        
                                        {/* Progress status */}
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Pages read: {readingRecords[book.id]?.lastPage || 0}/{book.totalPages}</span>
                                                <span>{progress}% complete</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-amber-600" 
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-xs mt-1">Mini quests: {completedTasks}/{totalTasks}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Sidebar info */}
                        <div className="w-1/4 pl-4">
                            <div className="bg-amber-100 rounded-lg p-4 mb-4">
                                <h3 className="font-bold mb-2">My Reading Journey</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total pages read:</span>
                                        <span>{readingStats.totalPagesRead} pages</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Completed books:</span>
                                        <span>{readingStats.totalBooksCompleted}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total reading time:</span>
                                        <span>{formatReadingTime(readingStats.totalReadingTime)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-amber-100 rounded-lg p-4">
                                <h3 className="font-bold mb-2">Recent Achievements</h3>
                                {achievements.length > 0 ? (
                                    <div className="space-y-2">
                                        {achievements.slice(0, 3).map((achievement) => (
                                            <div key={achievement.id} className="flex items-center">
                                                <span className="mr-2 text-xl">{achievement.badge}</span>
                                                <span className="text-sm">{achievement.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-600">No achievements earned yet.</div>
                                )}
                            </div>
                            
                            <button
                                onClick={returnToMap}
                                className="mt-4 w-full py-2 bg-amber-600 text-amber-50 rounded hover:bg-amber-700"
                            >
                                Return to Map
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Reading screen */}
            {currentStep === "reading" && selectedBook && (
                <div className="w-full h-full pt-16 px-8 pb-8 flex">
                    {/* Left book content */}
                    <div className="w-3/4 h-full bg-white rounded-lg shadow-lg border border-amber-200 p-8 flex flex-col overflow-hidden">
                        {/* Book header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
                            <div className="text-gray-600">{selectedBook.culture} Literature</div>
                        </div>
                        
                        {/* Current chapter info */}
                        <div className="mb-4">
                            <div className="text-amber-800 font-bold">
                                Chapter {currentChapter + 1}: {selectedBook.chapters[currentChapter]?.title || ""}
                            </div>
                            <div className="text-sm text-gray-600">
                                Page {currentPage} / {selectedBook.totalPages}
                            </div>
                        </div>
                        
                        {/* Book content */}
                        <div className="flex-grow overflow-y-auto prose">
                            <p className="mb-4 leading-relaxed">
                                {selectedBook.content}
                            </p>
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
                                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas 
                                ligula massa, varius a, semper congue, euismod non, mi.
                            </p>
                            <p className="mb-4">
                                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet 
                                erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                            </p>
                            <p className="font-bold text-right">Current Page: {currentPage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeyondThePages;
