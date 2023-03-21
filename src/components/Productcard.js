import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import { CartContext } from "../CartContext";


const Productcard = (props) => {
    const[isAdding ,setAdding]=useState(false);
    const{cart,setCart}= useContext(CartContext);
    // console.log(props);
    const { product }=props;


const addToCart=(event,product)=>{
    event.preventDefault();
    let _cart = {...cart};  //card ko copy kar lay
    if(!_cart.items){

        _cart.items={}    // phr is ma data dal dya
    }
    if(_cart.items[product._id]){
        _cart.items[product._id]+=1;
    }else{
        _cart.items[product._id] = 1;
    }

    if(!_cart.totalItems){
        _cart.totalItems = 0;
    }

    _cart.totalItems +=1;
    setCart(_cart);         //modify card ko set kar daya 
    
    setAdding(true);      //color is change after click on add
    setTimeout(() => {      //auto change color after 1.5 sec
        setAdding(false);
    }, 1000);
}

  return (
    <Link to={`/products/${product._id}`}>
        
        <div>
            <img className="w-5/6" src={product.image} alt="pazza"/>
            <div className="text-center">
                <h2 className="text-lg font-bold py-2">{product.name}</h2>
                <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
            </div>
                
            <div className="flex justify-between items-center mt-4 ">
                <span>RS {product.price}</span>
                <button disabled={isAdding} onClick={(e) => { addToCart(e, product)}} className={` ${ isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4  rounded-full font-bold`}>ADD{isAdding ? 'ED' : ''}</button>
            </div>
        </div>

    </Link>
  )
}

export default Productcard;


