'use client';

import React, { useState, useEffect } from 'react';
import { TopNavigation } from '@components/website/property/PropertyDetails/TopNavigation';
import { PhotoGallery } from '@components/website/property/PropertyDetails/PhotoGallery';
import { FloatingNavCard } from '@components/website/property/PropertyDetails/FloatingNavCard';
import { PropertySections } from '@components/website/property/PropertyDetails/PropertySections';
import { RecommendedPropertiesComponent } from '@components/website/property/PropertyDetails/RecommendedPropertiesComponent';
import { PropertyType } from '@components/website/property/models';
import { useParams } from 'next/navigation';
import { usePropertyQueries } from '../libs/usePropertyQueries';

export default function PropertyDetailsComponentPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [activeSection, setActiveSection] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const { useGetProperty } = usePropertyQueries();
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useGetProperty(slug);

  /** ---------------------
   * HANDLERS
   * --------------------- */
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setActiveSection(sectionId);
  };

  // Update active section while scrolling
useEffect(() => {
  if (!property) return; // <-- guard inside

  const handleScroll = () => {
    const sections = [
      'overview',
      'about',
      'visit',
      'ask',
      'around',
      'details',
      'legal',
      'trust',
    ];
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
}, [property]); // only attach when property is ready

  const handleFavoriteClick = () => setIsFavorite(!isFavorite);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCompareClick = () => {
    console.log('Added to compare');
  };

  

  /** ---------------------
   * LOADING & ERROR STATES
   * --------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading property...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500">Failed to load property</p>
        <p className="text-sm text-muted-foreground">{error?.message}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No property found</p>
      </div>
    );
  }

  /** ---------------------
   * RENDER
   * --------------------- */
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        isFavorite={isFavorite}
        propertyType={property.type === PropertyType.HOUSE ? 'Houses' : 'Lands'}
        onFavoriteClick={handleFavoriteClick}
        onShareClick={handleShareClick}
        onCompareClick={handleCompareClick}
      />

      {/* Photo Gallery */}
      <PhotoGallery property={property} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-8">
            <PropertySections property={property} />
          </div>

          {/* Right Column - Floating card */}
          <div className="lg:col-span-4">
            <FloatingNavCard property={property} />
          </div>
        </div>

        {/* Recommended Properties */}
        <div className="mt-16 mb-8">
          <hr className="border-border mb-16" />
          <RecommendedPropertiesComponent />
        </div>
      </div>
    </div>
  );
}
