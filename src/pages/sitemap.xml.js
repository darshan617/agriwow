import { generateSitemapXml } from "@/utils/sitemap";

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = await generateSitemapXml();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=1800",
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;
