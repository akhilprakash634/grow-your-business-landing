import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  schema
}: SEOProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
    
    // Update title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (title) {
      updateMetaTag('og:title', title, true);
      updateMetaTag('twitter:title', title);
    }

    if (ogType) {
      updateMetaTag('og:type', ogType, true);
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
      updateMetaTag('twitter:image', ogImage);
    }

    // Update canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${siteUrl}${canonical}`);
      updateMetaTag('og:url', `${siteUrl}${canonical}`, true);
    }

    // Update last-modified
    const today = new Date().toISOString().split('T')[0];
    updateMetaTag('last-modified', today);

    // Add or update Schema.org JSON-LD
    if (schema) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);
}

export function generateWebPageSchema(url: string, name: string, description: string) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}${url}`,
    url: `${siteUrl}${url}`,
    name: name,
    description: description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Grow Your Business'
    },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'ReadAction',
      target: [`${siteUrl}${url}`]
    }
  };
}

export function generateLocalBusinessSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://growyourbusiness.today';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Grow Your Business',
    description: 'Professional website, WhatsApp Business setup, and Google Maps optimization services for local businesses in Kerala',
    url: siteUrl,
    logo: 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
    image: 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
    telephone: '+91-6282863459',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kerala',
      addressRegion: 'KL',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8505,
      longitude: 76.2711
    },
    areaServed: {
      '@type': 'State',
      name: 'Kerala'
    },
    sameAs: [
      'https://wa.me/916282863459'
    ]
  };
}

export function generateServiceSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/#service`,
    serviceType: 'Digital Business Setup',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Grow Your Business',
      url: siteUrl
    },
    areaServed: {
      '@type': 'State',
      name: 'Kerala'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Starter Website',
            description: 'One-page mobile-friendly website with call and WhatsApp buttons, enquiry form, and basic SEO'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WhatsApp Business Setup',
            description: 'Catalog setup, greeting message, auto-replies, labels, and enquiry flow configuration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google Maps Business Profile Setup',
            description: 'Business profile setup and optimization to improve visibility and customer calls'
          }
        }
      ]
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`
    }))
  };
}
