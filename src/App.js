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
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import AddBrand from './components/AddBrand';
import AddColor from './components/AddColor';
import AddCoupon from './components/AddCoupon';
import ViewEnquiry from './components/ViewEnquiry';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route index element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
          <Route path="reset-password/:token" element={<ResetPassword/>} />          
          <Route path='dashboard' element={<DashboardLayout/>} > 
            <Route index element={<Dashboard/>} />
            <Route path='add-product' element={<AddProduct/>} />
            <Route path='add-product/:id' element={<AddProduct/>} />
            <Route path='product-list' element={<Products/>} />
            <Route path='category-list' element={<Categories/>} />
            <Route path='add-category' element={<AddCategory/>} />
            <Route path='add-category/:id' element={<AddCategory/>} />
            <Route path='color-list' element={<Colors/>} />
            <Route path='add-color' element={<AddColor/>} />
            <Route path='add-color/:id' element={<AddColor/>} />
            <Route path='brand-list' element={<Brands/>} />
            <Route path='add-brand' element={<AddBrand/>} />
            <Route path='add-brand/:id' element={<AddBrand/>} />
            <Route path='block-customer' element={<BlockCustomer/>} />
            <Route path='unblock-customer' element={<UnblockCustomer/>} />
            <Route path='order-list' element={<Orders/>} />
            <Route path='enquiry-list' element={<Enquiries/>} />
            <Route path='enquiry-list/:id' element={<ViewEnquiry/>} />
            <Route path='add-coupon' element={<AddCoupon/>} />
            <Route path='add-coupon/:id' element={<AddCoupon/>} />
            <Route path='coupon-list' element={<Coupons/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
