import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Order from "./Order";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    // set up pagination
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 3;
    const pagesVisited = pageNumber * itemsPerPage;

    // set up date filtering
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // filter orders based on date range
    if (startDate && endDate) {
        userOrders = userOrders.filter(cart => {
            const date = new Date(cart.orderPlaced);
            return date >= startDate && date <= endDate;
        });
    }

    const pageCount = Math.ceil(userOrders.length / itemsPerPage);
    const displayOrders = userOrders
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((cart, i) => <Order cart={cart} key={i} />);

    // handle page change
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center mt-3 static container mx-auto">
                <p
                    className="mb-1 font-bold text-xl md:text-3xl"
                    v
                    id="orderHeader">
                    Your Orders ({userOrders.length})
                </p>
                {user && userOrders && (
                    <div className="mt-2 flex flex-col items-center">
                        <div className=" mb-3 z-10">
                            <DatePicker
                                onChange={update => {
                                    setDateRange(update);
                                }}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                selected={startDate}
                                showIcon={true}
                                startDate={startDate}
                                endDate={endDate}
                                isClearable={true}
                                selectsRange
                                placeholderText="Select order date range"
                                withPortal
                                todayButton={true}
                                className="bg-white rounded-md border-gray-300 border pr-6 pl-3 py-2 placeholder-gray-400 placeholder:text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            />
                        </div>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"flex justify-center mt-2"}
                            pageClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer"
                            }
                            previousClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer text-teal-700"
                            }
                            nextClassName={
                                "mx-1 py-2 px-2 rounded-lg cursor-pointer text-teal-700"
                            }
                            pageLinkClassName={"hover:bg-gray-200 px-2"}
                            previousLinkClassName={"hover:text-amber-600"}
                            nextLinkClassName={"hover:text-amber-600"}
                            activeLinkClassName={"text-amber-500 font-bold "}
                        />
                        <div className="grid grid-rows-1 gap-y-3 ">
                            {displayOrders}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrdersContainer;
