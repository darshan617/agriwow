import Layout from "@/components/layout/Layout";
import CustomerInfo from "@/components/wish-list/customer-info/CustomerInfo";
import WishlistDetail from "@/components/wish-list/wishlist-detail/WishlistDetail";

const WishListPage = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <CustomerInfo />
          <div className="col-xl-9 col-md-12">
            <WishlistDetail />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishListPage;
