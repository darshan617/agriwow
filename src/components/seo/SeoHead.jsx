import Head from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_SEO, SITE_NAME } from "@/config/seo";
import {
  buildJsonLd,
  buildPageTitle,
  getCanonicalUrl,
  getDefaultOgImage,
  getDefaultOgImageDimensions,
  getImageMimeType,
  resolveImageUrl,
} from "@/utils/seo";

const GOOGLE_SITE_VERIFICATION = "NX-2B-1N5Q2WX0_9_C173QHCKgNqZ33WMRsOm8JjYoU";

export default function SeoHead({
  title,
  customTitle,
  description,
  image,
  imageWidth,
  imageHeight,
  imageType,
  imageAlt,
  url,
  type = "website",
  noindex = false,
  keywords,
  updatedTime,
  publishedTime,
  modifiedTime,
  author,
  readTime,
  section,
  tags = [],
  price,
  currency = "INR",
  availability,
  twitterLabel1,
  twitterData1,
  twitterLabel2,
  twitterData2,
}) {
  const router = useRouter();
  const pageTitle = buildPageTitle(title || DEFAULT_SEO.title);
  const metaDescription = description || DEFAULT_SEO.description;
  const canonicalUrl = url || getCanonicalUrl(router.asPath);
  const defaultOgImage = getDefaultOgImage();
  const defaultImageDimensions = getDefaultOgImageDimensions();
  const ogImage = resolveImageUrl(image) || defaultOgImage;
  const isDefaultImage = ogImage === defaultOgImage;
  const ogImageAlt = imageAlt || title || DEFAULT_SEO.title;
  const resolvedImageWidth =
    imageWidth || (isDefaultImage ? defaultImageDimensions.width : undefined);
  const resolvedImageHeight =
    imageHeight || (isDefaultImage ? defaultImageDimensions.height : undefined);
  const resolvedImageType =
    imageType ||
    (isDefaultImage ? defaultImageDimensions.type : getImageMimeType(ogImage));
  const hasCustomTwitterMeta =
    twitterLabel1 != null ||
    twitterData1 != null ||
    twitterLabel2 != null ||
    twitterData2 != null;
  const resolvedTwitterLabel1 =
    twitterLabel1 ||
    (!hasCustomTwitterMeta && type !== "product" ? "Written by" : undefined);
  const resolvedTwitterData1 =
    twitterData1 ||
    (!hasCustomTwitterMeta && type !== "product"
      ? author || "admin"
      : undefined);
  const resolvedTwitterLabel2 =
    twitterLabel2 ||
    (!hasCustomTwitterMeta && type !== "product" ? "Time to read" : undefined);
  const resolvedTwitterData2 =
    twitterData2 ||
    (!hasCustomTwitterMeta && type !== "product"
      ? readTime || "7 minutes"
      : undefined);
  const jsonLd = buildJsonLd({
    pageTitle,
    description: metaDescription,
    canonicalUrl,
    type,
    image: ogImage,
    publishedTime,
    modifiedTime,
    author,
    price,
    currency,
    availability,
  });

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta key="description" name="description" content={metaDescription} />
      {keywords ? (
        <meta
          key="keywords"
          name="keywords"
          content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
        />
      ) : null}
      {noindex ? (
        <meta key="robots" name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          key="robots"
          name="robots"
          content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
      )}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      <link key="icon" rel="icon" href="/favicon.ico" />
      <meta key="theme-color" name="theme-color" content="#FFFFFF" />
      <meta
        key="google-site-verification"
        name="google-site-verification"
        content={GOOGLE_SITE_VERIFICATION}
      />

      <meta key="og:locale" property="og:locale" content="en_US" />
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      {updatedTime ? (
        <meta
          key="og:updated_time"
          property="og:updated_time"
          content={updatedTime}
        />
      ) : null}
      <meta key="og:image" property="og:image" content={ogImage} />
      <meta
        key="og:image:secure_url"
        property="og:image:secure_url"
        content={ogImage}
      />
      {resolvedImageWidth ? (
        <meta
          key="og:image:width"
          property="og:image:width"
          content={String(resolvedImageWidth)}
        />
      ) : null}
      {resolvedImageHeight ? (
        <meta
          key="og:image:height"
          property="og:image:height"
          content={String(resolvedImageHeight)}
        />
      ) : null}
      <meta key="og:image:alt" property="og:image:alt" content={ogImageAlt} />
      <meta
        key="og:image:type"
        property="og:image:type"
        content={resolvedImageType}
      />

      {section ? (
        <meta
          key="article:section"
          property="article:section"
          content={section}
        />
      ) : null}
      {tags.map((tag) => (
        <meta key={`article:tag:${tag}`} property="article:tag" content={tag} />
      ))}
      {publishedTime ? (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={publishedTime}
        />
      ) : null}
      {modifiedTime ? (
        <meta
          key="article:modified_time"
          property="article:modified_time"
          content={modifiedTime}
        />
      ) : null}

      {type === "product" && price ? (
        <>
          <meta
            key="product:price:amount"
            property="product:price:amount"
            content={String(price)}
          />
          <meta
            key="product:price:currency"
            property="product:price:currency"
            content={currency}
          />
          {availability ? (
            <meta
              key="product:availability"
              property="product:availability"
              content={availability}
            />
          ) : null}
        </>
      ) : null}

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={metaDescription}
      />
      <meta key="twitter:image" name="twitter:image" content={ogImage} />
      {resolvedTwitterLabel1 && resolvedTwitterData1 ? (
        <>
          <meta
            key="twitter:label1"
            name="twitter:label1"
            content={resolvedTwitterLabel1}
          />
          <meta
            key="twitter:data1"
            name="twitter:data1"
            content={resolvedTwitterData1}
          />
        </>
      ) : null}
      {resolvedTwitterLabel2 && resolvedTwitterData2 ? (
        <>
          <meta
            key="twitter:label2"
            name="twitter:label2"
            content={resolvedTwitterLabel2}
          />
          <meta
            key="twitter:data2"
            name="twitter:data2"
            content={resolvedTwitterData2}
          />
        </>
      ) : null}

      <script
        key="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
