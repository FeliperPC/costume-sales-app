import SuitDetails from "@/components/product/SuitDetails";
import { sanityFetch } from "@/sanity/lib/live";
import {
  REOPEN_SCHEDULE_DATE,
  SUIT_BY_SLUG_QUERY,
  SUIT_VERSIONS_MENU_QUERY,
} from "@/sanity/lib/queries";

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v: string }>;
}) {
  const slug = (await params).slug.toLowerCase();
  const versionSlug = (await searchParams).v.toLowerCase();

  const { data: product } = await sanityFetch({
    query: SUIT_BY_SLUG_QUERY,
    params: { slug, versionSlug },
  });

  const { data: versions } = await sanityFetch({
    query: SUIT_VERSIONS_MENU_QUERY,
    params: { slug },
  });

  const { data: schedule } = await sanityFetch({ query: REOPEN_SCHEDULE_DATE });
  if (!schedule?.isOpen) {
    return <SuitDetails product={product} versions={versions} reopenScheduleDate={schedule?.reopenDate} />;
  }

  return <SuitDetails product={product} versions={versions} />;
}
