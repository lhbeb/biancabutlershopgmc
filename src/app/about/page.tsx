import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';
import {
  Users,
  Shield,
  Heart,
  Zap,
  CheckCircle2,
  Award,
  Target,
  Sparkles,
  Package,
  Eye,
  Leaf,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Clock,
  Gem,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Bianca Butler',
  description:
    'Bianca Butler is an antiques shop founded by Bianca Butler, offering figurines, decorative objects, vintage accents, and collectible finds.',
};

export default function AboutPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://biancabutler.shop/about#webpage',
        'url': 'https://biancabutler.shop/about',
        'name': 'About Bianca Butler',
        'description':
          'Bianca Butler is an antiques shop offering figurines, decorative objects, vintage accents, and collectible finds.',
        'mainEntity': {
          '@id': 'https://biancabutler.shop/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://biancabutler.shop/#organization',
        'name': 'Bianca Butler',
        'url': 'https://biancabutler.shop',
        'description':
          'Bianca Butler is an antiques shop offering figurines, decorative objects, vintage accents, and collectible finds.',
        'email': 'contact@biancabutler.shop',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Contact Bianca Butler through contact@biancabutler.shop',
          'addressLocality': 'Gilbert',
          'addressRegion': 'AZ',
          'postalCode': '85233',
          'addressCountry': 'US',
        },
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': '',
            'contactType': 'customer service',
            'areaServed': ['US'],
            'availableLanguage': ['en'],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8ed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AboutNotifier />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4b2e22] to-[#4b2e22] text-[#fff8ed] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">About Bianca Butler</h1>
          <p className="text-xl text-[#fff8ed]/85 leading-relaxed max-w-3xl mx-auto">
            Bianca Butler is an antiques shop founded by Bianca Butler for people who appreciate objects with presence, patina, and a story. We bring together figurines, decorative pieces, vintage accents, and collectible finds for homes that feel personal.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">

        {/* Who We Are */}
        <section className="mb-12 border-y border-[#4b2e22]/15 py-9">
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4b2e22] text-white">
                <Gem className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#261810]">Who We Are</h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-gray-700">
              <p>
                Bianca Butler is a dedicated antiques shop. Every piece we list is selected for its character, visual appeal, and ability to add a distinctive note to a room.
              </p>
              <p>
                Founded by Bianca Butler, the shop is built around a simple idea: a home becomes more meaningful when it includes objects chosen with intention.
              </p>
            </div>
          </div>
        </section>

        {/* Our Products */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#4b2e22]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#4b2e22]/10 rounded-xl">
              <Package className="h-8 w-8 text-[#4b2e22]" />
            </div>
            <h2 className="text-3xl font-bold text-[#261810]">What We Offer</h2>
          </div>
          <p className="text-gray-700 mb-8 text-lg">
            The Bianca Butler catalog brings together small antiques and decorative objects for collectors, decorators, and curious shoppers.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Figurines', desc: 'Small sculptures and characterful figures chosen for shelves, mantels, and display cabinets.' },
              { title: 'Decorative Objects', desc: 'Thoughtful accents that add texture, shape, and a sense of history to a room.' },
              { title: 'Vintage Finds', desc: 'Pieces with age, patina, and the kind of detail that rewards a closer look.' },
              { title: 'Collectibles', desc: 'Unusual objects and curiosities for collectors, gifting, and personal collections.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-[#4b2e22] flex-shrink-0" />
                  <h3 className="font-bold text-[#261810]">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm ml-8">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-r from-[#4b2e22] to-[#4b2e22] rounded-2xl shadow-lg p-10 mb-12 text-[#fff8ed] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4a84f]/15 rounded-full mb-6">
            <Target className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-[#fff8ed]/85 mb-4">
            To make distinctive antiques and decorative objects easier to discover and bring home.
          </p>
          <p className="text-lg text-[#fff8ed]/85">
            Bianca Butler exists to make room for the objects that make a home feel like yours.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#4b2e22]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#d4a84f] rounded-xl">
              <Sparkles className="h-8 w-8 text-[#4b2e22]" />
            </div>
            <h2 className="text-3xl font-bold text-[#261810]">What Makes Us Different</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Gem className="h-6 w-6 text-[#4b2e22]" />
                <h3 className="text-xl font-bold text-[#261810]">A Curated Eye</h3>
              </div>
              <p className="text-gray-700">Every listing is considered for its character, condition, and place in a collected home.</p>
            </div>

            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-6 w-6 text-[#4b2e22]" />
                <h3 className="text-xl font-bold text-[#261810]">Transparent Listings</h3>
              </div>
              <p className="text-gray-700">Every product page clearly states condition, specifications, and what is included in the box. No surprises at delivery.</p>
            </div>

            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-6 w-6 text-[#4b2e22]" />
                <h3 className="text-xl font-bold text-[#261810]">Quality You Can Trust</h3>
              </div>
              <p className="text-gray-700">All products are inspected and verified before shipping. We stand behind what we sell with clear return and support policies.</p>
            </div>

            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Headphones className="h-6 w-6 text-[#4b2e22]" />
                <h3 className="text-xl font-bold text-[#261810]">Real Customer Support</h3>
              </div>
              <p className="text-gray-700">Clear listings, thoughtful packaging, and support from a shop founded around collecting.</p>
            </div>

            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="h-6 w-6 text-[#4b2e22]" />
                <h3 className="text-xl font-bold text-[#261810]">US-Based and Reliable</h3>
              </div>
              <p className="text-gray-700">We ship from within the United States with fast processing times. Local pickup is available from our Gilbert, Arizona location for eligible orders.</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#4b2e22]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#d4a84f] rounded-xl">
              <Heart className="h-8 w-8 text-[#4b2e22]" />
            </div>
            <h2 className="text-3xl font-bold text-[#261810]">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: 'Integrity' },
              { icon: Award, label: 'Quality' },
              { icon: Users, label: 'Customer Trust' },
              { icon: Zap, label: 'Continuous Improvement' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-[#fff8ed] rounded-xl p-6 text-center border border-[#4b2e22]/10">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4a84f]">
                  <Icon className="h-8 w-8 text-[#4b2e22]" />
                </div>
                <h3 className="font-bold text-[#261810] text-lg">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-gradient-to-r from-[#4b2e22] to-[#4b2e22] rounded-2xl shadow-lg p-10 mb-12 text-[#fff8ed]">
          <h3 className="text-3xl font-bold mb-8 text-center">By the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '5,000+', label: 'happy customers' },
              { value: '1,000+', label: 'machines sold' },
              { value: '99%', label: 'satisfaction rate' },
              { value: '24/7', label: 'support available' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center p-6 bg-[#fff8ed]/10 backdrop-blur-sm rounded-xl border border-[#fff8ed]/20">
                <div className="text-4xl font-bold mb-2">{value}</div>
                <div className="text-[#fff8ed]/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#4b2e22]/10 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#4b2e22]/10 rounded-xl">
              <Phone className="h-8 w-8 text-[#4b2e22]" />
            </div>
            <h3 className="text-2xl font-bold text-[#261810]">Contact Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-[#4b2e22]" />
                <div className="font-medium text-[#261810]">Business Address</div>
              </div>
              <div className="text-gray-600 ml-8">Contact Bianca Butler through contact@biancabutler.shop for current business details.</div>
            </div>
            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-[#4b2e22]" />
                <div className="font-medium text-[#261810]">Phone</div>
              </div>
              <div className="ml-8 text-gray-600">
                <a href="tel:+17863025205" className="hover:text-[#4b2e22] transition-colors">
                  +1 (786) 302-5205
                </a>
              </div>
            </div>
            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-[#4b2e22]" />
                <div className="font-medium text-[#261810]">Email</div>
              </div>
              <div className="text-gray-600 ml-8">contact@biancabutler.shop</div>
            </div>
            <div className="bg-[#fff8ed] rounded-xl p-6 border border-[#4b2e22]/10">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-[#4b2e22]" />
                <div className="font-medium text-[#261810]">Business Hours</div>
              </div>
              <div className="text-gray-600 ml-8 space-y-1">
                <div>Monday – Friday: 9:00 AM – 5:00 PM EST</div>
                <div>Saturday – Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
