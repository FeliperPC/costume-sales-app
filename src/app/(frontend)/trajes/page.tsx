import { ProductCard } from "@/components/ProductCard";
import SuitsList from "@/components/SuitsList";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { SUITS_CARD_PAGINATED_QUERY } from "@/sanity/lib/queries";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

const SearchBar = () => {
  return (
    <form className="relative w-full md:w-96">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <Input
        name="search"
        defaultValue={"teste"}
        placeholder="Buscar trajes (ex: Capitão América)"
        className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/30"
      />
    </form>
  );
};

export default async function SuitsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const ITEMS_PER_PAGE = 3;
  const currentPage = Number((await searchParams).page) || 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const { products, total } = await client.fetch(SUITS_CARD_PAGINATED_QUERY, {
    start,
    end,
  });
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <SuitsList products={products} currentPage={currentPage} totalPages={totalPages} />
  );
}
