import pandas as pd

def soil_suitability(soil, crop):
    df = pd.read_csv("Datasets/soil_data.csv")

    # Case-insensitive search
    row = df[(df["Soil"].str.lower() == soil.lower()) & (df["Crop"].str.lower() == crop.lower())]

    if row.empty:
        # Try to find similar crops or suggest alternatives
        similar_soils = df[df["Crop"].str.lower() == crop.lower()]
        if not similar_soils.empty:
            best_soil = similar_soils.iloc[0]["Soil"]
            return {
                "suitability": "Not recommended",
                "suggestion": f"Try {best_soil} soil for {crop} instead",
                "notes": "Current soil not suitable for this crop"
            }
        return {
            "suitability": "Unknown",
            "suggestion": "Consult local agricultural expert",
            "notes": "No data available for this combination"
        }

    suitability = row.iloc[0]["Suitability"]
    notes = row.iloc[0]["Notes"]

    if suitability == "High":
        suggestion = "Excellent! This crop is well-suited for this soil type."
    elif suitability == "Medium":
        suggestion = "Good. Consider adding fertilizers for better yield."
    else:
        suggestion = "Not recommended. Consider soil amendment or different crop."

    return {
        "suitability": suitability,
        "suggestion": suggestion,
        "notes": notes,
        "soil_type": soil,
        "crop": crop
    }

