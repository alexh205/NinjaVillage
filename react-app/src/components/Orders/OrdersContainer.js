import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Order from "./Order";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiRunningNinja } from "react-icons/gi";

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

    // set up date filtering
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [pageNumber, setPageNumber] = useState(0);

    // reset page number when date range changes
    useEffect(() => {
        setPageNumber(0);
    }, [dateRange]);

    // filter orders based on date range
    let filteredOrders;
    if (userOrders) {
        filteredOrders = userOrders;
    }

    if (startDate && endDate) {
        filteredOrders = filteredOrders.filter(cart => {
            const date = new Date(cart.orderPlaced);
            return date >= startDate && date <= endDate;
        });
    }

    // set up pagination
    const itemsPerPage = 4;
    const pagesVisited = pageNumber * itemsPerPage;
    let pageCount;

    // display orders for current page
    let displayOrders;

    if (filteredOrders) {
        pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
        filteredOrders.sort((a, b) => b.createdDate - a.createdDate).reverse();
        displayOrders = filteredOrders
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .map((cart, i) => <Order cart={cart} key={i} />);
    }

    // handle page change
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center mt-3 static container mx-auto">
                {userOrders && (
                    <section id="orders">
                        <p
                            className="mb-1 font-bold text-xl md:text-3xl"
                            id="orderHeader">
                            Your Orders ({userOrders.length})
                        </p>
                    </section>
                )}
                {user && userOrders?.length ? (
                    <div className="mt-2 flex flex-col items-center">
                        <div className=" mb-3 z-10">
                            <DatePicker
                                onChange={update => {
                                    setDateRange(update);
                                }}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                // selected={startDate}
                                showIcon={true}
                                startDate={startDate}
                                endDate={endDate}
                                isClearable={true}
                                selectsRange
                                placeholderText="Filter by purchase date"
                                withPortal
                                todayButton={true}
                                className="bg-white rounded-md border-gray-300 border pr-6 pl-3 placeholder:text-[14px] py-2 placeholder-gray-400 placeholder:text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"flex justify-center mt-2"}
                            pageClassName={`${
                                pageCount === 1
                                    ? "hidden"
                                    : "mx-1 py-2 px-2 rounded-lg cursor-pointer"
                            }`}
                            previousClassName={`${
                                pageCount === 1
                                    ? "hidden"
                                    : " mx-1 py-2 px-2 rounded-lg cursor-pointer text-blue-500"
                            }`}
                            nextClassName={`${
                                pageCount === 1
                                    ? "hidden"
                                    : " mx-1 py-2 px-2 rounded-lg cursor-pointer text-blue-500"
                            }`}
                            pageLinkClassName={"hover:bg-gray-200 px-2"}
                            previousLinkClassName={"hover:text-amber-600"}
                            nextLinkClassName={"hover:text-amber-600"}
                            activeLinkClassName={"text-amber-500 font-bold "}
                        />
                        <div className="grid grid-rows-1 gap-y-3 ">
                            {displayOrders}
                        </div>
                    </div>
                ) : (
                    <div className="text-[20px] mt-3 text-ninja_green hover:font-semibold">
                        Currently you do not have any past orders
                    </div>
                )}
                {userOrders?.length > 1 && (
                    <footer>
                        <a
                            href="#orders"
                            className="flex flex-row items-center justify-center cursor-pointer my-4">
                            <GiRunningNinja className="h-[30px] w-[30px] mr-2 " />
                            <div className="text-blue-500 hover:text-amber-600 hover:shadow-lg transition duration-300 text-center text-lg md:text-xl font-bold ">
                                Scroll to the top
                            </div>
                            <GiRunningNinja className="h-[30px] w-[30px] mr-2  ml-2 transform scale-x-[-1]" />
                        </a>
                    </footer>
                )}
            </div>
        </>
    );
};

export default OrdersContainer;
