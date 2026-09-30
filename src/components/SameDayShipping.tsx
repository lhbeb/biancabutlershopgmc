"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Truck, MapPin, Package } from 'lucide-react';

interface SameDayShippingProps {
  fullWidth?: boolean;
  contained?: boolean;
}

const SameDayShipping: React.FC<SameDayShippingProps> = ({ fullWidth = false, contained = false }) => {
  const content = (
    <div className={`w-full ${fullWidth ? '' : 'max-w-7xl'} mx-auto`}>
      {/* Main Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Image */}
          <div className="relative min-h-[360px] w-full md:min-h-[400px] md:w-[45%]">
            <Image
              src="/shipimage.png"
              alt="Bianca Butler orders shipped via FedEx for fast, reliable delivery"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right Section - Content */}
          <div className="md:w-[55%] bg-[#4b2e22] text-[#fff8ed] p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-[#ffffff]">
              Packed with care — Tracked from our shop to your door
            </h1>

            <p className="text-lg leading-relaxed font-normal mb-12">
              Each piece is wrapped thoughtfully and secured for the journey. Once your order ships, tracking lets you follow it all the way to your door.
            </p>
            <Link
              href="/shipping-policy"
              className="text-[#fff8ed]/80 hover:text-[#fff8ed] text-lg underline underline-offset-2 transition-colors"
            >
              See our shipping policy →
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-[#4b2e22] rounded-full p-3 flex-shrink-0">
              <Clock className="w-6 h-6 text-[#fff8ed]" />
            </div>
            <div>
              <h3 className="font-bold text-[#261810] text-lg mb-2">
                Fast, Reliable Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                We process orders promptly and prepare each package with the care delicate decorative pieces deserve.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-[#4b2e22] rounded-full p-3 flex-shrink-0">
              <Package className="w-6 h-6 text-[#fff8ed]" />
            </div>
            <div>
              <h3 className="font-bold text-[#261810] text-lg mb-2">
                Safe, Careful Handling
              </h3>
              <p className="text-gray-600 text-sm">
                Figurines, decor, and collectible objects are wrapped and secured for their journey.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-[#4b2e22] rounded-full p-3 flex-shrink-0">
              <Truck className="w-6 h-6 text-[#fff8ed]" />
            </div>
            <div>
              <h3 className="font-bold text-[#261810] text-lg mb-2">
                Tracking You Can Follow
              </h3>
              <p className="text-gray-600 text-sm">
                Shipment tracking keeps you informed from dispatch through delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-gray-500 text-sm mb-2">
            Ready to bring home a piece with character?
          </p>
          <p className="text-2xl md:text-3xl font-bold text-[#261810]">
            Browse the collection and discover your next favorite find
          </p>
        </div>
        <a
          href="#products"
          className="bg-[#4b2e22] hover:bg-[#382117] text-[#fff8ed] font-bold py-4 px-10 rounded-xl text-lg transition-colors whitespace-nowrap"
        >
          Browse Products
        </a>
      </div>
    </div>
  );

  if (contained) {
    return (
      <div className="py-8 bg-gray-100 rounded-xl">
        {content}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {content}
      </div>
    </section>
  );
};

export default SameDayShipping;
