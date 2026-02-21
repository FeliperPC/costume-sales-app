import { sanityFetch } from "@/sanity/lib/live";
import { CUSTOM_SUIT_QUERY } from "@/sanity/lib/queries";
import { CustomSuitSection } from "./CustomSuitSection";

export default async function CustomSuit() {
  const {data:customSuitData} = await sanityFetch({query:CUSTOM_SUIT_QUERY})
  return (
    <CustomSuitSection customSuitData={customSuitData}/>
  );
}
