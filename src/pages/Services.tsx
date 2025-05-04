
import Layout from "@/components/layout/Layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Home, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Services
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Des solutions adaptées à vos besoins pour la gestion de vos biens immobiliers
            </p>
          </div>
        </div>
      </section>

      {/* Gestion Locative */}
      <section id="gestion" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Home className="text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Gestion Locative</h2>
              <p className="text-gray-600 mb-6">
                Notre service de gestion locative prend en charge l'ensemble des tâches liées à la location de votre bien immobilier. De la recherche de locataires à la gestion quotidienne, nous nous occupons de tout pour vous simplifier la vie.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Recherche et sélection rigoureuse des locataires",
                  "Rédaction et signature des baux",
                  "États des lieux d'entrée et de sortie",
                  "Gestion des loyers et des charges",
                  "Suivi technique et interventions",
                  "Gestion administrative et comptable"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/simulateur">Simuler vos revenus</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                alt="Gestion locative"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conciergerie Airbnb */}
      <section id="airbnb" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Conciergerie Airbnb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 animate-slide-in">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Conciergerie Airbnb</h2>
              <p className="text-gray-600 mb-6">
                Maximisez vos revenus avec notre service de conciergerie Airbnb. Nous nous occupons de toute la gestion de votre bien pour la location courte durée, vous permettant de générer des rendements supérieurs sans contraintes.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Création et optimisation de l'annonce",
                  "Gestion complète des réservations",
                  "Accueil des voyageurs et remise des clés",
                  "Nettoyage et préparation entre chaque séjour",
                  "Assistance 24/7 pour vos hôtes",
                  "Rapports mensuels détaillés"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/simulateur">Simuler vos revenus</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Tarifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Gestion Simple */}
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-2">Gestion Simple</h3>
                <div className="text-3xl font-bold mb-1">5%<span className="text-sm font-normal text-gray-500"> / mois</span></div>
                <p className="text-gray-500">Des loyers perçus</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {[
                    "Recherche de locataires",
                    "Rédaction du bail",
                    "Gestion des loyers",
                    "État des lieux",
                    "Support email"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Gestion Premium */}
            <div className="border rounded-lg overflow-hidden shadow-lg border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl">
                Populaire
              </div>
              <div className="p-6 bg-primary/10">
                <h3 className="text-xl font-bold mb-2">Gestion Premium</h3>
                <div className="text-3xl font-bold mb-1">7%<span className="text-sm font-normal text-gray-500"> / mois</span></div>
                <p className="text-gray-500">Des loyers perçus</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {[
                    "Tout de l'offre Simple",
                    "Gestion des interventions",
                    "Assurance loyers impayés",
                    "Reporting mensuel",
                    "Support téléphonique 7j/7",
                    "Conseils fiscaux"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Conciergerie Airbnb */}
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-2">Conciergerie Airbnb</h3>
                <div className="text-3xl font-bold mb-1">15%<span className="text-sm font-normal text-gray-500"> / mois</span></div>
                <p className="text-gray-500">Des revenus générés</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {[
                    "Création d'annonce optimisée",
                    "Gestion des réservations",
                    "Accueil des voyageurs",
                    "Nettoyage entre séjours",
                    "Assistance 24/7",
                    "Photos professionnelles"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
