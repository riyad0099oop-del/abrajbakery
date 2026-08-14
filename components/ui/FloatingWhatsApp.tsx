import Link from "next/link";

export default function FloatingWhatsApp() {
  return (
    <Link
      href="https://wa.me/966503890394"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر الواتساب"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-secondary text-on-secondary-fixed rounded-full shadow-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300 hover:scale-110 group animate-bounce hover:animate-none"
    >
      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
        chat
      </span>
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
        كيف يمكننا مساعدتك؟
      </span>
    </Link>
  );
}
