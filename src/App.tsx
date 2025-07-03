import { useState, useEffect, useRef } from 'react';
import './App.css';
import WeatherMap from './components/WeatherMap';
import { IsMobileContext } from './ctx/IsMobileContext';

export const checkIsMobile = () => {
  return window.innerWidth <= 620 || window.innerHeight > window.innerWidth;
}
function App() {
  const [isMobile, setIsMobile] = useState(checkIsMobile)
  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = checkIsMobile()
      setIsMobile(currentIsMobile)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IsMobileContext.Provider value={isMobile}>
      <div 
        className={`min-h-[100vh] p-5 ${isMobile ? 'px-3 py-2' : 'h-screen '}`}
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
        <WeatherMap />
      </div>
    </IsMobileContext.Provider>
  )
}


export default App;
