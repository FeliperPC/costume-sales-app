import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_ORDERING } from "@/sanity/lib/queries";
import { PRODUCT_ORDER } from "@/sanity/types";
import OrderForm from "../../page";

export default async function ProductOrder({
  params,
}: {
  params: Promise<{ product: string; version: string }>;
}) {
  const {product,version} = await params

  const { data: orderingData } = await sanityFetch({
    query: PRODUCT_ORDERING,
    params: { product,version },
  });

  const productOrder : PRODUCT_ORDER = {
    id: orderingData._id,
    name: orderingData.name,
    version :orderingData.version.versionName,
    img:orderingData.version.imageUrl
  }

  console.log(productOrder);
  return <OrderForm productOrder={productOrder}/>
}
