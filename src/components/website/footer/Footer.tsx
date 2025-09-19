'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Facebook,
  Heart,
  ChevronDown,
  MapPin,
  HandCoins
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import { useGlobalSettings } from '@hooks/useGlobalSettings';
import { Language, TransactionCurrency } from '@components/property/models';

const Footer = () => {
  // const [language, setLanguage] = useState<'en' | 'fr'>('en');
  // const [currency, setCurrency] = useState<'NGN' | 'USD' | 'EUR' | 'GBP'>('NGN');
  const { settings, setLanguage, setCurrency, reset } = useGlobalSettings();

  const languageOptions = [
    { value: Language.ENGLISH as const, label: 'English (US)', flag: '🇺🇸' },
    { value: Language.FRENCH as const, label: 'Français (FR)', flag: '🇫🇷' }
  ];

  const currencyOptions = [
    { value: TransactionCurrency.NGN as const, label: 'Nigerian Naira', symbol: '₦', code: 'NGN' },
    { value: TransactionCurrency.USD as const, label: 'US Dollar', symbol: '$', code: 'USD' },
    { value: TransactionCurrency.EUR as const, label: 'Euro', symbol: '€', code: 'EUR' },
    { value: TransactionCurrency.GBP as const, label: 'British Pound', symbol: '£', code: 'GBP' }
  ];

  const getCurrentLanguage = () => {
    return languageOptions.find(lang => lang.value === settings.language);
  };

  const getCurrentCurrency = () => {
    return currencyOptions.find(curr => curr.value === settings.currency);
  };

  const socialIcons = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Facebook, href: '#', label: 'Facebook' }
  ];

  const workWithUsLinks = [
    { text: 'As a Content Creator/Influencer', href: '#' },
    { text: 'As an Affiliate Partner', href: '#' },
    { text: 'As a Property Consultant', href: '#' }
  ];

  const quickLinks = [
    { text: 'Sell your land', href: '#' },
    { text: 'Sell your house', href: '#' },
    { text: 'Sell your services', href: '#' },
    { text: 'How it works', href: '#' }
  ];

  const companyLinks = [
    { text: 'About us', href: '#' },
    { text: 'Contact us', href: '#' },
    { text: 'Careers', href: '#' },
    { text: 'In the Press', href: '#' },
    { text: 'Our Blog', href: '#' }
  ];

  const centerLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Sitemap', href: '#' }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* Row 1 - Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Column 1 - Logo and Description (spans 2 columns) */}
          <motion.div 
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">veriprops</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {'Nigeria’s trusted marketplace for verified properties and real estate services—connecting buyers, sellers, and professionals with confidence. In the rare event of a dispute, we stand firmly with our buyers, offering full support, including legal representation.'}
            </p>
              <div className="mt-14 text-muted-foreground ">
                <MapPin className="h-5 w-5 inline" /> <span> 23 Agodogba Street, Parkview, Ikoyi, Lagos NG.</span>
              </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-foreground font-semibold">
              {'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Company */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-foreground font-semibold">
              {'Company'}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Connect (Social Icons) */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-foreground font-semibold">
              {'Work with us'}
            </h4>
            
            <div className="flex flex-col space-y-12">
              <ul className="space-y-3">
              {workWithUsLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {socialIcons.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Row 2 - Bottom Bar */}
        <motion.div 
          className="border-t border-border pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Left - Copyright */}
            <div className="text-muted-foreground text-sm">
              © 2025 <span className="font-bold">veriprops</span>. {'All rights reserved.'}
            </div>

            {/* Center - Policy Links */}
            <div className="flex items-center space-x-2 text-sm">
              {centerLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                  {index < centerLinks.length - 1 && (
                    <span className="text-muted-foreground">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right - Language, Currency & Tagline */}
            <div className="flex flex-col items-center lg:items-end space-y-2">
              {/* First row - Language and Currency dropdowns */}
              <div className="flex items-center space-x-4">
                <Select value={settings.language} onValueChange={(value: Language) => setLanguage(value)}>
                  <SelectTrigger className="w-auto min-w-[140px] h-9 bg-muted hover:bg-muted/80 border-0 text-sm">
                    <div className="flex items-center space-x-2">
                      <Globe size={16} className="text-muted-foreground" />
                      <SelectValue>
                        <span className="flex items-center space-x-1">
                          <span>{getCurrentLanguage()?.flag}</span>
                          <span>{getCurrentLanguage()?.label}</span>
                        </span>
                      </SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="min-w-[160px] bg-popover border border-border shadow-lg z-50">
                    {languageOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{option.flag}</span>
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={settings.currency} onValueChange={(value: TransactionCurrency) => setCurrency(value)}>
                  <SelectTrigger className="w-auto min-w-[120px] h-9 bg-muted hover:bg-muted/80 border-0 text-sm">
                    <div className="flex items-center space-x-2">
                      <HandCoins size={16} className="text-muted-foreground" />
                      <SelectValue>
                        <span className="flex items-center space-x-1">
                          <span>{getCurrentCurrency()?.symbol}</span>
                          <span>{getCurrentCurrency()?.code}</span>
                        </span>
                      </SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="min-w-[160px] bg-popover border border-border shadow-lg z-50">
                    {currencyOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{option.symbol}</span>
                          <span>{option.code} - {option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Second row - Tagline */}
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>{'Built with'}</span>
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>{'for humanity.'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
