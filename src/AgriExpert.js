import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
import './AgriExpert.css';

const AgriExpert = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const rules = [
    { keywords: ['tomato', 'yellow', 'leaves'], response: 'Yellow leaves on tomatoes may indicate nitrogen deficiency. Consider using a balanced fertilizer.' },
    { keywords: ['tomato', 'black', 'spots'], response: 'Black spots on tomato leaves often suggest fungal infections. Use a fungicide and avoid overhead watering.' },
    { keywords: ['potato', 'soil', 'acidic'], response: 'Potatoes prefer slightly acidic soil. If your soil is too alkaline, consider adding sulfur to lower the pH.' },
    { keywords: ['onion', 'soil', 'sandy'], response: 'Onions thrive in loose, well-drained sandy loam soil. Avoid heavy clay soils that retain too much water.' },
    { keywords: ['kharif', 'crops', 'monsoon'], response: 'Kharif crops, like rice and maize, are planted during the monsoon. Ensure proper drainage to prevent root rot.' },
    { keywords: ['rabi', 'crops', 'winter'], response: 'Rabi crops, like wheat and barley, are planted in winter. These crops require a cool and dry environment.' },
    { keywords: ['zaid', 'crops', 'summer'], response: 'Zaid crops are grown during the summer months. Ensure regular irrigation, as they are sensitive to water stress.' },
    { keywords: ['summer', 'crops', 'heat'], response: 'Summer crops like maize and groundnut need plenty of sunlight but should be protected from extreme heat during midday.' },
    { keywords: ['soil', 'potato', 'clay'], response: 'Clay soil can cause potatoes to rot due to poor drainage. Consider growing potatoes in well-drained sandy loam soil.' },
    { keywords: ['soil', 'onion', 'compacted'], response: 'Compacted soil can stunt onion growth. Loosen the soil and ensure good drainage for healthy bulb formation.' },
    { keywords: ['rain', 'water', 'flooded'], response: 'Excessive rainfall can lead to waterlogging, especially for crops like potatoes and onions. Ensure good drainage to prevent root rot.' },
    { keywords: ['weather', 'hot', 'humid'], response: 'Hot and humid weather can increase the risk of fungal diseases in crops like tomatoes and onions. Use fungicides and ensure proper air circulation.' },
  ];

  const getResponse = (text) => {
    const lowerText = text.toLowerCase();
  
    for (const rule of rules) {
      let matchCount = 0;
      for (const keyword of rule.keywords) {
        if (lowerText.includes(keyword)) {
          matchCount++;
        }
      }
  
      if (matchCount >= Math.ceil(rule.keywords.length * 0.66)) {
        return rule.response;
      }
    }
  
    return "Sorry, I couldn't identify the issue. Please provide more details about your crop and symptoms.";
  };
  
  const handleSend = () => {
    if (!input.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const userMessage = { from: 'user', text: input };
    const botResponse = { from: 'bot', text: getResponse(input) };
    setMessages(prevMessages => [...prevMessages, userMessage, botResponse]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <h1 className="chat-heading">Agri-Expert</h1>

      {!isChatVisible && (
        <div className="start-search-container">
          <button className="start-search-btn" onClick={() => setIsChatVisible(true)}>
            Start Searching
          </button>
        </div>
      )}

      {isChatVisible && (
        <div className="chat-box slide-down">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your crop problem..."
              className={`input-field ${error ? 'error-input' : ''}`}
            />
            <button onClick={handleSend} className="send-btn">
              <SendIcon className="send-icon" />
            </button>
          </div>

          {error && <div className="error-message">Please enter a message!</div>}
        </div>
      )}
    </div>
  );
};

export default AgriExpert;
