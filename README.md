# Travel-Assistant-Bot
Yoliday Rasa Bot Development Internship Assessment
# 🧳 Yoliday Travel Assistant Chatbot (Rasa Bot Internship Project)

![Yoliday Banner](demo.png)

Welcome to the **Yoliday Travel Assistant Bot**, built using [Rasa](https://rasa.com/)!  

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
