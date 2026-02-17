export interface ClientConfig {
  slug: string;
  name: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily?: string;
    logoUrl?: string;
  };
  content: {
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      backgroundImage?: string;
    };
    benefits: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    steps: Array<{
      title: string;
      description: string;
    }>;
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
    whatsapp: {
      phoneNumber: string;
      message: string;
    };
  };
  seo: {
    title: string;
    description: string;
  };
}
