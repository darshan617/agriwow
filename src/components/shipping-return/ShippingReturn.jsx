import React from "react";
import styles from "@/components/shipping-return/ShippingReturn.module.css";
import Link from "next/link";
const ShippingReturn = () => {
  return (
    <div className="container">
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/shipping-return">Shipping & Returns</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.shippingReturnHeading} text-center`}>
        <h1>Shipping & Returns</h1>
      </div>
      <div className={`${styles.shippingReturnContent} `}>
        <div className={`${styles.shippingReturnContentItem} `}>
          <p>
            1) To ensure that your order reaches you in our standard time (6 to
            12 working days) and in good condition, we will ship through
            standard courier agencies like Delhivery, FedEx, Xpressbees, Gati,
            Dotzot, Ecom Express and many more.{" "}
          </p>
          <p>
            Note: If we will ship through postal service then it may take more
            time.
          </p>
          <p>
            2) If you are a new user then, our executive will contact you and
            confirm your order (For perfect delivery our executive will confirm
            you your exact delivery address and pin code). If your Pincode is
            not serviceable or we are not able to send the material then, you
            have to give us another address and pin code.
          </p>
          <p>
            3) If you believe that the product is not in good condition, or if
            the packaging is tampered with or damaged before accepting delivery
            of the goods, please refuse to take delivery of the package, click
            some pictures of the package and write instruction to courier boy
            (The package is tampered or damaged in courier so, I will not accept
            the order) and send us a mail at info@agriwow.com mentioning your
            order reference number and attached pictures or call our Customer
            Care. We shall make our best efforts to ensure that a replacement
            delivery is made to you at the earliest.
          </p>
          <p>
            4) Delivery time mentioned on the product, cart page or website is
            estimated. Actual delivery time is based on the availability of a
            product, weather condition and address where the product is to be
            delivered and courier company's rules.
          </p>
          <ul>
            <li>
              Note: If your address is ODA location then, you have to self
              collect the parcel from the courier office. We will provide a
              courier office address and number. Also, our customer care
              executive will keep in touch with you.
            </li>
          </ul>
          <p>
            5) For any issues in utilizing our services you may contact our
            helpdesk on +91 8640035758
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturn;
