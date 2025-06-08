# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

import requests
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import os
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
class ActionFetchWeather(Action):
    def name(self):
        return "action_fetch_weather"

    def run(self, dispatcher, tracker, domain):
        location = tracker.get_slot("location")
        if not location:
            dispatcher.utter_message(text="Please provide a location.")
            return []
        url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            weather = data["weather"][0]["description"]
            temp = data["main"]["temp"]
            dispatcher.utter_message(text=f"The current weather in {location} is {weather} with {temp}°C.")
            return [SlotSet("weather", weather)]
        else:
            dispatcher.utter_message(text="Sorry, I couldn't fetch the weather.")
            return []

class ActionRecommendPacking(Action):
    def name(self):
        return "action_recommend_packing"

    def run(self, dispatcher, tracker, domain):
        weather = tracker.get_slot("weather")
        advice = "Don't forget your essentials!"
        if weather:
            if "rain" in weather:
                advice = "Pack an umbrella and waterproof shoes."
            elif "clear" in weather or "sun" in weather:
                advice = "Pack sunscreen and light clothes."
            elif "cold" in weather or "snow" in weather:
                advice = "Pack warm clothes and a jacket."
        dispatcher.utter_message(text=advice)
        return []

class ActionFAQ(Action):
    def name(self):
        return "action_faq"

    def run(self, dispatcher, tracker, domain):
        last_message = tracker.latest_message.get('text', '').lower()
        if "rasa" in last_message or "रासा" in last_message:
            dispatcher.utter_message(response="utter_faq/what_is_rasa")
        elif "who built" in last_message or "किसने बनाया" in last_message:
            dispatcher.utter_message(response="utter_faq/who_built_you")
        elif "plan" in last_message or "प्लान" in last_message:
            dispatcher.utter_message(response="utter_faq/how_to_plan_trip")
        else:
            dispatcher.utter_message(text="I'm here to help with your travel questions!")
        return []
