import React from "react";
import styles from "@/components/contact-us/ContactUs.module.css";
import contactUsImage from "@/assets/images/contact-us.png";
import Image from "next/image";
import { BsChatDotsFill } from "react-icons/bs";
import { BsQuestionCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { LuAlarmClockCheck } from "react-icons/lu";
import Link from "next/link";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";

const ContactUs = ({ contactDetailsData }) => {
  const { isLoggedIn, openLoginPopup } = useLoginPopup();
  if (contactDetailsData?.error) {
    return <div>{contactDetailsData?.message}</div>;
  }

  const contactDetails = contactDetailsData?.data;

  return (
    <>
      <div className="container">
        <div className={`${styles.breadcrumb} `}>
          <div style={{ margin: "16px 0" }}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className={`row align-items-center ${styles.heroRow}`}>
            <div className="col-lg-7">
              <div className={styles.contactUsContent}>
                {/* <h2 className={styles.contactUsTitle}>Contact Us</h2> */}
                {/* <h4 className={styles.contactUsSubtitle}>
              Support team ready to help
            </h4>
            <p className={styles.contactUsDescription}>
              We are a highly agile and nimble footed organization which
              believes in a collaborative approach to solve problems of the
              world. And that is why the culture of customer feedback and
              satisfaction ranks high on our agenda. We are happy to help you
              round the clock to the best of our ability.
            </p> */}

                <div className={styles.contactUsDescription}>
                  <div
                    dangerouslySetInnerHTML={{ __html: contactDetails?.title }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className={styles.imageWrapper}>
                <Image
                  src={contactUsImage}
                  alt="Contact Us"
                  width={480}
                  height={380}
                  className={styles.contactUsImage}
                  priority
                />
              </div>
            </div>
          </div>

          {contactDetails && (
            <>
              <div className={`row g-4 ${styles.actionCardsRow}`}>
                <div className="col-lg-6">
                  <div className={styles.actionCard}>
                    <div className={styles.actionCardInner}>
                      <div className={styles.actionIcon}>
                        <BsChatDotsFill size={28} />
                      </div>
                      <div className={styles.actionText}>
                        <h3 className={styles.actionTitle}>
                          Need Any Assistance?
                        </h3>
                        <p className={styles.actionDescription}>
                          Agriwow is here to help you
                        </p>
                        <Link
                          href="https://wa.me/919229297668?text=Hello, I am interested in your products"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionButton}
                        >
                          Chat Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={styles.actionCard}>
                    <div className={styles.actionCardInner}>
                      <div className={styles.actionIcon}>
                        <BsQuestionCircleFill size={28} />
                      </div>
                      <div className={styles.actionText}>
                        <h3 className={styles.actionTitle}>Track Your Order</h3>
                        <p className={styles.actionDescription}>
                          Track your order from order placement to delivery
                        </p>
                        {isLoggedIn ? (
                          <Link
                            href="/my-order"
                            className={styles.actionButton}
                          >
                            Track Now
                          </Link>
                        ) : (
                          <button
                            className={styles.actionButton}
                            onClick={openLoginPopup}
                          >
                            Track Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.officeAddressSection}>
                <h2 className={styles.officeAddressTitle}>Contact Us</h2>
                <div className="row g-3">
                  <div className="col-lg-4">
                    <div className={styles.officeCard}>
                      <span className={styles.officeBadge}>
                        <CiLocationOn size={35} />
                      </span>
                      <h5 className={styles.officeCountry}>OUR STORE</h5>
                      <p
                        className={styles.officeAddress}
                        dangerouslySetInnerHTML={{
                          __html: contactDetails?.address,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className={styles.officeCard}>
                      <span className={styles.officeBadge}>
                        <IoCallOutline size={35} />
                      </span>
                      <h5 className={styles.officeCountry}>CONTACT INFO</h5>
                      <Link
                        href={`tel:${contactDetails?.phone}`}
                        className={styles.officeAddress}
                      >
                        Telephone: {contactDetails?.phone}
                      </Link>
                      <Link
                        href={`mailto:${contactDetails?.email}`}
                        className={styles.officeAddress}
                      >
                        Email: {contactDetails?.email}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className={styles.officeCard}>
                      <span className={styles.officeBadge}>
                        <LuAlarmClockCheck size={35} />
                      </span>
                      <h5 className={styles.officeCountry}>BUSINESS HOURS</h5>
                      <p className={styles.officeAddress}>
                        {contactDetails?.business_days}:
                        <br />
                        {contactDetails?.business_hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contactUsDetail}>
                <p>{contactDetails?.support_message}</p>
                <span>Call Timings:- {contactDetails?.support_timings}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
