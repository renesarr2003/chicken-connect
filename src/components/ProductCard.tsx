import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORY_LABELS } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [mode, setMode] = useState<"kg" | "unit">("unit");

  const price = mode === "kg" ? product.pricePerKg : product.pricePerUnit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
            {CATEGORY_LABELS[product.category]}
          </Badge>
          {product.stock < 20 && (
            <Badge variant="destructive" className="absolute right-3 top-3">
              Stock limité
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-display text-lg font-bold">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="mt-3 flex gap-2">
            <Button
              variant={mode === "unit" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("unit")}
              className="flex-1 text-xs"
            >
              {product.pricePerUnit.toLocaleString()} F / unité
            </Button>
            <Button
              variant={mode === "kg" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("kg")}
              className="flex-1 text-xs"
            >
              {product.pricePerKg.toLocaleString()} F / kg
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
            <Button size="sm" onClick={() => addToCart(product, 1, mode)} className="gap-1">
              <ShoppingCart className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
