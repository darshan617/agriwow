import HomeComponents from "@/components/home/HomeComponents";

const REVALIDATE_SECONDS = 60;

const HOME_PRODUCT_FIELDS = [
  "id",
  "slug",
  "thumbnail",
  "name",
  "discount",
  "is_best_selling",
  "isBestSeller",
  "selling_price",
  "price",
  "total_reviews",
  "average_rating",
  "is_trending",
  "is_featured",
  "is_top_rated",
  "is_wishlist",
  "quantity",
  "sku",
  "category_names",
];
const HOME_PRODUCT_LISTS = [
  "agriculture_sprayers",
  "farm_equipments",
  "industrial_products",
  "post_harvest",
  "fogging_machines",
  "garden_tools",
  "best_selling",
  "top_rated",
];
const projectFields = (source, fields) =>
  Object.fromEntries(
    fields
      .filter((field) => source?.[field] !== undefined)
      .map((field) => [field, source[field]]),
  );

const projectHomeProduct = (product) => {
  const projected = projectFields(product, HOME_PRODUCT_FIELDS);
  projected.gallery = Array.isArray(product.gallery)
    ? product.gallery.slice(0, 1)
    : [];
  return projected;
};

const projectHomeData = (response) => {
  if (!response?.data) return null;

  const { categories = [], products = {}, blogs = [], banners = {} } =
    response.data;
  const projectedProducts = {};

  HOME_PRODUCT_LISTS.forEach((key) => {
    const value = products[key];
    if (Array.isArray(value)) {
      projectedProducts[key] = value.map(projectHomeProduct);
    }
  });

  return {
    data: {
      categories: categories.map(({ id, slug, image, name }) => ({
        ...projectFields({ id, slug, image, name }, [
          "id",
          "slug",
          "image",
          "name",
        ]),
      })),
      products: projectedProducts,
      blogs: blogs.map((blog) =>
        projectFields(blog, [
          "id",
          "slug",
          "image",
          "title",
          "category",
          "blog_date",
          "author",
          "short_description",
        ]),
      ),
      banners: Object.fromEntries(
        Object.entries(banners).map(([key, banner]) => [
          key,
          banner && typeof banner === "object"
            ? projectFields(banner, [
                "slug",
                "name",
                "image",
                "image_url",
                ...(key === "video_banner" ? ["youtube_links"] : []),
              ])
            : banner,
        ]),
      ),
    },
  };
};

const projectSliderData = (response) =>
  response?.data
    ? {
        data: response.data.map((slide) =>
          projectFields(slide, ["id", "status", "image", "link"]),
        ),
      }
    : null;

export async function getStaticProps() {
  const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/\/$/, "");

  if (!baseUrl) {
    console.error("Homepage data unavailable: backend base URL is not set");
    return {
      props: { initialHomeData: null, initialBannerData: null },
      revalidate: REVALIDATE_SECONDS,
    };
  }

  const fetchJson = async (path) => {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Homepage request ${path} failed with ${response.status}`);
    }

    return response.json();
  };

  const [homeResult, bannerResult] = await Promise.allSettled([
    fetchJson("/home"),
    fetchJson("/sliders"),
  ]);

  if (homeResult.status === "rejected") {
    console.error("Failed to load homepage data", homeResult.reason);
  }
  if (bannerResult.status === "rejected") {
    console.error("Failed to load homepage banners", bannerResult.reason);
  }

  return {
    props: {
      initialHomeData:
        homeResult.status === "fulfilled"
          ? projectHomeData(homeResult.value)
          : null,
      initialBannerData:
        bannerResult.status === "fulfilled"
          ? projectSliderData(bannerResult.value)
          : null,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}

export default function Home({ initialHomeData, initialBannerData }) {
  return (
    <HomeComponents
      initialHomeData={initialHomeData}
      initialBannerData={initialBannerData}
    />
  );
}
