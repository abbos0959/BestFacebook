import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";

import { Login } from "./pages/login/index";
import { Profile } from "./pages/profile/index";
function App() {
   return (
      <div>
         <Routes>
            <Route path="/login" element={<Login />} exact />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home/>}/>
            
         </Routes>
      </div>
   );
}

export default App;
