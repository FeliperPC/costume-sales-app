"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { EmptyState } from "../EmptyState";
import { SUITS_CARD_PAGINATED_QUERY_RESULT } from "@/sanity/types";

export default function SuitsList({
  products,
  currentPage,
  totalPages,
}: {
  products: any;
  currentPage: number;
  totalPages: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuits = useMemo(() => {
    if (searchQuery.length > 0) {
      return products.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return products;
  }, [products, searchQuery]);

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

          <form className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <Input
              name="search"
              type="text"
              placeholder="Buscar trajes (ex: Capitão América)"
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Grid */}
        {filteredSuits.length == 0 && (
          <div className="flex justify-center">
            <EmptyState searchTerm={searchQuery} />
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredSuits.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Paginação */}
        {!searchQuery.length && (
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
        )}
      </div>
    </div>
  );
}
