'use client'

import React, { useState, useEffect } from 'react';
import { TopNavigation } from '@components/PropertyDetails/TopNavigation';
import { PhotoGallery } from '@components/PropertyDetails/PhotoGallery';
import { FloatingNavCard } from '@components/PropertyDetails/FloatingNavCard';
import { PropertySections } from '@components/PropertyDetails/PropertySections';
import { RecommendedProperties } from '@components/PropertyDetails/RecommendedProperties';
// import { mockPropertyDetails } from '@lib/propertyMockData';
import { PropertyType, type Property } from '@components/property/models';
import { mockApi } from '@data/seed';
import { useParams } from 'next/navigation';

const PropertyDetails = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [activeSection, setActiveSection] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<Property | null>();
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
      loadData();
  }, []);

  
  const loadData = async () => {
      try {
        setLoading(true);
        
        const [propertyData] = await Promise.all([
          mockApi.getPropertyBySlug(slug)
        ]);
        
        setProperty(propertyData);
        console.log('propertyData:', propertyData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
 };

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'about', 'visit', 'ask', 'around', 'details', 'legal', 'trust'];
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property!.title,
        text: `Check out this property: ${property!.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCompareClick = () => {
    // Mock compare functionality
    console.log('Added to compare');
  };

  if(!property){
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        isFavorite={isFavorite}
        propertyType={property?.type === PropertyType.HOUSE ? "Houses" : "Lands"}
        onFavoriteClick={handleFavoriteClick}
        onShareClick={handleShareClick}
        onCompareClick={handleCompareClick}
      />

      {/* Photo Gallery */}
      <PhotoGallery property={property!} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-8">
            <PropertySections property={property!} />
          </div>

          {/* Right Column - Spacer for floating card */}
          <div className="lg:col-span-4">
            {/* Floating Navigation Card */}
            <FloatingNavCard property={property!} />
          </div>
        </div>

        {/* Recommended Properties */}
        <div className="mt-16 mb-8">
          <hr className="border-border mb-16" />
          <RecommendedProperties slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
