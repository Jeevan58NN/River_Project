from flask import Flask, request, jsonify
import threading
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

latest_data = {
    'temperature': 0.0,
    'tds': 0.0,
    'turbidity': 0.0,
    'ph': 0.0,
    'timestamp': time.time()
}
data_lock = threading.Lock()

@app.route('/data', methods=['POST'])
def receive_data():
    """
    ESP32 (or any client) POSTs JSON here:
    { "temperature": 25.3, "tds": 450, "turbidity": 12.3, "ph": 7.1 }
    """
    global latest_data
    if not request.is_json:
        return jsonify({"status": "error", "message": "Request must be JSON"}), 400

    payload = request.get_json()
    with data_lock:
        latest_data['temperature'] = float(payload.get('temperature', 0))
        latest_data['tds'] = float(payload.get('tds', 0))
        latest_data['turbidity'] = float(payload.get('turbidity', 0))
        latest_data['ph'] = float(payload.get('ph', 0))
        latest_data['timestamp'] = time.time()

    return jsonify({"status": "success", "message": "Data received"}), 200

@app.route('/get_data', methods=['GET'])
def get_data():
    """
    Frontend GETs this endpoint to receive latest sensor reading.
    Returns JSON including a 'stale' boolean when the last update is old.
    """
    with data_lock:
        copy = latest_data.copy()

    copy['stale'] = (time.time() - copy.get('timestamp', 0)) > 60
    copy['last_updated'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(copy['timestamp']))
    return jsonify(copy), 200

if __name__ == "__main__":
    print("Starting Flask server on 0.0.0.0:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
