// Bu dosya Backend hazır olana kadar Frontend'in çalışmasını sağlar.


//CANLI Backend adresi----->>>>>>
//const BACKEND_URL = 'https://slimmoms-backend-9zqy.onrender.com';
//LOCAL Backend adresi


const BACKEND_URL = 'http://localhost:3000/api';

export const simulateCalculateDailyRate = (userData) => {
  return new Promise((resolve) => {
    // 1. Loader'ı görebilmek için 1.5 saniye gecikme ekliyoruz Sanki internete gidip geliyor gibi
    setTimeout(() => {
      const { height, age, currentWeight, desiredWeight, bloodType } = userData;

      // Backend'deki formülün aynısı:
      // 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight)
      
      const dailyRate = 
        10 * currentWeight + 
        6.25 * height - 
        5 * age - 
        161 - 
        10 * (currentWeight - desiredWeight);

      // Backend'den gelecek verinin formatı bu:
      // Backend kodundaki src/utils/userServices.js ve controller yapısına bakarak hazırladımxczxc
      const mockResponse = {
        dailyRate: Math.max(Math.round(dailyRate), 1200), // Eksi çıkmasın diye önlem
        notAllowedProducts: [
            // Kan grubuna göre rastgele yasaklı ürünler dönüyormuş gibi yapalım
            'White bread',
            'Sugar',
            'Alcohol',
            'Processed meat',
            'Salty snacks'
        ]
      };

      console.log("🛠️ [MOCK API] Backend'e istek atıldı (Simülasyon):", userData);
      console.log("✅ [MOCK API] Backend cevap döndü:", mockResponse);

      resolve(mockResponse);
    }, 1500); // 1.5 saniye bekle
  });
};