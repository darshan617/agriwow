import Layout from "@/components/layout/Layout";
import OrderDetailsComponent from "@/components/my-order/OrderDetailsComponent";
import { useRouter } from "next/router";
import React from "react";

const OrderDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  return (
    <Layout>
      <OrderDetailsComponent orderId={slug} />
    </Layout>
  );
};

export default OrderDetails;
