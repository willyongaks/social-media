import './App.css';
import FormDisplay from './components/forms/FormDisplay';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <FormDisplay />
      </div>
    </AuthProvider>
    
  );
}

export default App;
