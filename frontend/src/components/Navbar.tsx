
import { Save, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-surface/80 backdrop-blur-xl border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-teal to-accent-blue bg-clip-text text-transparent">
                ResumeForge
              </h1>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm transition-colors ${
                  isActive('/') 
                    ? 'text-accent-teal' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/my-resumes" 
                className={`text-sm transition-colors ${
                  isActive('/my-resumes') 
                    ? 'text-accent-teal' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                My Resumes
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Resume
            </Button>
            <Button size="sm" className="bg-accent-teal hover:bg-accent-teal/80">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-dark-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm transition-colors ${
                  isActive('/') 
                    ? 'text-accent-teal' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/my-resumes" 
                className={`text-sm transition-colors ${
                  isActive('/my-resumes') 
                    ? 'text-accent-teal' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Resumes
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Resume
                </Button>
                <Button size="sm" className="bg-accent-teal hover:bg-accent-teal/80">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
