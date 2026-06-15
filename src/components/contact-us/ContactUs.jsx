import React from "react";
import styles from "@/components/contact-us/ContactUs.module.css";
import contactUsImage from "@/assets/images/contact-us.png";
import Image from "next/image";
import { BsChatDotsFill } from "react-icons/bs";
import chatUsGif from "@/assets/images/contact.png";
import { BsQuestionCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { LuAlarmClockCheck } from "react-icons/lu";




const ContactUs = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className={`${styles.contactUsContent}`}>
            <h2 className={`${styles.contactUsTitle}`}>Contact Us</h2>
            <h4 className={`${styles.contactUsSubtitle}`}>
              Support team ready to help
            </h4>
            <p className={`${styles.contactUsDescription}`}>
              We are a highly agile and nimble footed organization which
              believes in a collaborative approach to solve problems of the
              world. And that is why the culture of customer feedback and
              satisfaction ranks high on our agenda. We are happy to help you
              round the clock to the best of our ability.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <Image
            src={contactUsImage}
            alt="Contact Us"
            width={400}
            height={380}
            className={`${styles.contactUsImage}`}
          />
        </div>

        <div className={`${styles.contactUsSection}`}>
          <div className="row">
            <div className={`${styles.chatUsContent} col-lg-6`}>
              <div
                className={`${styles.chatUs} d-flex justify-content-between`}
              >
                <div className={`${styles.chatUsWrapper} d-flex gap-3`}>
                  <div className={`${styles.chatUsIcon}`}>
                    <BsChatDotsFill size={30} />
                  </div>
                  <div className={`${styles.chatUsContent} d-flex flex-column gap-2`}>
                    <h3 className={`${styles.chatUsTitle}`}>
                      Need Any Assistance?
                    </h3>
                    <p className={`${styles.chatUsDescription}`}>
                      Agriwow is here to help you
                    </p>
                    <button className={`${styles.chatUsButton}`} onClick={() => {
                      window.open("https://wa.me/919082681149?text=Hi%2C%20I%27m%20interested%20in%20chatting%20with%20Agriwow%20customer%20support", "_blank");
                    }}>
                      Chat Now
                    </button>
                  </div>
                </div>
                <div className={`${styles.chatUsGif}`}>
                  <Image
                    src={chatUsGif}
                    alt="Chat Us"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.faqsContent} col-lg-6`}>
              <div className={`${styles.faqs}`}>
                <div className={`${styles.chatUsWrapper} d-flex gap-3`}>
                  <div className={`${styles.chatUsIcon}`}>
                    <BsQuestionCircleFill size={30} />
                  </div>
                  <div className={`${styles.chatUsContent} d-flex flex-column gap-2`}>
                    <h3 className={`${styles.chatUsTitle}`}>FAQS</h3>
                    <p className={`${styles.chatUsDescription}`}>
                      You can manage your orders in Orders section
                    </p>
                    <button className={`${styles.chatUsButton}`}>
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.officeAddressSection}`}>
              <h2 className={`${styles.officeAddressTitle}`}>
                Contact Us
              </h2>
              <div className="row g-3">
                <div className="col-lg-4">
                  <div className={`${styles.officeCard}`}>
                    <span className={`${styles.officeBadge}`}><CiLocationOn size={25} /></span>
                    <h5 className={`${styles.officeCountry}`}>OUR STORE</h5>
                    <p className={`${styles.officeAddress}`}>
                    8, Mohan Nagar Indore 452001 Madhya Pradesh
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={`${styles.officeCard}`}>
                    <span className={`${styles.officeBadge}`}>
                    <IoCallOutline size={25} />

                    </span>
                    <h5 className={`${styles.officeCountry}`}>CONTACT INFO</h5>
                    <p className={`${styles.officeAddress}`}>
                    Telephone: +91 9229297668 
                    <br />
                    Email: info@agriwow.com
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={`${styles.officeCard}`}>
                    <span className={`${styles.officeBadge}`}><LuAlarmClockCheck size={25} /></span>
                    <h5 className={`${styles.officeCountry}`}>BUSNESS HOURS</h5>
                    <p className={`${styles.officeAddress}`}>
                    Monday - Saturday:
                    <br />
                    10:30 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className={`${styles.contactUsDetail} d-flex align-items-center flex-column py-3`}
              >
                <p>
                  To get in touch with our customer support, call us at +91
                  00000000000
                </p>
                <span>Call Timings:-11:00 AM to 4:00 PM (Mon to Sat)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
