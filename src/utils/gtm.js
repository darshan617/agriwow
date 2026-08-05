export const pushDataLayer = (eventData) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Clear previous ecommerce object
  window.dataLayer.push({
    ecommerce: null,
  });

  window.dataLayer.push(eventData);
};
