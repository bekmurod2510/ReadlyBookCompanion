import { createContext, useEffect, useState } from 'react';
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import axios from 'axios';

//components
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Stats from './components/Stats'
import AddBook from './components/AddBook';
import AuthPage from './Authentication/AuthPage';

export const UserinfoContext = createContext({
    success : false,
    message : "",
    userData : {
      id: 0,
      name : "",
      email :" ",
      books:[]
    }
  });

function App() {
  const [data, setData] = useState({
    success : false,
    message : "",
    userData : {
      id: 0,
      name : "",
      email : "",
      books:[]
    }
  });

  const location = useLocation();

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/getData',{
            withCredentials : true
          });
          setData(response.data);
          axios.defaults.withCredentials = true;
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      };

      fetchData(); 
    }, [location.pathname]); 

  return (
    <UserinfoContext.Provider value={data}>
      <Routes>
        <Route index element={<AuthPage/>}/>
        <Route path='/home' element={
          <div className='h-full flex'>
            <div className='w-52 fixed top-0 left-0 h-screen '>
              <Sidebar/>
            </div>
            <div className='flex-1 ml-52'>
              <Home/>
            </div>
          </div>
        } />
        <Route path='/stats' element={
          <div className='min-h-full flex'>
            <div className='w-52 fixed top-0 left-0 h-screen '>
              <Sidebar/>
            </div>
            <div className='flex-1 ml-52'>
              <Stats/>
            </div>
          </div>
        } />
        <Route path='/addBook' element={
          <div className='h-full flex'>
            <div className='flex-1 items-center justify-center'>
              <AddBook/>
            </div>
          </div>
        } />
      </Routes>
    </UserinfoContext.Provider> 
  )
}

export default App