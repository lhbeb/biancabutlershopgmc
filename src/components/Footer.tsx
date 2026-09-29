import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const socialIconClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#7a5238]/60 text-[#fff8ed] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7a5238] hover:bg-[#7a5238] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4b2e22]';

const Footer = () => {
  return (
    <footer className="bg-[#4b2e22] text-[#fff8ed]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="mb-4 flex flex-col leading-none" aria-label="Bianca Butler home">
              <span className="font-serif text-2xl font-bold tracking-[0.16em] text-[#fff8ed]">BIANCA BUTLER</span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#d4a84f]">Antiques &amp; Objects</span>
            </Link>
            <p className="mb-4 text-[#fff8ed]">
              A considered collection of figurines, decorative objects, vintage accents, and collectible finds curated by Bianca Butler.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 shrink-0 text-[#b8863b] mr-2" />
                <a href="mailto:contact@biancabutler.shop" className="hover:text-[#d4a84f] transition-colors duration-300">
                  <span className="font-semibold">Customer care:</span> Contact us by email
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#b8863b] mr-2" />
                <a href="mailto:contact@biancabutler.shop" className="hover:text-[#d4a84f] transition-colors duration-300">
                  contact@biancabutler.shop
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 shrink-0 text-[#b8863b] mr-2 mt-1" />
                <div>
                  <span className="block font-semibold text-white">Shop contact</span>
                  <span>Questions about a piece, an order, or delivery? We are happy to help.</span>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.pinterest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Follow us on Pinterest"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.936 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Follow us on TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#fff8ed] mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#d4a84f] transition-colors duration-300">Home</Link></li>
              <li><Link href="/#products" className="hover:text-[#d4a84f] transition-colors duration-300">Products</Link></li>
              <li><Link href="/#featured" className="hover:text-[#d4a84f] transition-colors duration-300">Featured</Link></li>
              <li><Link href="/track" className="hover:text-[#d4a84f] transition-colors duration-300">Track Order</Link></li>
              <li><Link href="/livechat" className="hover:text-[#d4a84f] transition-colors duration-300 font-semibold text-white">Live Chat</Link></li>
              <li><Link href="/contact" className="hover:text-[#d4a84f] transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#fff8ed] mb-4">Policies & Info</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-[#d4a84f] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#d4a84f] transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-[#d4a84f] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/frequently-asked-questions" className="hover:text-[#d4a84f] transition-colors duration-300">FAQs</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#d4a84f] transition-colors duration-300">Refund & Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#d4a84f] transition-colors duration-300">Shipping Policy</Link></li>
              <li><Link href="/billing-policy" className="hover:text-[#d4a84f] transition-colors duration-300">Billing & Payment Policy</Link></li>
              <li><Link href="/warranty-replacement" className="hover:text-[#d4a84f] transition-colors duration-300">Warranty & Replacement</Link></li>
              <li><Link href="/local-pickup" className="hover:text-[#d4a84f] transition-colors duration-300">Local Pickup Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#d4a84f] transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/cookies" className="hover:text-[#d4a84f] transition-colors duration-300">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#fff8ed]/20 mt-12 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <p>© 2026 Bianca Butler. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
              {[
                { src: '/payment-logos/visa.svg',             alt: 'Visa' },
                { src: '/payment-logos/mastercard.svg',       alt: 'Mastercard' },
                { src: '/payment-logos/american-express.svg', alt: 'American Express' },
                { src: '/payment-logos/discover.svg',         alt: 'Discover' },
                { src: '/payment-logos/maestro.svg',          alt: 'Maestro' },
                { src: '/payment-logos/jcb.svg',              alt: 'JCB' },
                { src: '/payment-logos/unionpay.svg',         alt: 'UnionPay' },
                { src: '/payment-logos/diners.svg',           alt: 'Diners Club' },
                { src: '/payment-logos/apple-pay.svg',        alt: 'Apple Pay' },
                { src: '/payment-logos/google-pay.svg',       alt: 'Google Pay' },
              ].map((logo) => (
                <span
                  key={logo.src}
                  className="flex h-9 min-w-[3.5rem] items-center justify-center rounded-md bg-white px-2"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={52}
                    height={32}
                    className="max-h-6 w-auto object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
