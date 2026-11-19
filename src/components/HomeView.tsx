import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Flame, ShoppingCart, Star } from 'lucide-react';
import {
  ALL_NATURAL_HONEY,
  BRANDS,
  COOKING_ESSENTIALS,
  FEATURED_CATEGORIES,
  JUST_FOR_YOU,
  ORGANIC_CERTIFIED,
  PREMIUM_DATES,
  TESTIMONIALS,
  TOP_SELLING_PRODUCTS,
} from '../data/storeData';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface HomeViewProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onOpenCategoryPage: (slug: string) => void;
  onSelectProduct: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  onChange: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ count, activeIndex, onChange }) => (
  <div className="flex items-center justify-center gap-2 mt-7">
    {Array.from({ length: count }).map((_, idx) => {
      const isActive = idx === activeIndex;
      return (
        <button
          key={idx}
          type="button"
          aria-label={`Slide ${idx + 1}`}
          onClick={() => onChange(idx)}
          className={`w-[7px] h-[7px] rounded-full transition-colors cursor-pointer ${
            isActive ? 'bg-[#F48721]' : 'border border-[#F48721] bg-transparent hover:bg-[#F48721]/30'
          }`}
        />
      );
    })}
  </div>
);

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel = 'VIEW ALL ITEMS',
  onAction,
}) => (
  <div className="flex items-end justify-between mb-5 sm:mb-6 gap-4">
    <div>
      <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#222933] leading-tight">
        {title}
      </h2>
      <div className="w-9 h-[3px] bg-[#F48721] mt-1.5 rounded-full" />
    </div>
    <button
      type="button"
      onClick={onAction}
      className="text-[11.5px] font-medium text-[#F48721] hover:text-[#D96F0E] tracking-wide flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
    >
      <span>{actionLabel}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);

export const HomeView: React.FC<HomeViewProps> = ({
  onAddToCart,
  onBuyNow,
  onOpenCategoryPage,
  onSelectProduct,
  onShowToast,
}) => {
  const [heroDot, setHeroDot] = useState(0);
  const [brandDot, setBrandDot] = useState(1);
  const [honeyDot, setHoneyDot] = useState(2);
  const [datesDot, setDatesDot] = useState(3);
  const [cookingDot, setCookingDot] = useState(1);
  const [organicDot, setOrganicDot] = useState(2);
  const [testimonialDot, setTestimonialDot] = useState(2);
  const [showExtraProducts, setShowExtraProducts] = useState(false);

  const justForYouItems = showExtraProducts
    ? [...JUST_FOR_YOU, ...ALL_NATURAL_HONEY.slice(0, 5)]
    : JUST_FOR_YOU;

  return (
    <main className="max-w-[1252px] mx-auto px-4 xl:px-0">
      {/* Hero Banners */}
      <section className="pt-4 sm:pt-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-8 relative rounded-[10px] overflow-hidden bg-[#1D2B1F]">
            <img
              src="/images/hero-main.png"
              alt="অর্গানিক বিটরুট পাউডারের সাথে হানিরাজ লিচু ফ্লাওয়ার হানি স্যাশে বক্স ফ্রি"
              referrerPolicy="no-referrer"
              className="w-full h-full max-h-[332px] object-cover block"
            />
            <div className="absolute bottom-3.5 left-5 flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Banner ${idx + 1}`}
                  onClick={() => setHeroDot(idx)}
                  className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                    heroDot === idx ? 'bg-[#F48721]' : 'bg-white/80 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenCategoryPage('sundarban-honey')}
            className="lg:col-span-4 rounded-[10px] overflow-hidden bg-[#2E1E14] block text-left cursor-pointer"
            aria-label="Explore Sundarban Honey and Combo Deals"
          >
            <img
              src="/images/hero-side.png"
              alt="মধু স্পেশাল কম্বোপ্যাক-এ ২০০ ছাড়"
              referrerPolicy="no-referrer"
              className="w-full h-full max-h-[220px] sm:max-h-[280px] lg:max-h-[332px] object-cover object-top block"
            />
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="featured-categories" className="pt-7 pb-4">
        <h2 className="text-[18px] sm:text-[20px] font-medium text-[#222933] text-center mb-5 sm:mb-6">
          Featured Categories
        </h2>
        <div className="relative">
          <button
            type="button"
            aria-label="Previous categories"
            onClick={() => onShowToast('Showing all featured categories')}
            className="hidden xl:flex absolute -left-4 top-[56px] z-10 w-8 h-8 rounded-full bg-[#F48721] hover:bg-[#E07614] text-white items-center justify-center shadow-sm cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next categories"
            onClick={() => onShowToast('Showing all featured categories')}
            className="hidden xl:flex absolute -right-4 top-[56px] z-10 w-8 h-8 rounded-full bg-[#F48721] hover:bg-[#E07614] text-white items-center justify-center shadow-sm cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5 sm:gap-[18px]">
            {FEATURED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onOpenCategoryPage(cat.categorySlug)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="w-full h-[116px] sm:h-[142px] bg-white rounded-[10px] border border-[#ECEAE4] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-center p-2.5 group-hover:border-[#F48721]/60 transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[92px] sm:max-h-[112px] max-w-full object-contain"
                  />
                </div>
                <span className="mt-2.5 sm:mt-3 text-[13px] sm:text-[13.5px] font-medium text-[#374151] group-hover:text-[#F48721] transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section id="top-selling" className="pt-7 pb-4">
        <h2 className="text-[21px] sm:text-[25px] font-medium text-[#222933] text-center mb-5 sm:mb-6">
          Top Selling Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TOP_SELLING_PRODUCTS.map((product) => {
            const isOut = product.inStock === false;
            return (
              <div
                key={product.id}
                className="bg-white rounded-[10px] border border-[#ECEAE4] p-4 sm:p-5 sm:h-[300px] relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-shadow"
              >
                {isOut && (
                  <span className="absolute top-3 left-3 z-10 bg-[#E12B2B] text-white text-[11px] font-medium px-2 py-[2px] rounded-[3px] leading-tight pointer-events-none">
                    Out of Stock
                  </span>
                )}

                {product.topSellingRibbon && (
                  <span className="absolute top-0 right-0 bg-[#E12B2B] text-white text-[11px] font-medium px-2.5 py-1 rounded-bl-[6px] rounded-tr-[10px] flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Best Selling</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  aria-label={`View ${product.title}`}
                  className="group w-[190px] sm:w-[240px] md:w-[220px] xl:w-[260px] h-[180px] sm:h-[250px] shrink-0 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06] ${
                      isOut ? 'opacity-60' : ''
                    }`}
                  />
                </button>

                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="text-[16px] sm:text-[17px] font-medium text-[#222933]">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="hover:text-[#F48721] transition-colors cursor-pointer"
                    >
                      {product.title}
                    </button>
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
                    <span className="text-[17px] font-bold text-[#F48721] tabular-nums">
                      ৳{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[15px] text-[#8E95A2] line-through tabular-nums">
                        ৳{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 text-[11.5px] font-semibold whitespace-nowrap ${
                        isOut ? 'text-[#DC2626]' : 'text-[#059669]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full inline-block ${
                          isOut ? 'bg-[#E12B2B]' : 'bg-[#10B981]'
                        }`}
                      />
                      <span>{isOut ? 'Out of Stock' : 'In Stock'}</span>
                    </span>
                  </div>

                  {product.saveBadge && (
                    <div className="mt-2">
                      <span className="inline-block bg-[#10B981] text-white text-[11px] font-semibold px-3 py-[2px] rounded-full">
                        {product.saveBadge}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
                    {isOut ? (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="bg-[#F1F5F9] border border-[#CBD5E1] text-[#94A3B8] rounded-[6px] px-5 py-2 text-[13px] font-medium cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="border border-[#F48721] text-[#F48721] hover:bg-[#FFF5EB] rounded-[6px] px-4 py-2 text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add To Cart</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onBuyNow(product)}
                          className="bg-[#F48721] hover:bg-[#E07614] text-white rounded-[6px] px-4 py-2 text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy now</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Brands */}
      <section id="our-brands" className="pt-8 pb-4">
        <SectionHeader
          title="Our Brands"
          actionLabel="SEE ALL"
          onAction={() => onOpenCategoryPage('all-products')}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => onOpenCategoryPage(brand.id === 'honeyraj' ? 'sundarban-honey' : 'all-products')}
              className="bg-white rounded-[8px] border border-[#EAE8E2] h-[80px] sm:h-[90px] flex items-center justify-center px-4 sm:px-5 hover:border-[#F48721]/50 transition-colors cursor-pointer"
            >
              <img
                src={brand.image}
                alt={brand.name}
                referrerPolicy="no-referrer"
                className="max-h-[54px] sm:max-h-[68px] max-w-full object-contain"
              />
            </button>
          ))}
        </div>
        <PaginationDots count={2} activeIndex={brandDot} onChange={setBrandDot} />
      </section>

      {/* All Natural Honey */}
      <section id="all-natural-honey" className="pt-8 pb-4">
        <SectionHeader
          title="All Natural Honey"
          actionLabel="VIEW ALL ITEMS"
          onAction={() => onOpenCategoryPage('sundarban-honey')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {ALL_NATURAL_HONEY.map((product) => (
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
        <PaginationDots count={5} activeIndex={honeyDot} onChange={setHoneyDot} />
      </section>

      {/* Premium Dates */}
      <section id="premium-dates" className="pt-8 pb-4">
        <SectionHeader
          title="Premium Dates"
          actionLabel="VIEW ALL ITEMS"
          onAction={() => onOpenCategoryPage('dates')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {PREMIUM_DATES.map((product) => (
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
        <PaginationDots count={6} activeIndex={datesDot} onChange={setDatesDot} />
      </section>

      {/* Mid-Page Swosti Banner */}
      <section className="pt-8 sm:pt-10 pb-2">
        <div className="rounded-[8px] overflow-hidden">
          <img
            src="/images/swosti-banner.png"
            alt="স্বস্তি ফুড - খাবারে স্বাদ এবং প্রশান্তি"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Cooking Essentials */}
      <section id="cooking-essentials" className="pt-8 pb-4">
        <SectionHeader
          title="Cooking Essentials"
          actionLabel="VIEW ALL ITEMS"
          onAction={() => onOpenCategoryPage('cooking-essentials')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {COOKING_ESSENTIALS.map((product) => (
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
        <PaginationDots count={5} activeIndex={cookingDot} onChange={setCookingDot} />
      </section>

      {/* Organic Certified */}
      <section id="organic-certified" className="pt-8 pb-4">
        <SectionHeader
          title="Organic Certified"
          actionLabel="VIEW ALL ITEMS"
          onAction={() => onOpenCategoryPage('organic')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {ORGANIC_CERTIFIED.map((product) => (
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
        <PaginationDots count={5} activeIndex={organicDot} onChange={setOrganicDot} />
      </section>

      {/* Just For You */}
      <section id="just-for-you" className="pt-8 pb-4">
        <SectionHeader
          title="Just For You"
          actionLabel="VIEW ALL PRODUCTS"
          onAction={() => onOpenCategoryPage('all-products')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {justForYouItems.map((product) => (
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
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setShowExtraProducts((prev) => !prev)}
            className="border border-[#F48721] text-[#F48721] hover:bg-[#F48721] hover:text-white rounded-full px-8 py-[7px] text-[12px] font-medium tracking-wide transition-colors cursor-pointer"
          >
            {showExtraProducts ? 'SHOW LESS' : 'LOAD MORE'}
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-10 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[10px] border border-[#EAE8E2] p-5 sm:p-6 flex flex-col justify-between min-h-[210px] sm:min-h-[244px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div>
                <p className="text-[13.5px] text-[#4B5563] leading-[1.6]">{t.quote}</p>
                <div className="flex items-center gap-0.5 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3.5 mt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] rounded-full object-cover shrink-0 bg-[#F3F4F6]"
                />
                <div>
                  <h4 className="text-[14px] font-medium text-[#222933]">{t.name}</h4>
                  <p className="text-[11.5px] text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PaginationDots count={3} activeIndex={testimonialDot} onChange={setTestimonialDot} />
      </section>
    </main>
  );
};
