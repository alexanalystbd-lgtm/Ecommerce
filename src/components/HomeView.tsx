import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Flame, ShoppingCart, Star } from 'lucide-react';
import {
  ALL_NATURAL_HONEY,
  BRANDS,
  COOKING_ESSENTIALS,
  FEATURED_CATEGORIES,
  JUST_FOR_YOU,
  MENU_SUNDARBAN_PRODUCTS,
  ORGANIC_CERTIFIED,
  PREMIUM_DATES,
  TESTIMONIALS,
  TOP_SELLING_PRODUCTS,
} from '../data/storeData';
import { FeaturedCategory, Product } from '../types/store';
import { getNextSlideIndex } from '../utils/storeLogic';
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

interface SlidingProductSectionProps {
  id: string;
  title: string;
  items: Product[];
  dotCount: number;
  initialDot?: number;
  intervalMs: number;
  onAction: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

function useHorizontalDrag(onPrev: () => void, onNext: () => void) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const didDragRef = useRef(false);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('[data-no-drag="true"]')) return;

    const startX = e.clientX;
    const startY = e.clientY;
    let lastDx = 0;
    let lastDy = 0;
    let isHorizontalDrag = false;
    didDragRef.current = false;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      lastDx = dx;
      lastDy = dy;

      if (!isHorizontalDrag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        isHorizontalDrag = true;
        didDragRef.current = true;
        setIsDragging(true);
      }

      if (isHorizontalDrag) {
        setDragOffset(dx);
      }
    };

    const onPointerUpOrCancel = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUpOrCancel);
      window.removeEventListener('pointercancel', onPointerUpOrCancel);
      setIsDragging(false);
      setDragOffset(0);

      if (Math.abs(lastDx) > 36 && Math.abs(lastDx) > Math.abs(lastDy)) {
        if (lastDx > 0) {
          onPrevRef.current();
        } else {
          onNextRef.current();
        }
      }

      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUpOrCancel);
    window.addEventListener('pointercancel', onPointerUpOrCancel);
  };

  return {
    dragOffset,
    isDragging,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
      onClickCapture: (e: React.MouseEvent) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
          didDragRef.current = false;
        }
      },
    },
  };
}

const SlidingProductSection: React.FC<SlidingProductSectionProps> = ({
  id,
  title,
  items,
  dotCount,
  initialDot = 0,
  intervalMs,
  onAction,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const [slideIndex, setSlideIndex] = useState(initialDot % dotCount);
  const [isPaused, setIsPaused] = useState(false);

  const { dragOffset, isDragging, dragHandlers } = useHorizontalDrag(
    () => setSlideIndex((prev) => getNextSlideIndex(prev, dotCount, -1)),
    () => setSlideIndex((prev) => getNextSlideIndex(prev, dotCount, 1))
  );

  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => getNextSlideIndex(prev, dotCount, 1));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [dotCount, intervalMs, isPaused, isDragging]);

  const trackItems = [...items, ...items.slice(0, 5)];

  return (
    <section
      id={id}
      className="pt-8 pb-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SectionHeader title={title} actionLabel="VIEW ALL ITEMS" onAction={onAction} />

      <div
        className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
        {...dragHandlers}
      >
        <div
          data-testid={`${id}-track`}
          data-slide-index={slideIndex}
          style={
            {
              '--slide-index': slideIndex,
              '--drag-offset': `${dragOffset}px`,
            } as React.CSSProperties
          }
          className={`prod-carousel-track flex gap-3 sm:gap-5 ${
            isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
          }`}
        >
          {trackItems.map((product, idx) => (
            <div key={`${product.id}-slide-${idx}`} className="prod-carousel-item min-w-0 flex">
              <div className="w-full flex flex-col [&>div]:flex-1">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onSelectProduct={onSelectProduct}
                  showBuyNow
                  showStockStatus
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaginationDots count={dotCount} activeIndex={slideIndex} onChange={setSlideIndex} />
    </section>
  );
};

const EXTRA_FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    id: 'oil-ghee',
    name: 'Oil & Ghee',
    image: '/images/top-ghee.png',
    targetSection: 'cooking-essentials',
    categorySlug: 'oil-ghee',
  },
  {
    id: 'offer-zone',
    name: 'Offer Zone',
    image: '/images/menu-honey-special-combo.png',
    targetSection: 'just-for-you',
    categorySlug: 'offer-zone',
  },
];

const FEATURED_CAROUSEL_CATEGORIES: FeaturedCategory[] = [
  ...FEATURED_CATEGORIES,
  ...EXTRA_FEATURED_CATEGORIES,
];

const HONEY_CAROUSEL_ITEMS: Product[] = [
  ...ALL_NATURAL_HONEY,
  ...MENU_SUNDARBAN_PRODUCTS.filter(
    (m) => !ALL_NATURAL_HONEY.some((a) => a.title === m.title)
  ),
];

const COOKING_CAROUSEL_ITEMS: Product[] = [
  ...COOKING_ESSENTIALS,
  ...JUST_FOR_YOU.filter((p) => p.category === 'Oil & Ghee' && p.title.includes('Mustard')),
  ...JUST_FOR_YOU.filter((p) => p.title.includes('Shahi Masala')),
];

export const HomeView: React.FC<HomeViewProps> = ({
  onAddToCart,
  onBuyNow,
  onOpenCategoryPage,
  onSelectProduct,
}) => {
  const HERO_SLIDE_COUNT = 3;
  const FEATURED_SLIDE_COUNT = FEATURED_CAROUSEL_CATEGORIES.length;

  const [heroDot, setHeroDot] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredPaused, setFeaturedPaused] = useState(false);

  const [brandDot, setBrandDot] = useState(0);
  const [brandPaused, setBrandPaused] = useState(false);
  const [testimonialDot, setTestimonialDot] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [showExtraProducts, setShowExtraProducts] = useState(false);

  const heroDrag = useHorizontalDrag(
    () => setHeroDot((prev) => getNextSlideIndex(prev, HERO_SLIDE_COUNT, -1)),
    () => setHeroDot((prev) => getNextSlideIndex(prev, HERO_SLIDE_COUNT, 1))
  );
  const featuredDrag = useHorizontalDrag(
    () => setFeaturedIndex((prev) => getNextSlideIndex(prev, FEATURED_SLIDE_COUNT, -1)),
    () => setFeaturedIndex((prev) => getNextSlideIndex(prev, FEATURED_SLIDE_COUNT, 1))
  );
  const brandDrag = useHorizontalDrag(
    () => setBrandDot((prev) => getNextSlideIndex(prev, BRANDS.length, -1)),
    () => setBrandDot((prev) => getNextSlideIndex(prev, BRANDS.length, 1))
  );
  const testimonialDrag = useHorizontalDrag(
    () => setTestimonialDot((prev) => getNextSlideIndex(prev, TESTIMONIALS.length, -1)),
    () => setTestimonialDot((prev) => getNextSlideIndex(prev, TESTIMONIALS.length, 1))
  );

  useEffect(() => {
    if (heroPaused || heroDrag.isDragging) return;
    const timer = window.setInterval(() => {
      setHeroDot((prev) => getNextSlideIndex(prev, HERO_SLIDE_COUNT, 1));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [heroPaused, heroDrag.isDragging]);

  useEffect(() => {
    if (featuredPaused || featuredDrag.isDragging) return;
    const timer = window.setInterval(() => {
      setFeaturedIndex((prev) => getNextSlideIndex(prev, FEATURED_SLIDE_COUNT, 1));
    }, 3200);
    return () => window.clearInterval(timer);
  }, [FEATURED_SLIDE_COUNT, featuredPaused, featuredDrag.isDragging]);

  useEffect(() => {
    if (brandPaused || brandDrag.isDragging) return;
    const brandTimer = window.setInterval(() => {
      setBrandDot((prev) => getNextSlideIndex(prev, BRANDS.length, 1));
    }, 4600);
    return () => window.clearInterval(brandTimer);
  }, [brandPaused, brandDrag.isDragging]);

  useEffect(() => {
    if (testimonialPaused || testimonialDrag.isDragging) return;
    const testimonialTimer = window.setInterval(() => {
      setTestimonialDot((prev) => getNextSlideIndex(prev, TESTIMONIALS.length, 1));
    }, 4800);
    return () => window.clearInterval(testimonialTimer);
  }, [testimonialPaused, testimonialDrag.isDragging]);

  const featuredTrack = [
    ...FEATURED_CAROUSEL_CATEGORIES,
    ...FEATURED_CAROUSEL_CATEGORIES.slice(0, 8),
  ];

  const brandTrack = [...BRANDS, ...BRANDS];
  const testimonialTrack = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, 3)];

  const justForYouItems = showExtraProducts
    ? [...JUST_FOR_YOU, ...ALL_NATURAL_HONEY.slice(0, 5)]
    : JUST_FOR_YOU;

  return (
    <main className="max-w-[1252px] mx-auto px-4 xl:px-0">
      {/* Hero Banners (Auto-sliding + click-drag 3-slide carousel + Desktop-only side promo banner) */}
      <section className="pt-4 sm:pt-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div
            data-testid="hero-slider"
            data-hero-slide={heroDot}
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
            {...heroDrag.dragHandlers}
            className="w-full lg:col-span-8 relative rounded-[10px] overflow-hidden bg-[#1D2B1F] h-[152px] sm:h-[260px] lg:h-[332px] touch-pan-y select-none cursor-grab active:cursor-grabbing"
          >
            <div
              data-testid="hero-slider-track"
              style={{
                transform: `translateX(calc(-${heroDot * 100}% + ${heroDrag.dragOffset}px))`,
              }}
              className={`flex h-full ${
                heroDrag.isDragging ? 'transition-none' : 'transition-transform duration-700 ease-in-out'
              }`}
            >
              {/* Slide 1: Main Ghorer Bazar Hero Banner */}
              <button
                type="button"
                onClick={() => onOpenCategoryPage('organic')}
                className="w-full h-full shrink-0 block cursor-pointer bg-[#233320]"
                aria-label="অর্গানিক বিটরুট পাউডারের সাথে হানিরাজ লিচু ফ্লাওয়ার হানি স্যাশে বক্স ফ্রি"
              >
                <img
                  src="/images/hero-main.png"
                  alt="অর্গানিক বিটরুট পাউডারের সাথে হানিরাজ লিচু ফ্লাওয়ার হানি স্যাশে বক্স ফ্রি"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center block"
                />
              </button>

              {/* Slide 2: Swosti Food Ghee & Pure Essentials Banner */}
              <button
                type="button"
                onClick={() => onOpenCategoryPage('oil-ghee')}
                className="w-full h-full shrink-0 block cursor-pointer bg-[#EDEDE9]"
                aria-label="স্বস্তি ফুড - খাবারে স্বাদ এবং প্রশান্তি"
              >
                <img
                  src="/images/swosti-banner.png"
                  alt="স্বস্তি ফুড - খাবারে স্বাদ এবং প্রশান্তি"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain block"
                />
              </button>

              {/* Slide 3: Ghorer Bazar Purity Combo Promotional Slide */}
              <div className="w-full h-full shrink-0 bg-gradient-to-r from-[#041F1E] via-[#0B3533] to-[#134E4A] px-4 sm:px-12 pt-3 pb-7 sm:pt-6 sm:pb-9 flex items-center justify-between gap-2.5 sm:gap-5 relative">
                <div className="min-w-0 flex-1 text-left z-10">
                  <span className="inline-block bg-[#F48721] text-white text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-[4px]">
                    Ghorer Bazar Special
                  </span>
                  <h2 className="mt-1 sm:mt-2.5 text-[13px] sm:text-[22px] lg:text-[25px] font-bold text-white leading-[1.2]">
                    খাঁটি ঘি, মধু ও সরিষার তেল
                  </h2>
                  <p className="mt-0.5 sm:mt-1.5 text-[10px] sm:text-[13px] text-white/90 leading-[1.35] line-clamp-2">
                    ১০০% বিশুদ্ধ ও ল্যাব-টেস্টেড প্রাকৃতিক পণ্যে বিশেষ ছাড়!
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenCategoryPage('offer-zone')}
                    className="mt-1.5 sm:mt-3.5 inline-flex items-center gap-1.5 bg-[#F48721] hover:bg-[#E07614] text-white text-[10px] sm:text-[12.5px] font-semibold px-2.5 sm:px-4.5 py-1 sm:py-2 rounded-[5px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Shop Offer Zone</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
                  <div className="bg-white/95 rounded-[8px] p-1 sm:p-1.5 shadow-md flex items-center justify-center">
                    <img
                      src="/images/top-ghee.png"
                      alt="Gawa Ghee"
                      className="h-[58px] sm:h-[118px] lg:h-[145px] w-auto object-contain"
                    />
                  </div>
                  <div className="bg-white/95 rounded-[8px] p-1 sm:p-1.5 shadow-md flex items-center justify-center">
                    <img
                      src="/images/top-sundarban-honey.png"
                      alt="Sundarban Honey"
                      className="h-[58px] sm:h-[118px] lg:h-[145px] w-auto object-contain"
                    />
                  </div>
                  <div className="hidden sm:flex bg-white/95 rounded-[8px] p-1.5 shadow-md items-center justify-center">
                    <img
                      src="/images/top-mustard-oil.png"
                      alt="Deshi Mustard Oil"
                      className="h-[118px] lg:h-[145px] w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              data-no-drag="true"
              className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0 flex items-center gap-2 z-10"
            >
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Banner ${idx + 1}`}
                  onClick={() => setHeroDot(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    heroDot === idx
                      ? 'w-5 bg-[#F48721]'
                      : 'w-2 bg-white/85 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            data-testid="hero-side-promo"
            onClick={() => onOpenCategoryPage('sundarban-honey')}
            className="hidden lg:block lg:col-span-4 rounded-[10px] overflow-hidden bg-[#2E1E14] text-left cursor-pointer lg:h-[332px]"
            aria-label="Explore Sundarban Honey and Combo Deals"
          >
            <img
              src="/images/hero-side.png"
              alt="মধু স্পেশাল কম্বোপ্যাক-এ ২০০ ছাড়"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top block"
            />
          </button>
        </div>
      </section>

      {/* Featured Categories (Auto-sliding + click-drag Carousel) */}
      <section
        id="featured-categories"
        className="pt-7 pb-4"
        onMouseEnter={() => setFeaturedPaused(true)}
        onMouseLeave={() => setFeaturedPaused(false)}
      >
        <h2 className="text-[18px] sm:text-[20px] font-medium text-[#222933] text-center mb-5 sm:mb-6">
          Featured Categories
        </h2>
        <div
          className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
          {...featuredDrag.dragHandlers}
        >
          <div
            data-testid="featured-categories-track"
            data-slide-index={featuredIndex}
            style={
              {
                '--slide-index': featuredIndex,
                '--drag-offset': `${featuredDrag.dragOffset}px`,
              } as React.CSSProperties
            }
            className={`cat-carousel-track flex gap-3.5 sm:gap-[18px] ${
              featuredDrag.isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
            }`}
          >
            {featuredTrack.map((cat, idx) => (
              <button
                key={`${cat.id}-${idx}`}
                type="button"
                onClick={() => onOpenCategoryPage(cat.categorySlug)}
                className="cat-carousel-item group flex flex-col items-center cursor-pointer"
              >
                <div className="w-full h-[116px] sm:h-[142px] bg-white rounded-[10px] border border-[#ECEAE4] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-center p-2.5 group-hover:border-[#F48721]/60 transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[92px] sm:max-h-[112px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-2.5 sm:mt-3 text-[13px] sm:text-[13.5px] font-medium text-[#374151] group-hover:text-[#F48721] transition-colors whitespace-nowrap">
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

      {/* Our Brands (Horizontal Auto-Sliding Carousel) */}
      <section
        id="our-brands"
        className="pt-8 pb-4"
        onMouseEnter={() => setBrandPaused(true)}
        onMouseLeave={() => setBrandPaused(false)}
      >
        <SectionHeader
          title="Our Brands"
          actionLabel="SEE ALL"
          onAction={() => onOpenCategoryPage('all-products')}
        />
        <div
          className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
          {...brandDrag.dragHandlers}
        >
          <div
            data-testid="brands-carousel-track"
            data-slide-index={brandDot}
            style={
              {
                '--slide-index': brandDot,
                '--drag-offset': `${brandDrag.dragOffset}px`,
              } as React.CSSProperties
            }
            className={`brand-carousel-track flex gap-3.5 md:gap-6 ${
              brandDrag.isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
            }`}
          >
            {brandTrack.map((brand, idx) => (
              <button
                key={`${brand.id}-${idx}`}
                type="button"
                onClick={() =>
                  onOpenCategoryPage(brand.id === 'honeyraj' ? 'sundarban-honey' : 'all-products')
                }
                className="brand-carousel-item bg-white rounded-[8px] border border-[#EAE8E2] h-[80px] sm:h-[90px] flex items-center justify-center px-4 sm:px-5 hover:border-[#F48721]/50 transition-colors cursor-pointer"
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
        </div>
        <PaginationDots count={BRANDS.length} activeIndex={brandDot} onChange={setBrandDot} />
      </section>

      {/* All Natural Honey (Auto-sliding Carousel) */}
      <SlidingProductSection
        id="all-natural-honey"
        title="All Natural Honey"
        items={HONEY_CAROUSEL_ITEMS}
        dotCount={5}
        intervalMs={3800}
        onAction={() => onOpenCategoryPage('sundarban-honey')}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

      {/* Premium Dates (Auto-sliding Carousel) */}
      <SlidingProductSection
        id="premium-dates"
        title="Premium Dates"
        items={PREMIUM_DATES}
        dotCount={5}
        intervalMs={4200}
        onAction={() => onOpenCategoryPage('dates')}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

      {/* Mid-Page Swosti Banner */}
      <section className="pt-8 sm:pt-10 pb-2">
        <button
          type="button"
          onClick={() => onOpenCategoryPage('oil-ghee')}
          className="w-full rounded-[8px] overflow-hidden block cursor-pointer"
        >
          <img
            src="/images/swosti-banner.png"
            alt="স্বস্তি ফুড - খাবারে স্বাদ এবং প্রশান্তি"
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </button>
      </section>

      {/* Cooking Essentials (Auto-sliding Carousel) */}
      <SlidingProductSection
        id="cooking-essentials"
        title="Cooking Essentials"
        items={COOKING_CAROUSEL_ITEMS}
        dotCount={5}
        intervalMs={4400}
        onAction={() => onOpenCategoryPage('cooking-essentials')}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

      {/* Organic Certified (Auto-sliding Carousel) */}
      <SlidingProductSection
        id="organic-certified"
        title="Organic Certified"
        items={ORGANIC_CERTIFIED}
        dotCount={5}
        intervalMs={4100}
        onAction={() => onOpenCategoryPage('organic')}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

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

      {/* Customer Reviews / Testimonials (Side-by-Side Horizontal Carousel on PC & Mobile) */}
      <section
        id="customer-reviews"
        className="pt-10 pb-12 sm:pb-14"
        onMouseEnter={() => setTestimonialPaused(true)}
        onMouseLeave={() => setTestimonialPaused(false)}
      >
        <h2 className="text-[18px] sm:text-[20px] font-medium text-[#222933] text-center mb-5 sm:mb-6">
          Customer Reviews
        </h2>

        <div
          className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
          {...testimonialDrag.dragHandlers}
        >
          <div
            data-testid="reviews-carousel-track"
            data-slide-index={testimonialDot}
            style={
              {
                '--slide-index': testimonialDot,
                '--drag-offset': `${testimonialDrag.dragOffset}px`,
              } as React.CSSProperties
            }
            className={`review-carousel-track flex gap-3 md:gap-5 ${
              testimonialDrag.isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
            }`}
          >
            {testimonialTrack.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                data-testid={`review-slide-card-${idx}`}
                className="review-carousel-item min-w-0 flex"
              >
                <div className="w-full bg-white rounded-[10px] border border-[#EAE8E2] p-5 sm:p-6 flex flex-col justify-between min-h-[205px] sm:min-h-[244px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div>
                    <p className="text-[13.5px] text-[#4B5563] leading-[1.6]">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-0.5 mt-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 mt-5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full object-cover shrink-0 bg-[#F3F4F6]"
                    />
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-medium text-[#222933] truncate">
                        {t.name}
                      </h4>
                      <p className="text-[11.5px] text-[#6B7280] truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PaginationDots
          count={TESTIMONIALS.length}
          activeIndex={testimonialDot}
          onChange={setTestimonialDot}
        />
      </section>
    </main>
  );
};
