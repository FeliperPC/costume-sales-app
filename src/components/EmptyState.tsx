"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"

export function EmptyState({searchTerm}:{searchTerm:string}) {
  return (
    <Card className="border-none border-zinc-800 bg-zinc-950/40">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        
        {/* Ícone */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
          <div className="relative bg-zinc-900 p-4 rounded-full border border-zinc-800">
            <SearchX className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Nenhum traje encontrado
          </h3>

          {searchTerm && (
            <p className="text-sm text-zinc-400">
              Não encontramos resultados para{" "}
              <span className="text-purple-400 font-medium">
                "{searchTerm}"
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
