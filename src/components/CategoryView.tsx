import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { getCategoryPageConfig } from '../data/storeData';
import { CategoryFilterState, Product, SortOption } from '../types/store';
import { clampPriceRange, filterAndSortCategoryProducts } from '../utils/storeLogic';
import { ProductCard } from './ProductCard';

interface CategoryViewProps {
  categorySlug: string;
  onGoHome: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categorySlug,
  onGoHome,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const config = getCategoryPageConfig(categorySlug);

  const initialFilters: CategoryFilterState = {
    minPrice: 0,
    maxPrice: config.maxPrice,
    flagNew: false,
    flagDiscount: false,
    flagBestSelling: false,
    stockIn: false,
    stockOut: false,
    sortBy: 'default',
  };

  const [filters, setFilters] = useState<CategoryFilterState>(initialFilters);
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { items, inStockCount, outOfStockCount } = filterAndSortCategoryProducts(
    config.products,
    filters
  );

  const activeFilterCount =
    (filters.minPrice > 0 || filters.maxPrice < config.maxPrice ? 1 : 0) +
    (filters.flagNew ? 1 : 0) +
    (filters.flagDiscount ? 1 : 0) +
    (filters.flagBestSelling ? 1 : 0) +
    (filters.stockIn ? 1 : 0) +
    (filters.stockOut ? 1 : 0);

  const handleRangeChange = (changed: 'min' | 'max', value: number) => {
    setFilters((prev) => {
      const clamped = clampPriceRange(prev.minPrice, prev.maxPrice, changed, value);
      return { ...prev, ...clamped };
    });
  };

  const toggleCollapse = (key: string) => {
    setCollapsedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const leftPct = (filters.minPrice / config.maxPrice) * 100;
  const rightPct = (filters.maxPrice / config.maxPrice) * 100;

  return (
    <main className="max-w-[1252px] mx-auto px-4 xl:px-0">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 pb-[18px]">
        <h1 className="text-[20px] sm:text-[21px] font-semibold text-[#222933] leading-tight">
          {config.title}
        </h1>
        <nav className="flex items-center gap-1.5 text-[12.5px] text-[#64748B]" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={onGoHome}
            className="text-[12.5px] text-[#64748B] hover:text-[#F48721] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#94A3B8] text-[13px] leading-none">&rsaquo;</span>
          <span className="text-[#475569] font-medium">{config.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[292px_1fr] gap-5 items-start pb-10 lg:pb-[52px]">
        {/* Left Filters Sidebar (collapsible on mobile, always visible on desktop) */}
        <aside
          className={`${
            mobileFiltersOpen ? 'flex' : 'hidden'
          } lg:flex flex-col gap-4`}
        >
          {/* Price Range Card */}
          <div className="bg-white border border-[#E6E4DF] rounded-[6px] px-[18px] py-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div
              className={`flex items-center justify-between ${
                collapsedCards.price ? '' : 'pb-2.5 border-b border-[#EFECE6]'
              }`}
            >
              <span className="text-[12.5px] font-bold tracking-[0.03em] text-[#1E293B] uppercase">
                PRICE RANGE
              </span>
              <button
                type="button"
                onClick={() => toggleCollapse('price')}
                aria-label="Toggle Price Range"
                className="w-[22px] h-[22px] inline-flex items-center justify-center text-[#334155] text-[16px] font-medium leading-none cursor-pointer"
              >
                {collapsedCards.price ? '+' : '−'}
              </button>
            </div>

            {!collapsedCards.price && (
              <div className="pt-3.5">
                <div className="flex items-center justify-between text-[12.5px] font-medium text-[#334155] mb-3 tabular-nums">
                  <span>৳ {filters.minPrice.toLocaleString()}</span>
                  <span>৳ {filters.maxPrice.toLocaleString()}</span>
                </div>

                <div className="relative h-5 flex items-center mb-1">
                  <div className="absolute left-0 right-0 h-1 bg-[#E2E8F0] rounded-full" />
                  <div
                    className="absolute h-1 bg-[#F48721] rounded-full"
                    style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={config.maxPrice}
                    step={50}
                    value={filters.minPrice}
                    onChange={(e) => handleRangeChange('min', Number(e.target.value))}
                    aria-label="Minimum price"
                    className="range-input"
                  />
                  <input
                    type="range"
                    min={0}
                    max={config.maxPrice}
                    step={50}
                    value={filters.maxPrice}
                    onChange={(e) => handleRangeChange('max', Number(e.target.value))}
                    aria-label="Maximum price"
                    className="range-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Product Flag Card */}
          <div className="bg-white border border-[#E6E4DF] rounded-[6px] px-[18px] py-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div
              className={`flex items-center justify-between ${
                collapsedCards.flag ? '' : 'pb-2.5 border-b border-[#EFECE6]'
              }`}
            >
              <span className="text-[12.5px] font-bold tracking-[0.03em] text-[#1E293B] uppercase">
                PRODUCT FLAG
              </span>
              <button
                type="button"
                onClick={() => toggleCollapse('flag')}
                aria-label="Toggle Product Flag"
                className="w-[22px] h-[22px] inline-flex items-center justify-center text-[#334155] text-[16px] font-medium leading-none cursor-pointer"
              >
                {collapsedCards.flag ? '+' : '−'}
              </button>
            </div>

            {!collapsedCards.flag && (
              <div className="pt-3.5 flex flex-col gap-2.5">
                <label className="flex items-center justify-between gap-2 text-[13px] text-[#475569] cursor-pointer select-none">
                  <span className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.flagNew}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, flagNew: e.target.checked }))
                      }
                      className="w-3.5 h-3.5 accent-[#F48721] cursor-pointer"
                    />
                    <span>New Arrival</span>
                  </span>
                </label>

                <label className="flex items-center justify-between gap-2 text-[13px] text-[#475569] cursor-pointer select-none">
                  <span className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.flagDiscount}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, flagDiscount: e.target.checked }))
                      }
                      className="w-3.5 h-3.5 accent-[#F48721] cursor-pointer"
                    />
                    <span>Discount</span>
                  </span>
                </label>

                <label className="flex items-center justify-between gap-2 text-[13px] text-[#475569] cursor-pointer select-none">
                  <span className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.flagBestSelling}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, flagBestSelling: e.target.checked }))
                      }
                      className="w-3.5 h-3.5 accent-[#F48721] cursor-pointer"
                    />
                    <span>Best Selling</span>
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Availability Card */}
          <div className="bg-white border border-[#E6E4DF] rounded-[6px] px-[18px] py-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div
              className={`flex items-center justify-between ${
                collapsedCards.stock ? '' : 'pb-2.5 border-b border-[#EFECE6]'
              }`}
            >
              <span className="text-[12.5px] font-bold tracking-[0.03em] text-[#1E293B] uppercase">
                AVAILABILITY
              </span>
              <button
                type="button"
                onClick={() => toggleCollapse('stock')}
                aria-label="Toggle Availability"
                className="w-[22px] h-[22px] inline-flex items-center justify-center text-[#334155] text-[16px] font-medium leading-none cursor-pointer"
              >
                {collapsedCards.stock ? '+' : '−'}
              </button>
            </div>

            {!collapsedCards.stock && (
              <div className="pt-3.5 flex flex-col gap-2.5">
                <label className="flex items-center justify-between gap-2 text-[13px] text-[#475569] cursor-pointer select-none">
                  <span className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.stockIn}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, stockIn: e.target.checked }))
                      }
                      className="w-3.5 h-3.5 accent-[#F48721] cursor-pointer"
                    />
                    <span>In Stock</span>
                  </span>
                  <span className="text-[11.5px] text-[#94A3B8] tabular-nums">
                    ({inStockCount})
                  </span>
                </label>

                <label className="flex items-center justify-between gap-2 text-[13px] text-[#475569] cursor-pointer select-none">
                  <span className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.stockOut}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, stockOut: e.target.checked }))
                      }
                      className="w-3.5 h-3.5 accent-[#F48721] cursor-pointer"
                    />
                    <span>Out of Stock</span>
                  </span>
                  <span className="text-[11.5px] text-[#94A3B8] tabular-nums">
                    ({outOfStockCount})
                  </span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* Right Product Grid & Sort Bar */}
        <div>
          <div className="bg-white border border-[#E6E4DF] rounded-[6px] px-3.5 sm:px-4 py-2.5 mb-[18px] flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <label
                htmlFor="menu-sort-select"
                className="text-[12.5px] sm:text-[13px] text-[#334155] font-medium whitespace-nowrap"
              >
                Sort By :
              </label>
              <select
                id="menu-sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))
                }
                className="sort-select"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              aria-expanded={mobileFiltersOpen}
              className="lg:hidden inline-flex items-center gap-1.5 border border-[#E2E8F0] rounded-[4px] px-3 py-1.5 text-[12.5px] font-medium text-[#334155] hover:border-[#F48721] hover:text-[#F48721] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {mobileFiltersOpen ? 'Hide Filters' : 'Filters'}
                {activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="bg-white border border-[#E6E4DF] rounded-[6px] px-5 py-10 text-center text-[#64748B] text-[14px]">
              <p>No products match your selected filters.</p>
              <button
                type="button"
                onClick={() => setFilters(initialFilters)}
                className="mt-3 inline-flex items-center px-4 py-1.5 border border-[#F48721] text-[#F48721] rounded-[4px] text-[12.5px] font-medium hover:bg-[#F48721] hover:text-white transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              data-testid="category-product-grid"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onSelectProduct={onSelectProduct}
                  showBuyNow
                  showStockStatus
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
