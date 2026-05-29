import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

import styles from '@/components/product-details/components/faqs/Faqs.module.css'

const faqData = [
  {
    id: 1,
    question: 'Q: Mini Hose Reel किस काम के लिए उपयोगी होता है?',
    answer: 'Mini Hose Reel का उपयोग car wash, lawn care aur household watering के लिए होता है।',
  },
  {
    id: 2,
    question: 'Q: Is hose reel ka sath hose ki length kitni hoti hai?',
    answer: '.',
  },
  {
    id: 3,
    question: 'Q: Kya isme spray nozzle milta hai?',
    answer: '.',
  },
  {
    id: 4,
    question: 'Q: Hose Reel ka kya benefit hai?',
    answer: '.',
  },
  {
    id: 5,
    question: 'Q: Kya hose connector included hota hai?',
    answer: '.',
  },
]

const Faqs = () => {
  const [openId, setOpenId] = useState(faqData[0].id)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <>
      <div className={`${styles.faqSection} container mt-4 mb-5`}>
        <div className={`${styles.faqContainer}`}>
          <h2 className={`${styles.faqTitle}`}>Frequently Asked Questions</h2>

          <div className={`${styles.faqList}`}>
            {faqData.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div className={`${styles.faqItem}`} key={faq.id}>
                  <button className={`${styles.faqQuestion}`} onClick={() => toggle(faq.id)}>
                    <span className={`${styles.faqQuestionText}`}>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${isOpen ? 'open' : 'closed'}`}>
                      {isOpen ? 'x' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className={`${styles.faqAnswer}`}>{faq.answer}</div>
                  )}
                </div>
              )
            })}
          </div>

          <div className={`${styles.faqFooter}`}>
            <p className={`${styles.faqFooterText}`}>
              If you need more information or additional features, please fill out the 'Ask a Question' form below.
            </p>
            <button className={`${styles.bannerBtn}`}>Ask a Question?</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faqs