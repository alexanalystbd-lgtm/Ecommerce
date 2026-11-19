import {
  BrandItem,
  CategoryPageConfig,
  FeaturedCategory,
  FooterColumn,
  NavCategory,
  Product,
  Testimonial,
} from '../types/store';

export const NAV_CATEGORIES: NavCategory[] = [
  { label: 'Offer Zone', hasDropdown: false, targetSection: 'top-selling', categorySlug: 'offer-zone' },
  {
    label: 'Honey',
    hasDropdown: true,
    items: ['Black Seed Honey', 'Lychee Flower Honey', 'Sundarban Honey', 'Mixed Flower Honey'],
    targetSection: 'all-natural-honey',
    categorySlug: 'sundarban-honey',
  },
  { label: 'Oil & Ghee', hasDropdown: false, targetSection: 'cooking-essentials', categorySlug: 'oil-ghee' },
  {
    label: 'Dates',
    hasDropdown: true,
    items: ['Ajwa Dates', 'Safawi/Kalmi Dates', 'Egyptian Medjool'],
    targetSection: 'premium-dates',
    categorySlug: 'dates',
  },
  {
    label: 'Spices',
    hasDropdown: true,
    items: ['Kala Bhuna Masala', 'Shahi Masala', 'Cumin (Jira) Powder'],
    targetSection: 'cooking-essentials',
    categorySlug: 'spices',
  },
  {
    label: 'Nuts & Seeds',
    hasDropdown: true,
    items: ['Honey Nuts', 'Cashew Nuts', 'Almond'],
    targetSection: 'just-for-you',
    categorySlug: 'nuts-seeds',
  },
  {
    label: 'Beverage',
    hasDropdown: true,
    items: ['Coconut Milk', 'Apple Cider Vinegar', 'Coconut Vinegar'],
    targetSection: 'organic-certified',
    categorySlug: 'beverage',
  },
  { label: 'Rice', hasDropdown: false, targetSection: 'featured-categories', categorySlug: 'all-products' },
  {
    label: 'Flours & Lentils',
    hasDropdown: true,
    items: ['Mashkalai Dal'],
    targetSection: 'cooking-essentials',
    categorySlug: 'flours-lentils',
  },
  { label: 'Certified', hasDropdown: false, targetSection: 'organic-certified', categorySlug: 'organic' },
  { label: 'Pickle', hasDropdown: false, targetSection: 'just-for-you', categorySlug: 'all-products' },
  { label: 'Tabaya', hasDropdown: false, targetSection: 'our-brands', categorySlug: 'all-products' },
];

export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  { id: 'organic', name: 'Organic', image: '/images/cat-organic.png', targetSection: 'organic-certified', categorySlug: 'organic' },
  { id: 'honey', name: 'Honey', image: '/images/cat-honey.png', targetSection: 'all-natural-honey', categorySlug: 'sundarban-honey' },
  { id: 'dates', name: 'Dates', image: '/images/cat-dates.png', targetSection: 'premium-dates', categorySlug: 'dates' },
  { id: 'spices', name: 'Spices', image: '/images/cat-spices.png', targetSection: 'cooking-essentials', categorySlug: 'spices' },
  { id: 'nuts', name: 'Nuts & Seeds', image: '/images/cat-nuts.png', targetSection: 'just-for-you', categorySlug: 'nuts-seeds' },
  { id: 'beverage', name: 'Beverage', image: '/images/cat-beverage.png', targetSection: 'organic-certified', categorySlug: 'beverage' },
  { id: 'rice', name: 'Rice', image: '/images/cat-rice.png', targetSection: 'cooking-essentials', categorySlug: 'all-products' },
  { id: 'flours', name: 'Flours & Lentils', image: '/images/cat-flours.png', targetSection: 'cooking-essentials', categorySlug: 'flours-lentils' },
];

export const TOP_SELLING_PRODUCTS: Product[] = [
  {
    id: 'top-mustard-oil-5l',
    title: 'Deshi Mustard Oil 5 liter',
    price: 1700,
    oldPrice: 1800,
    saveBadge: 'Save ৳100',
    topSellingRibbon: true,
    image: '/images/top-mustard-oil.png',
    category: 'Oil & Ghee',
  },
  {
    id: 'top-gawa-ghee-1kg',
    title: 'Gawa Ghee 1kg',
    price: 1890,
    oldPrice: 1990,
    saveBadge: 'Save ৳100',
    topSellingRibbon: true,
    image: '/images/top-ghee.png',
    category: 'Oil & Ghee',
  },
  {
    id: 'top-black-seed-honey-1kg',
    title: 'Black Seed Honey 1kg',
    price: 1600,
    image: '/images/top-black-seed-honey.png',
    category: 'Honey',
  },
  {
    id: 'top-sundarban-honey-1kg',
    title: 'Sundarban Honey 1kg',
    price: 2300,
    oldPrice: 2500,
    saveBadge: 'Save ৳200',
    image: '/images/top-sundarban-honey.png',
    category: 'Honey',
  },
];

export const BRANDS: BrandItem[] = [
  { id: 'glarvest', name: 'Glarvest', image: '/images/brand-glarvest.png' },
  { id: 'khejuri', name: 'Khejuri', image: '/images/brand-khejuri.png' },
  { id: 'shosti', name: 'Shosti Food', image: '/images/brand-shosti.png' },
  { id: 'honeyraj', name: 'Honeyraj', image: '/images/brand-honeyraj.png' },
];

export const ALL_NATURAL_HONEY: Product[] = [
  {
    id: 'honey-black-seed-500g',
    title: 'Black Seed Honey 500g',
    price: 800,
    image: '/images/prod-black-seed-500.png',
    category: 'Honey',
  },
  {
    id: 'honey-lychee-500g',
    title: 'Lychee Flower Honey 500g',
    price: 700,
    image: '/images/prod-lychee-500.png',
    category: 'Honey',
  },
  {
    id: 'honey-mixed-comb-500g',
    title: 'Mixed Flower Honey with comb 500g',
    price: 1000,
    image: '/images/prod-mixed-comb-500.png',
    category: 'Honey',
  },
  {
    id: 'honey-lychee-1kg',
    title: 'Lychee Flower Honey 1kg',
    price: 1300,
    oldPrice: 1400,
    badgeRight: { text: 'Save 7%', variant: 'green' },
    image: '/images/prod-lychee-1kg.png',
    category: 'Honey',
  },
  {
    id: 'honey-sundarban-box',
    title: 'Sundarban Honey 15g X 24 pcs (BOX)',
    price: 768,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    image: '/images/prod-sundarban-box.png',
    category: 'Honey',
  },
];

export const PREMIUM_DATES: Product[] = [
  {
    id: 'dates-safawi-1kg',
    title: 'Safawi/kalmi Dates (A Grade) 1kg',
    price: 1300,
    image: '/images/prod-safawi-1kg.png',
    category: 'Dates',
  },
  {
    id: 'dates-ajwa-500gm',
    title: 'Ajwa Premium Fresh Dates 500gm',
    price: 1100,
    image: '/images/prod-ajwa-500.png',
    category: 'Dates',
  },
  {
    id: 'dates-medjool-1kg',
    title: 'Egyptian Medjool Large 1kg',
    price: 2200,
    image: '/images/prod-medjool-1kg.png',
    category: 'Dates',
  },
  {
    id: 'dates-safawi-500g',
    title: 'Safawi/kalmi (A Grade) 500g',
    price: 700,
    image: '/images/prod-safawi-500.png',
    category: 'Dates',
  },
  {
    id: 'dates-ajwa-500g-large',
    title: 'Ajwa Premium Fresh Dates 500g (Large)',
    price: 1250,
    image: '/images/prod-ajwa-500-large.png',
    category: 'Dates',
  },
];

export const COOKING_ESSENTIALS: Product[] = [
  {
    id: 'cooking-gawa-ghee-1kg',
    title: 'Gawa Ghee 1kg',
    price: 1890,
    oldPrice: 1990,
    badgeLeft: { text: 'Best Selling', variant: 'orange' },
    badgeRight: { text: 'Save 5%', variant: 'green' },
    image: '/images/prod-gawa-ghee-1kg.png',
    category: 'Oil & Ghee',
  },
  {
    id: 'cooking-kala-bhuna-500gm',
    title: 'Kala Bhuna Masala-500gm',
    price: 1500,
    badgeLeft: { text: 'Offered Items', variant: 'orange' },
    image: '/images/prod-kala-bhuna-500.png',
    category: 'Spices',
  },
  {
    id: 'cooking-mashkalai-1kg',
    title: 'Mashkalai Dal 1 Kg',
    price: 300,
    image: '/images/prod-mashkalai-1kg.png',
    category: 'Flours & Lentils',
  },
  {
    id: 'cooking-cumin-500gm',
    title: 'Cumin (Jira) Powder 500gm',
    price: 880,
    image: '/images/prod-cumin-500.png',
    category: 'Spices',
  },
  {
    id: 'cooking-kala-bhuna-250gm',
    title: 'Kala Bhuna Masala-250gm',
    price: 750,
    badgeLeft: { text: 'Offered Items', variant: 'orange' },
    image: '/images/prod-kala-bhuna-250.png',
    category: 'Spices',
  },
];

export const ORGANIC_CERTIFIED: Product[] = [
  {
    id: 'organic-coconut-milk-400ml',
    title: 'Ceylon Organic Coconut Milk (C) 400ml',
    price: 350,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    image: '/images/prod-coconut-milk.png',
    category: 'Organic',
  },
  {
    id: 'organic-coconut-vinegar-500ml',
    title: 'Ceylon Organic Coconut Vinegar 500ml',
    price: 1065,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    image: '/images/prod-coconut-vinegar.png',
    category: 'Organic',
  },
  {
    id: 'organic-apple-cider-250ml',
    title: 'Discovery Organic Apple Cider Vinegar 250ml',
    price: 520,
    image: '/images/prod-apple-cider.png',
    category: 'Organic',
  },
  {
    id: 'organic-coconut-sugar-200g',
    title: 'Ceylon Organic Coconut Sugar (SI) 200g',
    price: 650,
    image: '/images/prod-coconut-sugar.png',
    category: 'Organic',
  },
  {
    id: 'organic-african-wild-honey-500g',
    title: 'African Organic Wild Honey 500g',
    price: 1150,
    oldPrice: 1250,
    badgeRight: { text: 'Save 8%', variant: 'green' },
    image: '/images/prod-african-honey.png',
    category: 'Organic',
  },
];

export const JUST_FOR_YOU: Product[] = [
  {
    id: 'jfy-mustard-oil-5l',
    title: 'Deshi Mustard Oil 5 liter',
    price: 1700,
    oldPrice: 1800,
    badgeLeft: { text: 'Best Selling', variant: 'orange' },
    badgeRight: { text: 'Save 6%', variant: 'green' },
    image: '/images/prod-mustard-oil-5l.png',
    category: 'Oil & Ghee',
  },
  {
    id: 'jfy-ajwa-1kg',
    title: 'Ajwa Premium Fresh Dates 1kg',
    price: 2200,
    image: '/images/prod-ajwa-1kg.png',
    category: 'Dates',
  },
  {
    id: 'jfy-gawa-ghee-1kg',
    title: 'Gawa Ghee 1kg',
    price: 1890,
    oldPrice: 1990,
    badgeLeft: { text: 'Best Selling', variant: 'orange' },
    badgeRight: { text: 'Save 5%', variant: 'green' },
    image: '/images/prod-gawa-ghee-1kg.png',
    category: 'Oil & Ghee',
  },
  {
    id: 'jfy-honey-nuts-800gm',
    title: 'Honey Nuts 800gm',
    price: 1700,
    badgeLeft: { text: 'Best Selling', variant: 'orange' },
    image: '/images/prod-honey-nuts-800.png',
    category: 'Nuts & Seeds',
  },
  {
    id: 'jfy-cashew-1kg',
    title: 'Cashew Nuts Medium Size 1kg',
    price: 2000,
    image: '/images/prod-cashew-1kg.png',
    category: 'Nuts & Seeds',
  },
  {
    id: 'jfy-sundarban-1kg',
    title: 'Sundarban Honey 1kg',
    price: 2300,
    oldPrice: 2500,
    badgeRight: { text: 'Save 8%', variant: 'green' },
    image: '/images/prod-sundarban-1kg.png',
    category: 'Honey',
  },
  {
    id: 'jfy-black-seed-500g',
    title: 'Black Seed Honey 500g',
    price: 800,
    image: '/images/prod-black-seed-500.png',
    category: 'Honey',
  },
  {
    id: 'jfy-almond-1kg',
    title: 'Almond 1kg',
    price: 1600,
    image: '/images/prod-almond-1kg.png',
    category: 'Nuts & Seeds',
  },
  {
    id: 'jfy-kala-bhuna-500gm',
    title: 'Kala Bhuna Masala-500gm',
    price: 1500,
    badgeLeft: { text: 'Offered Items', variant: 'orange' },
    image: '/images/prod-kala-bhuna-500.png',
    category: 'Spices',
  },
  {
    id: 'jfy-shahi-masala-500gm',
    title: 'Shahi Masala 500gm',
    price: 1500,
    badgeLeft: { text: 'Offered Items', variant: 'orange' },
    image: '/images/prod-shahi-masala-500.png',
    category: 'Spices',
  },
];

export const MENU_SUNDARBAN_PRODUCTS: Product[] = [
  {
    id: 'menu-sundarban-15g',
    title: 'Sundarban Honey 15g X 24 pcs (BOX)',
    price: 768,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    image: '/images/menu-sundarban-15g.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'menu-sundarban-8g',
    title: 'Sundarban Honey 8g X 24 pcs (BOX)',
    price: 432,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    image: '/images/menu-sundarban-8g.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'menu-honey-combo',
    title: 'Honey Combo Pack (4 types Honey)',
    price: 1950,
    image: '/images/menu-honey-combo.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'menu-honey-special-combo',
    title: 'Honey Special Combo Pack (4 types Honey)',
    price: 1800,
    oldPrice: 2000,
    badgeLeft: { text: 'New Arrival', variant: 'orange' },
    badgeRight: { text: 'Save 10%', variant: 'green' },
    image: '/images/menu-honey-special-combo.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'menu-sundarban-1kg',
    title: 'Sundarban Honey 1kg',
    price: 2300,
    oldPrice: 2500,
    badgeRight: { text: 'Save 8%', variant: 'green' },
    image: '/images/menu-sundarban-1kg.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: false,
    isBestSelling: true,
    inStock: true,
  },
  {
    id: 'menu-sundarban-500gm',
    title: 'Sundarban Honey 500 gm',
    price: 1150,
    oldPrice: 1250,
    badgeRight: { text: 'Save 8%', variant: 'green' },
    image: '/images/menu-sundarban-500gm.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'menu-sundarban-250gm',
    title: 'Sundarban Honey 250gm',
    price: 625,
    image: '/images/menu-sundarban-250gm.png',
    category: 'Sundarban Honey',
    brand: 'Honeyraj',
    isNewArrival: false,
    inStock: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'এই অবিশ্বাসের জগতে আস্থাশীল একটি প্রতিষ্ঠান ঘরের বাজার।',
    name: 'Fariha Akter Tumpa',
    role: 'Entrepreneur',
    avatar: '/images/avatar-fariha.png',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      '২য় বার Ghorerbazar থেকে অর্ডার করলাম। আগের মতো এবারও দারুণ কোয়ালিটি আর দ্রুত ডেলিভারি পেয়েছি। একদম সন্তুষ্ট!',
    name: 'Ayesha Khan',
    role: 'Banker',
    avatar: '/images/avatar-ayesha.png',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'Thanks Ghorerbazar for free Honeyraj. Of course, I got it for being a regular customer.',
    name: 'Sultana Yesmin',
    role: 'Housewife',
    avatar: '/images/avatar-sultana.png',
    rating: 5,
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Information',
    links: [
      { label: 'About us', actionType: 'toast', target: 'Information — About us' },
      { label: 'Contact us', actionType: 'toast', target: 'Information — Contact us' },
      { label: 'Company Information', actionType: 'toast', target: 'Information — Company Information' },
      { label: 'Ghorer Bazar Stories', actionType: 'toast', target: 'Information — Ghorer Bazar Stories' },
      { label: 'Terms & Conditions', actionType: 'toast', target: 'Information — Terms & Conditions' },
      { label: 'Privacy Policy', actionType: 'toast', target: 'Information — Privacy Policy' },
      { label: 'Careers', actionType: 'toast', target: 'Information — Careers' },
    ],
  },
  {
    title: 'Shop By',
    links: [
      { label: 'Oil & Ghee', actionType: 'category', target: 'oil-ghee' },
      { label: 'Honey', actionType: 'category', target: 'sundarban-honey' },
      { label: 'Dates', actionType: 'category', target: 'dates' },
      { label: 'Spices', actionType: 'category', target: 'spices' },
      { label: 'Nuts & Seeds', actionType: 'category', target: 'nuts-seeds' },
      { label: 'Beverage', actionType: 'category', target: 'beverage' },
      { label: 'Functional Foods', actionType: 'category', target: 'organic' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Support Center', actionType: 'toast', target: 'Support — Support Center' },
      { label: 'How to Order', actionType: 'toast', target: 'Support — How to Order' },
      { label: 'Order Tracking', actionType: 'modal', target: 'track' },
      { label: 'Payment', actionType: 'toast', target: 'Support — Payment' },
      { label: 'Shipping', actionType: 'toast', target: 'Support — Shipping' },
      { label: 'FAQ', actionType: 'toast', target: 'Support — FAQ' },
    ],
  },
  {
    title: 'Consumer Policy',
    links: [
      { label: 'Happy Return', actionType: 'toast', target: 'Consumer Policy — Happy Return' },
      { label: 'Refund Policy', actionType: 'toast', target: 'Consumer Policy — Refund Policy' },
      { label: 'Exchange', actionType: 'toast', target: 'Consumer Policy — Exchange' },
      { label: 'Cancellation', actionType: 'toast', target: 'Consumer Policy — Cancellation' },
      { label: 'Pre-Order', actionType: 'toast', target: 'Consumer Policy — Pre-Order' },
      { label: 'Extra Discount', actionType: 'toast', target: 'Consumer Policy — Extra Discount' },
    ],
  },
];

export const ALL_CATALOG_PRODUCTS: Product[] = (() => {
  const seen = new Map<string, Product>();
  [
    ...MENU_SUNDARBAN_PRODUCTS,
    ...TOP_SELLING_PRODUCTS,
    ...ALL_NATURAL_HONEY,
    ...PREMIUM_DATES,
    ...COOKING_ESSENTIALS,
    ...ORGANIC_CERTIFIED,
    ...JUST_FOR_YOU,
  ].forEach((p) => {
    if (!seen.has(p.title)) {
      seen.set(p.title, {
        ...p,
        inStock: p.inStock ?? true,
      });
    }
  });
  return Array.from(seen.values());
})();

const TOP_SELLING_TITLES = new Set(TOP_SELLING_PRODUCTS.map((p) => p.title));

function normalizeProductList(items: Product[]): Product[] {
  const seen = new Set<string>();
  const result: Product[] = [];
  for (const p of items) {
    if (seen.has(p.title)) continue;
    seen.add(p.title);
    result.push({
      ...p,
      inStock: p.inStock ?? true,
      isNewArrival: p.isNewArrival ?? p.badgeLeft?.text === 'New Arrival',
      isBestSelling:
        p.isBestSelling ??
        (Boolean(p.topSellingRibbon) ||
          p.badgeLeft?.text === 'Best Selling' ||
          TOP_SELLING_TITLES.has(p.title)),
    });
  }
  return result;
}

export function getCategoryPageConfig(slug: string): CategoryPageConfig {
  switch (slug) {
    case 'sundarban-honey':
      return {
        slug: 'sundarban-honey',
        title: 'Sundarban Honey',
        navLabel: 'Honey',
        maxPrice: 2500,
        products: MENU_SUNDARBAN_PRODUCTS,
      };
    case 'all-natural-honey':
    case 'honey':
      return {
        slug: 'all-natural-honey',
        title: 'All Natural Honey',
        navLabel: 'Honey',
        maxPrice: 2500,
        products: normalizeProductList([
          ...MENU_SUNDARBAN_PRODUCTS,
          ...ALL_NATURAL_HONEY,
          ...TOP_SELLING_PRODUCTS.filter((p) => p.category === 'Honey'),
        ]),
      };
    case 'dates':
    case 'premium-dates':
      return {
        slug: 'dates',
        title: 'Premium Dates',
        navLabel: 'Dates',
        maxPrice: 2500,
        products: normalizeProductList([
          ...PREMIUM_DATES,
          ...JUST_FOR_YOU.filter((p) => p.category === 'Dates'),
        ]),
      };
    case 'oil-ghee':
      return {
        slug: 'oil-ghee',
        title: 'Oil & Ghee',
        navLabel: 'Oil & Ghee',
        maxPrice: 2500,
        products: normalizeProductList(
          ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Oil & Ghee')
        ),
      };
    case 'spices':
      return {
        slug: 'spices',
        title: 'Spices',
        navLabel: 'Spices',
        maxPrice: 2500,
        products: normalizeProductList(
          ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Spices')
        ),
      };
    case 'nuts-seeds':
      return {
        slug: 'nuts-seeds',
        title: 'Nuts & Seeds',
        navLabel: 'Nuts & Seeds',
        maxPrice: 2500,
        products: normalizeProductList(
          ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Nuts & Seeds')
        ),
      };
    case 'beverage':
      return {
        slug: 'beverage',
        title: 'Beverage',
        navLabel: 'Beverage',
        maxPrice: 2500,
        products: normalizeProductList(
          ORGANIC_CERTIFIED.filter(
            (p) =>
              p.title.toLowerCase().includes('milk') ||
              p.title.toLowerCase().includes('vinegar')
          )
        ),
      };
    case 'organic':
    case 'organic-certified':
      return {
        slug: 'organic',
        title: 'Organic Certified',
        navLabel: 'Certified',
        maxPrice: 2500,
        products: normalizeProductList(ORGANIC_CERTIFIED),
      };
    case 'cooking-essentials':
      return {
        slug: 'cooking-essentials',
        title: 'Cooking Essentials',
        navLabel: 'Oil & Ghee',
        maxPrice: 2500,
        products: normalizeProductList([
          ...COOKING_ESSENTIALS,
          ...TOP_SELLING_PRODUCTS.filter((p) => p.category === 'Oil & Ghee'),
        ]),
      };
    case 'flours-lentils':
      return {
        slug: 'flours-lentils',
        title: 'Flours & Lentils',
        navLabel: 'Flours & Lentils',
        maxPrice: 2500,
        products: normalizeProductList(
          ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Flours & Lentils')
        ),
      };
    case 'offer-zone':
      return {
        slug: 'offer-zone',
        title: 'Offer Zone',
        navLabel: 'Offer Zone',
        maxPrice: 2500,
        products: normalizeProductList(
          ALL_CATALOG_PRODUCTS.filter(
            (p) => Boolean(p.oldPrice) || Boolean(p.badgeRight) || Boolean(p.badgeLeft)
          )
        ),
      };
    case 'all-products':
      return {
        slug: 'all-products',
        title: 'All Products',
        maxPrice: 2500,
        products: normalizeProductList(ALL_CATALOG_PRODUCTS),
      };
    default:
      return {
        slug: 'sundarban-honey',
        title: 'Sundarban Honey',
        navLabel: 'Honey',
        maxPrice: 2500,
        products: MENU_SUNDARBAN_PRODUCTS,
      };
  }
}

export function getCategorySlugForProduct(product: Product): string {
  switch (product.category) {
    case 'Sundarban Honey':
      return 'sundarban-honey';
    case 'Honey':
      return 'all-natural-honey';
    case 'Dates':
      return 'dates';
    case 'Oil & Ghee':
      return 'oil-ghee';
    case 'Spices':
      return 'spices';
    case 'Nuts & Seeds':
      return 'nuts-seeds';
    case 'Flours & Lentils':
      return 'flours-lentils';
    case 'Organic':
      return 'organic';
    default:
      return 'all-products';
  }
}
