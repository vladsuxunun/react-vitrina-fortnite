import {useState,useEffect} from 'react'
import  {API_URL,API_KEY} from "../config";
import {Preloader} from "./Preloader";
import {GoodsList} from "./GoodsList";
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";


function Shop() {
    const [goods,setGoods] = useState([]);
    const [loading,setLoading] = useState(true);
    const [order,setOrder] = useState([]);
    const [isBasketShow,setBasketSow] = useState(false);
    const [alertName,setAlertName] = useState('');
    const handleBasketShow = () =>{
        setBasketSow(!isBasketShow);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    const  removeFromBasket = (itemId) => {
        const  newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);

    }
    const  IncreaseFromBasket = (item) => {
        const  itemIndex = order.findIndex(orderItem => orderItem.id === item)
        if (order[itemIndex].quantity <= 1){
            removeFromBasket(item);



        } else {
            const  newOrder = order.map((orderItem,index) =>{
                if (index === itemIndex){
                    return{
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }

            });
            setOrder(newOrder);
        }


    }
    const  DecreaseFromBasket = (item) => {
        const  itemIndex = order.findIndex(orderItem => orderItem.id === item)
        if (order[itemIndex].quantity <= 1){
            removeFromBasket(item);



        } else {
            const  newOrder = order.map((orderItem,index) =>{
                if (index === itemIndex){
                    return{
                        ...orderItem,
                        quantity: orderItem.quantity - 1,
                    };
                } else {
                    return orderItem;
                }

            });
            setOrder(newOrder);
        }


    }
    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if (itemIndex < 0){
            const newItem = {
                ...item,
                quantity:1,

            }
            setOrder([...order,newItem])

        } else {
            const  newOrder = order.map((orderItem,index) =>{
                if (index === itemIndex){
                    return{
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }

            });
            setOrder(newOrder);

        }
        setAlertName(item.name);

    };


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: '96bace2f-06a138f5-1e2cfdee-18c7c19d',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);

    return(
        <main className={'container content'}>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
         {loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket} />}
            {isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} IncreaseFromBasket={IncreaseFromBasket} DecreaseFromBasket={DecreaseFromBasket} />}
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    );
}
export {Shop};