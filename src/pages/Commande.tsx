import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Commande = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    purchaseType: "detail" as "gros" | "detail",
    paymentMethod: "livraison" as "livraison" | "orange_money" | "wave",
  });

  const grossTotal = form.purchaseType === "gros" ? Math.round(total * 0.85) : total;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    setSubmitted(true);
    clearCart();
    toast.success("Commande passée avec succès !");
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <CheckCircle className="h-16 w-16 text-secondary" />
        <h2 className="font-display text-2xl font-bold">Commande confirmée !</h2>
        <p className="text-muted-foreground">
          Nous vous contacterons au {form.phone} pour confirmer la livraison.
        </p>
        <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold">Passer commande</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="font-display font-bold">Informations de livraison</h3>
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Votre nom" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+221 7X XXX XX XX" />
                </div>
                <div>
                  <Label htmlFor="address">Adresse de livraison</Label>
                  <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Quartier, ville" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="font-display font-bold">Type d'achat</h3>
                <RadioGroup value={form.purchaseType} onValueChange={(v) => setForm({ ...form, purchaseType: v as "gros" | "detail" })}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="detail" id="detail" />
                    <Label htmlFor="detail">Au détail</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="gros" id="gros" />
                    <Label htmlFor="gros">En gros (-15%)</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="font-display font-bold">Mode de paiement</h3>
                <RadioGroup value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v as any })}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="livraison" id="livraison" />
                    <Label htmlFor="livraison">Paiement à la livraison</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="orange_money" id="orange" />
                    <Label htmlFor="orange">Orange Money</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="wave" id="wave" />
                    <Label htmlFor="wave">Wave</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
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
                {form.purchaseType === "gros" && (
                  <div className="mt-3 flex justify-between text-sm text-secondary font-medium">
                    <span>Réduction gros (-15%)</span>
                    <span>-{(total - grossTotal).toLocaleString()} F</span>
                  </div>
                )}
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{grossTotal.toLocaleString()} F CFA</span>
                  </div>
                </div>
                <Button type="submit" className="mt-4 w-full" size="lg" disabled={items.length === 0}>
                  Confirmer la commande
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Commande;
