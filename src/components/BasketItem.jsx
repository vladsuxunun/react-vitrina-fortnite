import {useContext,useHisto} from "react";


function BasketItem(props) {
 const {id,name,price,quantity,removeFromBasket = Function.prototype,IncreaseFromBasket = Function.prototype,DecreaseFromBasket = Function.prototype,



 } = props;

 return (
     <li  className="collection-item">
         {name} x{quantity} = {price * quantity }
         <span className="secondary-content">
             <li class={'material-icons'} onClick={() =>removeFromBasket(id)}>close</li>
             <button   className={'material-icons'} onClick={() => IncreaseFromBasket(id)}>+</button>
             <button   className={'material-icons'} onClick={() => DecreaseFromBasket(id)}>-</button>



         </span>



     </li>


 );
}
export {BasketItem}
