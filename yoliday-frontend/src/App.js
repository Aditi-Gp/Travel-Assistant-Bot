// Enhanced App.js with more extravagant 3D and UI experience
import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Clouds, Sparkles, Float, Sky, Text, Environment, Caustics } from "@react-three/drei";
import "./App.css";

function ThreeBG() {
  return (
    <Canvas className="three-bg" camera={{ position: [0, 0, 20], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <Environment preset="sunset" background />
      <Stars radius={200} depth={60} count={10000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={300} speed={0.6} size={3} color="#fff" opacity={0.9} scale={[10, 10, 10]} />
      <Clouds depth={1.5} opacity={0.4} />
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Text
          position={[0, 3, 0]}
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineColor="black"
          outlineWidth={0.02}>
          ✈️ Welcome to Yoliday
        </Text>
      </Float>
      <Caustics color="#ffffff" position={[0, -2, 0]} lightSource={[5, 5, 5]}>
        <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
      </Caustics>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

function ChatBubble({ text, sender }) {
  return <div className={`chat-bubble ${sender}`}>{text}</div>;
}

function App() {
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to Yoliday Travel Assistant! How can I help you plan your adventure?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", message: input }),
      });
      const data = await res.json();
      if (data.length === 0) {
        setMessages((msgs) => [...msgs, { text: "No response from server.", sender: "bot" }]);
      } else {
        data.forEach((msg) =>
          setMessages((msgs) => [...msgs, { text: msg.text, sender: "bot" }])
        );
      }
    } catch (error) {
      setMessages((msgs) => [...msgs, { text: "Error: Unable to reach the server.", sender: "bot" }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="App">
      <ThreeBG />
      <div className="chat-container">
        <h2>🌴 Yoliday Travel Assistant</h2>
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about weather, packing, or destinations..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="footer">
          <span>Made with ❤️ by Aditi Gupta • Explore. Experience. Enjoy.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
