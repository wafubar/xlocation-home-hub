
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin, Home, Calculator } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Votre partenaire de confiance pour la gestion immobilière
            </h1>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Maximisez vos revenus locatifs avec notre expertise en gestion locative et conciergerie Airbnb
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg">
                <Link to="/simulateur">Simuler vos revenus</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Home className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Gestion Locative</h3>
              <p className="text-gray-600 mb-6">
                Une gestion complète de votre bien immobilier, de la recherche de locataires à la gestion quotidienne.
              </p>
              <Button asChild variant="outline">
                <Link to="/services#gestion">En savoir plus</Link>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Conciergerie Airbnb</h3>
              <p className="text-gray-600 mb-6">
                Maximisez vos revenus avec notre service de conciergerie Airbnb. Gestion des réservations, accueil des voyageurs et entretien.
              </p>
              <Button asChild variant="outline">
                <Link to="/services#airbnb">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir XLocation ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Expertise locale</h3>
              <p className="text-gray-600">
                Notre connaissance approfondie du marché immobilier local nous permet de valoriser votre propriété de manière optimale.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service personnalisé</h3>
              <p className="text-gray-600">
                Nous adaptons nos services à vos besoins spécifiques pour vous offrir une expérience sur mesure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Transparence totale</h3>
              <p className="text-gray-600">
                Nous vous tenons informé à chaque étape et vous fournissons des rapports détaillés sur la gestion de votre bien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à optimiser vos revenus locatifs?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Utilisez notre simulateur pour estimer vos revenus potentiels et découvrez comment nos services peuvent vous aider à les maximiser.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/simulateur">
                <Calculator className="mr-2 h-5 w-5" />
                Simuler mes revenus
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
