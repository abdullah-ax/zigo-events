
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MobileAppLayout from "@/components/MobileAppLayout";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MobileAppLayout hideNavigation>
      <Header title="Page Not Found" />
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90"
        >
          Return to Home
        </Button>
      </div>
    </MobileAppLayout>
  );
};

export default NotFound;
