from datetime import datetime, timedelta
import pandas as pd

def predict_harvest(crop, sow_date):
    df = pd.read_csv("Datasets/crop_lifecycle.csv")

    # Case-insensitive search
    row = df[df["Crop"].str.lower() == crop.lower()]

    if row.empty:
        return {
            "crop": crop,
            "error": "Crop not found in database",
            "suggestion": "Try crops like Wheat, Paddy, Cotton, Tomato, Chana, Groundnut, Maize, Rice, Sugarcane, or Potato"
        }

    days = int(row.iloc[0]["Duration"])
    season = row.iloc[0]["Season"]
    tips = row.iloc[0]["Tips"]

    sow = datetime.strptime(sow_date, "%Y-%m-%d")
    harvest_date = sow + timedelta(days=days)

    # Calculate growth stages
    vegetative = sow + timedelta(days=int(days * 0.3))
    flowering = sow + timedelta(days=int(days * 0.6))
    maturity = sow + timedelta(days=int(days * 0.85))

    return {
        "crop": crop,
        "sowing_date": sow_date,
        "expected_harvest_date": harvest_date.strftime("%Y-%m-%d"),
        "days_to_harvest": days,
        "season": season,
        "growth_stages": {
            "vegetative_stage": vegetative.strftime("%Y-%m-%d"),
            "flowering_stage": flowering.strftime("%Y-%m-%d"),
            "maturity_stage": maturity.strftime("%Y-%m-%d")
        },
        "tips": tips,
        "alert": "Harvest before heavy rains" if season == "Kharif" else "Ensure adequate irrigation during summer"
    }

