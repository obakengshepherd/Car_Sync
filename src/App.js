import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Action to update telemetry in Redux
const updateTelemetry = (data) => ({
  type: 'UPDATE_TELEMETRY',
  payload: data[data.length - 1] || { speed: 0, rpm: 0 },
});

function App() {
  const dispatch = useDispatch();
  const { speed, rpm } = useSelector((state) => state.telemetry);
  const [newSpeed, setNewSpeed] = useState('');
  const [newRpm, setNewRpm] = useState('');

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

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speed: Number(newSpeed), rpm: Number(newRpm) }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(updateTelemetry([data])); // Update with new entry
        setNewSpeed('');
        setNewRpm('');
      }
    } catch (error) {
      console.error('Error posting telemetry:', error);
    }
  };

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
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Speed (km/h)"
                value={newSpeed}
                onChange={(e) => setNewSpeed(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="RPM"
                value={newRpm}
                onChange={(e) => setNewRpm(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
      <section className="container mt-3">ECU Mod Tracker</section>
      <section className="container mt-3">Car Show Planner</section>
      <section className="container mt-3">Dark Web Intel</section>
    </div>
  );
}

export default App;