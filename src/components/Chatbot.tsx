import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronRight, Repeat } from 'lucide-react';
// import useFlowStore from '~/modules/flow/flow.store';
// import { env } from '~/env';
// import FloatingChatbot from '../FloatingChatbot';
// import { v4 as uuidv4 } from 'uuid';

interface Question {
  id: number;
  variants: string[];
  type: 'text' | 'checkbox' | 'radio';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    variants: [
      '  🚀 What is the primary purpose of your application?',
      '  🎯 Can you describe the main goal of your app?',
      '  💡 What problem does your application aim to solve?',
    ],
    type: 'text',
  },
  {
    id: 2,
    variants: [
      '  💻 Choose your application interfaces:',
      '  🖥️ What platforms will your application support?',
      '  📱 On which devices will your app be accessible?',
    ],
    type: 'checkbox',
    options: ['Web app', 'Mobile app', 'Desktop app', 'API'],
  },
  {
    id: 3,
    variants: [
      '📦 What kind of info will your app mostly work with?',
      '🗂️ What is the main type of data your app will handle?',
      '📊 What sort of information is at the heart of your app?',
    ],
    type: 'radio',
    options: [
      'User profiles',
      'Money transactions',
      'Content (text, pics, videos)',
      'Number crunching',
      'Something else',
    ],
  },
  {
    id: 4,
    variants: [
      '  🔗 Select the external services you plan to integrate:',
      '  🌐 Which third-party services will your app use?',
      '  🤝 What external APIs or services will you connect to?',
    ],
    type: 'checkbox',
    options: [
      'Payment gateway',
      'Maps - Location services',
      'Email service',
      'Social media APIs',
      'Cloud storage',
      'Analytics',
    ],
  },
  {
    id: 5,
    variants: [
      '  📈 What is your expected initial user base size?',
      '  👥 How many users do you anticipate at launch?',
      '  🚀 What is the projected number of users for your initial release?',
    ],
    type: 'text',
  },
];

interface ChatbotProps {
  path: string;
  loader: Boolean;
  toggle: (value: boolean) => void;
}

export const Chatbot = ({ path, loader, toggle: setLoader }: ChatbotProps) => {
  // const board = useFlowStore((s) => s.boards[path]);
  // const setNodes = useFlowStore((s) => s.setNodes);
  // const setEdges = useFlowStore((s) => s.setEdges);
  // const addNode = useFlowStore((s) => s.addNode);
  // const addEdge = useFlowStore((s) => s.addEdge);
  const [hasGeneratedAlready, setHasGeneratedAlready] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [inputValue, setInputValue] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentVariant, setCurrentVariant] = useState(0);
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [isChatAssistant, setIsChatAssistant] = useState(false);

  function combineQuestionsAndAnswers(questions: Question[], answers: { [key: number]: any }) {
    return {
      project_info: questions.map((question) => {
        const answer = answers[question.id - 1];
        return {
          id: question.id,
          question: question.variants[0], // Using the first variant
          type: question.type,
          ...(question.options && { options: question.options }),
          answer: typeof answer === 'string' ? answer : Object.keys(answer).join(`, `),
        };
      }),
    };
  }

  const getSlugFromPathname = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  // const handleGenerateDiagram = async () => {
  //   setLoader(true);
  //   setFailed(false);
  //   try {
  //     let userResponse: any = combineQuestionsAndAnswers(questions, answers);

  //     if (board && board?.nodes.length > 0 && board?.edges.length > 0) {
  //       userResponse.currentDiagram = board;
  //       userResponse.message =
  //         'Can you change the postion of nodes and edges so it looks like new everytime and give me improved version mainly focus on icons which should relate to primary purpose or name ';
  //     }

  //     let slug = getSlugFromPathname();

  //     const response = await fetch(`${env.VITE_API_BASE_URL}/api/v2/boards/create_board`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: `${slug}`,
  //         user_id: 1,
  //         requirements: JSON.stringify(userResponse),
  //         board_id: uuidv4(),
  //       }),
  //     });

  //     const content = await response.json();
  //     const data = JSON.parse(content.content);

  //     if (data && data?.nodes.length > 0 && data?.edges.length > 0) {
  //       setNodes(path, []);
  //       setEdges(path, []);
  //       data.nodes.forEach((node: any) => addNode(path, node));
  //       data.edges.forEach((edge: any) => addEdge(path, edge));
  //     } else {
  //       console.log(`No any data`);
  //     }
  //     setHasGeneratedAlready(true);
  //     setFailed(false);
  //   } catch (error) {
  //     setFailed(true);
  //     console.error('Error generating diagram:', error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    if (currentQuestion < questions.length) {
      setTypedText('');
      setIsTyping(true);
      setCurrentVariant(Math.floor(Math.random() * questions[currentQuestion].variants.length));
      const text = questions[currentQuestion].variants[currentVariant];
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50); // Adjust typing speed here

      // Scroll to the bottom element after the question is displayed
      bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });

      return () => clearInterval(typingInterval);
    }
  }, [currentQuestion, currentVariant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...prev[currentQuestion],
        [option]: !prev[currentQuestion]?.[option],
      },
    }));
  };

  const handleRadioChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isTyping && inputValue.trim()) {
      event.preventDefault(); // Prevent the default form submission
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (questions[currentQuestion].type === 'text') {
      setAnswers((prev) => ({ ...prev, [currentQuestion]: inputValue }));
      setInputValue('');
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleRepeatProcess = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsChatAssistant(false);
  };

  const renderInput = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case 'text':
        return (
          <div className="flex w-full mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-gray-700 text-white p-2 rounded-l-md focus:outline-none"
              placeholder="Type your answer..."
              disabled={isTyping}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 focus:outline-none"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        );
      case 'checkbox':
        return (
          <div className="mt-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={answers[currentQuestion]?.[option] || false}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2"
                  disabled={isTyping}
                />
                <label htmlFor={`checkbox-${index}`} className="text-white">
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none mt-2"
              disabled={isTyping || Object.values(answers[currentQuestion] || {}).every((v) => !v)}
            >
              Next <ChevronRight size={20} className="inline" />
            </button>
          </div>
        );
      case 'radio':
        return (
          <div className="mt-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`radio-${index}`}
                  name={`question-${currentQuestion}`}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleRadioChange(option)}
                  className="mr-2"
                  disabled={isTyping}
                />
                <label htmlFor={`radio-${index}`} className="text-white">
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none mt-2"
              disabled={isTyping || !answers[currentQuestion]}
            >
              Next <ChevronRight size={20} className="inline" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-end justify-end m-4">
        <button
          onClick={handleRepeatProcess}
          className="tooltip text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
        >
          <Repeat size={24}></Repeat>
          <div className="tooltiptext">Repeat questions</div>
        </button>
      </div>

      {!isChatAssistant && (
        <div className=" w-full flex items-center justify-center pb-64">
          <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-2xl mx-auto">
            {/* <h2 className="text-2xl font-bold mb-4">System Design Chat 🤖</h2> */}
            <div className="space-y-4 generate-diagram-with-chat">
              {questions.slice(0, currentQuestion + 1).map((question, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${index === currentQuestion ? 'bg-gray-800' : 'bg-gray-700'}`}
                >
                  <p className="font-semibold">
                    {index === currentQuestion ? typedText : question.variants[0]}
                    {index === currentQuestion && isTyping && (
                      <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-blink"></span>
                    )}
                  </p>
                  {index === currentQuestion ? (
                    !isTyping && renderInput()
                  ) : (
                    <p className="mt-2 text-green-400">
                      {question.type === 'checkbox'
                        ? Object.entries(answers[index] || {})
                            .filter(([_, value]) => value)
                            .map(([key]) => key)
                            .join(', ')
                        : answers[index]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {currentQuestion >= questions.length && (
              <>
                {/* <div className="my-4 p-1 text-primary-green border-[0.5px] border-white rounded-lg">
                <p className="font-semibold">Thank you for your input!</p>
              </div> */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  {loader ? (
                    <p className="py-2">Generating....</p>
                  ) :  (
                    <button
                      onClick={()=>{}}
                      className={`mb-4 inline-block rounded ${failed ? 'bg-red-500' : 'bg-secondary-pink'}  px-6 py-4 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-secondary-pink`}
                    >
                      {failed ? 'Regenerate' : 'Generate Diagram'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div ref={bottomElementRef} id="bottomElement" className=""></div>
    </>
  );
};
