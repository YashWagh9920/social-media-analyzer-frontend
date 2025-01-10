import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { marked } from "marked";
import { Send, Loader2, User, Bot } from 'lucide-react';
import {Input,Button,MessageBubble } from './compo';
import { Navigate, useNavigate } from 'react-router-dom';


function ChatBot() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setResponse('');

    // Add user message
    setMessages(prev => [...prev, { content: inputValue, isUser: true }]);

    try {
      const res = await axios.post('https://social-media-analyzer-backend-qs8s.onrender.com/api/chat', { inputValue });
      const data = res.data;
      let ans = data.outputs[0].outputs[0].messages[0].message;
      ans = marked(ans);

      if (ans) {
        setMessages(prev => [...prev, { content: ans, isUser: false }]);
        setResponse(ans);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prev => [...prev, { content: "Error communicating with the server.", isUser: false }]);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-indigo-200 bg-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-indigo-800 font-medium text-xl md:text-2xl lg:text-3xl">
          <Bot className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-indigo-500" />
          ViraLyticsAI
        </div>
        <Button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-900 hover:to-violet-900 lg:px-5 lg:py-6"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-white lg:text-xl">Go To Dashboard</span>
          </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-indigo-600 p-4">
            <Bot className="w-8 h-8 md:w-10 md:h-10 mb-2 text-indigo-500" />
            <p className="text-center">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} content={message.content} isUser={message.isUser} />
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-indigo-200 bg-white">
        <div className="max-w-4xl mx-auto w-full px-4 py-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-white border-black focus:border-indigo-600 focus:ring-indigo-600 text-black text-lg  placeholder-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className={`w-9 h-9 p-0 bg-gradient-to-r from-indigo-600 to-violet-600 ${
                loading || !inputValue.trim()
                  ? 'opacity-50'
                  : 'hover:from-indigo-700 hover:to-violet-700'
              }`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Send className="h-4 w-4 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;