import React from "react";
import styles from "@/components/cancellation-return/CancellationReturn.module.css";
import Link from "next/link";

const CancellationReturn = () => {
  return (
    <div className="container">
      {/* <div className={`${styles.cancellationReturnHeading} `}>
        <h1>Cancellation / Return Policy</h1>
      </div> */}
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/cancellation-return-policy">
                Cancellation & Return Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.cancellationReturnContainer} `}>
        <div className={`${styles.cancellationReturnHeading} text-center`}>
          <h1>Cancellation / Return Policy</h1>
        </div>
        <div className={`${styles.cancellationReturnContent} `}>
          <div className={`${styles.cancellationReturnContentItem} `}>
            <p>
              <b>Cancellation Policy:</b>
              <ul>
                <li>
                  If a customer changes their mind and wants to cancel the
                  order, then they have to contact our Customer Care executive.
                  The cancellation will not be valid until it is confirmed by
                  our respective department.
                </li>
                <li>
                  Cancellation requests will be considered only if the product
                  is not dispatched. Once the order is shipped, customer cannot
                  cancel the order.
                </li>
                <li>
                  If the customer has placed an order through Online Payment and
                  cancels the order, then we will process for a refund within 7
                  working days.
                </li>
              </ul>
            </p>
            <p>
              <b>Refund Policy:</b>
              <ul>
                <li>
                  A refund will be considered only if the request is made within
                  7 days of placing an order. (If the product is damaged,
                  Duplicate or quantity varies).
                </li>
                <li>The return will be processed only if:</li>
              </ul>
              <ol>
                <li>
                  {" "}
                  It is determined that the product was not damaged while in
                  your possession{" "}
                </li>
                <li>
                  The product is not different from what was shipped to you
                </li>
                <li>The product is returned in original condition</li>
              </ol>
              <ul>
                <li>
                  In case of receipt of damaged or defective items please report
                  the same to our Customer Service team. The request will,
                  however, be entertained once the merchant has checked and
                  determined the same at his own end. This should be reported
                  within 7 days of receipt of the products.
                </li>
                <li>
                  In case you feel that the product received is not as shown on
                  the site or as per your expectations, you must bring it to the
                  notice of our customer service within 24 hours of receiving
                  the product. The Customer Service Team after looking into your
                  complaint will take an appropriate decision.
                </li>
                <li>
                  <b>NOTE:</b> If you have done online payment and you are
                  canceling the order without any proper reason, the payment
                  gateway charge 3% plus GST will be deducted from your refund
                  amount.
                </li>
              </ul>
            </p>
            <p>
              To request a refund, simply mail us on info@agriwow.com with your
              purchase details within seven (7) days of your purchase. Please
              include your order number (sent to you via email/message after
              ordering) and optionally tell us why you’re requesting a refund –
              we take customer feedback very seriously and use it to constantly
              improve our products and quality of service. Refunds are being
              processed after customer support team validate and analyze issue,
              but it will only show in your bank account only when the product
              comes back to hub. Once the refund is processed we will intimate
              you through EMAIL and SMS with the refund transaction details.
            </p>
            <p>
              To complete your return, we require a receipt or proof of
              purchase.
            </p>
            <p>Please do not send your purchase back to the manufacturer.</p>
            <p>
              <b>
                The refund is only possible if the product is unused, undamaged,
                and is with the original packaging and with the receipt and the
                invoice. Only when the product will reach premises we will
                refund you your amount as decided.
              </b>
            </p>
            <p>
              <b>
                NOTE : For a refund, the name of the customer must be the same
                as registered Agriwow account name and bank account name,
                Customer must send a Cheque photo or passbook photo for a refund
                with Adhaar Card or PAN card.
              </b>
            </p>
            <p>
              For query mail us at <b>info@agriwow.com</b>
            </p>
            <p>
              Kindly note that refund will be made only after proper
              investigation of the whole scenario by our special team.
            </p>
            <p>
              <b>Snap Exports Pvt. Ltd.</b> reserve the rights to change or
              update the terms and conditions at any time with or without any
              prior notice. To make sure you are always updated of the terms and
              conditions, please review this website periodically.
            </p>
            <p>
              Disputes shall be subject to exclusive jurisdiction of the courts
              of Indore M.P.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationReturn;
