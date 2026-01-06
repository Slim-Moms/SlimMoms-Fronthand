const BACKEND_URL = 'http://localhost:3000/api';

export const simulateCalculateDailyRate = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { height, age, currentWeight, desiredWeight, bloodType } = userData;

      const dailyRate = 
        10 * currentWeight + 
        6.25 * height - 
        5 * age - 
        161 - 
        10 * (currentWeight - desiredWeight);

      const mockResponse = {
        dailyRate: Math.max(Math.round(dailyRate), 1200),
        notAllowedProducts: [
            'White bread',
            'Sugar',
            'Alcohol',
            'Processed meat',
            'Salty snacks'
        ]
      };

      console.log("[MOCK API] Request sent to backend (Simulation):", userData);
      console.log("[MOCK API] Backend response:", mockResponse);

      resolve(mockResponse);
    }, 1500);
  });
};