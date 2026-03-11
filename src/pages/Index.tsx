import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const popularProducts = products.filter((p) => p.popular);

const features = [
  { icon: Truck, title: "Livraison rapide", desc: "Livré chez vous en 24h" },
  { icon: Shield, title: "Qualité garantie", desc: "Poulets frais et contrôlés" },
  { icon: Clock, title: "Service 7j/7", desc: "Commandez à tout moment" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl"
            >
              Poulets frais,{" "}
              <span className="text-primary">livrés chez vous</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-lg text-muted-foreground md:text-xl"
            >
              Vente en gros et au détail. Poulet entier, découpé, fermier ou congelé — qualité supérieure au meilleur prix.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Link to="/catalogue">
                <Button size="lg" className="gap-2 font-body text-base">
                  Voir le catalogue <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button size="lg" variant="outline" className="font-body text-base">
                  Achat en gros
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-card py-10">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4 md:gap-16">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Produits populaires</h2>
              <p className="mt-1 text-sm text-muted-foreground">Les plus demandés par nos clients</p>
            </div>
            <Link to="/catalogue">
              <Button variant="ghost" className="gap-1 text-primary">
                Tout voir <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
