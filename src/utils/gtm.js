const CURRENCY = "INR";

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const resolveCategory = (source = {}) =>
  source?.category_names?.[0] ||
  source?.category?.name ||
  source?.categories?.[0]?.name ||
  source?.item_category ||
  "";

/**
 * Normalize product / cart-line shapes into a GA4 ecommerce item.
 */
export const mapProductToItem = (productOrItem, overrides = {}) => {
  if (!productOrItem) return null;

  const product = productOrItem?.product || productOrItem;
  const quantity = toNumber(
    overrides.quantity ?? productOrItem?.quantity ?? product?.quantity ?? 1,
    1,
  );
  const price = toNumber(
    overrides.price ??
      product?.selling_price ??
      product?.sellingPrice ??
      product?.sale_price ??
      productOrItem?.selling_price ??
      product?.price,
  );

  const item = {
    item_id: String(
      product?.id ??
        productOrItem?.product_id ??
        productOrItem?.id ??
        overrides.item_id ??
        "",
    ),
    item_name:
      product?.name ||
      productOrItem?.name ||
      productOrItem?.product_name ||
      overrides.item_name ||
      "",
    item_category: resolveCategory(product) || resolveCategory(productOrItem),
    price,
    quantity,
  };

  if (overrides.index != null) {
    item.index = overrides.index;
  }
  if (overrides.item_list_name || overrides.item_list_id) {
    if (overrides.item_list_name) item.item_list_name = overrides.item_list_name;
    if (overrides.item_list_id) item.item_list_id = overrides.item_list_id;
  }
  if (product?.sku || productOrItem?.sku) {
    item.item_variant = product?.sku || productOrItem?.sku;
  }

  if (!item.item_id && !item.item_name) return null;
  return item;
};

export const mapProductsToItems = (products = [], listMeta = {}) =>
  (Array.isArray(products) ? products : [])
    .map((product, index) =>
      mapProductToItem(product, {
        ...listMeta,
        index: listMeta.includeIndex === false ? undefined : index + 1,
      }),
    )
    .filter(Boolean);

export const getItemsValue = (items = []) =>
  items.reduce(
    (sum, item) => sum + toNumber(item?.price) * toNumber(item?.quantity, 1),
    0,
  );

export const pushDataLayer = (eventData) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Clear previous ecommerce object (GA4 recommended)
  if (eventData?.ecommerce) {
    window.dataLayer.push({ ecommerce: null });
  }

  window.dataLayer.push(eventData);
};

const pushEcommerceEvent = (event, ecommerce, extra = {}) => {
  pushDataLayer({
    event,
    ...extra,
    ecommerce: {
      currency: CURRENCY,
      ...ecommerce,
    },
  });
};

export const trackPageView = ({
  page_path,
  page_title,
  page_location,
} = {}) => {
  if (typeof window === "undefined") return;

  pushDataLayer({
    event: "page_view",
    page_path: page_path || window.location.pathname + window.location.search,
    page_title: page_title || document.title,
    page_location: page_location || window.location.href,
  });
};

export const trackViewItem = (product, quantity = 1) => {
  const item = mapProductToItem(product, { quantity });
  if (!item) return;

  pushEcommerceEvent("view_item", {
    value: getItemsValue([item]),
    items: [item],
  });
};

export const trackViewItemList = (listName, products = [], listId) => {
  const items = mapProductsToItems(products, {
    item_list_name: listName,
    item_list_id: listId,
  });
  if (!items.length) return;

  pushEcommerceEvent("view_item_list", {
    item_list_name: listName,
    ...(listId ? { item_list_id: listId } : {}),
    items,
  });
};

export const trackSelectItem = (product, listName, index) => {
  const item = mapProductToItem(product, {
    quantity: 1,
    index: index != null ? index + 1 : undefined,
    item_list_name: listName,
  });
  if (!item) return;

  pushEcommerceEvent("select_item", {
    item_list_name: listName,
    items: [item],
  });
};

export const trackAddToCart = (product, quantity = 1) => {
  const item = mapProductToItem(product, { quantity });
  if (!item) return;

  pushEcommerceEvent("add_to_cart", {
    value: getItemsValue([item]),
    items: [item],
  });
};

export const trackRemoveFromCart = (productOrCartItem, quantity) => {
  const item = mapProductToItem(productOrCartItem, {
    quantity:
      quantity ?? productOrCartItem?.quantity ?? productOrCartItem?.product?.quantity ?? 1,
  });
  if (!item) return;

  pushEcommerceEvent("remove_from_cart", {
    value: getItemsValue([item]),
    items: [item],
  });
};

export const trackViewCart = (cartItems = [], value) => {
  const items = mapProductsToItems(cartItems, { includeIndex: false });
  if (!items.length) return;

  pushEcommerceEvent("view_cart", {
    value: value != null ? toNumber(value) : getItemsValue(items),
    items,
  });
};

export const trackBeginCheckout = (cartItems = [], value) => {
  const items = mapProductsToItems(cartItems, { includeIndex: false });
  if (!items.length) return;

  pushEcommerceEvent("begin_checkout", {
    value: value != null ? toNumber(value) : getItemsValue(items),
    items,
  });
};

export const trackAddShippingInfo = (
  cartItems = [],
  value,
  shippingTier = "standard",
) => {
  const items = mapProductsToItems(cartItems, { includeIndex: false });
  if (!items.length) return;

  pushEcommerceEvent("add_shipping_info", {
    value: value != null ? toNumber(value) : getItemsValue(items),
    shipping_tier: shippingTier,
    items,
  });
};

export const trackAddPaymentInfo = (
  cartItems = [],
  value,
  paymentType = "razorpay",
) => {
  const items = mapProductsToItems(cartItems, { includeIndex: false });
  if (!items.length) return;

  pushEcommerceEvent("add_payment_info", {
    value: value != null ? toNumber(value) : getItemsValue(items),
    payment_type: paymentType,
    items,
  });
};

export const trackPurchase = ({
  transactionId,
  cartItems = [],
  value,
  tax = 0,
  shipping = 0,
  coupon,
} = {}) => {
  const items = mapProductsToItems(cartItems, { includeIndex: false });
  if (!transactionId || !items.length) return;

  pushEcommerceEvent("purchase", {
    transaction_id: String(transactionId),
    value: value != null ? toNumber(value) : getItemsValue(items),
    tax: toNumber(tax),
    shipping: toNumber(shipping),
    ...(coupon ? { coupon } : {}),
    items,
  });
};

export const trackAddToWishlist = (product) => {
  const item = mapProductToItem(product, { quantity: 1 });
  if (!item) return;

  pushEcommerceEvent("add_to_wishlist", {
    value: getItemsValue([item]),
    items: [item],
  });
};

export const trackRemoveFromWishlist = (product) => {
  const item = mapProductToItem(product, { quantity: 1 });
  if (!item) return;

  pushEcommerceEvent("remove_from_wishlist", {
    value: getItemsValue([item]),
    items: [item],
  });
};

export const trackSearch = (searchTerm) => {
  if (!searchTerm) return;
  pushDataLayer({
    event: "search",
    search_term: String(searchTerm),
  });
};

export const trackLogin = (method = "otp") => {
  pushDataLayer({
    event: "login",
    method,
  });
};

export const trackSignUp = (method = "otp") => {
  pushDataLayer({
    event: "sign_up",
    method,
  });
};
