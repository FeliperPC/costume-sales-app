import SuitDetails from '@/components/SuitDetails';
import { sanityFetch } from '@/sanity/lib/live';
import { GET_SUIT_BY_SLUG_QUERY } from '@/sanity/lib/queries';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug
  const {data} = await sanityFetch({query:GET_SUIT_BY_SLUG_QUERY,params:{slug}})
  return <SuitDetails data={data} />;
}
