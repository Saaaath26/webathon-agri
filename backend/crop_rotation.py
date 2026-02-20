import pandas as pd
import os

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def suggest_rotation(crop):
    df = pd.read_csv(os.path.join(BASE_DIR, "Datasets", "rotation_data.csv"))

    # Case-insensitive search
    row = df[df["CurrentCrop"].str.lower() == crop.lower()]

    if row.empty:
        # Provide general rotation advice for unknown crops
        return {
            "current_crop": crop,
            "next_crop": "Legumes (Pulses)",
            "benefit": "Fixes nitrogen in soil, improves fertility",
            "advice": "Consider planting legumes after your current crop to restore soil nutrients",
            "financial": {
                "estimated_cost": "₹20,000-30,000",
                "expected_revenue": "₹35,000-50,000",
                "profit_margin": "40-45%"
            }
        }

    row = row.iloc[0]
    
    return {
        "current_crop": crop,
        "next_crop": row["NextCrop"],
        "benefit": row["Benefit"],
        "advice": row["Advice"],
        "financial": {
            "estimated_cost": f"₹{row['EstimatedCost']:,}",
            "expected_revenue": f"₹{row['ExpectedRevenue']:,}",
            "profit_margin": row["ProfitMargin"]
        }
    }

