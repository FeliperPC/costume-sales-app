import { ProductCard } from "@/components/ProductCard";
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
  const ITEMS_PER_PAGE = 9;
  const currentPage = Number((await searchParams).page) || 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const { products, total } = await client.fetch(SUITS_CARD_PAGINATED_QUERY, {
    start,
    end,
  });
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="pt-32 pb-20 bg-zinc-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 uppercase">
              Catálogo Completo
            </h1>
            <p className="text-gray-400">
              Explore todas as nossas criações disponíveis para encomenda.
            </p>
          </div>
          <SearchBar />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Paginação */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <Link
            href={`?page=${currentPage - 1}`}
            className={`p-3 bg-zinc-900 rounded-full border border-zinc-800 ${
              currentPage === 1 && "pointer-events-none opacity-30"
            }`}
          >
            <ChevronLeft size={20} />
          </Link>

          <span className="font-bold text-gray-400">
            Página {currentPage} de {totalPages}
          </span>

          <Link
            href={`?page=${currentPage + 1}`}
            className={`p-3 bg-zinc-900 rounded-full border border-zinc-800 ${
              currentPage === totalPages && "pointer-events-none opacity-30"
            }`}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
