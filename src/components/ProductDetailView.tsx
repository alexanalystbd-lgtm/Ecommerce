import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  UploadCloud,
  User,
} from 'lucide-react';
import { getProductDetailInfo } from '../data/productDetails';
import { getCategorySlugForProduct } from '../data/storeData';
import { Product, ProductReview } from '../types/store';
import { computeReviewSummary } from '../utils/storeLogic';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  onGoHome: () => void;
  onOpenAllProducts: () => void;
  onOpenCategoryPage: (slug: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onGoHome,
  onOpenAllProducts,
  onOpenCategoryPage,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onShowToast,
}) => {
  const details = getProductDetailInfo(product);
  const categorySlug = getCategorySlugForProduct(product);
  const isOut = product.inStock === false;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [reviews, setReviews] = useState<ProductReview[]>(details.initialReviews);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const reviewStats = computeReviewSummary(reviews);

  const saveLabel =
    product.badgeRight?.text ||
    product.saveBadge ||
    (product.oldPrice && product.oldPrice > product.price
      ? `Save ${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
      : null);

  const handleCycleImage = (dir: -1 | 1) => {
    setActiveImageIdx((prev) => {
      const len = details.gallery.length;
      return (prev + dir + len) % len;
    });
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const names = Array.from(files)
      .slice(0, 3)
      .map((f) => f.name);
    setUploadedFiles(names);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      onShowToast('Please write your opinion about the product');
      return;
    }
    const ratingVal = Number(reviewRating) || 5;
    const nowLabel = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
    const nextReview: ProductReview = {
      id: `rev-${Date.now()}`,
      author: 'Verified Customer',
      date: nowLabel,
      rating: ratingVal,
      comment: reviewComment.trim(),
      images: uploadedFiles.length > 0 ? uploadedFiles : undefined,
    };
    setReviews((prev) => [nextReview, ...prev]);
    setReviewComment('');
    setReviewRating('');
    setUploadedFiles([]);
    onShowToast('Thank you! Your review has been submitted.');
  };

  const scrollToTab = (tab: 'description' | 'reviews') => {
    setActiveTab(tab);
    const target = tab === 'description' ? descriptionRef.current : reviewsRef.current;
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="max-w-[1252px] mx-auto px-4 xl:px-0 pb-14">
      {/* Top Breadcrumb (Home › Products) */}
      <nav
        className="flex items-center gap-1.5 text-[12.5px] text-[#64748B] pt-4 pb-4"
        aria-label="Breadcrumb"
      >
        <button
          type="button"
          onClick={onGoHome}
          className="hover:text-[#F48721] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span className="text-[#94A3B8] text-[13px] leading-none">&rsaquo;</span>
        <button
          type="button"
          onClick={onOpenAllProducts}
          className="text-[#475569] hover:text-[#F48721] font-medium transition-colors cursor-pointer"
        >
          Products
        </button>
      </nav>

      {/* Main Product Gallery & Purchase Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Vertical Thumbnails + Main Product Image */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3.5">
          {/* Thumbnail Rail */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-1 sm:pb-0">
            {details.gallery.map((imgSrc, idx) => {
              const isSelected = idx === activeImageIdx;
              return (
                <button
                  key={`${imgSrc}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`Product image ${idx + 1}`}
                  className={`w-[62px] h-[62px] sm:w-[68px] sm:h-[68px] rounded-[6px] bg-white border p-1.5 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#F48721] ring-1 ring-[#F48721]'
                      : 'border-[#E6E4DF] hover:border-[#F48721]/50'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              );
            })}
          </div>

          {/* Main Image Container with subtle hover zoom */}
          <div
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={() => {
              setIsImageHovered(false);
              setZoomOrigin({ x: 50, y: 50 });
            }}
            data-testid="pdp-main-image-box"
            className="group flex-1 bg-white border border-[#E6E4DF] rounded-[8px] h-[310px] sm:h-[430px] relative flex items-center justify-center p-6 overflow-hidden cursor-zoom-in"
          >
            {isOut && (
              <span className="absolute top-3.5 left-3.5 z-10 bg-[#E12B2B] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-[3px]">
                Out of Stock
              </span>
            )}

            {details.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleCycleImage(-1)}
                  aria-label="Previous product image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-[#FFF5EB] text-[#64748B] hover:text-[#F48721] border border-[#EAE8E3] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCycleImage(1)}
                  aria-label="Next product image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-[#FFF5EB] text-[#64748B] hover:text-[#F48721] border border-[#EAE8E3] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <img
              src={details.gallery[activeImageIdx] || product.image}
              alt={product.title}
              referrerPolicy="no-referrer"
              style={{
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                transform: isImageHovered ? 'scale(1.16)' : 'scale(1)',
              }}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ease-out will-change-transform ${
                isOut ? 'opacity-60' : ''
              }`}
            />
          </div>
        </div>

        {/* Right: Title, Categories & Short Description, Price, Quantity, Action Buttons */}
        <div className="lg:col-span-6 pt-1">
          <h1 className="text-[21px] sm:text-[24px] font-medium text-[#222933] leading-[1.3] pb-3 border-b border-[#EAE8E3]">
            {product.title}
          </h1>

          {/* Categories & Product Summary (between Product Title and Price) */}
          <div className="py-3.5 border-b border-[#EAE8E3]">
            <p className="text-[13.5px] font-semibold text-[#334155]">
              <span>Categories : </span>
              <button
                type="button"
                onClick={() => onOpenCategoryPage(categorySlug)}
                className="text-[#F48721] hover:text-[#E07614] hover:underline font-semibold cursor-pointer transition-colors"
              >
                {product.category}
              </button>
            </p>

            <p className="mt-2.5 text-[14px] font-bold text-[#222933]">Product Summary</p>
            <p className="mt-1 text-[13.5px] text-[#334155] leading-[1.6]">
              {details.shortDescription}
            </p>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-3">
            <span className="text-[22px] sm:text-[24px] font-bold text-[#F48721] tabular-nums">
              ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {product.oldPrice && (
              <span className="text-[17px] sm:text-[18px] text-[#8E95A2] line-through tabular-nums">
                ৳{product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
            {saveLabel && (
              <span className="bg-[#10B981] text-white text-[11px] font-semibold px-2 py-[2px] rounded-[3px]">
                {saveLabel}
              </span>
            )}
          </div>

          {/* Stock Availability Status */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[13px] text-[#475569]">Availability:</span>
            {isOut ? (
              <span
                data-testid="pdp-stock-status"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] px-2.5 py-0.5 rounded-[4px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E12B2B] inline-block" />
                <span>Out of Stock</span>
              </span>
            ) : (
              <span
                data-testid="pdp-stock-status"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-[4px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                <span>In Stock</span>
              </span>
            )}
          </div>

          {/* Quantity Stepper */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[13px] text-[#475569]">Quantity:</span>
            <div className="inline-flex items-center bg-white border border-[#E2E8F0] rounded-full px-1.5 py-1 gap-2">
              <button
                type="button"
                disabled={isOut}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-6 h-6 rounded-full hover:bg-[#F5F5F5] text-[#475569] flex items-center justify-center cursor-pointer disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span
                data-testid="pdp-quantity"
                className="w-6 text-center text-[13.5px] font-semibold text-[#222933] tabular-nums"
              >
                {quantity}
              </span>
              <button
                type="button"
                disabled={isOut}
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-6 h-6 rounded-full hover:bg-[#F5F5F5] text-[#475569] flex items-center justify-center cursor-pointer disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={isOut}
              onClick={() => onAddToCart(product, quantity)}
              className={`rounded-[4px] py-2.5 px-4 text-[12.5px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors ${
                isOut
                  ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#CBD5E1] cursor-not-allowed'
                  : 'bg-[#F48721] hover:bg-[#E07614] text-white cursor-pointer'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isOut ? 'Out of Stock' : 'ADD TO CART'}</span>
            </button>

            <button
              type="button"
              disabled={isOut}
              onClick={() => onBuyNow(product, quantity)}
              className={`rounded-[4px] py-2.5 px-4 text-[12.5px] font-semibold uppercase tracking-wide flex items-center justify-center transition-colors ${
                isOut
                  ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#CBD5E1] cursor-not-allowed'
                  : 'bg-[#041F1E] hover:bg-[#0B3331] text-white cursor-pointer'
              }`}
            >
              <span>BUY NOW</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section Tabs (Description & Customer Reviews ONLY — No Video) */}
      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => scrollToTab('description')}
          className={`px-6 py-2 rounded-[6px] text-[13px] font-medium border transition-colors cursor-pointer ${
            activeTab === 'description'
              ? 'bg-white border-[#F48721] text-[#222933]'
              : 'bg-white border-[#E6E4DF] text-[#475569] hover:border-[#F48721]/60'
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => scrollToTab('reviews')}
          className={`px-6 py-2 rounded-[6px] text-[13px] font-medium border transition-colors cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-white border-[#F48721] text-[#222933]'
              : 'bg-white border-[#E6E4DF] text-[#475569] hover:border-[#F48721]/60'
          }`}
        >
          Customer Reviews ({reviewStats.totalReviews})
        </button>
      </div>

      {/* Product Details Card */}
      <section
        ref={descriptionRef}
        className="mt-4 bg-white border border-[#E6E4DF] rounded-[8px] p-5 sm:p-7"
      >
        <div className="border-b border-[#EAE8E3] pb-2 mb-5">
          <h2 className="text-[15.5px] font-semibold text-[#222933] inline-block relative">
            Product Details
            <span className="block h-[2px] w-full bg-[#222933] mt-1" />
          </h2>
        </div>

        <p className="text-[13.5px] text-[#334155] leading-[1.7]">{details.description}</p>

        <h3 className="text-[14px] font-semibold text-[#222933] mt-5 mb-2.5">Key Features:</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-[#334155] leading-[1.6]">
          {details.keyFeatures.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>

        <h3 className="text-[14px] font-semibold text-[#222933] mt-6 mb-2.5">Usage &amp; Storage:</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-[#334155] leading-[1.6]">
          {details.usageStorage.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      {/* Customer Reviews & Submit Your Review Card */}
      <section
        ref={reviewsRef}
        className="mt-6 bg-white border border-[#E6E4DF] rounded-[8px] p-5 sm:p-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-8">
          {/* Left: Average Rating & Breakdown */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[40px] font-bold text-[#222933] leading-none tabular-nums">
                {reviewStats.averageRating.toFixed(1)}
              </span>
              <div>
                <p className="text-[12px] font-medium text-[#334155]">Average Rating</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(reviewStats.averageRating)
                            ? 'fill-[#F59E0B] text-[#F59E0B]'
                            : 'text-[#CBD5E1]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11.5px] text-[#64748B] tabular-nums">
                    ({reviewStats.totalReviews} {reviewStats.totalReviews === 1 ? 'Review' : 'Reviews'})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="text-[15.5px] font-bold text-[#222933] tabular-nums">
                {reviewStats.recommendedPct.toFixed(2)}%
              </span>
              <span className="text-[12px] text-[#64748B]">
                Recommended ({reviewStats.recommendedCount} of {reviewStats.totalReviews})
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {reviewStats.breakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-2 text-[11.5px]">
                  <div className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3 h-3 ${
                          idx < row.stars
                            ? 'fill-[#F59E0B] text-[#F59E0B]'
                            : 'fill-[#E2E8F0] text-[#E2E8F0]'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F48721] rounded-full transition-all"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[#64748B] tabular-nums">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Submit Your Review Form */}
          <div>
            <div className="border-b border-[#EAE8E3] pb-2 mb-4">
              <h2 className="text-[16px] font-semibold text-[#222933] inline-block">
                Submit Your Review
              </h2>
            </div>

            <p className="text-[12.5px] text-[#64748B] mb-4">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label
                  htmlFor="review-opinion"
                  className="block text-[12.5px] font-medium text-[#334155] mb-1.5"
                >
                  Write your opinion about the product
                </label>
                <textarea
                  id="review-opinion"
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write Your Review Here..."
                  className="w-full border border-[#E2E8F0] rounded-[6px] p-3 text-[13px] text-[#222933] placeholder-[#94A3B8] focus:outline-none focus:border-[#F48721]"
                />
              </div>

              <div>
                <p className="text-[12.5px] font-medium text-[#334155] mb-1.5">
                  Upload Images (Optional)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#D1D5DB] hover:border-[#F48721] rounded-[6px] py-6 px-4 text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-7 h-7 text-[#2563EB]" />
                  <span className="text-[13.5px] font-medium text-[#222933]">
                    Drag &amp; Drop Images Here
                  </span>
                  <span className="text-[11.5px] text-[#64748B]">
                    or click to browse files ( 3 max )
                  </span>
                  {uploadedFiles.length > 0 && (
                    <span className="mt-1 text-[11.5px] text-[#F48721] font-medium">
                      Selected: {uploadedFiles.join(', ')}
                    </span>
                  )}
                </button>
              </div>

              <div>
                <label
                  htmlFor="review-rating-select"
                  className="block text-[12.5px] font-medium text-[#334155] mb-1.5"
                >
                  Your Rating:
                </label>
                <select
                  id="review-rating-select"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                  className="w-full sm:w-[290px] border border-[#E2E8F0] rounded-[6px] px-3 py-2 text-[13px] text-[#334155] bg-white focus:outline-none focus:border-[#F48721]"
                >
                  <option value="">Select One</option>
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Very Poor</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#374151] hover:bg-[#1F2937] text-white text-[12px] font-semibold uppercase tracking-wide px-5 py-2.5 rounded-[4px] transition-colors cursor-pointer"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Review List */}
        <div className="mt-7 pt-6 border-t border-[#EAE8E3] divide-y divide-[#F1EFEA]">
          {reviews.map((rev) => (
            <div key={rev.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
              <span className="text-[#475569] text-[14px] leading-none mt-3">•</span>
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#60A5FA]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-[#F48721]">{rev.author}</span>
                  <span className="text-[11.5px] text-[#94A3B8]">{rev.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'fill-[#E2E8F0] text-[#E2E8F0]'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[13px] text-[#334155] leading-[1.5]">{rev.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="mt-9">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#222933]">
              Related Products
            </h2>
            <div className="w-9 h-[3px] bg-[#F48721] mt-1.5 rounded-full" />
          </div>
          <button
            type="button"
            onClick={onOpenAllProducts}
            className="text-[12.5px] font-medium text-[#F48721] hover:text-[#D96F0E] flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>More Products</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5">
          {details.relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onBuyNow={(p) => onBuyNow(p, 1)}
              onSelectProduct={onSelectProduct}
              showBuyNow
              showStockStatus
            />
          ))}
        </div>
      </section>
    </main>
  );
};
