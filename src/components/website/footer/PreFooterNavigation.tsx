'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3rdparty/ui/tabs';

const PreFooterNavigation = () => {
  const [activeTab, setActiveTab] = useState('lands');

  const cities = ['lagos', 'abuja', 'enugu', 'asaba', 'port-harcourt', 'ibadan', 'kano', 'abeokuta', 'owerri', 'uyo', 'calabar'];
  
  const landCategories = [
    { title: 'Search By Cities', links: cities.map(city => ({ 
      href: `/lands/${city}`, 
      text: `Buy Verified Lands in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Land Types', links: [
      { href: '/lands/residential', text: 'Buy Verified Residential Lands' },
      { href: '/lands/commercial', text: 'Buy Verified Commercial Lands' },
      { href: '/lands/agricultural', text: 'Buy Verified Agricultural Lands' },
      { href: '/lands/industrial', text: 'Buy Verified Industrial Lands' },
      { href: '/lands/recreational', text: 'Buy Verified Recreational Lands' }
    ]},
    { title: 'Search By Documentation', links: [
      { href: '/lands/c-of-o', text: 'Buy Verified Lands with C of O' },
      { href: '/lands/governors-consent', text: "Buy Verified Lands with Governor's Consent" },
      { href: '/lands/deed-of-assignment', text: 'Buy Verified Lands with Deed of Assignment' },
      { href: '/lands/gazette', text: 'Buy Verified Lands with Gazette' },
      { href: '/lands/excision', text: 'Buy Verified Lands with Excision' },
      { href: '/lands/survey-plan', text: 'Buy Verified Lands with Survey Plan' },
      { href: '/lands/registered-title', text: 'Buy Verified Lands with Registered Title' }
    ]},
    { title: 'Search By Plot Sizes', links: [
      { href: '/lands/standard-plot', text: 'Buy Verified Lands in Standard Plots' },
      { href: '/lands/half-plot', text: 'Buy Verified Lands in Half Plots' },
      { href: '/lands/acres', text: 'Buy Verified Lands in Acres' },
      { href: '/lands/hectares', text: 'Buy Verified Lands in Hectares' }
    ]},
    { title: 'Search By Categories', links: [
      { href: '/lands/newly-listed', text: 'Buy Newly Listed Verified Lands' },
      { href: '/lands/gated-estate', text: 'Buy Verified Gated Estate Lands' },
      { href: '/lands/luxury', text: 'Buy Verified Luxury Lands' },
      { href: '/lands/affordable', text: 'Buy Verified Affordable Lands' },
      { href: '/lands/distress-sale', text: 'Buy Verified Distress Sale Lands' }
    ]}
  ];

  const houseCategories = [
    { title: 'Search By Cities', links: cities.map(city => ({ 
      href: `/houses/${city}`, 
      text: `Buy Verified Houses in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Property Types', links: [
      { href: '/houses/apartments', text: 'Buy Verified Apartments / Flats' },
      { href: '/houses/duplexes', text: 'Buy Verified Duplexes' },
      { href: '/houses/bungalows', text: 'Buy Verified Bungalows' },
      { href: '/houses/terraces', text: 'Buy Verified Terraces' },
      { href: '/houses/detached', text: 'Buy Verified Detached Houses' },
      { href: '/houses/semi-detached', text: 'Buy Verified Semi-Detached Houses' },
      { href: '/houses/mansions', text: 'Buy Verified Mansions / Luxury Homes' },
      { href: '/houses/shortlets', text: 'Buy Verified Shortlets / Serviced Apartments' }
    ]},
    { title: 'Search By Categories', links: [
      { href: '/houses/newly-listed', text: 'Buy Newly Listed Verified Houses' },
      { href: '/houses/gated-estate', text: 'Buy Verified Gated Estate Houses' },
      { href: '/houses/luxury', text: 'Buy Verified Luxury Houses' },
      { href: '/houses/affordable', text: 'Buy Verified Affordable Houses' },
      { href: '/houses/mid-range', text: 'Buy Verified Mid-Range Houses' },
      { href: '/houses/distress-sale', text: 'Buy Verified Distress Sale Houses' },
      { href: '/houses/rent-to-own', text: 'Buy Verified Rent-to-Own Houses' },
      { href: '/houses/furnished', text: 'Buy Verified Furnished Houses' },
      { href: '/houses/unfurnished', text: 'Buy Verified Unfurnished Houses' },
      { href: '/houses/newly-built', text: 'Buy Verified Newly Built Houses' },
      { href: '/houses/old', text: 'Buy Verified Old Houses' },
      { href: '/houses/smart-homes', text: 'Buy Verified Smart Homes' },
      { href: '/houses/waterfront', text: 'Buy Verified Waterfront Houses' },
      { href: '/houses/pool', text: 'Buy Verified Houses with Pool' }
    ]},
    { title: 'Search By Purpose / Use', links: [
      { href: '/houses/residential', text: 'Buy Verified Residential Homes' },
      { href: '/houses/office-spaces', text: 'Buy Verified Office Spaces' },
      { href: '/houses/shops-malls', text: 'Buy Verified Shops / Malls' },
      { href: '/houses/hotels', text: 'Buy Verified Hotels' },
      { href: '/houses/hostels', text: 'Buy Verified Hostels' },
      { href: '/houses/filling-stations', text: 'Buy Verified Filling Stations' },
      { href: '/houses/warehouses', text: 'Buy Verified Warehouses' },
      { href: '/houses/mixed-use', text: 'Buy Verified Mixed-Use Properties' }
    ]}
  ];

  const serviceCategories = [
    { title: 'Search By Survey & Title Verification', links: cities.map(city => ({ 
      href: `/services/survey-title-verification/${city}`, 
      text: `Verified Survey & Title Verification in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Property Valuation', links: cities.map(city => ({ 
      href: `/services/property-valuation/${city}`, 
      text: `Verified Property Valuation Service in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Legal Documentation', links: cities.map(city => ({ 
      href: `/services/legal-documentation/${city}`, 
      text: `Verified Legal Documentation Support in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Property Management', links: cities.map(city => ({ 
      href: `/services/property-management/${city}`, 
      text: `Verified Property Management Service in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Building Inspection', links: cities.map(city => ({ 
      href: `/services/building-inspection/${city}`, 
      text: `Verified Building Inspection Service in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Interior Design', links: cities.map(city => ({ 
      href: `/services/interior-design/${city}`, 
      text: `Verified Interior Design Consultation in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Mortgage Advisory', links: cities.map(city => ({ 
      href: `/services/mortgage-advisory/${city}`, 
      text: `Verified Mortgage Advisory Service in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Property Photography', links: cities.map(city => ({ 
      href: `/services/property-photography/${city}`, 
      text: `Verified Property Photography in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))},
    { title: 'Search By Property Marketing', links: cities.map(city => ({ 
      href: `/services/property-marketing/${city}`, 
      text: `Verified Property Marketing in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`
    }))}
  ];

  const LinkCategory = ({ category }: { category: { title: string; links: { href: string; text: string }[] } }) => (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-foreground">{category.title}</h3>
      <div className="space-y-2">
        {category.links.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            title={link.text}
            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.text}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-8">
            Inspiration for future property purchases
          </h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="lands" className="text-sm font-medium">
                Lands
              </TabsTrigger>
              <TabsTrigger value="houses" className="text-sm font-medium">
                Houses
              </TabsTrigger>
              <TabsTrigger value="services" className="text-sm font-medium">
                Services
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {activeTab === "lands" && (
                <TabsContent value="lands" className="mt-0">
                  <motion.div
                    key="lands"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                  >
                    {landCategories.map((category, index) => (
                      <LinkCategory key={index} category={category} />
                    ))}
                  </motion.div>
                </TabsContent>
              )}

              {activeTab === "houses" && (
                <TabsContent value="houses" className="mt-0">
                  <motion.div
                    key="houses"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  >
                    {houseCategories.map((category, index) => (
                      <LinkCategory key={index} category={category} />
                    ))}
                  </motion.div>
                </TabsContent>
              )}

              {activeTab === "services" && (
                <TabsContent value="services" className="mt-0">
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                  >
                    {serviceCategories.map((category, index) => (
                      <LinkCategory key={index} category={category} />
                    ))}
                  </motion.div>
                </TabsContent>
              )}
            </AnimatePresence>

          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default PreFooterNavigation;
