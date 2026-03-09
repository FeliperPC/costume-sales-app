import SuitsList from "@/components/product/SuitsList";
import { sanityFetch } from "@/sanity/lib/live";
import { SUITS_CARD_PAGINATED_QUERY } from "@/sanity/lib/queries";

export default async function SuitsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const ITEMS_PER_PAGE = 6;
  const currentPage = Number((await searchParams).page) || 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const { data: { products, total } } = await sanityFetch({
    query: SUITS_CARD_PAGINATED_QUERY,
    params: { start, end },
  });
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <SuitsList
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
