import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import {CartContext} from './CartContext';
import { useEffect, useState } from 'react';
import {getCart,storeCart} from './helpers';

const App = () => { 
                                    // comments local state 
const [cart,setCart]=useState({});
                                    // comments  featch from local storage
useEffect(()=>{                     // helpers sa a raha ha
    getCart().then(cart =>{
    setCart(JSON.parse(cart));
    });
},[]);         

                            //helpers sa a raha ha card ka changes ko watch kar sakta ha using
useEffect(()=>{
        storeCart(JSON.stringify(cart));
},[cart]);                        

    return (
        <>
            <Router>
                <CartContext.Provider value ={{cart,setCart}}>
                    <Navigation/>
                        <Routes>
                
                            <Route exact path="/" element={<Home />} />
                            <Route exact  path='/productPage' element={<ProductPage />}></Route>
                            <Route exact  path='/products/:_id' element={<SingleProduct/>}></Route>
                            <Route exact  path='/cart' element={<Cart />}></Route>
                        </Routes> 
                </CartContext.Provider>   
            </Router>
        </>
    ) 
}
export default App;