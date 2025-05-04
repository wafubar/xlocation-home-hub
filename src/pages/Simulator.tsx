
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Home, MapPin } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface SimulationResult {
  monthlyRent: number;
  yearlyRent: number;
  xLocationFees: number;
  netIncome: number;
}

interface AirbnbResult extends SimulationResult {
  occupancyRate: number;
  nightlyRate: number;
  totalNights: number;
}

const locationFactors = {
  "paris": 1.8,
  "lyon": 1.3,
  "marseille": 1.2,
  "bordeaux": 1.25,
  "toulouse": 1.15,
  "nice": 1.4,
  "nantes": 1.2,
  "montpellier": 1.15,
  "strasbourg": 1.1,
  "lille": 1.05
};

const propertyTypeFactors = {
  "apartment": 1,
  "house": 1.1,
  "studio": 0.9
};

const Simulator = () => {
  const { toast } = useToast();
  const [size, setSize] = useState<number>(50);
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("apartment");
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [amenities, setAmenities] = useState<number>(3);
  const [standardResult, setStandardResult] = useState<SimulationResult | null>(null);
  const [airbnbResult, setAirbnbResult] = useState<AirbnbResult | null>(null);

  const calculateStandardRent = () => {
    if (!location || !size) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const baseRate = 12; // €/m²
    const locationFactor = locationFactors[location as keyof typeof locationFactors] || 1;
    const typeFactor = propertyTypeFactors[propertyType as keyof typeof propertyTypeFactors];
    const bedroomFactor = 1 + (bedrooms * 0.05);
    const amenitiesFactor = 1 + (amenities * 0.01);

    const monthlyRent = baseRate * size * locationFactor * typeFactor * bedroomFactor * amenitiesFactor;
    const yearlyRent = monthlyRent * 12;
    const xLocationFees = yearlyRent * 0.07; // 7% fee
    const netIncome = yearlyRent - xLocationFees;

    setStandardResult({
      monthlyRent: Math.round(monthlyRent),
      yearlyRent: Math.round(yearlyRent),
      xLocationFees: Math.round(xLocationFees),
      netIncome: Math.round(netIncome)
    });
  };

  const calculateAirbnbRent = () => {
    if (!location || !size) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const baseNightlyRate = 70; // Base rate in euros
    const locationFactor = locationFactors[location as keyof typeof locationFactors] || 1;
    const typeFactor = propertyTypeFactors[propertyType as keyof typeof propertyTypeFactors];
    const sizeFactor = 1 + (size / 100);
    const bedroomFactor = 1 + (bedrooms * 0.15);
    const amenitiesFactor = 1 + (amenities * 0.03);

    // Calculate nightly rate based on factors
    const nightlyRate = baseNightlyRate * locationFactor * typeFactor * sizeFactor * bedroomFactor * amenitiesFactor;
    
    // Calculate occupancy rate based on location (premium locations get higher occupancy)
    const baseOccupancy = 0.65; // 65% base occupancy
    const occupancyRate = Math.min(0.85, baseOccupancy * (locationFactor / 1.2));
    
    // Calculate total nights occupied per year
    const totalNights = Math.round(365 * occupancyRate);
    
    // Calculate yearly income
    const yearlyRent = nightlyRate * totalNights;
    
    // XLocation takes 15% for Airbnb management
    const xLocationFees = yearlyRent * 0.15;
    const netIncome = yearlyRent - xLocationFees;

    setAirbnbResult({
      nightlyRate: Math.round(nightlyRate),
      occupancyRate: Math.round(occupancyRate * 100),
      totalNights,
      monthlyRent: Math.round(yearlyRent / 12),
      yearlyRent: Math.round(yearlyRent),
      xLocationFees: Math.round(xLocationFees),
      netIncome: Math.round(netIncome)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simulateur de Revenus Locatifs
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Estimez vos revenus potentiels en location classique ou en location courte durée
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="standard" className="text-base py-3">
                  <Home className="mr-2 h-4 w-4" />
                  Location Classique
                </TabsTrigger>
                <TabsTrigger value="airbnb" className="text-base py-3">
                  <MapPin className="mr-2 h-4 w-4" />
                  Airbnb
                </TabsTrigger>
              </TabsList>

              <TabsContent value="standard">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Simulation de Location Classique</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="size">Surface (m²)*</Label>
                        <Input 
                          id="size" 
                          type="number" 
                          min={10} 
                          value={size} 
                          onChange={(e) => setSize(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Ville*</Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paris">Paris</SelectItem>
                            <SelectItem value="lyon">Lyon</SelectItem>
                            <SelectItem value="marseille">Marseille</SelectItem>
                            <SelectItem value="bordeaux">Bordeaux</SelectItem>
                            <SelectItem value="toulouse">Toulouse</SelectItem>
                            <SelectItem value="nice">Nice</SelectItem>
                            <SelectItem value="nantes">Nantes</SelectItem>
                            <SelectItem value="montpellier">Montpellier</SelectItem>
                            <SelectItem value="strasbourg">Strasbourg</SelectItem>
                            <SelectItem value="lille">Lille</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="property-type">Type de bien</Label>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Appartement</SelectItem>
                            <SelectItem value="house">Maison</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Nombre de chambres</Label>
                        <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Studio (0)</SelectItem>
                            <SelectItem value="1">1 chambre</SelectItem>
                            <SelectItem value="2">2 chambres</SelectItem>
                            <SelectItem value="3">3 chambres</SelectItem>
                            <SelectItem value="4">4 chambres</SelectItem>
                            <SelectItem value="5">5+ chambres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="amenities">Équipements</Label>
                        <span className="text-sm text-muted-foreground">{amenities}/10</span>
                      </div>
                      <Slider 
                        id="amenities"
                        min={0}
                        max={10}
                        step={1}
                        value={[amenities]}
                        onValueChange={(values) => setAmenities(values[0])}
                      />
                      <p className="text-sm text-muted-foreground">
                        Ascenseur, balcon, parking, climatisation, etc.
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={calculateStandardRent}
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculer
                    </Button>
                  </div>

                  {standardResult && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border animate-fade-in">
                      <h3 className="text-xl font-semibold mb-4">Résultats de la simulation</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Loyer mensuel estimé</span>
                          <span className="font-bold text-lg">{formatCurrency(standardResult.monthlyRent)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span>Revenu annuel estimé</span>
                          <span className="font-medium">{formatCurrency(standardResult.yearlyRent)}</span>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Frais de gestion XLocation (7%)</span>
                          <span>-{formatCurrency(standardResult.xLocationFees)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Revenu net annuel</span>
                          <span className="font-bold text-lg text-primary">{formatCurrency(standardResult.netIncome)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="airbnb">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Simulation de Location Courte Durée (Airbnb)</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="airbnb-size">Surface (m²)*</Label>
                        <Input 
                          id="airbnb-size" 
                          type="number" 
                          min={10} 
                          value={size} 
                          onChange={(e) => setSize(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="airbnb-location">Ville*</Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paris">Paris</SelectItem>
                            <SelectItem value="lyon">Lyon</SelectItem>
                            <SelectItem value="marseille">Marseille</SelectItem>
                            <SelectItem value="bordeaux">Bordeaux</SelectItem>
                            <SelectItem value="toulouse">Toulouse</SelectItem>
                            <SelectItem value="nice">Nice</SelectItem>
                            <SelectItem value="nantes">Nantes</SelectItem>
                            <SelectItem value="montpellier">Montpellier</SelectItem>
                            <SelectItem value="strasbourg">Strasbourg</SelectItem>
                            <SelectItem value="lille">Lille</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="airbnb-property-type">Type de bien</Label>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Appartement</SelectItem>
                            <SelectItem value="house">Maison</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="airbnb-bedrooms">Nombre de chambres</Label>
                        <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Studio (0)</SelectItem>
                            <SelectItem value="1">1 chambre</SelectItem>
                            <SelectItem value="2">2 chambres</SelectItem>
                            <SelectItem value="3">3 chambres</SelectItem>
                            <SelectItem value="4">4 chambres</SelectItem>
                            <SelectItem value="5">5+ chambres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="airbnb-amenities">Équipements</Label>
                        <span className="text-sm text-muted-foreground">{amenities}/10</span>
                      </div>
                      <Slider 
                        id="airbnb-amenities"
                        min={0}
                        max={10}
                        step={1}
                        value={[amenities]}
                        onValueChange={(values) => setAmenities(values[0])}
                      />
                      <p className="text-sm text-muted-foreground">
                        Wifi, TV, cuisine équipée, balcon, piscine, etc.
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={calculateAirbnbRent}
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculer
                    </Button>
                  </div>

                  {airbnbResult && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border animate-fade-in">
                      <h3 className="text-xl font-semibold mb-4">Résultats de la simulation</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Tarif moyen par nuit</span>
                          <span className="font-medium">{formatCurrency(airbnbResult.nightlyRate)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Taux d'occupation annuel</span>
                          <span className="font-medium">{airbnbResult.occupancyRate}% ({airbnbResult.totalNights} nuits)</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span>Revenu mensuel moyen</span>
                          <span className="font-bold text-lg">{formatCurrency(airbnbResult.monthlyRent)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Revenu annuel estimé</span>
                          <span className="font-medium">{formatCurrency(airbnbResult.yearlyRent)}</span>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Frais de conciergerie XLocation (15%)</span>
                          <span>-{formatCurrency(airbnbResult.xLocationFees)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Revenu net annuel</span>
                          <span className="font-bold text-lg text-primary">{formatCurrency(airbnbResult.netIncome)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {(standardResult && airbnbResult) && (
              <div className="mt-10 p-6 bg-primary/5 rounded-lg border animate-fade-in">
                <h3 className="text-xl font-semibold mb-4">Comparaison des revenus</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Location Classique</h4>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(standardResult.netIncome)}<span className="text-sm font-normal text-gray-500">/an</span></p>
                    <p className="text-sm text-gray-500">{formatCurrency(standardResult.monthlyRent)}/mois</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Location Airbnb</h4>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(airbnbResult.netIncome)}<span className="text-sm font-normal text-gray-500">/an</span></p>
                    <p className="text-sm text-gray-500">{formatCurrency(airbnbResult.monthlyRent)}/mois</p>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium">Potentiel supplémentaire avec Airbnb: {formatCurrency(airbnbResult.netIncome - standardResult.netIncome)}/an</p>
                  <p className="mt-2 text-gray-600">Ces estimations sont indicatives et peuvent varier selon différents facteurs. Contactez-nous pour une évaluation personnalisée.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Simulator;
