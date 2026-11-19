export interface ProductBadge {
  text: string;
  variant: 'orange' | 'green';
}

export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  badgeLeft?: ProductBadge;
  badgeRight?: ProductBadge;
  saveBadge?: string;
  topSellingRibbon?: boolean;
  image: string;
  category: string;
  brand?: string;
  isNewArrival?: boolean;
  isBestSelling?: boolean;
  inStock?: boolean;
}

export interface NavCategory {
  label: string;
  hasDropdown: boolean;
  items?: string[];
  targetSection?: string;
  categorySlug?: string;
}

export interface FeaturedCategory {
  id: string;
  name: string;
  image: string;
  targetSection: string;
  categorySlug: string;
}

export interface BrandItem {
  id: string;
  name: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface FooterColumn {
  title: string;
  links: { label: string; actionType: 'section' | 'category' | 'modal' | 'toast'; target: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ActiveView = 'home' | 'category' | 'product';
export type ModalType = 'signin' | 'track' | 'wishlist' | 'chat' | null;
export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface CategoryFilterState {
  minPrice: number;
  maxPrice: number;
  flagNew: boolean;
  flagDiscount: boolean;
  flagBestSelling: boolean;
  stockIn: boolean;
  stockOut: boolean;
  sortBy: SortOption;
}

export interface CategoryPageConfig {
  slug: string;
  title: string;
  navLabel?: string;
  maxPrice: number;
  products: Product[];
}

export interface ProductReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface ProductDetailInfo {
  gallery: string[];
  brandName: string;
  brandLogo: string;
  shortDescription: string;
  description: string;
  keyFeatures: string[];
  usageStorage: string[];
  companionProduct: Product;
  initialReviews: ProductReview[];
  relatedProducts: Product[];
}
