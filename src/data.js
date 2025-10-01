export const initial = {
  location: "Sabarmati Riverfront, Ahmedabad, Gujarat",
  weather: { temp: 28, humidity: 62, condition: "Partly Cloudy", windKmph: 12, rainChance: 18 },
  waterLevelPercent: 42,
  detections: [
    { id: 1, type: "Waste", coords: { lat: 23.030, lng: 72.540 }, x: 22, y: 55, w: 10, h: 12, confidence: 0.81, time: new Date().toLocaleTimeString() },
    { id: 2, type: "Human", coords: { lat: 23.033, lng: 72.542 }, x: 62, y: 40, w: 10, h: 18, confidence: 0.78, time: new Date().toLocaleTimeString() }
  ],
  waterQuality: [
    { toxin: "pH", ppm: 7.2, safeMin: 6.5, safeMax: 8.5 },
    { toxin: "Dissolved Oxygen (mg/L)", ppm: 6.9, safeMin: 5, safeMax: 9 },
    { toxin: "Turbidity (NTU)", ppm: 12, safeMin: 0, safeMax: 25 },
    { toxin: "Total Coliform (CFU/100mL)", ppm: 45, safeMin: 0, safeMax: 50 }
  ]
};
