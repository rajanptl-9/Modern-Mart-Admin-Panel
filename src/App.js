import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PageLayout from './components/PageLayout';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Coupons from './components/Coupons';
import UnblockCustomer from './components/UnblockCustomer';
import BlockCustomer from './components/BlockCustomer';
import Products from './components/Products';
import Categories from './components/Categories';
import Colors from './components/Colors';
import Brands from './components/Brands';
import Enquiries from './components/Enquiries';
import AddFormList from './components/AddFormList';
import AddCoupon from './components/AddCoupon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route index element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
          <Route path="reset-password" element={<ResetPassword/>} />          
          <Route path='admin' element={<DashboardLayout/>} > 
            <Route index element={<Dashboard/>} />
            <Route path='add-anything' element={<AddFormList/>} />
            <Route path='product-list' element={<Products/>} />
            <Route path='category-list' element={<Categories/>} />
            <Route path='color-list' element={<Colors/>} />
            <Route path='brand-list' element={<Brands/>} />
            <Route path='block-customer' element={<BlockCustomer/>} />
            <Route path='unblock-customer' element={<UnblockCustomer/>} />
            <Route path='order-list' element={<Orders/>} />
            <Route path='enquiry-list' element={<Enquiries/>} />
            <Route path='add-coupon' element={<AddCoupon/>} />
            <Route path='coupon-list' element={<Coupons/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
