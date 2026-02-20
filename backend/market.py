import pandas as pd
import random
import os
from datetime import datetime, timedelta

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_live_price(crop):
    df = pd.read_csv(os.path.join(BASE_DIR, "Datasets", "market_prices.csv"))

    # Case-insensitive search
    data = df[df["Crop"].str.lower() == crop.lower()]

    if data.empty:
        return {
            "crop": crop,
            "error": "Crop not found",
            "suggestion": "Try crops like Wheat, Paddy, Cotton, Tomato, Chana, Groundnut, Maize, Rice, etc."
        }

    row = data.iloc[-1]
    base_price = int(row["Price"])
    
    # Extract numeric yield value
    yield_str = str(row["ExpectedYield"])
    yield_num = int(''.join(filter(str.isdigit, yield_str)))
    
    # Generate realistic price variation (simulating market fluctuation)
    variation = random.randint(-10, 15)
    current_price = base_price + variation
    
    # Generate predicted price for next month (simple trend)
    predicted_change = random.randint(-5, 20)
    predicted_price = current_price + predicted_change
    
    # Determine suggestion based on price
    if current_price > base_price * 1.1:
        suggestion = "Prices are higher than average - Good time to sell!"
        action = "Sell"
    elif current_price < base_price * 0.9:
        suggestion = "Prices are lower than average - Consider storing for better price"
        action = "Hold"
    else:
        suggestion = "Prices are stable - Can sell or hold based on your needs"
        action = "Hold"

    return {
        "crop": crop,
        "current_price": current_price,
        "base_price": base_price,
        "predicted_price_next_month": predicted_price,
        "price_trend": "Rising" if predicted_price > current_price else "Falling",
        "suggestion": suggestion,
        "recommended_action": action,
        "market_status": "Bullish" if predicted_price > current_price else "Bearish",
        "financial_data": {
            "cost_per_acre": f"₹{int(row['CostPerAcre']):,}",
            "expected_yield": f"{yield_num} quintal/acre",
            "market_demand": row["MarketDemand"],
            "best_season": row["BestSeason"],
            "export_potential": row["ExportPotential"],
            "revenue_per_acre": f"₹{int(base_price * yield_num):,}",
            "profit_per_acre": f"₹{int((base_price * yield_num) - row['CostPerAcre']):,}"
        }
    }

