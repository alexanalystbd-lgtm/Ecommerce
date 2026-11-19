import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  showBuyNow?: boolean;
  showStockStatus?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  showBuyNow = false,
  showStockStatus = false,
}) => {
  const isOut = product.inStock === false;
  const hasStockFlag = showStockStatus;

  return (
    <div className="bg-white rounded-[6px] border border-[#E6E4DF] p-2.5 sm:p-3 flex flex-col justify-between relative hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-shadow duration-200">
      {isOut ? (
        <span className="absolute top-2.5 left-2.5 z-10 bg-[#E12B2B] text-white text-[10.5px] font-medium px-2 py-[2px] rounded-[3px] leading-tight pointer-events-none">
          Out of Stock
        </span>
      ) : (
        product.badgeLeft && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#F48721] text-white text-[10.5px] font-medium px-2 py-[2px] rounded-[3px] leading-tight pointer-events-none">
            {product.badgeLeft.text}
          </span>
        )
      )}

      {product.badgeRight && (
        <span className="absolute top-2.5 right-2.5 z-10 bg-[#10B981] text-white text-[10.5px] font-medium px-2 py-[2px] rounded-[3px] leading-tight pointer-events-none">
          {product.badgeRight.text}
        </span>
      )}

      <button
        type="button"
        onClick={() => onSelectProduct?.(product)}
        aria-label={`View ${product.title}`}
        className="group h-[152px] sm:h-[212px] w-full flex items-center justify-center mb-2.5 overflow-hidden bg-white cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.08] ${
            isOut ? 'opacity-60' : ''
          }`}
        />
      </button>

      <div>
        <h3 className="text-[12.5px] sm:text-[13.5px] font-medium text-[#222933] leading-[1.35] min-h-[34px] sm:min-h-[38px] mb-1.5 line-clamp-2">
          <button
            type="button"
            onClick={() => onSelectProduct?.(product)}
            className="text-left hover:text-[#F48721] transition-colors cursor-pointer"
          >
            {product.title}
          </button>
        </h3>

        <div className="flex items-center justify-between gap-1.5 flex-wrap mb-2.5 sm:mb-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="text-[13.5px] sm:text-[14.5px] font-bold text-[#F48721] tabular-nums">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-[12px] sm:text-[13px] text-[#8E95A2] line-through tabular-nums">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {hasStockFlag && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap ${
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
          )}
        </div>

        {isOut ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#94A3B8] rounded-[4px] py-[7px] text-[12px] sm:text-[12.5px] font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : showBuyNow && onBuyNow ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex-1 sm:flex-[1.2] min-w-0 border border-[#F48721] text-[#F48721] hover:bg-[#F48721] hover:text-white rounded-[4px] py-[7px] px-1.5 text-[11px] xl:text-[11.5px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              <span>Add To Cart</span>
            </button>
            <button
              type="button"
              onClick={() => onBuyNow(product)}
              className="sm:flex-[0.8] min-w-0 bg-[#F48721] border border-[#F48721] hover:bg-[#E07614] hover:border-[#E07614] text-white rounded-[4px] py-[7px] px-1.5 text-[11px] xl:text-[11.5px] font-medium flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Buy Now</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full border border-[#F48721] text-[#F48721] hover:bg-[#F48721] hover:text-white rounded-[4px] py-[7px] text-[12px] sm:text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
            <span>Add To Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};
