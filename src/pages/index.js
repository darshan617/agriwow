import HomeComponents from "@/components/home/HomeComponents";
import { storeWrapper } from "@/redux/store";
import { homeApi } from "@/redux/apis/homeApi";

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async (context) => {
    const userToken = context.req?.cookies?.userToken;
    const queryArg = userToken ? { userToken } : undefined;

    await store.dispatch(homeApi.endpoints.getHomeData.initiate(queryArg));
    // Ensure the query settles so next-redux-wrapper can HYDRATE the cache.
    await Promise.all(store.dispatch(homeApi.util.getRunningQueriesThunk()));

    const homeState = homeApi.endpoints.getHomeData.select(queryArg)(
      store.getState(),
    );

    return {
      props: {
        homeData: homeState.data || null,
      },
    };
  },
);
export default function Home({ homeData }) {
  return <HomeComponents homeData={homeData} />;
}
