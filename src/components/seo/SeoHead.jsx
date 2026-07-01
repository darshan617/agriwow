import Head from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_SEO } from "@/config/seo";
import {
  buildPageTitle,
  getCanonicalUrl,
  resolveImageUrl,
} from "@/utils/seo";

export default function SeoHead({
  title,
  description,
  image,
  url,
  type = "website",
  noindex = false,
  keywords,
}) {
  const router = useRouter();
  const pageTitle = buildPageTitle(title || DEFAULT_SEO.title);
  const metaDescription = description || DEFAULT_SEO.description;
  const canonicalUrl = url || getCanonicalUrl(router.asPath);
  const ogImage = resolveImageUrl(image);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta
        name="twitter:card"
        content={ogImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Head>
  );
}
