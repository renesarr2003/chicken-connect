import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-16">
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-bold text-primary mb-3">🐔 PouletExpress</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Votre fournisseur de poulets frais et de qualité. Vente en gros et au détail pour particuliers et professionnels.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +221 77 123 45 67</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@pouletexpress.sn</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Dakar, Sénégal</p>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold mb-3">Paiement accepté</h4>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Orange Money</span>
            <span className="rounded-md bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">Wave</span>
            <span className="rounded-md bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">À la livraison</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        © 2026 PouletExpress. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
