import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Chatbot from './components/Chatbot';
import Chatbot1 from './components/Chatbot1';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chatbot/>}/>
      <Route path='/c' element={<Chatbot1/>}/>
      <Route path='/c2' element={<Chatbot/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
