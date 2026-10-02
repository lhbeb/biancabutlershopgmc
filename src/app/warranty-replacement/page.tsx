import type { Metadata } from 'next';
import LegalPageSchema from '@/components/LegalPageSchema';

export const metadata: Metadata = {
  title: 'Warranty & Replacement Policy | Bianca Butler',
  description: 'Bianca Butler warranty support, defective-product replacement, and customer service information.',
};

export default function WarrantyReplacementPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <LegalPageSchema
        name="Warranty & Replacement Policy | Bianca Butler"
        description="Bianca Butler warranty support, defective-product replacement, and customer service information."
        path="/warranty-replacement"
      />
      <article className="mx-auto max-w-4xl space-y-8 px-4 text-gray-700">
        <header>
          <h1 className="text-4xl font-bold text-[#261810]">Warranty & Replacement Policy</h1>
          <p className="mt-3 text-gray-600">Information for customers who receive a defective, damaged, or incorrect product.</p>
        </header>
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#261810]">Product-specific warranty</h2>
          <p>Any Bianca Butler warranty or applicable manufacturer warranty is identified on the product page or in the order documentation. Bianca Butler provides support for products sold through this website and will explain the applicable warranty or remedy for the item purchased.</p>
          <p>Warranty coverage may differ by product condition and the manufacturer’s documented terms. Customers should contact Bianca Butler before sending an item back so the correct process can be confirmed.</p>
        </section>
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#261810]">Defective, damaged, or incorrect items</h2>
          <p>Contact us within 30 days of delivery with the order number, a description of the issue, and clear photographs when appropriate. We will review the request and provide the available remedy, which may include troubleshooting, replacement, repair coordination, or a refund.</p>
          <p>For an eligible return approved by Bianca Butler, we provide return instructions and a prepaid label. Do not ship an item to an unconfirmed address.</p>
        </section>
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#261810]">Inspection and resolution</h2>
          <p>Returned products may be inspected to confirm the reported issue and condition. Approved refunds are issued to the original payment method within five business days after approval; banks and payment providers may take longer to display the credit.</p>
          <p>Replacement availability depends on current inventory. If a replacement is unavailable, Bianca Butler will offer the applicable refund or another available resolution.</p>
        </section>
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#261810]">Contact support</h2>
          <p>Email <a className="font-semibold text-[#4b2e22] underline" href="mailto:contact@biancabutler.shop">contact@biancabutler.shop</a> or call <a className="font-semibold text-[#4b2e22] underline" href="tel:+15624515530">+1 (562) 451-5530</a>, Monday through Friday, 9:00 AM–5:00 PM EST.</p>
          <p>This policy should be read together with the <a className="font-semibold text-[#4b2e22] underline" href="/return-policy">Return & Exchange Policy</a>.</p>
        </section>
      </article>
    </main>
  );
}
