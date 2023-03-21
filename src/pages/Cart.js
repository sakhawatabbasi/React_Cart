import {useContext, useEffect, useState} from 'react';
import{CartContext} from '../CartContext';
import empty from '../assets/empty-cart.svg';

const Cart = () => {
  let total = 0;
const[products,setProducts]=useState([]);
  const{cart,setCart}= useContext(CartContext)
  // console.log(cart);
  const [showForm, setShowForm] = useState(false);

  const[priceFatch,togglePriceFatch] = useState(false);


  useEffect(()=>{

    if(!cart.items){
      return;
    }

    if(priceFatch){
      return;
    }

  fetch('https://star-spark-pasta.glitch.me/api/products/cart-items',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({ids:Object.keys(cart.items)})
  }).then(res=>res.json())
  .then(Products=>{
     setProducts(Products);
     togglePriceFatch(true);
  })
  },[cart,priceFatch]);

const getQty=(productId)=>{                         // quantity function in cart
  return cart.items[productId];
}

const incrment=(productId)=>{                       // imcerment function in cart
const oldQty=cart.items[productId];
const _card ={...cart};
_card.items[productId]=oldQty + 1;
_card.totalItems += 1;
setCart(_card);
}

const decrement=(productId)=>{                       //Decrement function in cart
const oldQty=cart.items[productId];
  if(oldQty === 1){
    return;
  }
const _card ={...cart};
_card.items[productId]=oldQty - 1;
_card.totalItems -= 1;
setCart(_card);
}

const getSum =(productId,price)=>{                // function fot tatal grand in cart
  const sum=price*getQty(productId);
  total += sum;
  return sum;
}

const handleDelete = (productId)=>{           //function for delete in cart
  const _card = {...cart};
  const qty =_card.items[productId];
  delete _card.items[productId];
  _card.totalItems -= qty;
  setCart(_card);
  const updatedProductList = products.filter((product)=>product._id !== productId);
  setProducts(updatedProductList); 
} 


function toggleForm() {                        // form toggle in cart 
  setShowForm(!showForm);
}

function handleOrderSubmit(event) {
  event.preventDefault();
  window.alert('Order placed successfully!');
  setProducts([]);
  setCart({});
}

return (

  !products.length      // ternery oprater for if cart is empty than empty image is show if value in a cart then nextcontent show 
  ? <img className='mx-auto w-2/5 mt-12' src={empty}alt=''/>
  :
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="pb-10 font-bold">Cart itmes</h1>
      <ul>

        {
          products.map(product=>{
            return(
              <li className="mt-5" key={product._id}>
              <div className="flex items-center justify-between">
    
                <div className="flex items-center">
                  <img  className="h-16" src={product.image} alt=''/>
                  <span className="font-bold ml-4 w-48" >{product.name}</span>
                </div>           
                <div>
                  <button onClick={()=>{decrement(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                  <b className="px-4">{getQty(product._id)}</b>
                  <button onClick={() => {incrment(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                </div>
    
                <spam>Rs {getSum(product._id,product.price)}</spam>
                <button onClick={()=>{handleDelete(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
              </div>
            </li>
            )
          })
        }
      </ul>
      <hr className="my-6" />
      <div className="text-right mt-2"><b>Items price : RS {total}</b></div>
      <div className="text-right mt-5">
        <button onClick={toggleForm} className="text-white font-bold bg-yellow-500 px-4 py-2 rounded-full leading-none">Chackout</button>
        {showForm && (
        <form >
          {/* Form fields go here */}
           
              <div class="max-w-md mx-auto">
            <form class="bg-success p-6 rounded-lg shadow-md text-left">
              <div class="mb-4">
                <label for="address" class="block text-gray-700 font-bold mb-2">Address:</label>
                <input type="text" id="address" name="address" class="w-full border border-gray-400 p-2 rounded-md" required/>
              </div>

              <div class="mb-6">
                <label for="email" class="block text-gray-700 font-bold mb-2">Gmail:</label>
                <input type="email" id="email" name="email" class="w-full border border-gray-400 p-2 rounded-md" required/>
              </div>

              <div class="mb-6">
                <label for="items" class="block text-gray-700 font-bold mb-2">Items price: {total} </label>
              </div>

              <div class="mb-6">
                <label for="delivery_fee" class="block text-gray-700 font-bold mb-2">Total Delivery Fee: 150</label>
              </div>

              <div class="mb-6">
                <label for="total_payment" class="block text-gray-700 font-bold mb-2">Total Payment: {total + 150}</label>
              </div>

              <div class="flex justify-center mt-10">
                <button onClick={handleOrderSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ">Place Order</button>
              </div>
            </form>
          </div>

        </form>
      
      )}
      
      </div>
    </div>
  )
}
export default Cart;
