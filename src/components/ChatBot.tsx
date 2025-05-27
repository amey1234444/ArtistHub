// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { MessageSquare, Send, X } from 'lucide-react';

// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     setInput('');
//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();
//       setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
//     } catch (error) {
//       console.error('Chat error:', error);
//       setMessages(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error. Please try again.' 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {isOpen ? (
//         <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-[500px] flex flex-col">
//           <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
//             <h3 className="font-semibold">ArtistHub Assistant</h3>
//             <button onClick={() => setIsOpen(false)} className="hover:opacity-75">
//               <X size={20} />
//             </button>
//           </div>
          
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg p-3 ${
//                     message.role === 'user'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
//                   Typing...
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form onSubmit={handleSubmit} className="p-4 border-t">
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
//         >
//           <MessageSquare size={24} />
//         </button>
//       )}
//     </div>
//   );
// }