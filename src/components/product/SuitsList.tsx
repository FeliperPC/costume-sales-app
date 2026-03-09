"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { EmptyState } from "../EmptyState";
import { SUITS_CARD_PRODUCT_PAGINATED_QUERY_RESULT } from "@/sanity/types";

export default function SuitsList({
  products,
  currentPage,
  totalPages,
}: {
  products: SUITS_CARD_PRODUCT_PAGINATED_QUERY_RESULT;
  currentPage: number;
  totalPages: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuits = useMemo(() => {
    if (searchQuery.length > 0) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return products;
  }, [products, searchQuery]);

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 uppercase">
              Catálogo Completo
            </h1>
            <p className="text-muted-foreground">
              Explore todas as nossas criações disponíveis para encomenda.
            </p>
          </div>

          <form className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              name="search"
              type="text"
              placeholder="Buscar trajes (ex: Capitão América)"
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/30"
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
          {filteredSuits.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Paginação */}
        {!searchQuery.length && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <Link
              href={`?page=${currentPage - 1}`}
              className={`p-3 bg-card rounded-full border border-border ${
                currentPage === 1 && "pointer-events-none opacity-30"
              }`}
            >
              <ChevronLeft size={20} />
            </Link>

            <span className="font-bold text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>

            <Link
              href={`?page=${currentPage + 1}`}
              className={`p-3 bg-card rounded-full border border-border ${
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
