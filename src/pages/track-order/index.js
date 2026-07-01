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
      {orderId ? (
        <SeoHead
          title={`Track Order #${orderId}`}
          description={`Track delivery status and updates for AgriWow order #${orderId}.`}
        />
      ) : null}
      <TrackOrder orderId={orderId} />
      <OrderInformation />
    </Layout>
  );
};

export default TrackOrderPage;