import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Create from './Components/Create/Create';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import DataContextProvider from './DataContext/DataContext';

function App() {
  
  let x = createBrowserRouter([
    {path : "" , element: <LayOut/> ,children:[
      {path:'', element: <Home/>},
      {path:'create', element: <Create/>},
      {path:'profile', element: <Profile/>},
      {path:'settings', element: <Settings/>},
    ]}
  ])
  return (
<DataContextProvider>
<RouterProvider router={x}></RouterProvider>

</DataContextProvider>
  );
}

export default App;
