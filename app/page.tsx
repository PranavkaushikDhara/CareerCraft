import Banner from "@/components/molecules/Banner"; 
import Features from "@/components/molecules/Features";
// import Testimonals from "@/components/organisms/Testimonals";
import {GenericNavbar} from "@/components/molecules/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <GenericNavbar></GenericNavbar>
      <Banner></Banner>
      <Features></Features>
      {/* <Testimonals></Testimonals> */}
    </div>
  );
}
