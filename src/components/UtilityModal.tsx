import React, { useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { ModalType } from '../types/store';

interface UtilityModalProps {
  activeModal: ModalType;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const UtilityModal: React.FC<UtilityModalProps> = ({
  activeModal,
  onClose,
  onShowToast,
}) => {
  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl max-w-[400px] w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-[#222933] p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'signin' && (
          <div>
            <h3 className="text-[18px] font-semibold text-[#222933] mb-1">Sign In</h3>
            <p className="text-[13px] text-[#64748B] mb-4">
              Access your Ghorer Bazar orders and saved addresses.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                onShowToast('Signed in successfully');
              }}
              className="space-y-3"
            >
              <input
                type="tel"
                required
                placeholder="Phone number (+880)"
                className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#F48721]"
              />
              <button
                type="submit"
                className="w-full bg-[#F48721] hover:bg-[#E07614] text-white rounded-md py-2.5 text-[13.5px] font-medium cursor-pointer"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {activeModal === 'track' && (
          <div>
            <h3 className="text-[18px] font-semibold text-[#222933] mb-1">Track Order</h3>
            <p className="text-[13px] text-[#64748B] mb-4">
              Enter your invoice or order ID to check delivery status.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                onShowToast('Order status: Out for delivery in Dhaka');
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                placeholder="e.g. GB-1042"
                className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#F48721]"
              />
              <button
                type="submit"
                className="w-full bg-[#F48721] hover:bg-[#E07614] text-white rounded-md py-2.5 text-[13.5px] font-medium cursor-pointer"
              >
                Track Now
              </button>
            </form>
          </div>
        )}

        {activeModal === 'wishlist' && (
          <div className="text-center py-4">
            <Heart className="w-10 h-10 text-[#F48721] mx-auto mb-2" />
            <h3 className="text-[17px] font-semibold text-[#222933]">Your Wishlist</h3>
            <p className="text-[13px] text-[#64748B] mt-1">
              Save your favorite organic honey, dates, and ghee items here.
            </p>
          </div>
        )}

        {activeModal === 'chat' && (
          <div>
            <h3 className="text-[17px] font-semibold text-[#222933] mb-1">
              Ghorer Bazar Support
            </h3>
            <p className="text-[13px] text-[#64748B] mb-4">
              Need help with an order? Reach us at +8809642922922 or send a quick message.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                onShowToast('Message sent to Ghorer Bazar Support');
              }}
              className="space-y-3"
            >
              <textarea
                required
                rows={3}
                placeholder="Type your question..."
                className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#F48721]"
              />
              <button
                type="submit"
                className="w-full bg-[#F48721] hover:bg-[#E07614] text-white rounded-md py-2.5 text-[13.5px] font-medium cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
