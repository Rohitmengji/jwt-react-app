import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Home from './component/Home';
import SignupForm from "./component/SignUpForm";
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignupForm />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default App;