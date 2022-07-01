import {BasketItem} from "./BasketItem";

function BasketList(props) {
    const {order = [],handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        IncreaseFromBasket = Function.prototype,
        DecreaseFromBasket = Function.prototype

    } = props;
    const  totalPrice = order.reduce((sum,el) =>{return sum + el.price * el.quantity},0);
    return (
        <ul  className="collection basket-list">
            <li  className="collection-item active">Корзина
                <i className={'material-icons basket-close'} onClick={handleBasketShow}>close</i></li>
            {
                order.length ? order.map(item => (
                    <BasketItem key={item.id} {...item} removeFromBasket={removeFromBasket} IncreaseFromBasket={IncreaseFromBasket} DecreaseFromBasket={DecreaseFromBasket }/>
                )) : <li  className="collection-item"> Корзина пуста </li>
            }
            <li  className="collection-item аctive">Общая стоимость:{totalPrice} руб.

            </li>
            <li  className="collection-item аctive">
                <button className={'btn btn-small'}>Оформить</button>
            </li>

                    </ul>

                    );
    
}

export {BasketList}
