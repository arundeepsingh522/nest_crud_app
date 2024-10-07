import './App.css';
import Todo from './components/todopage/Todo';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='Main' >
     <Todo/>
    </div>
    
  );
}

export default App;
