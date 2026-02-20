from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from market import get_live_price
from harvest import predict_harvest
from crop_rotation import suggest_rotation
from soil import soil_suitability
from weather import weather_alert
import os

app = Flask(__name__, static_folder='../frontend')
CORS(app)

# Serve frontend files
@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('../frontend', filename)

@app.route("/price", methods=["POST"])
def price():
    crop = request.json["crop"]
    data = get_live_price(crop)
    return jsonify(data)

@app.route("/harvest", methods=["POST"])
def harvest():
    crop = request.json["crop"]
    sow_date = request.json["sowing_date"]
    result = predict_harvest(crop, sow_date)
    return jsonify(result)

@app.route("/rotation", methods=["POST"])
def rotation():
    crop = request.json["crop"]
    result = suggest_rotation(crop)
    return jsonify(result)

@app.route("/soil", methods=["POST"])
def soil_check():
    soil_type = request.json["soil"]
    crop = request.json["crop"]
    result = soil_suitability(soil_type, crop)
    return jsonify(result)

@app.route("/weather", methods=["GET"])
def weather():
    result = weather_alert()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)