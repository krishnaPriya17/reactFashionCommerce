import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import  './_filled-cart.scss'
import { each } from 'jquery';
import { useDispatch } from 'react-redux';
import { deleteCartItem, updateCartItemQuantity } from '../../../Redux/Cart/cartSlice';
const FilledCart = () => {

    const cart= useSelector(state=>state.cartReducer);
const dispatch = useDispatch();
    const quantityHandler =(sign,item,key)=>{

        const payload={
            operator: sign,
            item:item,
            key:key
        }

         
         dispatch(updateCartItemQuantity(payload));

    }
    let filteredCartItems = [];
    cart?.cartItems?.map((x)=>{
        let index = filteredCartItems?.findIndex(z=>z.id === x.id);
        if(index == -1){
            filteredCartItems?.push(x)
        }
        else{
            filteredCartItems[index] = {...x,quantity:filteredCartItems[index]?.quantity+1}
        }
    });
    console.log("filteredCartItems=>",filteredCartItems,cart?.cartItems)
  return (
    <div>
        <div className="row container cart-main-div">
          <div className='col-8 p-4'> 

             {filteredCartItems.map((eachItem,key)=>{

                 return(
 
                    <div>

                       <div className='row my-3 cart-item-container' >
      
                              <div className='col-6  cart-product-image-container'>

                                <img src={require('../../../assets/images/shop/'+eachItem.product_img)} />

                                </div>

                                <div className=' col-6'>

                                    <div className='cart-product-info'>

                                        <span className='cart-product-name'>{eachItem.product_name}</span>
                                        <div className='cart-product-price'>
                                            <span>${eachItem.price}</span>
                                            </div>
                                            <div className='cart-product-rating'>
                                             <FontAwesomeIcon icon="fa fa-star" />
                                             <FontAwesomeIcon icon="fa fa-star" />
                                             <FontAwesomeIcon icon="fa fa-star" />
                                             
                                            </div>  
                                            <hr /> 
                                            <div className='cart-product-quantity'>
                                                      <div className='btn-group' >

                                                        <div className='btn' onClick={()=>{quantityHandler('-',eachItem,key)}}>
  
                                                        <FontAwesomeIcon icon="fa fa-minus" />
                                                    </div>
                                                    <div className='btn'>

                                                     {eachItem.quantity}
                                                     </div>
                                                     <div className='btn' onClick={()=>{quantityHandler('+',eachItem,key)}}>
                                                     <FontAwesomeIcon icon="fa fa-plus" />
                                                    </div>
                                                    <div className='btn' onClick={()=>{dispatch(deleteCartItem({...eachItem,key:key}))}}>
                                                     <FontAwesomeIcon icon="fa fa-trash" />
                                                     <span> Delete Item</span>
                                                    </div>


                                                    </div>
                                            </div>

                                                
                                            
                                                


                                    </div>


                                    </div>

                        </div>



                    </div>

                 )

             })}
          </div>

          <div className='col-4 px-4 py-3 my-4 cart-summary'>

             <h1> The Cart Summary </h1>
         
             <div>

                <span> Cart Total: ${cart.totalItemsPrice}</span>
                <span> Shipping: ${cart.shippingPrice}</span>
                <hr/>
                <span className='summary-total'>Total:${cart.totalItemsPrice} </span>
                <hr />
             </div>
             <div className='btn btn-outline-dark w-100 mb-4 mt-1'>
                Checkout
             </div>
            </div>


        </div>




    </div>
  )
}

export default FilledCart;