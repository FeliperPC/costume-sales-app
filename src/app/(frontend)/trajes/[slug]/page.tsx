import SuitDetails from '@/components/SuitDetails';
import { sanityFetch } from '@/sanity/lib/live';
import { SUIT_BY_SLUG_QUERY, SUIT_VERSIONS_MENU_QUERY } from '@/sanity/lib/queries';

export default async function ProductPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ v: string }>;
}) {
  const slug = (await params).slug.toLowerCase()
  const versionSlug = (await searchParams).v.toLowerCase()

  const { data: product } = await sanityFetch({
    query: SUIT_BY_SLUG_QUERY,
    params: { slug, versionSlug }
  })

  const { data: versions } = await sanityFetch({
    query: SUIT_VERSIONS_MENU_QUERY,
    params: { slug }
  })

  return (
    <SuitDetails 
      product={product}
      versions={versions}
    />
  )
}
