import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface FloatingCartTabProps {
  totalItems: number;
  totalAmount: number;
  onOpenCart: () => void;
}

export const FloatingCartTab: React.FC<FloatingCartTabProps> = ({
  totalItems,
  totalAmount,
  onOpenCart,
}) => {
  return (
    <button
      type="button"
      onClick={onOpenCart}
      aria-label="Open shopping cart"
      className="hidden md:block fixed right-0 top-[265px] z-30 shadow-md rounded-l-md overflow-hidden cursor-pointer group"
    >
      <div className="bg-[#F48721] group-hover:bg-[#E07614] transition-colors text-white px-2.5 py-2 flex flex-col items-center">
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span className="text-[11px] font-medium whitespace-nowrap tabular-nums">
          {totalItems} Items
        </span>
      </div>
      <div className="bg-white text-[#F48721] text-[11.5px] font-semibold px-2 py-1 text-center border border-r-0 border-[#ECEAE4] tabular-nums">
        ৳{totalAmount.toFixed(2)}
      </div>
    </button>
  );
};
