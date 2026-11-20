import React from 'react';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';

interface MobileBottomNavProps {
  totalCartItems: number;
  onGoHome: () => void;
  onOpenMenu: () => void;
  onOpenCart: () => void;
  onFocusSearch: () => void;
  onOpenAccount: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  totalCartItems,
  onGoHome,
  onOpenMenu,
  onOpenCart,
  onFocusSearch,
  onOpenAccount,
}) => {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      data-testid="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F48721] text-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
    >
      <div className="grid grid-cols-5 h-[58px]">
        <button
          type="button"
          onClick={onGoHome}
          aria-label="Home"
          className="flex flex-col items-center justify-center gap-1 hover:bg-[#E07614] active:bg-[#D56D0F] transition-colors cursor-pointer"
        >
          <Home className="w-[20px] h-[20px] stroke-[1.8]" />
          <span className="text-[10px] font-semibold tracking-wider leading-none uppercase">
            HOME
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Menu"
          className="flex flex-col items-center justify-center gap-1 hover:bg-[#E07614] active:bg-[#D56D0F] transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-[20px] h-[20px] stroke-[1.8]" />
          <span className="text-[10px] font-semibold tracking-wider leading-none uppercase">
            MENU
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Cart (${totalCartItems} items)`}
          className="flex flex-col items-center justify-center gap-1 hover:bg-[#E07614] active:bg-[#D56D0F] transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-[20px] h-[20px] stroke-[1.8]" />
            <span
              data-testid="mobile-bottom-cart-badge"
              className="absolute -top-1.5 -right-2.5 bg-[#1E293B] text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center leading-none tabular-nums"
            >
              {totalCartItems}
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider leading-none uppercase">
            CART
          </span>
        </button>

        <button
          type="button"
          onClick={onFocusSearch}
          aria-label="Search"
          className="flex flex-col items-center justify-center gap-1 hover:bg-[#E07614] active:bg-[#D56D0F] transition-colors cursor-pointer"
        >
          <Search className="w-[20px] h-[20px] stroke-[1.8]" />
          <span className="text-[10px] font-semibold tracking-wider leading-none uppercase">
            SEARCH
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenAccount}
          aria-label="Account"
          className="flex flex-col items-center justify-center gap-1 hover:bg-[#E07614] active:bg-[#D56D0F] transition-colors cursor-pointer"
        >
          <User className="w-[20px] h-[20px] stroke-[1.8]" />
          <span className="text-[10px] font-semibold tracking-wider leading-none uppercase">
            ACCOUNT
          </span>
        </button>
      </div>
    </nav>
  );
};
