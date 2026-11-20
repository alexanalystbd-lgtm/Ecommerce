import { CartItem, CategoryFilterState, Product, ProductReview } from '../types/store';

export function addItemToCart(cart: CartItem[], product: Product): CartItem[] {
  if (product.inStock === false) return cart;
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    return cart.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { product, quantity: 1 }];
}

export function updateCartQuantity(cart: CartItem[], productId: string, delta: number): CartItem[] {
  return cart
    .map((item) =>
      item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);
}

export function getCartTotals(cart: CartItem[]): { totalItems: number; totalAmount: number } {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  return { totalItems, totalAmount };
}

export function clampPriceRange(
  currentMin: number,
  currentMax: number,
  changed: 'min' | 'max',
  nextValue: number
): { minPrice: number; maxPrice: number } {
  if (changed === 'min') {
    return {
      minPrice: Math.min(nextValue, currentMax),
      maxPrice: currentMax,
    };
  }
  return {
    minPrice: currentMin,
    maxPrice: Math.max(nextValue, currentMin),
  };
}

export function filterAndSortCategoryProducts(
  products: Product[],
  filters: CategoryFilterState
): {
  items: Product[];
  inStockCount: number;
  outOfStockCount: number;
} {
  const baseFiltered = products.filter((p) => {
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.flagNew || filters.flagDiscount || filters.flagBestSelling) {
      const hasDiscount = Boolean(p.oldPrice) || Boolean(p.badgeRight);
      const matchesNew = filters.flagNew && Boolean(p.isNewArrival);
      const matchesDiscount = filters.flagDiscount && hasDiscount;
      const matchesBestSelling =
        filters.flagBestSelling &&
        (Boolean(p.isBestSelling) ||
          Boolean(p.topSellingRibbon) ||
          p.badgeLeft?.text === 'Best Selling');
      if (!matchesNew && !matchesDiscount && !matchesBestSelling) return false;
    }
    return true;
  });

  const inStockCount = baseFiltered.filter((p) => p.inStock !== false).length;
  const outOfStockCount = baseFiltered.filter((p) => p.inStock === false).length;

  let items = baseFiltered.filter((p) => {
    if (filters.stockIn && !filters.stockOut) return p.inStock !== false;
    if (!filters.stockIn && filters.stockOut) return p.inStock === false;
    return true;
  });

  if (filters.sortBy === 'price-asc') {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    items = [...items].sort((a, b) => b.price - a.price);
  }

  return { items, inStockCount, outOfStockCount };
}

export function searchCatalog(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
}

export function calculateBundleSummary(selectedProducts: Product[]): {
  count: number;
  totalPrice: number;
  totalSavings: number;
} {
  const valid = selectedProducts.filter((p) => p.inStock !== false);
  const totalPrice = valid.reduce((sum, p) => sum + p.price, 0);
  const totalSavings = valid.reduce(
    (sum, p) => sum + (p.oldPrice && p.oldPrice > p.price ? p.oldPrice - p.price : 0),
    0
  );
  return { count: valid.length, totalPrice, totalSavings };
}

export function computeReviewSummary(reviews: ProductReview[]): {
  totalReviews: number;
  averageRating: number;
  recommendedCount: number;
  recommendedPct: number;
  breakdown: { stars: number; count: number; percentage: number }[];
} {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      recommendedCount: 0,
      recommendedPct: 0,
      breakdown: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, percentage: 0 })),
    };
  }
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = Number((sum / totalReviews).toFixed(1));
  const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
  const recommendedPct = Number(((recommendedCount / totalReviews) * 100).toFixed(2));
  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = Math.round((count / totalReviews) * 100);
    return { stars, count, percentage };
  });
  return { totalReviews, averageRating, recommendedCount, recommendedPct, breakdown };
}

export function getNextSlideIndex(current: number, totalSlides: number, delta = 1): number {
  if (totalSlides <= 0) return 0;
  return ((current + delta) % totalSlides + totalSlides) % totalSlides;
}
