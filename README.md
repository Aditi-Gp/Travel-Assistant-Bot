# Travel-Assistant-Bot
Yoliday Rasa Bot Development Internship Assessment
# 🧳 Yoliday Travel Assistant Chatbot (Rasa Bot Internship Project)

![Yoliday Banner](demo.png)

Welcome to the **Yoliday Travel Assistant Bot**, built using [Rasa](https://rasa.com/)!  
This project was developed as part of the **Yoliday LLP Rasa Bot Development Internship Assessment**.

The chatbot assists users with:
- Travel planning
- Weather forecasts for destinations
- Smart packing suggestions
- Multilingual conversations (English + Hindi 🇮🇳)
- FAQs about travel and Rasa

Live Demo: 👉 [Try it here!](https://your-live-bot-link.vercel.app)

---

## 🚀 Features

### 🎯 Core Functionalities
- **Intent Handling**: greet, goodbye, ask_weather, recommend_packing, faq, fallback  
- **Entity Extraction**: location, date / travel_dates  
- **Forms**: Collects destination, start date, and end date via slot filling  
- **Custom Actions**: 
  - Fetches real-time weather from OpenWeatherMap API  
  - Recommends what to pack based on weather conditions  
- **FAQs**:
  - What is Rasa?
  - Who built you?
  - How can I plan my trip?
- **Fallbacks**: Gracefully handles unknown or out-of-scope queries  

### 🌐 Multilingual Support
- Supports both **English** and **Hindi** conversations using Rasa's NLU training data.

### 📜 Logging Support
- All conversations are logged in `tracker_store` (SQLite by default)
- Easy to switch to Postgres or MongoDB for production use
- Useful for analytics, debugging, and training improvements

---

## 🖥️ Screenshots

### 🌍 Frontend UI
![Frontend](./screenshots/frontend_ui.png)

### 💬 Chatbot Conversation (English)
![Conversation English](./screenshots/chat_english.png)

### 🇮🇳 Chatbot Conversation (Hindi)
![Conversation Hindi](./screenshots/chat_hindi.png)

### 📊 Conversation Logs
![Conversation Logs](./screenshots/logs_ui.png)

---

## 🛠️ Tech Stack

- **Rasa** (NLU + Core)
- **Custom Actions** in Python
- **React Frontend** (hosted on Vercel)
- **Weather API**: OpenWeatherMap
- **Deployment**: Railway / Render / Replit + ngrok

---

## 📦 Folder Structure

```bash
yoliday/
│
├── actions/                 # Custom Python actions
│   └── actions.py
├── data/                    # NLU training data, stories, rules
│   ├── nlu.yml
│   ├── stories.yml
│   └── rules.yml
├── domain.yml               # Domain configuration (intents, slots, actions)
├── config.yml               # Pipeline and policies
├── endpoints.yml            # Action server endpoint
├── credentials.yml          # Channel credentials
├── frontend/                # React frontend for the bot
│   └── (React App Files)
├── .env                     # Environment variables (not committed)
├── .gitignore
├── requirements.txt
└── README.md
