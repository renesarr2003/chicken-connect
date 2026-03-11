import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Category, CATEGORY_LABELS } from "@/lib/types";

const categories: (Category | "all")[] = ["all", "entier", "decoupe", "fermier", "congele"];

const Catalogue = () => {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Notre Catalogue</h1>
        <p className="mt-2 text-muted-foreground">Découvrez tous nos produits disponibles</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={active === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(cat)}
            >
              {cat === "all" ? "Tout" : CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">Aucun produit dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
