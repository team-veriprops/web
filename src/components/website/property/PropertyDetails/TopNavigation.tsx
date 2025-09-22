import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, GitCompareArrows, ArrowLeft } from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
import { useRouter, usePathname } from "next/navigation";

interface TopNavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  isFavorite: boolean;
  propertyType: string;
  onFavoriteClick: () => void;
  onShareClick: () => void;
  onCompareClick: () => void;
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About' },
  { id: 'visit', label: 'See this home in person' },
  { id: 'ask', label: 'Ask Veriprops' },
  { id: 'around', label: 'Around this property' },
  { id: 'details', label: 'Property details' },
  { id: 'legal', label: 'Legal & Verification' },
  { id: 'trust', label: 'Trust & Safety' }
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeSection,
  onSectionClick,
  isFavorite,
  propertyType,
  onFavoriteClick,
  onShareClick,
  onCompareClick
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const goBackToListing = () => {
    // Example: /properties/lands/prop_037
    // Strip off the last segment
    const segments = pathname.split("/");
    segments.pop(); // remove "prop_037"
    const parentPath = segments.join("/"); // /properties/lands

    router.push(parentPath);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-51 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Section Tabs */}
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              {/* <Link href="/"> */}
                <Button variant="ghost"
                onClick={goBackToListing}
                >
                  <ArrowLeft size={20}  />
                  {propertyType}
                </Button>
              {/* </Link> */}

            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onFavoriteClick}
              className={`heart-button ${isFavorite ? 'text-heart' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onShareClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onCompareClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <GitCompareArrows className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};