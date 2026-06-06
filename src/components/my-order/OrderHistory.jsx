import React from "react";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import WishlistDetail from "../wish-list/wishlist-detail/WishlistDetail";

const OrderHistory = () => {
  return (
    <div className="container">
        <div className="row">
          <CustomerInfo />
          <div className="col-xl-9 col-md-12">
            <WishlistDetail 
              title="Order History"
              emptyTitle="Your Order History is empty!"
              emptyText="You haven't placed any orders yet. Start shopping and make your first purchase!"
              shopBtnText="START SHOPPING"
              shopBtnHref="/"
              showEmpty={true}
            />
          </div>
        </div>
      </div>
  );
};

export default OrderHistory;
