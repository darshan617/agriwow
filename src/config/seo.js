export const SITE_NAME = "Agriwow";

export const DEFAULT_SEO = {
  title: "Agriwow",
  description:
    "Get top-quality agricultural machinery at unbeatable prices. Shop smart, farm better with Agriwow.",
  keywords:
    "agriwow, agriwow.in ,agricultural equipment, farm tools, gardening solutions, fogging machines, agriculture sprayers, garden tools, garden and lawn care, industrial products, post harvest, garden tools, garden lawn care",
};
const KEYWORDS =
  "agriwow, agriwow.in ,agricultural equipment, farm tools, gardening solutions, fogging machines, agriculture sprayers, garden tools, garden and lawn care, industrial products, post harvest, garden tools, garden lawn care";
export const ROUTE_SEO = {
  "/": {
    title: "Home",
    description:
      "Every farmer and gardener understands one simple truth: a successful harvest begins with proper seed planting. However, planting seeds by hand can be time-consuming, physically exhausting, and often results in uneven distribution.",
    publishedTime: "2023-02-17T05:59:48+00:00",
    modifiedTime: "2026-07-08T10:04:23+00:00",
    updatedTime: "2026-07-08T10:04:23+00:00",
    author: "admin",
    readTime: "7 minutes",
    twitterLabel1: "Written by",
    twitterData1: "admin",
    twitterLabel2: "Time to read",
    twitterData2: "7 minutes",
    keywords: KEYWORDS,
  },
  "/about-us": {
    title: "About Us",
    description:
      "Learn about AgriWow — your trusted partner for agricultural equipment, farm tools, and gardening solutions across India.",
    keywords: `about us, ${KEYWORDS}`,
  },
  "/blog": {
    title: "Blog",
    description:
      "Every farmer and gardener understands one simple truth: a successful harvest begins with proper seed planting. However, planting seeds by hand can be time-consuming, physically exhausting, and often results in uneven distribution.",
    keywords: `blog, ${KEYWORDS}x`,
  },
  "/buying-guide": {
    title: "Buying Guide",
    description:
      "Expert buying guides to help you choose the right agricultural equipment and farm tools at AgriWow.",
    keywords: `buying guide, ${KEYWORDS}`,
  },
  "/contact-us": {
    title: "Contact Us",
    description: "8, Mohan Nagar Indore 452001 Madhya Pradesh",
    type: "article",
    publishedTime: "2023-02-17T11:17:08+00:00",
    modifiedTime: "2025-02-07T10:47:00+00:00",
    updatedTime: "2025-02-07T10:47:00+00:00",
    twitterLabel1: "Time to read",
    twitterData1: "Less than a minute",
    keywords: `contact us, ${KEYWORDS}`,
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "This privacy policy sets out how Snap Exports Pvt Ltd uses and protects any information that you give Snap Exports Pvt Ltd when you use this website.",
    type: "article",
    publishedTime: "2023-02-14T05:51:37+00:00",
    modifiedTime: "2024-06-27T10:23:10+00:00",
    updatedTime: "2024-06-27T10:23:10+00:00",
    twitterLabel1: "Time to read",
    twitterData1: "4 minutes",
    keywords: `privacy policy, ${KEYWORDS}`,
  },
  "/terms-of-use": {
    title: "Terms of Use",
    description:
      "The term “Snap Exports Pvt. Ltd.” or ‘us’ or ‘we’ refers to the owner company of the website whose registered office is Snap Exports Pvt. Ltd. 3/2,",
    type: "article",
    publishedTime: "2024-06-12T10:20:37+00:00",
    modifiedTime: "2024-06-12T10:23:17+00:00",
    updatedTime: "2024-06-12T10:23:17+00:00",
    twitterLabel1: "Time to read",
    twitterData1: "2 minutes",
    keywords: `terms of use, ${KEYWORDS}`,
  },
  "/shipping-return": {
    title: "Shipping & Delivery Policy",
    description:
      "1) To ensure that your order reaches you in our standard time (6 to 12 working days) and in good condition, we will ship through standard courier agencies",
    type: "article",
    publishedTime: "2024-06-12T07:23:02+00:00",
    modifiedTime: "2024-06-27T10:24:48+00:00",
    updatedTime: "2024-06-27T10:24:48+00:00",
    twitterLabel1: "Time to read",
    twitterData1: "1 minute",
    keywords: `shipping & delivery policy, ${KEYWORDS}`,
  },
  "/cancellation-return-policy": {
    title: "Cancellation / Return Policy",
    description: "Cancellation Policy:",
    type: "article",
    publishedTime: "2024-06-12T09:38:50+00:00",
    modifiedTime: "2024-06-27T10:28:09+00:00",
    updatedTime: "2024-06-27T10:28:09+00:00",
    twitterLabel1: "Time to read",
    twitterData1: "2 minutes",
    keywords: `cancellation & return policy, ${KEYWORDS}`,
  },
  "/cart": {
    title: "Cart",
    description: "Review items in your AgriWow cart before checkout.",
    noindex: true,
    keywords: `cart, ${KEYWORDS}`,
  },
  "/checkout": {
    title: "Checkout",
    description: "Complete your AgriWow order securely.",
    noindex: true,
    keywords: `checkout, ${KEYWORDS}`,
  },
  "/payments": {
    title: "Payment",
    description: "Select a payment method to complete your AgriWow order.",
    noindex: true,
    keywords: `payments, ${KEYWORDS}`,
  },
  "/wishlist": {
    title: "Wishlist",
    description: "View and manage your saved agricultural products on AgriWow.",
    noindex: true,
    keywords: `wishlist, ${KEYWORDS}`,
  },
  "/my-profile": {
    title: "My Profile",
    description: "Manage your AgriWow account profile and delivery addresses.",
    noindex: true,
    keywords: `my profile, ${KEYWORDS}`,
  },
  "/my-order": {
    title: "My Orders",
    description: "View your AgriWow order history and track deliveries.",
    noindex: true,
    keywords: `my orders, ${KEYWORDS}`,
  },
  "/track-order": {
    title: "Track Order",
    description:
      "Track your AgriWow order status and delivery updates in real time.",
    keywords: `track order, order tracking, order status, agriwow order tracking, ${KEYWORDS}`,
  },
  "/404": {
    title: "Page Not Found",
    description: "The page you are looking for could not be found on AgriWow.",
    noindex: true,
    keywords: `page not found, ${KEYWORDS}`,
  },
};

export const DYNAMIC_ROUTE_SEO = {
  "/product-details/[slug]": {
    type: "product",
    keywords: `product details, ${KEYWORDS}`,
  },
  "/product-category/[categorySlug]": {
    title: "Products",
    description:
      "Browse agricultural equipment and farm tools by category at AgriWow.",
    keywords: `products, ${KEYWORDS}`,
  },
  "/product-category/[categorySlug]/[subCategory]": {
    title: "Products",
    description:
      "Browse agricultural equipment and farm tools by subcategory at AgriWow.",
    keywords: `products, ${KEYWORDS}`,
  },
  "/blog/[slug]": {
    title: "Blog",
    description:
      "Read farming insights and product guides on the AgriWow blog.",
    type: "article",
    keywords: `blog, ${KEYWORDS}`,
  },
  "/buying-guide/[slug]": {
    title: "Buying Guide",
    description:
      "Expert buying guide to help you choose the right agricultural equipment at AgriWow.",
    keywords: `buying guide, ${KEYWORDS}`,
  },
  "/my-order/[slug]": {
    title: "Order Details",
    description: "View details for your AgriWow order.",
    noindex: true,
    keywords: `order details, ${KEYWORDS}`,
  },
};

export function getStaticSeoForPath(pathname) {
  return (
    ROUTE_SEO[pathname] ||
    DYNAMIC_ROUTE_SEO[pathname] || {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      keywords: KEYWORDS,
    }
  );
}
