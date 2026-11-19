import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  totalItems: number;
  totalAmount: number;
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onCompleteOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  totalItems,
  totalAmount,
  onClose,
  onUpdateQty,
  onCompleteOrder,
}) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setCheckoutOpen(false);
    setOrderPlaced(false);
    onClose();
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    onCompleteOrder();
    setTimeout(() => {
      setOrderPlaced(false);
      setCheckoutOpen(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="flex-1" onClick={handleClose} aria-hidden="true" />
      <div className="w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#EAE8E3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F48721]" />
            <h3 className="text-[16px] font-semibold text-[#222933]">
              Shopping Cart ({totalItems})
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#64748B] hover:text-[#222933] cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderPlaced ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
              <h4 className="text-[17px] font-semibold text-[#222933]">Order Confirmed!</h4>
              <p className="text-[13px] text-[#64748B] mt-1">
                Thank you for shopping with Ghorer Bazar.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingCart className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
              <p className="text-[14px] text-[#64748B]">Your cart is currently empty.</p>
            </div>
          ) : checkoutOpen ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h4 className="text-[15px] font-semibold text-[#222933]">
                Cash on Delivery Details
              </h4>
              <div>
                <label className="block text-[12.5px] font-medium text-[#374151] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#F48721]"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[#374151] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#F48721]"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[#374151] mb-1">
                  Delivery Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House, Road, Area, Dhaka"
                  className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#F48721]"
                />
              </div>
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="flex-1 border border-[#D1D5DB] text-[#374151] rounded-md py-2.5 text-[13px] font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#F48721] hover:bg-[#E07614] text-white rounded-md py-2.5 text-[13px] font-medium cursor-pointer"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 pb-4 border-b border-[#F1EFEA]"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain border border-[#EAE8E3] rounded p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#222933] truncate">
                      {product.title}
                    </p>
                    <p className="text-[13px] font-bold text-[#F48721] mt-0.5 tabular-nums">
                      ৳{(product.price * quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(product.id, -1)}
                        aria-label={`Decrease ${product.title} quantity`}
                        className="w-6 h-6 border border-[#D1D5DB] rounded flex items-center justify-center hover:border-[#F48721] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[12.5px] font-medium tabular-nums w-5 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(product.id, 1)}
                        aria-label={`Increase ${product.title} quantity`}
                        className="w-6 h-6 border border-[#D1D5DB] rounded flex items-center justify-center hover:border-[#F48721] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, -quantity)}
                    className="text-[#94A3B8] hover:text-[#EF4444] cursor-pointer"
                    aria-label={`Remove ${product.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && !checkoutOpen && !orderPlaced && (
          <div className="p-5 border-t border-[#EAE8E3] bg-[#FBF9F5]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-medium text-[#475569]">Subtotal</span>
              <span className="text-[18px] font-bold text-[#F48721] tabular-nums">
                ৳{totalAmount.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="w-full bg-[#F48721] hover:bg-[#E07614] text-white rounded-md py-2.5 text-[14px] font-medium transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
