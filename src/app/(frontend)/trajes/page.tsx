import SuitsList from "@/components/product/SuitsList";
import { client } from "@/sanity/lib/client";
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

  const { products, total } = await client.fetch(SUITS_CARD_PAGINATED_QUERY, {
    start,
    end,
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
