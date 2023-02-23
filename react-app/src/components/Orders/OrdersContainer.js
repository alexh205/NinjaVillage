import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Order from "./Order";

const OrdersContainer = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    let userOrders;
    if (user) {
        userOrders = user.ownedCarts.filter(cart => cart.checkedOut === true);
    }

    if (!user) {
        history.push("/");
    }

    return (
        <>
            <Header />
            {user && userOrders && (
                <div className="flex flex-col items-center mt-5 static container mx-auto">
                    <p className="mb-2 font-bold text-xl md:text-3xl">
                        Your Orders ({userOrders.length})
                    </p>
                    <div className="absolute mt-10 mx-14">
                        <div className="grid grid-rows-1 gap-y-4 ">
                            {userOrders.map((cart, i) => (
                                <Order cart={cart} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrdersContainer;
