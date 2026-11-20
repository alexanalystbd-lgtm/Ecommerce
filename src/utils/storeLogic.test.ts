import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addItemToCart,
  calculateBundleSummary,
  clampPriceRange,
  computeReviewSummary,
  filterAndSortCategoryProducts,
  getCartTotals,
  getNextSlideIndex,
  searchCatalog,
  updateCartQuantity,
} from './storeLogic';
import {
  ALL_CATALOG_PRODUCTS,
  getCategoryPageConfig,
  getCategorySlugForProduct,
  MENU_SUNDARBAN_PRODUCTS,
} from '../data/storeData';
import { getProductDetailInfo } from '../data/productDetails';

test('cart addition, quantity updates, and totals calculation', () => {
  const honey = MENU_SUNDARBAN_PRODUCTS[0]; // 768
  const combo = MENU_SUNDARBAN_PRODUCTS[2]; // 1950
  const outOfStock = MENU_SUNDARBAN_PRODUCTS[6]; // inStock: false

  let cart = addItemToCart([], honey);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  cart = addItemToCart(cart, honey);
  assert.equal(cart[0].quantity, 2);

  cart = addItemToCart(cart, combo);
  assert.equal(cart.length, 2);

  // Out of stock product must not be added
  cart = addItemToCart(cart, outOfStock);
  assert.equal(cart.length, 2);

  const totals = getCartTotals(cart);
  assert.equal(totals.totalItems, 3);
  assert.equal(totals.totalAmount, 768 * 2 + 1950);

  // Decrement to zero removes item
  cart = updateCartQuantity(cart, combo.id, -1);
  assert.equal(cart.length, 1);
  assert.equal(getCartTotals(cart).totalAmount, 1536);
});

test('price range clamping prevents min exceeding max and max going below min', () => {
  const minClamped = clampPriceRange(500, 1200, 'min', 1500);
  assert.deepEqual(minClamped, { minPrice: 1200, maxPrice: 1200 });

  const maxClamped = clampPriceRange(500, 1200, 'max', 300);
  assert.deepEqual(maxClamped, { minPrice: 500, maxPrice: 500 });
});

test('category filtering and sorting match Sundarban Honey catalog behavior', () => {
  const defaultRes = filterAndSortCategoryProducts(MENU_SUNDARBAN_PRODUCTS, {
    minPrice: 0,
    maxPrice: 2500,
    flagNew: false,
    flagDiscount: false,
    flagBestSelling: false,
    stockIn: false,
    stockOut: false,
    sortBy: 'default',
  });
  assert.equal(defaultRes.items.length, 7);
  assert.equal(defaultRes.inStockCount, 6);
  assert.equal(defaultRes.outOfStockCount, 1);

  const discountAsc = filterAndSortCategoryProducts(MENU_SUNDARBAN_PRODUCTS, {
    minPrice: 0,
    maxPrice: 2500,
    flagNew: false,
    flagDiscount: true,
    flagBestSelling: false,
    stockIn: false,
    stockOut: false,
    sortBy: 'price-asc',
  });
  assert.deepEqual(
    discountAsc.items.map((p) => p.price),
    [1150, 1800, 2300]
  );

  const bestSellingOnly = filterAndSortCategoryProducts(MENU_SUNDARBAN_PRODUCTS, {
    minPrice: 0,
    maxPrice: 2500,
    flagNew: false,
    flagDiscount: false,
    flagBestSelling: true,
    stockIn: false,
    stockOut: false,
    sortBy: 'default',
  });
  assert.equal(bestSellingOnly.items.length, 1);
  assert.equal(bestSellingOnly.items[0].id, 'menu-sundarban-1kg');

  const outOnly = filterAndSortCategoryProducts(MENU_SUNDARBAN_PRODUCTS, {
    minPrice: 0,
    maxPrice: 2500,
    flagNew: false,
    flagDiscount: false,
    flagBestSelling: false,
    stockIn: false,
    stockOut: true,
    sortBy: 'default',
  });
  assert.equal(outOnly.items.length, 1);
  assert.equal(outOnly.items[0].id, 'menu-sundarban-250gm');
});

test('searchCatalog filters by title and category', () => {
  assert.equal(searchCatalog(ALL_CATALOG_PRODUCTS, '').length, 0);
  const honeyMatches = searchCatalog(ALL_CATALOG_PRODUCTS, 'sundarban');
  assert.ok(honeyMatches.length >= 4);
  const dateMatches = searchCatalog(ALL_CATALOG_PRODUCTS, 'ajwa');
  assert.ok(dateMatches.some((p) => p.title.includes('Ajwa')));
});

test('getCategoryPageConfig resolves all categories with normalized stock flags', () => {
  const sundarban = getCategoryPageConfig('sundarban-honey');
  assert.equal(sundarban.title, 'Sundarban Honey');
  assert.equal(sundarban.products.length, 7);

  const dates = getCategoryPageConfig('dates');
  assert.equal(dates.title, 'Premium Dates');
  assert.ok(dates.products.length >= 5);
  assert.ok(dates.products.every((p) => typeof p.inStock === 'boolean'));

  const all = getCategoryPageConfig('all-products');
  assert.equal(all.title, 'All Products');
  assert.ok(all.products.length >= 20);

  assert.equal(getCategorySlugForProduct(dates.products[0]), 'dates');
});

test('calculateBundleSummary and computeReviewSummary calculate bundle and rating stats cleanly', () => {
  const bundle = calculateBundleSummary([
    { ...MENU_SUNDARBAN_PRODUCTS[4] }, // 2300 (oldPrice 2500 -> save 200)
    { ...MENU_SUNDARBAN_PRODUCTS[5] }, // 1150 (oldPrice 1250 -> save 100)
  ]);
  assert.equal(bundle.count, 2);
  assert.equal(bundle.totalPrice, 3450);
  assert.equal(bundle.totalSavings, 300);

  const stats = computeReviewSummary([
    { id: 'r1', author: 'A', date: 'Today', rating: 5, comment: 'Great' },
    { id: 'r2', author: 'B', date: 'Today', rating: 4, comment: 'Good' },
  ]);
  assert.equal(stats.totalReviews, 2);
  assert.equal(stats.averageRating, 4.5);
  assert.equal(stats.recommendedCount, 2);
  assert.equal(stats.recommendedPct, 100);
});

test('getProductDetailInfo provides tailored shortDescription per product category', () => {
  const ghee = ALL_CATALOG_PRODUCTS.find((p) => p.title.includes('Gawa Ghee'));
  const honey = ALL_CATALOG_PRODUCTS.find((p) => p.title.includes('Sundarban Honey 1kg'));
  const dates = ALL_CATALOG_PRODUCTS.find((p) => p.title.includes('Ajwa'));

  assert.ok(ghee && honey && dates);
  assert.ok(getProductDetailInfo(ghee).shortDescription.toLowerCase().includes('cow ghee'));
  assert.ok(getProductDetailInfo(honey).shortDescription.toLowerCase().includes('raw, unfiltered'));
  assert.ok(getProductDetailInfo(dates).shortDescription.toLowerCase().includes('grade-a'));
});

test('getNextSlideIndex wraps cleanly forward and backward across slide boundaries', () => {
  assert.equal(getNextSlideIndex(0, 3, 1), 1);
  assert.equal(getNextSlideIndex(2, 3, 1), 0);
  assert.equal(getNextSlideIndex(0, 3, -1), 2);
  assert.equal(getNextSlideIndex(0, 0, 1), 0);
});
