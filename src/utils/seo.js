import { DEFAULT_SEO, SITE_NAME } from "@/config/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://agriwow.com";

const DEFAULT_OG_IMAGE_PATH = "/og-image.jpg";
const DEFAULT_OG_IMAGE_WIDTH = "1922";
const DEFAULT_OG_IMAGE_HEIGHT = "758";

export function getSiteUrl() {
  return SITE_URL;
}

export function getDefaultOgImage() {
  return `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
}

export function getDefaultOgImageDimensions() {
  return {
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
    type: "image/jpeg",
  };
}

export function stripHtml(html = "") {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text = "", maxLength = 160) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

export function stripSiteNameSuffix(title = "") {
  const trimmed = title.trim();
  if (!trimmed || trimmed === SITE_NAME) return "";

  const suffixes = [` - ${SITE_NAME}`, ` | ${SITE_NAME}`];
  for (const suffix of suffixes) {
    if (trimmed.endsWith(suffix)) {
      return trimmed.slice(0, -suffix.length).trim();
    }
  }

  return trimmed;
}

export function buildPageTitle(title) {
  if (!title) return SITE_NAME;

  const cleaned = stripSiteNameSuffix(title);
  if (!cleaned || cleaned === SITE_NAME) return SITE_NAME;

  return `${cleaned} - ${SITE_NAME}`;
}

export function getCanonicalUrl(asPath = "/") {
  const path = asPath.split("?")[0].split("#")[0];
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function resolveImageUrl(image) {
  if (!image) return undefined;
  if (typeof image === "string") {
    return image.startsWith("http") ? image : `${SITE_URL}${image}`;
  }
  const url = image?.url || image?.image || image?.src;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function getImageMimeType(imageUrl = "") {
  const extension = imageUrl.split("?")[0].split(".").pop()?.toLowerCase();

  switch (extension) {
    case "webp":
      return "image/webp";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}

export function toIsoDate(value) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
}

export function estimateReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export function formatInrPrice(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) return undefined;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function getProductImage(product) {
  const gallery = product?.gallery ?? [];
  const first = gallery[0];
  return resolveImageUrl(first);
}

export function buildProductSeo(product, { path } = {}) {
  if (!product) return null;

  const image = getProductImage(product);
  const description = truncateText(
    stripHtml(product.short_description || product.description) ||
      DEFAULT_SEO.description,
  );

  return {
    title: product.name,
    description,
    url: path ? getCanonicalUrl(path) : undefined,
    image,
    imageAlt: product.name,
    type: "product",
    price: product.selling_price,
    currency: "INR",
    availability: product.in_stock ? "instock" : "outofstock",
    updatedTime: toIsoDate(product.updated_at),
    twitterLabel1: "Price",
    twitterData1: formatInrPrice(product.selling_price),
    twitterLabel2: "Availability",
    twitterData2: product.in_stock ? "In Stock" : "Out of Stock",
  };
}

export function buildBlogSeo(blog) {
  if (!blog) return null;

  const description = truncateText(
    stripHtml(blog.short_description || blog.description) ||
      DEFAULT_SEO.description,
  );
  const image = resolveImageUrl(blog.image);
  const readTime = estimateReadTime(stripHtml(blog.description));

  return {
    title: blog.title,
    description,
    image,
    imageAlt: blog.title,
    type: "article",
    author: blog.author,
    section: blog.category?.name,
    tags: blog.tags,
    publishedTime: toIsoDate(blog.blog_date),
    modifiedTime: toIsoDate(blog.updated_at || blog.blog_date),
    updatedTime: toIsoDate(blog.updated_at || blog.blog_date),
    readTime,
    twitterLabel1: "Written by",
    twitterData1: blog.author,
    twitterLabel2: "Time to read",
    twitterData2: readTime,
  };
}

function humanizeSlug(slug = "") {
  return slug
    .toString()
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildCategorySeo({
  categoryName,
  subCategoryName,
  customTitle,
  description,
  keywords = DEFAULT_SEO.keywords,
}) {
  const name = subCategoryName || categoryName;
  if (!name && !customTitle) return null;

  const displayName = stripSiteNameSuffix(name || customTitle);

  return {
    title: stripSiteNameSuffix(customTitle || name),
    description: truncateText(
      description ||
        `Shop ${displayName} online at ${SITE_NAME}. Explore quality agricultural equipment and farm tools with fast delivery across India.`,
    ),
    keywords,
  };
}

/** Build category/subcategory SEO from a products API response (SSR + client). */
export function buildCategorySeoFromProducts(
  products,
  { categorySlug, subCategorySlug } = {},
) {
  const first = products?.[0];
  const categoryName = first?.category?.name || humanizeSlug(categorySlug);
  const subCategoryName = subCategorySlug
    ? first?.subcategory?.name || humanizeSlug(subCategorySlug)
    : undefined;
  const customTitle = subCategorySlug
    ? first?.subcategory?.meta_title || undefined
    : first?.category?.meta_title || undefined;

  return buildCategorySeo({
    categoryName,
    subCategoryName,
    customTitle,
    description:
      first?.category?.meta_description || first?.subcategory?.meta_description,
    keywords:
      first?.category?.meta_keywords || first?.subcategory?.meta_keywords,
  });
}

export function buildBuyingGuideSeo(guide) {
  if (!guide) return null;

  const heroImage =
    guide.buying_guide_banner ?? guide.banner_image ?? guide.image;

  return {
    title: `${guide.name} Buying Guide`,
    description: truncateText(
      stripHtml(guide.description || guide.short_description) ||
        `Read the ${guide.name} buying guide on Agriwow to choose the right agricultural equipment.`,
    ),
    image: resolveImageUrl(heroImage),
    imageAlt: `${guide.name} Buying Guide`,
  };
}

export function buildJsonLd({
  pageTitle,
  description,
  canonicalUrl,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  author,
  price,
  currency = "INR",
  availability,
}) {
  const organization = {
    // "@type": "Organization",
    // "@id": `${SITE_URL}/#organization`,
    // name: SITE_NAME,
    // url: SITE_URL,
    // logo: {
    //   "@type": "ImageObject",
    //   url: `${SITE_URL}/favicon.ico`,
    // },

    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.ico`,
      "@id": `${SITE_URL}/#logo`,
      contentUrl: `${SITE_URL}/favicon.ico`,
      width: 512,
      height: 512,
      caption: SITE_NAME,
      inLanguage: "en-US",
    },
    description:
      "AgriWow provides quality agricultural products and solutions.",
    sameAs: [
      "https://www.instagram.com/agriwow_",
      "https://www.facebook.com/agriwow",
      "https://www.youtube.com/@agriwow",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919770501981",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?s={search_term_string}`,
      target: `${SITE_URL}/search?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const logo = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/favicon.ico`,
    width: "512",
    height: "512",
    inLanguage: "en-US",
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: pageTitle,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  if (image) {
    webpage.primaryImageOfPage = {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/ #${pageTitle}-image`,
      url: image,
    };
  }

  if (publishedTime) {
    webpage.datePublished = publishedTime;
  }

  if (modifiedTime) {
    webpage.dateModified = modifiedTime;
  }

  const graph = [organization, website, webpage, logo];

  if (type === "article") {
    graph.push({
      "@type": "Article",
      headline: pageTitle,
      description,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        "@type": "Person",
        name: author || SITE_NAME,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: image ? [image] : undefined,
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      inLanguage: "en-US",
      description:
        "AgriWow provides quality agricultural products and solutions.",
      name: "AgriWow | Agriculture Products Online",
    });
  }

  if (type === "product" && price) {
    graph.push({
      "@type": "Product",
      name: stripSiteNameSuffix(pageTitle) || pageTitle,
      description,
      image: image ? [image] : undefined,
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: currency,
        price: String(price),
        availability: `https://schema.org/${availability === "instock" ? "InStock" : "OutOfStock"}`,
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
