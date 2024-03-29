import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './routes/about'
import Login from './routes/login'
import Cart from './routes/cart';
import CreateProfile from './routes/create-profile';
import Profile from './routes/profile';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './routes/edit-profile';
import NewPost from './routes/new-post';
import PostDetail from './routes/post-detail';
import EditPost from './routes/edit-post';
import DeletePost from './routes/delete-post';
import Demo from './components/CropImage';
import DeletePostSuccessful from './routes/delete-post-successful';
import Payment from './routes/payment';
import OrderSuccessful from './routes/order-successful';
import PurchaseHistory from './routes/purchase-history';
import NewReview from './routes/new-review';
import ReviewsWrittenByYou from './routes/reviews-written-by-you';
import EditReview from './routes/edit-review';
import DeleteReview from './routes/delete-review';
import ProfileReviews from './routes/profile-reviews';
import ViewProfile from './routes/view-profile';
import DeleteProfile from './routes/delete-profile';
import DeliveryOptions from './routes/delivery-options';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='about' element={<About />} />
        <Route path='login' element={<Login />} />
        <Route path='cart' element={<Cart />} />
        <Route path='create-profile' element={<CreateProfile />} />
        <Route path='edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path='new-post' element={<PrivateRoute><NewPost /></PrivateRoute>} />
        <Route path='post-detail' element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        <Route path='edit-post' element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path='delete-post' element={<PrivateRoute><DeletePost /></PrivateRoute>} />
        <Route path='delete-post-successful' element={<PrivateRoute><DeletePostSuccessful /></PrivateRoute>} />
        <Route path='crop' element={<Demo />} />
        <Route path='payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path='order-successful' element={<PrivateRoute><OrderSuccessful /></PrivateRoute>} />
        <Route path='purchase-history' element={<PrivateRoute><PurchaseHistory /></PrivateRoute>} />
        <Route path='new-review' element={<PrivateRoute><NewReview /></PrivateRoute>} />
        <Route path='reviews-written-by-you' element={<PrivateRoute><ReviewsWrittenByYou /></PrivateRoute>} />
        <Route path='edit-review' element={<PrivateRoute><EditReview /></PrivateRoute>} />
        <Route path='delete-review' element={<PrivateRoute><DeleteReview /></PrivateRoute>} />
        <Route path='profile-reviews' element={<PrivateRoute><ProfileReviews /></PrivateRoute>} />
        <Route path='view-profile' element={<ViewProfile />} />
        <Route path='delete-profile' element={<PrivateRoute><DeleteProfile /></PrivateRoute>} />
        <Route path='delivery-options' element={<DeliveryOptions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
