"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SearchX } from "lucide-react"

export function EmptyState({searchTerm}:{searchTerm:string}) {
  return (
    <Card className="border-none border-border bg-background/40">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        
        {/* Ícone */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative bg-card p-4 rounded-full border border-border">
            <SearchX className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Nenhum traje encontrado
          </h3>

          {searchTerm && (
            <p className="text-sm text-muted-foreground">
              Não encontramos resultados para{" "}
              <span className="text-primary font-medium">
                &quot;{searchTerm}&quot;
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
