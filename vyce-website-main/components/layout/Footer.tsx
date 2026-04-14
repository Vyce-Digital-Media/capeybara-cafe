import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Our Process", href: "/process" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "WhatsApp", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-10 md:px-12 lg:px-14">

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:gap-x-8 lg:grid-cols-12 lg:gap-x-12">

          {/* Column 1: Logo & Description */}
          <div className="col-span-2 space-y-6 lg:col-span-5 transition-all duration-300">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <img src="/assets/nav-logo.png" alt="Logo" className="h-24 w-auto brightness-0 invert" />
            </Link>
            <p className="text-md leading-relaxed text-foreground/50">
              Strategy. Creativity. Results. All in one place. <br />
              Address : 903 Luxuria Business Hub, Surat, Gujarat, India. <br />
              Email : hello@vycedigitalmedia.com <br />
              Phone : +91 XXXXX XXXXX
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-span-1 space-y-6 lg:col-span-2 transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium text-foreground/50">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="transition-all duration-300 hover:text-white hover:pl-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social / Community Links */}
          <div className="col-span-1 space-y-6 lg:col-span-2 transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground">Socials</h4>
            <ul className="space-y-4 text-sm font-medium text-foreground/50">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="transition-all duration-300 hover:text-white hover:pl-1">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div className="col-span-2 space-y-6 lg:col-span-3 transition-all duration-300">
            <h4 className="text-base font-semibold text-foreground">Subscribe</h4>
            <p className="text-sm font-medium text-foreground/50">
              Subscribe to get latest offer
            </p>
            <form className="relative flex items-center max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md bg-white px-4 py-3 pr-12 text-sm text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#5287fa] text-white transition-opacity hover:opacity-90"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 flex flex-col gap-6 border-t border-dashed border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/40">
            © {year} Vyce Digital Media. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/40">
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
