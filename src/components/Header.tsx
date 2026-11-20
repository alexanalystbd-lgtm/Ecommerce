import React, { useEffect, useRef, useState } from 'react';
import { Heart, MapPin, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { ModalType, Product } from '../types/store';
import { searchCatalog } from '../utils/storeLogic';

interface HeaderProps {
  totalCartItems: number;
  allProducts: Product[];
  isMobileSearchOpen: boolean;
  onToggleMobileSearch: (open: boolean) => void;
  onGoHome: () => void;
  onOpenCart: () => void;
  onOpenModal: (modal: ModalType) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenMobileMenu: () => void;
  onScrollToFooter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCartItems,
  allProducts,
  isMobileSearchOpen,
  onToggleMobileSearch,
  onGoHome,
  onOpenCart,
  onOpenModal,
  onAddToCart,
  onSelectProduct,
  onOpenMobileMenu,
  onScrollToFooter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchCatalog(allProducts, searchQuery);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopSearchRef.current?.contains(target);
      const inMobile = mobileSearchRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobileSearchOpen) return;
    const timer = window.setTimeout(() => {
      const input = document.getElementById('mobile-search-input') as HTMLInputElement | null;
      input?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [isMobileSearchOpen]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setIsSearchOpen(val.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const renderDropdown = () => {
    if (!isSearchOpen || !searchQuery.trim()) return null;
    return (
      <div className="absolute left-0 right-0 top-[46px] bg-white border border-[#E6E4DF] rounded-lg shadow-lg z-50 max-h-[340px] overflow-y-auto divide-y divide-[#F3F1EC]">
        {searchResults.length === 0 ? (
          <div className="px-4 py-3 text-[13px] text-[#64748B]">No products found.</div>
        ) : (
          searchResults.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-[#FBF9F5]"
            >
              <button
                type="button"
                onClick={() => {
                  onSelectProduct(item);
                  clearSearch();
                  onToggleMobileSearch(false);
                }}
                className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#222933] group-hover:text-[#F48721] truncate transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[12px] font-bold text-[#F48721] tabular-nums">
                    ৳{item.price.toLocaleString()}
                  </p>
                </div>
              </button>
              {item.inStock === false ? (
                <span className="text-[11px] font-semibold text-[#DC2626] bg-[#FEF2F2] px-2 py-1 rounded shrink-0">
                  Out of Stock
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(item);
                    clearSearch();
                  }}
                  className="text-[11.5px] font-medium bg-[#F48721] text-white px-2.5 py-1 rounded hover:bg-[#E07614] shrink-0 cursor-pointer transition-colors"
                >
                  Add
                </button>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 md:static z-40 bg-white border-b border-[#EEEEEE]">
      <div className="max-w-[1252px] mx-auto px-4 xl:px-0">
        {/* Mobile Minimalist Header (Hamburger Left, Logo Center, Cart + Badge Right) */}
        <div
          data-testid="mobile-header-bar"
          className="flex md:hidden h-[58px] items-center justify-between relative"
        >
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open categories menu"
            data-testid="mobile-header-menu-btn"
            className="w-10 h-10 -ml-1.5 flex items-center justify-start text-[#222933] hover:text-[#F48721] transition-colors cursor-pointer"
          >
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 2H22"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M1 9H15"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M1 16H22"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            aria-label="Ghorer Bazar Home"
          >
            <img
              src="/images/logo.png"
              alt="Ghorer Bazar"
              referrerPolicy="no-referrer"
              className="h-[36px] w-auto object-contain"
            />
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Cart (${totalCartItems} items)`}
            data-testid="mobile-header-cart-btn"
            className="w-10 h-10 -mr-1 flex items-center justify-end text-[#222933] hover:text-[#F48721] transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-[22px] h-[22px] stroke-[1.7]" />
              <span
                data-testid="mobile-header-cart-badge"
                className="absolute -top-1.5 -right-2 bg-[#F48721] text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center leading-none tabular-nums"
              >
                {totalCartItems}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Expandable Search Panel (Opened from Bottom Nav Search Button) */}
        {isMobileSearchOpen && (
          <div
            ref={mobileSearchRef}
            data-testid="mobile-search-panel"
            className="relative pb-3 pt-1 md:hidden"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-[#F5F5F5] border border-transparent focus-within:border-[#F48721] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F48721]/20 rounded-[6px] h-[42px] pl-3.5 overflow-hidden transition-all">
                <input
                  id="mobile-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim()) setIsSearchOpen(true);
                  }}
                  placeholder="Search honey, dates, ghee..."
                  aria-label="Search products on mobile"
                  className="w-full bg-transparent text-[16px] sm:text-[13.5px] text-[#222933] placeholder-[#6B7280] focus:outline-none pr-2"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-[#6B7280] hover:text-[#222933] cursor-pointer pr-2 shrink-0"
                    aria-label="Clear mobile search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery.trim()) setIsSearchOpen(true);
                  }}
                  aria-label="Mobile search"
                  className="h-full w-[42px] bg-[#F48721] hover:bg-[#E07614] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearSearch();
                  onToggleMobileSearch(false);
                }}
                aria-label="Close mobile search"
                className="w-9 h-[42px] flex items-center justify-center text-[#6B7280] hover:text-[#222933] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderDropdown()}
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex h-[86px] items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className="shrink-0 flex items-center"
            aria-label="Ghorer Bazar Home"
          >
            <img
              src="/images/logo.png"
              alt="Ghorer Bazar"
              referrerPolicy="no-referrer"
              className="h-[48px] w-auto object-contain"
            />
          </a>

          {/* Center Search Bar (Desktop) */}
          <div ref={desktopSearchRef} className="relative flex-1 max-w-[446px] mx-4">
            <div className="flex items-center bg-[#F5F5F5] border border-transparent focus-within:border-[#F48721] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F48721]/20 rounded-[6px] h-[42px] pl-4 overflow-hidden transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setIsSearchOpen(true);
                }}
                placeholder="Search"
                aria-label="Search products"
                className="w-full bg-transparent text-[13.5px] text-[#222933] placeholder-[#6B7280] focus:outline-none pr-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-[#6B7280] hover:text-[#222933] cursor-pointer pr-2.5 shrink-0"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (searchQuery.trim()) setIsSearchOpen(true);
                }}
                aria-label="Search"
                className="h-full w-[44px] bg-[#F48721] hover:bg-[#E07614] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
            </div>
            {renderDropdown()}
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              type="button"
              onClick={() => onOpenModal('track')}
              className="flex flex-col items-center gap-1 text-[#374151] hover:text-[#F48721] transition-colors cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-[19px] h-[19px] stroke-[1.7]" />
              <span className="text-[11.5px] leading-none">Track Order</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenModal('signin')}
              className="flex flex-col items-center gap-1 text-[#374151] hover:text-[#F48721] transition-colors cursor-pointer whitespace-nowrap"
            >
              <User className="w-[19px] h-[19px] stroke-[1.7]" />
              <span className="text-[11.5px] leading-none">Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenModal('wishlist')}
              className="flex flex-col items-center gap-1 text-[#374151] hover:text-[#F48721] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-[19px] h-[19px] stroke-[1.7]" />
              <span className="text-[11.5px] leading-none">Wishlist</span>
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Cart (${totalCartItems} items)`}
              className="relative flex flex-col items-center gap-1 text-[#374151] hover:text-[#F48721] transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="relative">
                <ShoppingCart className="w-[19px] h-[19px] stroke-[1.7]" />
                <span
                  data-testid="header-cart-badge"
                  className="absolute -top-1.5 -right-2.5 bg-[#F48721] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums"
                >
                  {totalCartItems}
                </span>
              </div>
              <span className="text-[11.5px] leading-none">Cart</span>
            </button>

            <button
              type="button"
              onClick={onScrollToFooter}
              className="flex flex-col items-center gap-1 text-[#374151] hover:text-[#F48721] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Menu className="w-[19px] h-[19px] stroke-[1.7]" />
              <span className="text-[11.5px] leading-none">More</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
