
import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const handleDownload = () => {
    // Cette URL devra pointer vers le fichier zip de votre projet
    const downloadUrl = "/xlocation-website.zip";
    
    // Créer un élément a temporaire pour le téléchargement
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "xlocation-website.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <div className="fixed bottom-8 right-8 z-10">
        <Button 
          onClick={handleDownload}
          variant="secondary"
          className="flex items-center gap-2 shadow-lg"
        >
          <Download size={18} />
          <span>Télécharger le site</span>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
