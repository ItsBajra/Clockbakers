import React from 'react';
import Home from './pages/Home';
import About from './pages/AboutPage';
import Shop from './pages/Shop';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPassword } from './pages/ForgotPasswordPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import VerificationCode from './pages/VerificationCode';
import NewPassword from './pages/NewPassword';
import SetupPage from './pages/ProfileSetupPage';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/shop' element={<Shop />}></Route>
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                    <Route path="/verification" element={<VerificationCode />} />
                    <Route path="/newpassword" element={<NewPassword />} />
                    <Route path='/setup' element={<SetupPage />} />
                    <Route path='/productdetails' element={<ProductDetail />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
