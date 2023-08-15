import { useState } from 'react';

const App: React.FC = (): JSX.Element => {
  const [healthCheck, setHealthCheck] = useState<{data: string}>();

  const handleOnClick = () => {
    fetch('http://localhost:4000/health', {})
      .then((response) => response.json())
      .then((data) => setHealthCheck(data))
  }
  
  return (
    <main>
      <button onClick={handleOnClick}><span>Health Check</span></button>
      { healthCheck && <span>{healthCheck.data}</span>}
    </main>
  );
}

export default App;
