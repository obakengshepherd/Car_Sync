import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { speed, rpm } = useSelector((state) => state.telemetry);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_TELEMETRY',
        payload: {
          speed: Math.random() * 100, // Mock speed (0-100 km/h)
          rpm: Math.random() * 5000,  // Mock RPM (0-5000)
        },
      });
    }, 1000); // Updates every second
    return () => clearInterval(interval); // Cleanup
  }, [dispatch]);

  return (
    <div className="App">
      <h1>CarSync: Ultimate Automotive Hub</h1>
      <section className="telemetry">
        <h2>Telemetry Dashboard</h2>
        <p>Speed: {speed.toFixed(1)} km/h</p>
        <p>RPM: {rpm.toFixed(0)}</p>
      </section>
      <section>ECU Mod Tracker</section>
      <section>Car Show Planner</section>
      <section>Dark Web Intel</section>
    </div>
  );
}

export default App;