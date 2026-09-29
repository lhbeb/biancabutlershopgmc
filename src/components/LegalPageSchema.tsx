type LegalPageSchemaProps = {
  name: string;
  description: string;
  path: string;
};

export default function LegalPageSchema({ name, description, path }: LegalPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://biancabutler.shop${path}#webpage`,
    url: `https://biancabutler.shop${path}`,
    name,
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://biancabutler.shop/#website',
      url: 'https://biancabutler.shop',
      name: 'Bianca Butler',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://biancabutler.shop/#organization',
      name: 'Bianca Butler',
      url: 'https://biancabutler.shop',
      email: 'contact@biancabutler.shop',
      telephone: '+1 (786) 302-5205',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Contact Bianca Butler through contact@biancabutler.shop',
        addressLocality: 'Gilbert',
        addressRegion: 'AZ',
        postalCode: '85233',
        addressCountry: 'US',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
