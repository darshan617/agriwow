import { generateRobotsTxt } from "@/utils/sitemap";

function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  const body = generateRobotsTxt();

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200",
  );
  res.write(body);
  res.end();

  return { props: {} };
}

export default RobotsTxt;
