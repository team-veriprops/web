"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Ruler, Shield, CheckCircle, Clock, Building2, Car, Zap, Droplets, Wifi, Trash2, MapIcon, School, Building, ShoppingBag, Bus, CloudRain, Construction, Dot, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@3rdparty/ui/card';
import { Badge } from '@3rdparty/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3rdparty/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3rdparty/ui/tabs';
import { PropertyType, QueryPropertyDto } from '@components/website/property/models';
import { formatMeasurement, formatMoney } from '@lib/utils';

interface PropertySectionsProps {
  property: QueryPropertyDto;
}

export const PropertySections: React.FC<PropertySectionsProps> = ({ property }) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("4.5rem"); // ≈3 lines
  const contentRef = useRef<HTMLParagraphElement>(null);

  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (expanded && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("4.5rem"); // collapsed height (3 lines approx)
    }
  }, [expanded]);

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <motion.section
        id="overview"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-8 relative">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  <Dot size={40} className='inline text-accent-strong' />
                  For Sale
                </h2>
                <p className="text-3xl font-bold text-primary">{formatMoney(property?.price!)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Plot size</span>
                  <p className="font-medium">{formatMeasurement(property?.plot_size!)}</p>
                </div>

                { property.type === PropertyType.HOUSE && (<>
                <div>
                  <span className="text-muted-foreground">Bedrooms</span>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bathrooms</span>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Parking</span>
                  <p className="font-medium">{property.parking?.spaces} spaces</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Lot size</span>
                  <p className="font-medium">{formatMeasurement(property.exterior_description?.lot_size!)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Year built</span>
                  <p className="font-medium">{property.year_built}</p>
                </div></>)}
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Address</span>
                <p className="font-medium">{property?.location?.address}</p>
              </div>

              <Badge variant="secondary" className="mb-6 absolute top-1 right-1">
                {property.type}
              </Badge>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">About this Property</h2>
          
          <div style={{ maxHeight }} className='overflow-hidden transition-all duration-500 ease-in-out'>
          <p ref={contentRef} className={`text-muted-foreground mb-6 leading-relaxed ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}>
            {property.description}
          </p>
      </div>
      
          <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 hover:underline font-medium inline text-left"
      >
        {expanded ? (
           <span>Show less <ChevronUp size={20} className=' inline' /></span>
        ) : (
          <span>Show more <ChevronDown size={20} className=' inline' /></span>
        )}
      </button>
          
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-foreground">Key Highlights</h3>
            <ul className="space-y-2">
              {property.type === PropertyType.HOUSE && property.highlights!.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">{property.days_on_veriprops}</p>
              <p className="text-sm text-muted-foreground">on Veriprops</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">{property.type === PropertyType.HOUSE? property.home_type : property.land_type}</p>
              <p className="text-sm text-muted-foreground">Property type</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Ruler className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">{formatMoney(property?.price_per_sqm!)}</p>
              <p className="text-sm text-muted-foreground">Price per sqm</p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Visit Section */}
      <motion.section
        id="visit"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tour this Property</h2>
          <p className="text-muted-foreground mb-6">
            {"Schedule a private tour with one of our experienced agents. We'll show you around and answer all your questions."}
          </p>
          <button className="btn-primary px-8 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5">
            Check Tour Availability
          </button>
        </Card>
      </motion.section>

      {/* Ask Veriprops Section */}
      <motion.section
        id="ask"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ask Veriprops</h2>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                V
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {"Hi! I'm here to help you with any questions about this property. Feel free to ask about the neighborhood, pricing, or anything else!"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Veriprops Agent • Just now</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <input
                type="text"
                placeholder="Type your question here..."
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Around Property Section */}
      <motion.section
        id="around"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Around this Property</h2>
          
          <div className="mb-6">
            <div className="w-full h-48 bg-muted/50 rounded-lg flex items-center justify-center">
              <MapIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          
          <Tabs defaultValue="schools" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schools">Schools</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="places">Places</TabsTrigger>
              <TabsTrigger value="transit">Transit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schools" className="mt-4">
              <div className="space-y-3">
                {property.nearby_places?.schools.map((school, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{school.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatMeasurement(school.distance)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hospitals" className="mt-4">
              <div className="space-y-3">
                {property.nearby_places?.hospitals.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{hospital.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatMeasurement(hospital.distance)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="places" className="mt-4">
              <div className="space-y-3">
                {property.nearby_places?.places.map((place, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{place.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatMeasurement(place.distance)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="transit" className="mt-4">
              <div className="space-y-3">
                {property.nearby_places?.transit.map((transit, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{transit.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatMeasurement(transit.distance)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.section>

      {/* Property Details Section */}
      <motion.section
        id="details"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Property Details</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {property.type === PropertyType.HOUSE && (<AccordionItem value="interior">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span>Interior</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                    <p className="font-medium">{property.interior_description?.bedrooms}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                    <p className="font-medium">{property.interior_description?.bathrooms}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Flooring</span>
                    <p className="font-medium">{property.interior_description?.flooring}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Kitchen</span>
                    <p className="font-medium">{property.interior_description?.kitchens}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Living Area</span>
                    <p className="font-medium">{property.interior_description?.living_areas}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Dining Area</span>
                    <p className="font-medium">{property.interior_description?.dining_areas}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Other Rooms</span>
                    <p className="font-medium">{property.interior_description?.other_rooms}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>)}
            
            {property.type === PropertyType.HOUSE && (<AccordionItem value="parking">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span>Parking</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Parking Spaces</span>
                      <p className="font-medium">{property.parking?.spaces}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Garage Type</span>
                      <p className="font-medium">{property.parking?.garage_type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Badge variant={property.parking?.covered ? "default" : "secondary"}>
                      {property.parking?.covered ? "✓" : "✗"} Covered
                    </Badge>
                    <Badge variant={property.parking?.visitor_parking ? "default" : "secondary"}>
                      {property.parking?.visitor_parking ? "✓" : "✗"} Visitor Parking
                    </Badge>
                    <Badge variant={!property.parking?.street ? "default" : "secondary"}>
                      {!property.parking?.street ? "✓" : "✗"} No Street Parking
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>)}
            
            <AccordionItem value="utilities">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Utilities</span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Electricity</span>
                    <Badge variant={property.utilities?.electricity ? "default" : "secondary"}>
                      {property.utilities?.electricity ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Water</span>
                    <Badge variant={property.utilities?.water ? "default" : "secondary"}>
                      {property.utilities?.water ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Internet</span>
                    <Badge variant={property.utilities?.internet ? "default" : "secondary"}>
                      {property.utilities?.internet ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Waste Disposal</span>
                    <Badge variant={property.utilities?.waste_disposal ? "default" : "secondary"}>
                      {property.utilities?.waste_disposal ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Construction className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Road State</span>
                    <Badge variant={"default"}>
                      {property.utilities?.road}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CloudRain className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Drainage</span>
                    <Badge variant={property.utilities?.drainage ? "default" : "secondary"}>
                      {property.utilities?.drainage ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.section>

      {/* Legal & Verification Section */}
      <motion.section
        id="legal"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Legal & Verification</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-success-light rounded-lg">
              <Shield className="h-6 w-6 text-success" />
              <div>
                <h3 className="font-semibold text-success">Veriprops Verified</h3>
                <p className="text-sm text-success-foreground">
                  This property has been verified by our team for authenticity and legal compliance.
                </p>
              </div>
            </div>
            
            <div className="bg-accent-light p-4 rounded-lg">
              <h3 className="font-semibold text-accent mb-2">Protection Guarantee</h3>
              <p className="text-sm text-accent-foreground">
                If anything goes wrong, Veriprops backs you with our legal team and buyer protection program.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Title Documents</span>
                <div className="space-y-1 mt-1">
                  {property.verification?.title_docs.map((doc, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Zoning</span>
                <p className="font-medium">{property.verification?.zoning}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Development Stage</span>
                <p className="font-medium">{property.verification?.development_stage}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Trust & Safety Section */}
      <motion.section
        id="trust"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariant}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Trust & Safety</h2>
          
          <div className="space-y-4">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Buyer Protection</h3>
              <p className="text-sm text-primary-foreground">
                Your payment is held in escrow until the property transfer is completed. We ensure every transaction is secure and transparent.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">How Escrow Works</h3>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>You make your payment to Veriprops escrow account</li>
                <li>We verify all documents and coordinate the transfer</li>
                <li>Funds are released only when you receive the property title</li>
                <li>Our legal team handles all paperwork and ensures compliance</li>
              </ol>
            </div>
          </div>
        </Card>
      </motion.section>
    </div>
  );
};