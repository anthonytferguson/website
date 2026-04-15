import { Link } from "react-router-dom";
import logoSrc from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src={logoSrc} alt="Tendre Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional home maintenance services you can trust. From lawns to decks, we've got you covered.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services#lawn" className="hover:text-primary">Lawn Maintenance</Link></li>
              <li><Link to="/services#decks" className="hover:text-primary">Decks & Fences</Link></li>
              <li><Link to="/services#rubbish" className="hover:text-primary">Rubbish Removal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: hello@tendre.services</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 8am-6pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tendre Home Maintenance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
