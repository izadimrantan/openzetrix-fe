import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ChatbotPopup() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! How can I help you with writing Zetrix smart contract?' }
  ]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: userMessage.trim() },
      ]);
      setUserMessage('');
      // Here, you can add functionality to call your AI assistant API and update messages accordingly.
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        Chat with AI assistant
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 w-96 p-4 bg-white border rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">AI Assistant</h3>
          <Popover.Button>
            <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </Popover.Button>
        </div>
        <div className="h-64 overflow-y-auto border rounded-md p-2 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-blue-100 text-left'
                  : 'bg-gray-200 text-right'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="flex-grow p-2 border rounded-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
