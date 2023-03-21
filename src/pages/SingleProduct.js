
import React,{ useState,useEffect,useContext} from "react";
import {useParams , useNavigate} from "react-router-dom";
import { CartContext } from "../CartContext";



const SingleProduct = () => {
    const[product,setProduct]= useState({});
    const Params=useParams();
    const navigate =useNavigate();
    const goBack = () => {
		navigate(-1);
	}
    const{cart,setCart}= useContext(CartContext);
    const[isAdding ,setAdding]=useState(false);
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

    
    

    useEffect(()=>{ 
        fetch(`https://star-spark-pasta.glitch.me/api/products/${Params._id}`)
                 .then(res => res.json())
                 .then(product=>{
                    setProduct(product);
                    // console.log(product);
                    
                 })
    }, [Params._id]);



    return (
    <div className="container mx-auto mt-12">
            <button className="mb-12 font-bold" onClick={goBack}>Back</button>
        <div className="flex">
                <img className="w-1/6" src={product.image} alt="pazza"/>
            <div className="ml-16 mt-5">
                <h1 className="text-x1 font-bold">{product.name}</h1>
                <div className="text-md">{product.size}</div>
                <div className="font-bold mt-2">RS {product.price}</div>
                <button disabled={isAdding} onClick={(e) => { addToCart(e, product)}} className={` ${ isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-8  rounded-full font-bold`}>Add To Cart</button>
            </div>  
            
        </div>

    </div>
  )
}

export default SingleProduct;

