import requests, time, random

server_url = "http://127.0.0.1:5000/data"  

while True:
    data = {
        "temperature": round(random.uniform(20, 30), 1),
        "tds": random.randint(100, 500),
        "turbidity": round(random.uniform(0, 5), 1),
        "ph": round(random.uniform(6.5, 8.5), 1)
    }

    try:
        r = requests.post(server_url, json=data)
        print("✅ Sent:", data, "| 📡 Response:", r.json())
    except Exception as e:
        print("❌ Error:", e)

    time.sleep(5)
