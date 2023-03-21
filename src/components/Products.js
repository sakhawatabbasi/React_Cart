             // using onlin api to get data 
import Productcard from './Productcard';
import {useState ,useEffect } from 'react';



             const Products = () => {

               

            const[products,setProduct] = useState([]);
            useEffect(()=>{
                fetch('https://star-spark-pasta.glitch.me/api/products')
                        .then(res=>res.json())
                        .then(products=>setProduct(products))
               
            }, []);
            
            
            return (
                <div className="container mx-auto pb-24">
                    <h1 className=" text-lg font-bold my-8">Products</h1>
                    <div className="grid grid-cols-5 my-8 gap-24">
                        {
                            products.map(product =><Productcard key={product.id} product={product}/>)
                        }
            
                        
                    </div> 
                </div>
              )
            }
            
            export default Products;
            
 