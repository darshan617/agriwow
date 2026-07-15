import { ROUTE_SEO } from "@/config/seo";
import { getSiteUrl } from "@/utils/seo";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
  .trim()
  .replace(/\/$/, "");

/** Indexable static routes (skips pages marked noindex in ROUTE_SEO). */
export const STATIC_SITEMAP_PATHS = Object.entries(ROUTE_SEO)
  .filter(([, seo]) => !seo.noindex)
  .map(([path]) => path);

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority != null) parts.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

async function fetchJson(path, { method = "GET", body } = {}) {
  if (!BACKEND_BASE_URL) return null;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

function collectStaticUrls(siteUrl) {
  return STATIC_SITEMAP_PATHS.map((path) => ({
    loc: `${siteUrl}${path === "/" ? "" : path}`,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? "1.0" : "0.8",
  }));
}

function collectCategoryUrls(siteUrl, categories = []) {
  const urls = [];

  for (const category of categories) {
    if (!category?.slug) continue;

    urls.push({
      loc: `${siteUrl}/product-category/${category.slug}`,
      changefreq: "weekly",
      priority: "0.8",
    });

    for (const sub of category.subcategories ?? []) {
      if (!sub?.slug) continue;
      urls.push({
        loc: `${siteUrl}/product-category/${category.slug}/${sub.slug}`,
        lastmod: toLastmod(sub.updated_at),
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  }

  return urls;
}

function collectProductUrls(siteUrl, products = []) {
  return products
    .filter((product) => product?.slug)
    .map((product) => ({
      loc: `${siteUrl}/product-details/${product.slug}`,
      lastmod: toLastmod(product.updated_at),
      changefreq: "weekly",
      priority: "0.7",
    }));
}

function collectBlogUrls(siteUrl, blogs = []) {
  return blogs
    .filter((blog) => blog?.slug)
    .map((blog) => ({
      loc: `${siteUrl}/blog/${blog.slug}`,
      lastmod: toLastmod(blog.updated_at || blog.blog_date),
      changefreq: "monthly",
      priority: "0.6",
    }));
}

function collectBuyingGuideUrls(siteUrl, guides = []) {
  return guides
    .filter((guide) => guide?.slug)
    .map((guide) => ({
      loc: `${siteUrl}/buying-guide/${guide.slug}`,
      lastmod: toLastmod(guide.updated_at),
      changefreq: "monthly",
      priority: "0.6",
    }));
}

export async function collectSitemapUrls() {
  const siteUrl = getSiteUrl();

  const [categoriesJson, productsJson, blogsJson, guidesJson] =
    await Promise.all([
      fetchJson("/all-category-subcategories"),
      fetchJson("/products"),
      fetchJson("/blogs-list", { method: "POST", body: {} }),
      fetchJson("/subcategories"),
    ]);

  const categories = categoriesJson?.data?.AllCategory ?? [];
  const products = Array.isArray(productsJson?.data) ? productsJson.data : [];
  const blogs = blogsJson?.data?.blogs ?? [];
  const guides = Array.isArray(guidesJson?.data) ? guidesJson.data : [];

  const urls = [
    ...collectStaticUrls(siteUrl),
    ...collectCategoryUrls(siteUrl, categories),
    ...collectProductUrls(siteUrl, products),
    ...collectBlogUrls(siteUrl, blogs),
    ...collectBuyingGuideUrls(siteUrl, guides),
  ];

  // Deduplicate by loc while preserving first occurrence order.
  const seen = new Set();
  return urls.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

export async function generateSitemapXml() {
  const urls = await collectSitemapUrls();
  const body = urls.map(urlEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export function generateRobotsTxt() {
  const siteUrl = getSiteUrl();

  return `User-agent: *
Allow: /

# Account and checkout flows
Disallow: /cart
Disallow: /checkout
Disallow: /payments
Disallow: /wishlist
Disallow: /my-profile
Disallow: /my-order
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
}
