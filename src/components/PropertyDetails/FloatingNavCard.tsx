import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowRight, HandCoins, DoorOpen } from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
import { Card } from '@3rdparty/ui/card';
import Link from 'next/link';
import { Money, Property, PropertyType } from '@components/property/models';
import { formatMeasurement, formatPrice } from '@lib/utils';

interface FloatingNavCardProps {
  property: Property;
}

export const FloatingNavCard: React.FC<FloatingNavCardProps> = ({ property }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide if at very top (photo gallery area)
      // setIsVisible(scrollTop > 400);
      
      // Stop at bottom before footer
      // setIsAtBottom(scrollTop + windowHeight > documentHeight - 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div
      className={`sticky top-22 z-50`}
    >
          
      <Card className="p-6 shadow-modal border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
            </p>
            <p className="text-sm text-muted-foreground">{property.type === PropertyType.HOUSE &&  (property.bedrooms + " beds • " + property.bathrooms + " baths •")} {formatMeasurement(property.plot_size)}</p>
          </div>

          <div className="space-y-3">
            {/* <Button className="w-full btn-primary text-base py-3">
              Request a Showing
            </Button> */}


            <Button variant="accent" size="xl" className='w-full' asChild>
              <Link href="https://calendly.com/appodus/30min" target="_blank" rel="noopener noreferrer">
                Request a Showing
                <DoorOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <span className="block text-xs font-normal opacity-90">
                Tour for free, no strings attached
              </span>
            
            <Button variant="outline" size="xl" className="w-full bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/">
              Start an Offer
              <HandCoins className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* <Button className="w-full btn-accent text-base py-3">
              Start an Offer
            </Button> */}
              <span className="block text-xs font-normal opacity-90">
                Make a winning offer with help of local agent
              </span>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Start Chat
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Veriprops Agent:</span> {property.owner?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              +234 7039018727
            </p>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};