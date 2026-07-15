import React from "react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";
import TrackOrder from "@/components/track-order/TrackOrder";
import { useRouter } from "next/router";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
const TrackOrderPage = () => {
  const router = useRouter();
  const orderId = router?.query?.orderId;

  return (
    <Layout>
      <SeoHead
        title={orderId ? `Track Order #${orderId}` : "Track Order"}
        description={
          orderId
            ? `Track delivery status and updates for AgriWow order #${orderId}.`
            : "Track your AgriWow order status and delivery updates in real time."
        }
      />
      <TrackOrder orderId={orderId} />
      <OrderInformation />
    </Layout>
  );
};

export default TrackOrderPage;
