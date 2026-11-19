import { ALL_CATALOG_PRODUCTS, COOKING_ESSENTIALS } from './storeData';
import { Product, ProductDetailInfo, ProductReview } from '../types/store';

function getBrandInfo(product: Product): { brandName: string; brandLogo: string } {
  const titleLower = product.title.toLowerCase();
  if (
    product.brand === 'Honeyraj' ||
    product.category === 'Honey' ||
    product.category === 'Sundarban Honey' ||
    titleLower.includes('honey')
  ) {
    return { brandName: 'Honeyraj', brandLogo: '/images/brand-honeyraj.png' };
  }
  if (product.category === 'Dates' || titleLower.includes('dates') || titleLower.includes('medjool')) {
    return { brandName: 'Khejuri', brandLogo: '/images/brand-khejuri.png' };
  }
  if (product.category === 'Organic' || titleLower.includes('ceylon') || titleLower.includes('organic')) {
    return { brandName: 'Glarvest', brandLogo: '/images/brand-glarvest.png' };
  }
  return { brandName: 'Shosti Food', brandLogo: '/images/brand-shosti.png' };
}

function getCategorySpecs(product: Product): {
  shortDescription: string;
  description: string;
  keyFeatures: string[];
  usageStorage: string[];
  reviews: ProductReview[];
} {
  const titleLower = product.title.toLowerCase();

  if (titleLower.includes('ghee')) {
    return {
      shortDescription:
        'Pure traditional cow ghee sourced from Pabna, crafted slowly from fresh milk for rich aroma and authentic taste. Packed with essential vitamins and natural nutrition, it elevates everyday polao, biryani, bharta, and warm rice.',
      description:
        'Experience the authentic taste of tradition with Shosti Pure Cow Ghee, sourced from the renowned Pabna region of Bangladesh. Crafted by skilled artisans with generations of expertise, our ghee is prepared with utmost care—bringing you purity, nutrition, and rich flavor in every spoonful.',
      keyFeatures: [
        '100% Pure & Natural Cow Ghee.',
        'Made with traditional methods from fresh milk.',
        'Rich in vitamins A, D, E & K for overall wellness.',
        'Contains CLA & Butyric Acid—supports digestion, immunity & heart health.',
        'Perfect for polao, biryani, bharta, or simply with hot rice.',
        'Airtight packaging ensures freshness & long shelf life.',
      ],
      usageStorage: [
        'Use as a cooking ingredient, natural health booster, or flavor enhancer.',
        'Store in a cool, dry place in an airtight container.',
        'No refrigeration required if kept sealed.',
        'Always use a clean, dry spoon.',
      ],
      reviews: [
        {
          id: 'rev-ghee-1',
          author: 'Nasrin Anowar',
          date: 'July 24, 2026 04:06 pm',
          rating: 5,
          comment: 'This is authentic ghee! 100% Organic',
        },
        {
          id: 'rev-ghee-2',
          author: 'M Azmain Israq',
          date: 'May 23, 2026 06:24 pm',
          rating: 5,
          comment: 'good one!',
        },
      ],
    };
  }

  if (product.category === 'Honey' || product.category === 'Sundarban Honey' || titleLower.includes('honey')) {
    return {
      shortDescription: `${product.title} brings 100% raw, unfiltered natural honey collected from trusted sources with zero added sugar. Rich in natural enzymes and antioxidants, it supports daily immunity, energy, and wholesome natural sweetness.`,
      description: `${product.title} is 100% raw, unfiltered, and lab-tested natural honey brought directly from trusted collectors. Packed under strict hygienic supervision by Ghorer Bazar so every drop retains its natural enzymes, antioxidants, and rich floral aroma.`,
      keyFeatures: [
        '100% Pure, Raw & Unadulterated Honey.',
        'Lab-tested for zero added sugar or artificial preservatives.',
        'Naturally rich in antioxidants, enzymes, and essential trace minerals.',
        'Supports daily immunity, energy, and natural throat soothing.',
        'Food-grade sealed container locks in natural aroma and freshness.',
      ],
      usageStorage: [
        'Take 1–2 teaspoons daily on an empty stomach or with lukewarm water.',
        'Ideal natural sweetener for tea, lemon drinks, and healthy breakfasts.',
        'Store at room temperature away from direct sunlight.',
        'Do not refrigerate; always use a clean, dry spoon.',
      ],
      reviews: [
        {
          id: 'rev-honey-1',
          author: 'Fariha Akter Tumpa',
          date: 'August 12, 2026 11:20 am',
          rating: 5,
          comment: 'একদম খাঁটি মধু। ঘ্রাণ আর স্বাদ দুটোই অসাধারণ!',
        },
        {
          id: 'rev-honey-2',
          author: 'Sultana Yesmin',
          date: 'July 19, 2026 03:45 pm',
          rating: 5,
          comment: 'Always satisfied with Honeyraj quality and fast delivery.',
        },
      ],
    };
  }

  if (product.category === 'Dates' || titleLower.includes('dates') || titleLower.includes('medjool')) {
    return {
      shortDescription: `Handpicked Grade-A ${product.title} featuring a soft, fleshy texture and natural caramel sweetness without any added glucose syrup. Hygienically packed to lock in farm-fresh quality, dietary fiber, and instant energy.`,
      description: `${product.title} features handpicked, Grade-A fresh dates selected for soft texture, natural caramel sweetness, and rich nutritional value. Hygienically sorted and packed by Ghorer Bazar to preserve farm-fresh quality.`,
      keyFeatures: [
        'Premium Grade-A imported fresh dates.',
        'Naturally rich in dietary fiber, potassium, and iron.',
        'Zero added glucose syrup or chemical polishing.',
        'Soft, fleshy texture with natural sweetness.',
        'Hygienically sealed food-grade box packaging.',
      ],
      usageStorage: [
        'Enjoy 3–5 dates daily for natural energy or during Iftar.',
        'Great for smoothies, desserts, and energy bites.',
        'Keep sealed in a cool, dry place or refrigerate for extended freshness.',
      ],
      reviews: [
        {
          id: 'rev-dates-1',
          author: 'Ayesha Khan',
          date: 'August 05, 2026 05:15 pm',
          rating: 5,
          comment: 'খুবই ফ্রেশ এবং নরম খেজুর। প্যাকেজিং অনেক সুন্দর ছিল।',
        },
        {
          id: 'rev-dates-2',
          author: 'Tariqul Islam',
          date: 'June 18, 2026 02:10 pm',
          rating: 5,
          comment: 'Authentic quality dates at a fair price.',
        },
      ],
    };
  }

  const getCustomShortDesc = () => {
    if (titleLower.includes('mustard') || titleLower.includes('oil')) {
      return `100% pure cold-pressed ${product.title} extracted from carefully selected seeds for bold natural aroma and pungency. Chemical-free and unrefined, making it ideal for healthy everyday Bengali cooking and bharta.`;
    }
    if (titleLower.includes('masala') || titleLower.includes('powder') || product.category === 'Spices') {
      return `Aromatic and finely blended ${product.title} crafted from clean, sun-dried whole spices with zero artificial colors or fillers. Brings rich homemade taste and authentic flavor to your favorite curries and dishes.`;
    }
    if (titleLower.includes('nut') || titleLower.includes('almond') || titleLower.includes('cashew') || titleLower.includes('chia')) {
      return `Fresh, crunchy, and nutrient-dense ${product.title} carefully sorted for natural taste and premium quality. Sealed in food-grade packaging to deliver wholesome daily energy, protein, and healthy nutrition.`;
    }
    if (titleLower.includes('organic') || titleLower.includes('ceylon') || titleLower.includes('vinegar')) {
      return `Certified pure ${product.title} made without synthetic additives to preserve natural goodness and authentic flavor. A clean, wholesome pantry choice for health-conscious kitchens across Bangladesh.`;
    }
    if (titleLower.includes('dal') || titleLower.includes('rice') || titleLower.includes('flour')) {
      return `Clean, uniform-grain ${product.title} hygienically processed and packed to retain natural taste and nutritional value. Ready for wholesome everyday Bangladeshi home cooking.`;
    }
    return `${product.title} is carefully sourced from trusted producers and hygienically packed by Ghorer Bazar. Free from harmful preservatives, delivering authentic quality and pure taste for your family kitchen.`;
  };

  return {
    shortDescription: getCustomShortDesc(),
    description: `${product.title} is carefully sourced and hygienically packed by Ghorer Bazar to deliver pure, safe, and authentic food essentials for your daily family kitchen.`,
    keyFeatures: [
      `Authentic & pure ${product.category} product from Ghorer Bazar.`,
      'Sourced directly from trusted producers and farms.',
      'Free from artificial colors, fillers, and harmful preservatives.',
      'Quality checked and securely sealed for lasting freshness.',
    ],
    usageStorage: [
      'Use according to your daily cooking or wellness routine.',
      'Keep tightly sealed in a cool, dry place away from moisture.',
      'Use a clean, dry spoon for every serving.',
    ],
    reviews: [
      {
        id: 'rev-gen-1',
        author: 'Nusrat Jahan',
        date: 'August 02, 2026 01:30 pm',
        rating: 5,
        comment: 'Very clean packaging and genuine quality. Recommended!',
      },
      {
        id: 'rev-gen-2',
        author: 'Rafiqul Hasan',
        date: 'July 11, 2026 07:05 pm',
        rating: 5,
        comment: 'Got fast delivery inside Dhaka. Will order again.',
      },
    ],
  };
}

export function getProductDetailInfo(product: Product): ProductDetailInfo {
  const { brandName, brandLogo } = getBrandInfo(product);
  const specs = getCategorySpecs(product);

  const companionCandidate =
    ALL_CATALOG_PRODUCTS.find(
      (p) =>
        p.title !== product.title &&
        p.inStock !== false &&
        p.category === 'Oil & Ghee' &&
        p.title.toLowerCase().includes('mustard')
    ) ||
    COOKING_ESSENTIALS.find((p) => p.title !== product.title && p.inStock !== false) ||
    ALL_CATALOG_PRODUCTS.find((p) => p.title !== product.title && p.inStock !== false) ||
    product;

  const sameCategoryRelated = ALL_CATALOG_PRODUCTS.filter(
    (p) => p.title !== product.title && p.category === product.category
  );
  const fallbackRelated = ALL_CATALOG_PRODUCTS.filter(
    (p) => p.title !== product.title && p.category !== product.category
  );
  const relatedProducts = [...sameCategoryRelated, ...fallbackRelated].slice(0, 5);

  const secondaryThumbs = relatedProducts
    .slice(0, 3)
    .map((p) => p.image)
    .filter((img) => img !== product.image);

  const gallery = [product.image, ...secondaryThumbs].slice(0, 4);

  return {
    gallery,
    brandName,
    brandLogo,
    shortDescription: specs.shortDescription,
    description: specs.description,
    keyFeatures: specs.keyFeatures,
    usageStorage: specs.usageStorage,
    companionProduct: companionCandidate,
    initialReviews: specs.reviews,
    relatedProducts,
  };
}
