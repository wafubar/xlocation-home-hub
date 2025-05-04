
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-8">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              XLocation - Votre partenaire immobilier de confiance pour la gestion locative 
              et la conciergerie Airbnb.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-primary">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/simulateur" className="text-sm text-gray-600 hover:text-primary">
                  Simulateur de loyer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#gestion" className="text-sm text-gray-600 hover:text-primary">
                  Gestion locative
                </Link>
              </li>
              <li>
                <Link to="/services#airbnb" className="text-sm text-gray-600 hover:text-primary">
                  Conciergerie Airbnb
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: contact@xlocation.fr
              </li>
              <li className="text-sm text-gray-600">
                Téléphone: 01 23 45 67 89
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} XLocation. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
