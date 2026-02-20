import random
from datetime import datetime, timedelta

def weather_alert():
    # Generate realistic weather data based on current season
    current_month = datetime.now().month
    
    # Seasonal weather patterns for India
    if current_month in [6, 7, 8, 9]:  # Monsoon season
        forecast = "Heavy rainfall expected (80mm)"
        temp_range = "24-32°C"
        humidity = "85%"
        advice = "Avoid field operations. Ensure proper drainage. Delay harvesting of kharif crops."
        risk = "High"
        crops_affected = ["Rice", "Cotton", "Groundnut"]
        recommendation = "Protect crops from waterlogging. Consider early harvest of mature crops."
    elif current_month in [10, 11]:  # Post-monsoon
        forecast = "Light rainfall possible (20mm)"
        temp_range = "20-30°C"
        humidity = "70%"
        advice = "Good time for rabi sowing. Continue harvest of kharif crops."
        risk = "Low"
        crops_affected = []
        recommendation = "Start rabi crop sowing. Store harvested produce properly."
    elif current_month in [12, 1, 2]:  # Winter/Rabi season
        forecast = "Clear skies, cold nights expected"
        temp_range = "8-22°C"
        humidity = "55%"
        advice = "Protect wheat from frost. Provide irrigation to rabi crops."
        risk = "Medium"
        crops_affected = ["Wheat", "Mustard"]
        recommendation = "Apply frost protection measures. Irrigate crops in morning."
    else:  # Summer (March-May)
        forecast = "Heatwave conditions expected"
        temp_range = "35-45°C"
        humidity = "30%"
        advice = "Provide frequent irrigation. Avoid fertilizer application during hot hours."
        risk = "High"
        crops_affected = ["Vegetables", "Maize"]
        recommendation = "Use mulching to conserve moisture. Irrigate twice daily."

    # Add some randomness to make it interesting
    alerts = []
    if random.random() > 0.7:
        alerts.append("Thunderstorm warning in next 48 hours")
    if random.random() > 0.6:
        alerts.append("Pest outbreak likely due to humidity")
    if random.random() > 0.8:
        alerts.append("Market prices may fluctuate due to weather")

    return {
        "forecast": forecast,
        "temperature": temp_range,
        "humidity": humidity,
        "risk_level": risk,
        "advice": advice,
        "alerts": alerts,
        "crops_affected": crops_affected,
        "recommendation": recommendation,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

