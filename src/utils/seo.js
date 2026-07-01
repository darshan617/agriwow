import { DEFAULT_SEO, SITE_NAME } from "@/config/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://agriwow.com";

export function getSiteUrl() {
  return SITE_URL;
}

export function stripHtml(html = "") {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function truncateText(text = "", maxLength = 160) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

export function buildPageTitle(title) {
  if (!title || title === SITE_NAME) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
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

export function getProductImage(product) {
  const gallery = product?.gallery ?? [];
  const first = gallery[0];
  return resolveImageUrl(first);
}

export function buildProductSeo(product) {
  if (!product) return null;

  return {
    title: product.name,
    description: truncateText(
      stripHtml(product.short_description || product.description) ||
        DEFAULT_SEO.description,
    ),
    image: getProductImage(product),
    type: "product",
  };
}

export function buildBlogSeo(blog) {
  if (!blog) return null;

  return {
    title: blog.title,
    description: truncateText(
      stripHtml(blog.short_description || blog.description) ||
        DEFAULT_SEO.description,
    ),
    image: resolveImageUrl(blog.image),
    type: "article",
  };
}

export function buildCategorySeo({ categoryName, subCategoryName }) {
  const name = subCategoryName || categoryName;
  if (!name) return null;

  const label = subCategoryName
    ? `${subCategoryName} - ${categoryName}`
    : categoryName;

  return {
    title: label,
    description: truncateText(
      `Shop ${name} online at AgriWow. Explore quality agricultural equipment and farm tools with fast delivery across India.`,
    ),
  };
}

export function buildBuyingGuideSeo(guide) {
  if (!guide) return null;

  const heroImage =
    guide.buying_guide_banner ?? guide.banner_image ?? guide.image;

  return {
    title: `${guide.name} Buying Guide`,
    description: truncateText(
      stripHtml(guide.description || guide.short_description) ||
        `Read the ${guide.name} buying guide on AgriWow to choose the right agricultural equipment.`,
    ),
    image: resolveImageUrl(heroImage),
  };
}
