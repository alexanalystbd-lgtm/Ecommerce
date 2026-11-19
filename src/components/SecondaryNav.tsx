import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { getCategoryPageConfig, NAV_CATEGORIES } from '../data/storeData';
import { ActiveView, ModalType } from '../types/store';

interface SecondaryNavProps {
  activeView: ActiveView;
  activeCategorySlug: string;
  onSelectSection: (sectionId: string) => void;
  onSelectCategoryPage: (slug: string) => void;
}

export const SecondaryNav: React.FC<SecondaryNavProps> = ({
  activeView,
  activeCategorySlug,
  onSelectSection,
  onSelectCategoryPage,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const activeNavLabel = activeView === 'category' ? getCategoryPageConfig(activeCategorySlug).navLabel : undefined;

  const handleSubItemClick = (subLabel: string, fallbackSlug: string, fallbackSection: string) => {
    setOpenDropdown(null);
    if (subLabel === 'Sundarban Honey') {
      onSelectCategoryPage('sundarban-honey');
      return;
    }
    if (
      subLabel === 'Black Seed Honey' ||
      subLabel === 'Lychee Flower Honey' ||
      subLabel === 'Mixed Flower Honey'
    ) {
      onSelectCategoryPage('all-natural-honey');
      return;
    }
    if (fallbackSlug) {
      onSelectCategoryPage(fallbackSlug);
      return;
    }
    onSelectSection(fallbackSection);
  };

  return (
    <nav className="bg-[#041F1E] text-white relative z-20" aria-label="Primary categories">
      <div className="max-w-[1252px] mx-auto px-4 xl:px-0 min-h-[48px] flex items-center gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">
        {NAV_CATEGORIES.map((item) => {
          const isActive = activeView === 'category' && activeNavLabel === item.label;
          const isOpen = item.hasDropdown && openDropdown === item.label && item.items;
          const targetSection = item.targetSection || 'just-for-you';
          const targetSlug = item.categorySlug || 'all-products';

          return (
            <div
              key={item.label}
              className="relative shrink-0"
              onMouseEnter={() => {
                if (item.hasDropdown) setOpenDropdown(item.label);
              }}
              onMouseLeave={() => {
                if (item.hasDropdown) setOpenDropdown(null);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  if (item.categorySlug) {
                    onSelectCategoryPage(item.categorySlug);
                  } else {
                    onSelectSection(targetSection);
                  }
                }}
                className={`flex items-center gap-1 py-3 text-[13px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#F48721]' : 'text-white/95 hover:text-[#F48721]'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-80" />}
              </button>

              {isOpen && (
                <div className="hidden lg:block absolute left-0 top-full w-48 bg-white text-[#222933] rounded-b-md shadow-lg border border-[#E6E4DF] py-1.5 z-40">
                  {item.items!.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => handleSubItemClick(sub, targetSlug, targetSection)}
                      className="w-full text-left px-4 py-2 text-[12.5px] hover:bg-[#FFF5EB] hover:text-[#F48721] cursor-pointer transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  onSelectCategoryPage: (slug: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onSelectCategoryPage,
  onOpenModal,
}) => {
  const [expandedCat, setExpandedCat] = useState<string | null>('Honey');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/40 md:hidden">
      <div className="w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col">
        <div className="px-4 py-3.5 bg-[#041F1E] text-white flex items-center justify-between">
          <span className="text-[15px] font-semibold">Browse Categories</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close mobile menu"
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#F1EFEA]">
          {NAV_CATEGORIES.map((item) => {
            const isExpanded = expandedCat === item.label;
            const target = item.targetSection || 'just-for-you';
            const targetSlug = item.categorySlug || 'all-products';

            return (
              <div key={item.label} className="px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (item.categorySlug) {
                        onSelectCategoryPage(item.categorySlug);
                      } else {
                        onSelectSection(target);
                      }
                    }}
                    className="flex-1 text-left text-[14px] font-medium text-[#222933] hover:text-[#F48721] py-1 cursor-pointer"
                  >
                    {item.label}
                  </button>
                  {item.hasDropdown && (
                    <button
                      type="button"
                      onClick={() => setExpandedCat(isExpanded ? null : item.label)}
                      aria-label={`Toggle ${item.label} subcategories`}
                      className="p-1.5 text-[#64748B] hover:text-[#F48721] cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {item.hasDropdown && isExpanded && item.items && (
                  <div className="mt-1 pl-3 border-l border-[#EAE8E3] space-y-1">
                    {item.items.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          onClose();
                          if (sub === 'Sundarban Honey') {
                            onSelectCategoryPage('sundarban-honey');
                          } else if (
                            sub === 'Black Seed Honey' ||
                            sub === 'Lychee Flower Honey' ||
                            sub === 'Mixed Flower Honey'
                          ) {
                            onSelectCategoryPage('all-natural-honey');
                          } else {
                            onSelectCategoryPage(targetSlug);
                          }
                        }}
                        className="block w-full text-left py-1.5 text-[13px] text-[#475569] hover:text-[#F48721] cursor-pointer"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#EAE8E3] bg-[#FBF9F5] grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenModal('wishlist');
            }}
            className="border border-[#E6E4DF] bg-white rounded-md py-2 text-[12.5px] font-medium text-[#222933] hover:border-[#F48721] cursor-pointer"
          >
            Wishlist
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenModal('track');
            }}
            className="bg-[#F48721] text-white rounded-md py-2 text-[12.5px] font-medium hover:bg-[#E07614] cursor-pointer"
          >
            Track Order
          </button>
        </div>
      </div>
      <div className="flex-1" onClick={onClose} aria-hidden="true" />
    </div>
  );
};
