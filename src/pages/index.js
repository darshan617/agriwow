import HomeComponents from "@/components/home/HomeComponents";

// No getServerSideProps / getStaticProps: the document is served without
// waiting on /home (fixes TTFB). Home data loads on the client via RTK Query.
export default function Home() {
  return <HomeComponents />;
}
