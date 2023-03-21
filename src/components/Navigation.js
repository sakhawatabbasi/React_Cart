import { Link } from "react-router-dom";
import {useContext} from 'react';
import {CartContext} from '../CartContext';
import Cart from '../assets/cart.png';
import Logo from '../assets/Logo1.jpg'

const Navigation = () => {

    const cartStyle={
        background:'#F59E0D',
        display:'flex',
        padding:'6px 12px',
        borderRadius:'40px',
    }
    const cartimgstyle={
        height:'20px',
        
    }

const{cart} = useContext(CartContext);


  return (

    <>
     <nav className="container mx-auto flex items-center justify-between py-5">
        
            <Link to='/'>
                <img style={{height:60}} src={Logo} alt="Logo"/>
            </Link>

            <ul className="flex items-center">
                <li><Link to='/'>Home</Link></li>
                <li className="ml-6"><Link to='/productpage'>ProductPage</Link></li>
                
                <li className="ml-6">
                    <Link to='./Cart'>
                    <div style={cartStyle}>
                        <span>{cart.totalItems ? cart.totalItems: 0 }</span>
                        <img className="ml-1" style={cartimgstyle} src={Cart} alt="cart-icon"/>

                    </div>
                    </Link>
                </li>
            </ul>
     </nav>


    </>

  )

}


export default Navigation;
