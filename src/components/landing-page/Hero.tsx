import { sanityFetch } from "@/sanity/lib/live";
import HeroSection from "./HeroSection";
import { REOPEN_SCHEDULE_DATE } from "@/sanity/lib/queries";

export default async function Hero() {
  const {data:schedule} = await sanityFetch({query:REOPEN_SCHEDULE_DATE})
  if(!schedule?.isOpen){
    return <HeroSection reopenDate={schedule?.reopenDate} />
  }
  return (
    <HeroSection />
  );
}
