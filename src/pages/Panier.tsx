import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Panier = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="font-display text-2xl font-bold">Votre panier est vide</h2>
        <p className="text-muted-foreground">Ajoutez des produits depuis notre catalogue</p>
        <Link to="/catalogue">
          <Button>Voir le catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold">Mon Panier</h1>
        <p className="mt-1 text-muted-foreground">{items.length} produit(s)</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
              const price = item.mode === "kg" ? item.product.pricePerKg : item.product.pricePerUnit;
              return (
                <Card key={item.product.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-display font-bold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {price.toLocaleString()} F / {item.mode === "kg" ? "kg" : "unité"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="min-w-[80px] text-right font-bold">
                      {(price * item.quantity).toLocaleString()} F
                    </p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="h-fit">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-bold">Récapitulatif</h3>
              <div className="mt-4 space-y-2 text-sm">
                {items.map((item) => {
                  const price = item.mode === "kg" ? item.product.pricePerKg : item.product.pricePerUnit;
                  return (
                    <div key={item.product.id} className="flex justify-between">
                      <span className="text-muted-foreground">{item.product.name} x{item.quantity}</span>
                      <span>{(price * item.quantity).toLocaleString()} F</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{total.toLocaleString()} F CFA</span>
                </div>
              </div>
              <Link to="/commande" className="mt-4 block">
                <Button className="w-full" size="lg">
                  Passer la commande
                </Button>
              </Link>
              <Button variant="ghost" className="mt-2 w-full text-destructive" onClick={clearCart}>
                Vider le panier
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Panier;
