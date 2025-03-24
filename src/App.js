import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Action to update telemetry in Redux
const updateTelemetry = (data) => ({
  type: 'UPDATE_TELEMETRY',
  payload: data[data.length - 1] || { speed: 0, rpm: 0 }, // Use latest entry
});

function App() {
  const dispatch = useDispatch();
  const { speed, rpm } = useSelector((state) => state.telemetry);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/telemetry');
        const data = await response.json();
        dispatch(updateTelemetry(data));
      } catch (error) {
        console.error('Error fetching telemetry:', error);
      }
    };

    fetchTelemetry(); // Initial fetch
    const interval = setInterval(fetchTelemetry, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="mb-4">CarSync: Ultimate Automotive Hub</h1>
      <section className="telemetry container bg-dark text-light p-3 rounded">
        <h2>Telemetry Dashboard</h2>
        <div className="row">
          <div className="col-md-6">
            <p>Speed: {speed.toFixed(1)} km/h</p>
          </div>
          <div className="col-md-6">
            <p>RPM: {rpm.toFixed(0)}</p>
          </div>
        </div>
      </section>
      <section className="container mt-3">ECU Mod Tracker</section>
      <section className="container mt-3">Car Show Planner</section>
      <section className="container mt-3">Dark Web Intel</section>
    </div>
  );
}

export default App;