import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronUp, MessageSquare } from 'lucide-react';
import { ALL_CATALOG_PRODUCTS } from './data/storeData';
import { ActiveView, CartItem, ModalType, Product } from './types/store';
import { addItemToCart, getCartTotals, updateCartQuantity } from './utils/storeLogic';
import { Header } from './components/Header';
import { MobileMenuDrawer, SecondaryNav } from './components/SecondaryNav';
import { FloatingCartTab } from './components/FloatingCartTab';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { ProductDetailView } from './components/ProductDetailView';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { UtilityModal } from './components/UtilityModal';
import { MobileBottomNav } from './components/MobileBottomNav';

function getInitialRoute(): { view: ActiveView; slug: string; product: Product | null } {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      const found = ALL_CATALOG_PRODUCTS.find((p) => p.id === productId);
      if (found) {
        return { view: 'product', slug: 'all-products', product: found };
      }
    }
    const page = params.get('page');
    if (page && page.trim()) {
      return { view: 'category', slug: page.trim(), product: null };
    }
  }
  return { view: 'home', slug: 'sundarban-honey', product: null };
}

export default function App() {
  const initialRoute = getInitialRoute();
  const [activeView, setActiveView] = useState<ActiveView>(initialRoute.view);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(initialRoute.slug);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialRoute.product);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const { totalItems, totalAmount } = getCartTotals(cart);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const syncUrl = (view: ActiveView, slug?: string, productId?: string) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    url.searchParams.delete('product');
    if (view === 'category' && slug) {
      url.searchParams.set('page', slug);
    } else if (view === 'product' && productId) {
      url.searchParams.set('product', productId);
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.inStock === false) {
      showToast(`"${product.title}" is currently out of stock`);
      return;
    }
    setCart((prev) => {
      let updated = prev;
      for (let i = 0; i < quantity; i++) {
        updated = addItemToCart(updated, product);
      }
      return updated;
    });
    showToast(`Added "${product.title}" to cart`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    if (product.inStock === false) {
      showToast(`"${product.title}" is currently out of stock`);
      return;
    }
    setCart((prev) => {
      let updated = prev;
      for (let i = 0; i < quantity; i++) {
        updated = addItemToCart(updated, product);
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) => updateCartQuantity(prev, productId, delta));
  };

  const handleCompleteOrder = () => {
    setCart([]);
    showToast('Order confirmed! Cash on Delivery scheduled.');
  };

  const handleGoHome = () => {
    setActiveView('home');
    syncUrl('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategoryPage = (slug = 'sundarban-honey') => {
    setActiveCategorySlug(slug);
    setActiveView('category');
    syncUrl('category', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductPage = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product');
    syncUrl('product', undefined, product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      syncUrl('home');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFocusMobileSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      const input = document.getElementById('mobile-search-input') as HTMLInputElement | null;
      input?.focus();
    }, 250);
  };

  return (
    <div id="top" className="min-h-screen bg-[#FBF9F5] text-[#222933] relative">
      <Header
        totalCartItems={totalItems}
        allProducts={ALL_CATALOG_PRODUCTS}
        onGoHome={handleGoHome}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenModal={(modal) => setActiveModal(modal)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
        onSelectProduct={handleOpenProductPage}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onScrollToFooter={scrollToFooter}
      />

      <SecondaryNav
        activeView={activeView}
        activeCategorySlug={activeCategorySlug}
        onSelectSection={handleSelectSection}
        onSelectCategoryPage={handleOpenCategoryPage}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectSection={handleSelectSection}
        onSelectCategoryPage={handleOpenCategoryPage}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      <FloatingCartTab
        totalItems={totalItems}
        totalAmount={totalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {activeView === 'home' && (
        <HomeView
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onBuyNow={(product) => handleBuyNow(product, 1)}
          onOpenCategoryPage={handleOpenCategoryPage}
          onSelectProduct={handleOpenProductPage}
          onShowToast={showToast}
        />
      )}

      {activeView === 'category' && (
        <CategoryView
          key={activeCategorySlug}
          categorySlug={activeCategorySlug}
          onGoHome={handleGoHome}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onBuyNow={(product) => handleBuyNow(product, 1)}
          onSelectProduct={handleOpenProductPage}
        />
      )}

      {activeView === 'product' && selectedProduct && (
        <ProductDetailView
          key={selectedProduct.id}
          product={selectedProduct}
          onGoHome={handleGoHome}
          onOpenAllProducts={() => handleOpenCategoryPage('all-products')}
          onOpenCategoryPage={handleOpenCategoryPage}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onSelectProduct={handleOpenProductPage}
          onShowToast={showToast}
        />
      )}

      <Footer
        onSelectSection={handleSelectSection}
        onSelectCategoryPage={handleOpenCategoryPage}
        onOpenModal={(modal) => setActiveModal(modal)}
        onShowToast={showToast}
      />

      {/* Floating Scroll To Top & Support Chat Buttons */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-[122px] md:bottom-[70px] right-3 sm:right-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F48721] hover:bg-[#E07614] text-white shadow-md flex items-center justify-center transition-colors cursor-pointer z-30"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <button
        type="button"
        onClick={() => setActiveModal('chat')}
        aria-label="Open support chat"
        className="fixed bottom-[70px] md:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F48721] hover:bg-[#E07614] text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer z-30"
      >
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-[70px] md:bottom-4 left-4 z-50 bg-[#041F1E] text-white text-[13px] px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 max-w-[calc(100vw-80px)]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F48721] shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      <MobileBottomNav
        totalCartItems={totalItems}
        onGoHome={handleGoHome}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onFocusSearch={handleFocusMobileSearch}
        onOpenAccount={() => setActiveModal('signin')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        totalItems={totalItems}
        totalAmount={totalAmount}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onCompleteOrder={handleCompleteOrder}
      />

      <UtilityModal
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onShowToast={showToast}
      />
    </div>
  );
}
