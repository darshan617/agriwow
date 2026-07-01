import Layout from "@/components/layout/Layout";
import OrderDetailsComponent from "@/components/my-order/OrderDetailsComponent";
import SeoHead from "@/components/seo/SeoHead";
import { useRouter } from "next/router";
import React from "react";

const OrderDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;

  return (
    <Layout>
      {slug ? (
        <SeoHead
          title={`Order #${slug}`}
          description={`View details and status for AgriWow order #${slug}.`}
          noindex
        />
      ) : null}
      <OrderDetailsComponent orderId={slug} />
    </Layout>
  );
};

export default OrderDetails;
