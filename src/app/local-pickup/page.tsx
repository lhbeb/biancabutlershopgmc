import Link from 'next/link';
import LegalPageSchema from '@/components/LegalPageSchema';
import { Clock3, MapPin, PackageCheck, ShieldCheck } from 'lucide-react';

const pickupSteps = [
  {
    title: 'Place your order first',
    body: 'Choose your item online and complete checkout before heading to our pickup location.',
    icon: PackageCheck,
  },
  {
    title: 'Wait for pickup confirmation',
    body: 'We will contact you as soon as your order is packed, verified, and ready to be collected.',
    icon: ShieldCheck,
  },
  {
    title: 'Bring your order details',
    body: 'Have your order confirmation, a valid ID, and any collection message ready when you arrive.',
    icon: Clock3,
  },
];

export default function LocalPickupPage() {
  return (
    <div className="min-h-screen bg-[#fff8ed] py-10 sm:py-14">
      <LegalPageSchema
        name="Local Pickup Guide | Bianca Butler"
        description="Bianca Butler local pickup guide for eligible orders at 301 Roundhill Dr, Rockaway, NJ 07866, United States."
        path="/local-pickup"
      />
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-[32px] border border-[#E9DED2] bg-white shadow-[0_24px_80px_rgba(75,46,34,0.10)]">
          <section className="bg-gradient-to-br from-[#4b2e22] via-[#4b2e22] to-[#4b2e22] px-6 py-10 text-[#fff8ed] sm:px-10 sm:py-12">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4a84f]">
              Local Pickup Guide
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Pick up your Bianca Butler order with confidence
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#F2E5D8] sm:text-base">
              Eligible orders can be collected from our location at 301 Roundhill Dr, Rockaway, NJ 07866, United States. This page covers what to expect, what to bring, and how collection works once your order is ready.
            </p>
          </section>

          <div className="grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
            <div className="space-y-8">
              <section className="rounded-[24px] border border-[#E9DED2] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#261810]">How local pickup works</h2>
                <div className="mt-6 grid gap-4">
                  {pickupSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="rounded-[20px] border border-[#E9DED2] bg-[#FCF8F2] p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F7F0E6] text-[#4b2e22]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-[#261810]">{step.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-[#68554A]">{step.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E9DED2] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#261810]">Before you arrive</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#68554A]">
                  <li>Make sure you have received a pickup-ready confirmation from our team.</li>
                  <li>Bring a valid photo ID and your order number.</li>
                  <li>If someone else is collecting for you, contact us in advance so we can note it on the order.</li>
                  <li>For high-value items, we may ask for an extra confirmation step before release.</li>
                </ul>
              </section>

              <section className="rounded-[24px] border border-[#E9DED2] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#261810]">Need help first?</h2>
                <p className="mt-3 text-sm leading-7 text-[#68554A]">
                  If you are unsure whether a product is available for local pickup, please contact us before placing the order so we can confirm availability and timing.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:contact@biancabutler.shop"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#4b2e22] px-5 py-3 text-sm font-semibold text-[#fff8ed] transition hover:bg-[#382117]"
                  >
                    Email Support
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#4b2e22]/20 bg-white px-5 py-3 text-sm font-semibold text-[#4b2e22] transition hover:bg-[#F7F0E6]"
                  >
                    Contact Page
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[24px] border border-[#E9DED2] bg-[#FCF8F2] p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F7F0E6] text-[#4b2e22]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-[#261810]">Pickup location</h2>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-[#68554A]">
                      <address className="not-italic">
                        301 Roundhill Dr
                        <br />
                        Rockaway, NJ 07866
                        <br />
                        United States
                      </address>

                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E9DED2] bg-[#FCF8F2] p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F7F0E6] text-[#4b2e22]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#261810]">Collection timing</h2>
                    <p className="mt-3 text-sm leading-7 text-[#68554A]">
                      Pickup timing is confirmed directly by our team after your order is prepared. Please do not travel before you receive the ready-for-pickup message.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E9DED2] bg-white p-6">
                <h2 className="text-lg font-semibold text-[#261810]">Important note</h2>
                <p className="mt-3 text-sm leading-7 text-[#68554A]">
                  Local pickup availability varies by item. Some products remain shipping-only. Wait for your confirmation message before travelling.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
