import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FOOTER_COLUMNS } from '../data/storeData';
import { ModalType } from '../types/store';

interface FooterProps {
  onSelectSection: (sectionId: string) => void;
  onSelectCategoryPage: (slug: string) => void;
  onOpenModal: (modal: ModalType) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onSelectCategoryPage,
  onOpenModal,
  onShowToast,
}) => {
  return (
    <footer id="footer" className="bg-white border-t border-[#EAE8E3] pt-10 sm:pt-12 pb-20 md:pb-6">
      <div className="max-w-[1252px] mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-7 sm:gap-8">
          {/* Brand & Contact Column */}
          <div className="col-span-2 md:col-span-4 pr-0 md:pr-4">
            <img
              src="/images/logo.png"
              alt="Ghorer Bazar"
              referrerPolicy="no-referrer"
              className="h-[44px] sm:h-[46px] w-auto object-contain mb-4"
            />
            <p className="text-[13px] text-[#64748B] leading-[1.6] mb-5 max-w-[330px]">
              Ghorer Bazar is an e-commerce platform dedicated to providing safe and reliable food
              to every home.
            </p>

            <div className="space-y-2.5 text-[13px] text-[#475569]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <span>Rampura, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <a href="tel:+8809642922922" className="hover:text-[#F48721]">
                  +8809642922922
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <a href="mailto:contact@ghorerbazar.com" className="hover:text-[#F48721]">
                  contact@ghorerbazar.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Facebook: Ghorer Bazar');
                }}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#FDF3EA] text-[#F48721] flex items-center justify-center hover:bg-[#F48721] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M13.5 9H16l-.5 3h-2v9h-3v-9H9V9h1.5V7.2c0-2.1 1-3.2 3.3-3.2H16v2.7h-1.4c-.8 0-1.1.4-1.1 1.1V9z" />
                </svg>
              </a>
              <a
                href="#twitter"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Twitter: @ghorerbazar');
                }}
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#FDF3EA] text-[#F48721] flex items-center justify-center hover:bg-[#F48721] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 5.9a8.2 8.2 0 01-2.36.65 4.12 4.12 0 001.81-2.27 8.2 8.2 0 01-2.61 1 4.1 4.1 0 00-7 3.74A11.65 11.65 0 013.39 4.7a4.1 4.1 0 001.27 5.47 4.07 4.07 0 01-1.86-.51v.05a4.1 4.1 0 003.29 4.02 4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.85A8.23 8.23 0 012 18.43a11.62 11.62 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.35 8.35 0 0022 5.9z" />
                </svg>
              </a>
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Instagram: @ghorerbazar');
                }}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#FDF3EA] text-[#F48721] flex items-center justify-center hover:bg-[#F48721] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Download App */}
            <div className="mt-7">
              <p className="text-[13.5px] font-medium text-[#222933] mb-3">
                Download App on Mobile :
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#google-play"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowToast('Ghorer Bazar Android App');
                  }}
                >
                  <img
                    src="/images/badge-google-play.png"
                    alt="Get it on Google Play"
                    referrerPolicy="no-referrer"
                    className="h-[38px] w-auto object-contain rounded-[4px]"
                  />
                </a>
                <a
                  href="#app-store"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowToast('Ghorer Bazar iOS App');
                  }}
                >
                  <img
                    src="/images/badge-app-store.png"
                    alt="Download on the App Store"
                    referrerPolicy="no-referrer"
                    className="h-[38px] w-auto object-contain rounded-[4px]"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2">
              <h3 className="text-[15px] font-medium text-[#222933] mb-3.5 sm:mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.actionType === 'category') {
                          onSelectCategoryPage(link.target);
                        } else if (link.actionType === 'section') {
                          onSelectSection(link.target);
                        } else if (link.actionType === 'modal') {
                          onOpenModal(link.target as ModalType);
                        } else {
                          onShowToast(link.target);
                        }
                      }}
                      className="text-[13px] text-[#64748B] hover:text-[#F48721] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright & Payment Strip */}
        <div className="border-t border-[#EAE8E3] mt-10 pt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-[#64748B]">Copyright © 2026 GhorerBazar</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[11px] font-semibold text-[#334155]">Pay With</span>
            <img
              src="/images/sslcommerz-strip.png"
              alt="Supported Payment Methods"
              referrerPolicy="no-referrer"
              className="h-auto max-h-[60px] sm:max-h-[72px] w-auto object-contain"
            />
            <img
              src="/images/sslcommerz-verified.png"
              alt="Verified by SSLCommerz"
              referrerPolicy="no-referrer"
              className="h-[26px] sm:h-[30px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
