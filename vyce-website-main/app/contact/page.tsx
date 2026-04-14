"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Data ─────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@vycedigitalmedia.com",
    href: "mailto:hello@vycedigitalmedia.com",
    accent: "rgba(0,68,255,0.15)",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91 XXXXX XXXXX",
    accent: "rgba(0,200,100,0.15)",
  },
  {
    icon: MapPin,
    title: "Studios",
    value: "903 Luxuria Business Hub, Surat, Gujarat, India",
    href: "#",
    accent: "rgba(255,100,80,0.15)",
  },
];

const faqItems = [
  {
    q: "What does the first conversation look like?",
    a: "A 20–30 minute call. No pitch. No pressure. We ask about your business, your goals, and your current situation. You ask whatever you need to. Then we figure out together if it makes sense to move forward - and how.",
  },
  {
    q: "Do you work with brands outside India?",
    a: "Yes, actively. We've worked with international brands and have structured our communication and delivery to work across time zones.",
  },
  {
    q: "Do you require a long-term commitment?",
    a: "Retainer services (social media, SEO) work best over 3–6 months because that's where compounding kicks in. Project-based work is scoped to a defined timeline. We'll tell you clearly what we recommend and why - you decide.",
  },
  {
    q: "We've had bad experiences with agencies before. How are you different?",
    a: "Honestly, every agency says this. The real answer is: most of our clients come from referrals from people we've already worked with. That's the most honest proof we can offer. Talk to us, and then judge for yourself.",
  },
];

const projectTypes = [
  "Branding & Identity",
  "Social Media Management",
  "Website Design & Development",
  "Performance Marketing",
  "UI/UX & Product Design",
  "SEO",
  "Not sure yet - need guidance",
  "Multiple services",
];

const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss on the call",
];

// ─── Primitives ────────────────────────────────────────────────────────────

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "100%", opacity: 0 }} animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}>{children}</motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <FadeIn delay={0}>
      <div className={`border-t border-white/[0.07] transition-colors duration-300 ${isOpen ? "border-primary/20" : ""}`}>
        <button onClick={onToggle} className="flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer">
          <span className={`text-sm font-semibold leading-snug transition-colors duration-300 md:text-base ${isOpen ? "text-white" : "text-foreground/55"}`}>{item.q}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground/25"}`}>
            <ChevronDown size={16} strokeWidth={1.5} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div key="ans" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <p className="pb-7 text-sm leading-relaxed text-foreground/45 font-medium">{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

// ─── Contact Info Card ─────────────────────────────────────────────────────

function InfoCard({ info, index }: { info: typeof contactInfo[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = info.icon;
  return (
    <FadeIn delay={index * 0.1}>
      <a
        href={info.href}
        className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950/50 p-6 transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] transition-all duration-500 group-hover:border-primary/30"
          style={{ background: hovered ? info.accent : "transparent" }}>
          <Icon size={20} strokeWidth={1.25} className="text-foreground/60 group-hover:text-primary transition-colors duration-300" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30">{info.title}</p>
          <p className="mt-1.5 text-base font-semibold text-foreground/80 group-hover:text-white transition-colors duration-300">{info.value}</p>
        </div>
        {/* Arrow */}
        <ArrowUpRight size={14} className="absolute right-5 top-5 text-foreground/15 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        {/* Glow */}
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ background: `radial-gradient(ellipse at 0% 50%, ${info.accent}, transparent 70%)` }} />
      </a>
    </FadeIn>
  );
}

// ─── Form ──────────────────────────────────────────────────────────────────

const inputClass = "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm font-medium text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.04] placeholder:text-foreground/20 hover:border-white/[0.15]";
const labelClass = "block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2.5 ml-2";

function ContactForm() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/[0.07] bg-gradient-to-br from-zinc-950 to-[#010204] p-8 md:p-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-1/4 -right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-[100px]" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center gap-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <Send size={24} className="text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Message Sent!</h3>
              <p className="mt-3 text-sm text-foreground/40 font-medium leading-relaxed max-w-sm">
                We&apos;ll be in touch within two business days. Check your inbox.
              </p>
            </div>
            <button onClick={() => setSubmitted(false)}
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 hover:text-primary transition-colors duration-300 cursor-pointer">
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-9">
            {/* Name + Company */}
            <div className="grid gap-6 md:grid-cols-2">
              <FadeIn delay={0.05}>
                <label className={labelClass}>Your Name</label>
                <input type="text" placeholder="Alex Rivera" className={inputClass} required />
              </FadeIn>
              <FadeIn delay={0.1}>
                <label className={labelClass}>Brand / Company Name</label>
                <input type="text" placeholder="Studio / brand" className={inputClass} />
              </FadeIn>
            </div>

            {/* Email + WhatsApp */}
            <div className="grid gap-6 md:grid-cols-2">
              <FadeIn delay={0.15}>
                <label className={labelClass}>Email Address</label>
                <input type="email" placeholder="you@company.com" className={inputClass} required />
              </FadeIn>
              <FadeIn delay={0.18}>
                <label className={labelClass}>WhatsApp Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} required />
              </FadeIn>
            </div>

            {/* Project type */}
            <FadeIn delay={0.2}>
              <label className={labelClass}>What are you looking for?</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${selectedType === type
                      ? "bg-primary text-background border-primary"
                      : "border border-white/10 bg-white/[0.02] text-foreground/40 hover:border-white/[0.2] hover:text-foreground/80 hover:bg-white/[0.05]"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Budget Range */}
            <FadeIn delay={0.22}>
              <label className={labelClass}>Rough budget range (helps us scope properly)</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedBudget(selectedBudget === range ? null : range)}
                    className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${selectedBudget === range
                      ? "bg-primary text-background border-primary"
                      : "border border-white/10 bg-white/[0.02] text-foreground/40 hover:border-white/[0.2] hover:text-foreground/80 hover:bg-white/[0.05]"
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Message */}
            <FadeIn delay={0.25}>
              <label className={labelClass}>Tell us about your project or goal</label>
              <textarea
                placeholder="Goals, timeline, links, budget band if known..."
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </FadeIn>

            {/* Submit */}
            <FadeIn delay={0.3} className="pt-2">
              <button type="submit"
                className="group inline-flex w-full md:w-auto items-center justify-center gap-5 rounded-xl bg-foreground px-14 py-5 text-[12px] font-black uppercase tracking-[0.3em] text-background transition-all duration-300 hover:bg-primary hover:scale-[1.02] active:scale-95 cursor-pointer shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]">
                Send message
                <Send size={18} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </FadeIn>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Sweeping light */}
      <motion.div animate={{ x: ["-120%", "220%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
        className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 bg-gradient-to-r from-transparent via-white/[0.018] to-transparent skew-x-[-25deg]" />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const heroRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 180]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.93]);

  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-white" style={{ left: `${(i + 1) * (100 / 7)}%` }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,68,255,0.06)_0%,transparent_65%)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 flex flex-col items-center gap-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Contact Us
            </span>
          </FadeIn>
          <div className="space-y-2">
            <RevealLine><h1 className="text-[clamp(2rem,5.5vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.88]">Let&apos;s talk.</h1></RevealLine>
            <RevealLine delay={0.1}><h1 className="text-[clamp(2rem,5.5vw,6.5rem)] font-satoshi font-normal italic text-primary leading-[0.88]">Seriously, we don't bite.</h1></RevealLine>
          </div>
          <FadeIn delay={0.3} className="max-w-2xl">
            <p className="text-base md:text-xl text-foreground/40 font-medium leading-relaxed">
              Whether you have a fully detailed brief or just a vague idea and a rough budget - reach out. We'll help you figure out the rest. That's kind of our thing.
            </p>
          </FadeIn>
        </motion.div>


      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">

            {/* Left column */}
            <div className="flex flex-col gap-12 lg:col-span-5">

              {/* Contact cards */}
              <div className="space-y-4">
                <FadeIn><p className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-6">Reach us directly</p></FadeIn>
                {contactInfo.map((info, i) => <InfoCard key={i} info={info} index={i} />)}
              </div>

              {/* Google Map Integration */}
              <FadeIn delay={0.25}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] h-64 w-full bg-zinc-950/40 mt-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.135854977098!2d72.7596652!3d21.1469911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80f5d96493%3A0x5f79790a213bd724!2sLuxuria%20Business%20Hub!5e0!3m2!1sen!2sin!4v1776070850466!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10 opacity-30" />
                </div>
              </FadeIn>

              {/* Office hours */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-white/[0.07] bg-zinc-950/50 p-7 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08]">
                      <Clock size={16} strokeWidth={1.25} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Office hours</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/40 font-medium">
                        Monday–Saturday, 10am–7pm IST (We usually respond faster than that.)
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.06] pt-6 flex items-start gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08]">
                      <MessageCircle size={16} strokeWidth={1.25} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Urgent launch?</p>
                      <p className="mt-2 text-sm text-foreground/40 font-medium">Mention your launch date in the message — we route urgent requests to producers the same day.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* FAQ */}
              <div>
                <FadeIn><p className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-2">FAQ</p></FadeIn>
                {faqItems.map((item, i) => (
                  <FAQItem
                    key={item.q}
                    item={item}
                    isOpen={openFaqIndex === i}
                    onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  />
                ))}
                <div className="border-t border-white/[0.07]" />
              </div>

              {/* Portfolio link */}
              <FadeIn delay={0.1}>
                <Link href="/portfolio" className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/35 hover:text-primary transition-colors duration-300">
                  View selected work
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-primary group-hover:translate-x-1 group-hover:bg-primary/10">
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              </FadeIn>
            </div>

            {/* Right column: form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1} className="mb-8">
                <div>
                  <RevealLine><h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] md:text-5xl">Tell us what</h2></RevealLine>
                  <RevealLine delay={0.07}><h2 className="text-4xl font-satoshi pb-2 font-normal italic text-primary leading-[0.9] md:text-5xl">you're working on.</h2></RevealLine>
                  <FadeIn delay={0.2} className="mt-5"><p className="text-sm text-foreground/40 font-medium leading-relaxed max-w-md">No long forms. No confusing dropdowns. Just the basics - so we can come to the first conversation actually prepared.</p></FadeIn>
                </div>
              </FadeIn>
              <ContactForm />
            </div>
          </div>
        </div>


      </section>
    </div>
  );
}
