import HomeComponents from "@/components/home/HomeComponents";
import { storeWrapper } from "@/redux/store";
import { homeApi } from "@/redux/apis/homeApi";

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async (context) => {
    const userToken = context.req?.cookies?.userToken;
    const result = await store.dispatch(
      homeApi.endpoints.getHomeData.initiate(
        userToken ? { userToken } : undefined,
      ),
    );

    return {
      props: {
        homeData: result.data || null,
      },
    };
  },
);
export default function Home({ homeData }) {
  return <HomeComponents homeData={homeData} />;
}
