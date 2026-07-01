export const SITE_NAME = "AgriWow";

export const DEFAULT_SEO = {
  title: "AgriWow",
  description:
    "Shop quality agricultural equipment, sprayers, farm tools, and gardening products at the best prices. Shop smart, farm better with AgriWow.",
};

export const ROUTE_SEO = {
  "/": {
    title: "Home",
    description:
      "Discover top-rated agricultural equipment, sprayers, fogging machines, and farm tools at AgriWow. Quality products with fast delivery across India.",
  },
  "/about-us": {
    title: "About Us",
    description:
      "Learn about AgriWow — your trusted partner for agricultural equipment, farm tools, and gardening solutions across India.",
  },
  "/blog": {
    title: "Blog",
    description:
      "Read the latest farming tips, product guides, and agricultural insights from the AgriWow blog.",
  },
  "/buying-guide": {
    title: "Buying Guide",
    description:
      "Expert buying guides to help you choose the right agricultural equipment and farm tools at AgriWow.",
  },
  "/contact-us": {
    title: "Contact Us",
    description:
      "Get in touch with AgriWow for product enquiries, order support, and farming equipment assistance.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "Read the AgriWow privacy policy to understand how we collect, use, and protect your personal information.",
  },
  "/terms-of-use": {
    title: "Terms of Use",
    description:
      "Review the terms and conditions for using the AgriWow website and purchasing agricultural products.",
  },
  "/shipping-return": {
    title: "Shipping & Return",
    description:
      "Learn about AgriWow shipping, delivery timelines, and return policies for agricultural equipment orders.",
  },
  "/cancellation-return-policy": {
    title: "Cancellation & Return Policy",
    description:
      "Understand AgriWow order cancellation and return policies for a hassle-free shopping experience.",
  },
  "/cart": {
    title: "Shopping Cart",
    description: "Review items in your AgriWow shopping cart before checkout.",
    noindex: true,
  },
  "/checkout": {
    title: "Checkout",
    description: "Complete your AgriWow order securely.",
    noindex: true,
  },
  "/payments": {
    title: "Payment",
    description: "Select a payment method to complete your AgriWow order.",
    noindex: true,
  },
  "/wishlist": {
    title: "My Wishlist",
    description: "View and manage your saved agricultural products on AgriWow.",
    noindex: true,
  },
  "/my-profile": {
    title: "My Profile",
    description: "Manage your AgriWow account profile and delivery addresses.",
    noindex: true,
  },
  "/my-order": {
    title: "My Orders",
    description: "View your AgriWow order history and track deliveries.",
    noindex: true,
  },
  "/track-order": {
    title: "Track Order",
    description: "Track your AgriWow order status and delivery updates in real time.",
  },
  "/404": {
    title: "Page Not Found",
    description: "The page you are looking for could not be found on AgriWow.",
    noindex: true,
  },
};

export const DYNAMIC_ROUTE_SEO = {
  "/product-details/[slug]": {
    title: "Product Details",
    description:
      "View product details, specifications, reviews, and pricing on AgriWow.",
  },
  "/product-category/[categorySlug]": {
    title: "Products",
    description:
      "Browse agricultural equipment and farm tools by category at AgriWow.",
  },
  "/product-category/[categorySlug]/[subCategory]": {
    title: "Products",
    description:
      "Browse agricultural equipment and farm tools by subcategory at AgriWow.",
  },
  "/blog/[slug]": {
    title: "Blog",
    description: "Read farming insights and product guides on the AgriWow blog.",
    type: "article",
  },
  "/buying-guide/[slug]": {
    title: "Buying Guide",
    description:
      "Expert buying guide to help you choose the right agricultural equipment at AgriWow.",
  },
  "/my-order/[slug]": {
    title: "Order Details",
    description: "View details for your AgriWow order.",
    noindex: true,
  },
};

export function getStaticSeoForPath(pathname) {
  return (
    ROUTE_SEO[pathname] ||
    DYNAMIC_ROUTE_SEO[pathname] || {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
    }
  );
}
