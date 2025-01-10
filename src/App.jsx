import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBkmdTOdKP9qXw0RdfI02fWg45rC0jthoI",
      method: 'post',
      data: {
        contents: [{
          parts: [{ text: question }]
        }],
      },
    });

    const rawAnswer = response['data']['candidates'][0]['content']['parts'][0]['text'];
    setAnswer(rawAnswer);
  }

  // Function to format text into paragraphs and bold headings
  function renderFormattedAnswer(answer) {
    return answer.split('\n').map((line, index) => {
      const isHeading = line.match(/^[A-Za-z0-9\s]+:/); // Detect lines ending with ":"
      return (
        <p
          key={index}
          className={`mb-2 ${isHeading ? 'font-bold text-gray-800' : 'text-gray-700 leading-relaxed'}`}
        >
          {line}
        </p>
      );
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chat App</h1>
        <div className="space-y-4">
          {/* Question Section */}
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            placeholder="Ask anything..."
          />
          <button
            onClick={generateAnswer}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Generate Answer
          </button>
        </div>
        {/* Answer Section */}
        {answer && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Answer:</h2>
            <div className="bg-white p-4 rounded-md shadow-inner">
              {renderFormattedAnswer(answer)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
