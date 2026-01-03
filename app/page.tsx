'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ExternalLink, Menu, X, ArrowUp } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'principles', 'products', 'journey', 'funfacts', 'watchfilms', 'stanfordspeech', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu first
      setMobileMenuOpen(false);
      
      // Wait a bit for menu to close, then scroll
      setTimeout(() => {
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const products = [
    {
      id: 'apple-1',
      name: 'Apple I',
      year: '1976',
      description: 'The first product from Apple Computer, hand-built by Steve Wozniak.',
      problem: 'Computers were expensive, complex kits that required technical expertise to assemble.',
      solution: 'A fully assembled circuit board that could be connected to a TV and keyboard, making computing more accessible.',
      impact: 'The foundation of Apple Computer and the beginning of the personal computer revolution.',
      color: 'from-amber-400 to-orange-600',
      image: '/appleone.webp'
    },
    {
      id: 'apple-ii',
      name: 'Apple II',
      year: '1977',
      description: 'The machine that ignited the personal computer revolution.',
      problem: 'Computers were inaccessible, complex beasts for hobbyists only.',
      solution: 'A complete, friendly system with color graphics that invited anyone to create.',
      impact: 'Democratized computing, bringing technology from the lab to the living room.',
      color: 'from-green-400 to-emerald-600',
      image: '/appletwo.jpg'
    },
    {
      id: 'macintosh',
      name: 'Macintosh',
      year: '1984',
      description: 'The computer for the rest of us.',
      problem: 'Command lines were a barrier to entry for creative minds.',
      solution: 'A graphical user interface controlled by a mouse. Intuitive. Human.',
      impact: 'Established the paradigm of modern computing: windows, icons, menus, pointer.',
      color: 'from-blue-400 to-indigo-600',
      image: '/macintosh.webp'
    },
    {
      id: 'pixar',
      name: 'Toy Story',
      year: '1995',
      description: 'To infinity and beyond.',
      problem: 'Animation was limited by the constraints of hand-drawn cells.',
      solution: 'The first feature-length computer-animated film. A new medium for storytelling.',
      impact: 'Revolutionized the film industry and proved technology could have a soul.',
      color: 'from-orange-400 to-amber-600',
      image: '/toystory.jpeg'
    },
    {
      id: 'ipod',
      name: 'iPod',
      year: '2001',
      description: '1,000 songs in your pocket.',
      problem: 'Digital music players were clunky, with terrible user interfaces.',
      solution: 'Seamless sync, a revolutionary scroll wheel, and beautiful industrial design.',
      impact: 'Saved the music industry and paved the way for the mobile revolution.',
      color: 'from-pink-400 to-rose-600',
      image: '/ipod.webp'
    },
    {
      id: 'iphone',
      name: 'iPhone',
      year: '2007',
      description: 'An iPod, a phone, and an internet communicator.',
      problem: 'Smartphones were not smart, and they were not easy to use.',
      solution: 'Multi-touch interface. No stylus. The internet in your pocket.',
      impact: 'Changed everything. How we live, work, play, and connect.',
      color: 'from-purple-400 to-violet-600',
      image: '/iphone.webp'
    },
  ];

  const principles = [
    {
      title: 'Focus',
      description: 'Deciding what not to do is as important as deciding what to do.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Simplicity',
      description: 'Simplicity is the ultimate sophistication. It takes a lot of hard work to make something simple.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      )
    },
    {
      title: 'Empathy',
      description: 'We will truly understand their needs better than any other company.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      title: 'Imputation',
      description: 'People do judge a book by its cover. We may have the best product, but if we present it in a slipshod manner, it will be perceived as slipshod.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12h20M12 2v20" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
    },
  ];

  const timeline = [
    { year: '1955', event: 'Birth', description: 'Born in San Francisco, California. Adopted by Paul and Clara Jobs.' },
    { year: '1972', event: 'Reed College Dropout', description: 'Enrolled at Reed College but dropped out after six months, continuing to audit classes including calligraphy.' },
    { year: '1976', event: 'Apple Computer founded', description: 'Started in a garage with Steve Wozniak.' },
    { year: '1984', event: 'Macintosh introduced', description: 'The computer that changed everything.' },
    { year: '1985', event: 'NeXT Computer', description: 'A new beginning. Advanced computing for education and business.' },
    { year: '1986', event: 'Pixar', description: 'Acquired Lucasfilm\'s computer graphics division.' },
    { year: '1997', event: 'Return to Apple', description: 'Think Different. The turnaround begins.' },
    { year: '2001', event: 'iPod', description: '1,000 songs in your pocket.' },
    { year: '2007', event: 'iPhone', description: 'Apple reinvents the phone.' },
    { year: '2010', event: 'iPad', description: 'A magical and revolutionary device Half laptop, Half phone.' },
    { year: '2011', event: 'Death', description: 'Passed away at the age of 56 after a long battle with pancreatic cancer. His legacy continues to inspire millions of people across the globe.' },
  ];

  return (
    <div className="bg-white text-gray-900 selection:bg-gray-900 selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 sm:gap-3 group z-10"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <Image
                  src="/apple.webp"
                  alt="Logo"
                  fill
                  className="object-cover p-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-base sm:text-lg font-medium tracking-tight">Steve Jobs</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Principles', 'Products', 'Journey', 'Fun Facts', 'Watch Films', 'Learn More'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Learn More' ? 'contact' : item === 'Fun Facts' ? 'funfacts' : item === 'Watch Films' ? 'watchfilms' : item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-gray-600 ${activeSection === (item === 'Learn More' ? 'contact' : item === 'Fun Facts' ? 'funfacts' : item === 'Watch Films' ? 'watchfilms' : item.toLowerCase()) ? 'text-gray-900' : 'text-gray-400'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 z-10 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white border-b border-gray-100 relative z-40"
            >
              <div className="px-4 sm:px-6 py-4 space-y-1">
                {['Principles', 'Products', 'Journey', 'Fun Facts', 'Watch Films', 'Learn More'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'Learn More' ? 'contact' : item === 'Fun Facts' ? 'funfacts' : item === 'Watch Films' ? 'watchfilms' : item.toLowerCase())}
                    className="block w-full text-left py-3 px-2 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-100/50 via-white to-white -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="space-y-6 md:space-y-8 z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] mb-4 md:mb-6">
                  Think <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                    Different.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-lg leading-relaxed font-light">
                  Design is not just what it looks like and feels like. Design is how it works.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToSection('products')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
                >
                  Explore Legacy <ChevronRight size={18} />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative lg:h-[800px] flex items-center justify-center mt-8 lg:mt-0"
            >
              <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full max-w-md lg:max-w-none mx-auto">
                <Image
                  src="/jobs.webp"
                  alt="Steve Jobs"
                  fill
                  className="object-contain object-center drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" className="py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">Core Principles</h2>
            <div className="h-1 w-20 bg-gray-900 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4 md:mb-6 text-gray-900">{principle.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">The Work</h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl">
              Products that didn&apos;t just improve on what came before, but completely reimagined what was possible.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                className={`group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 ${expandedProduct === product.id ? 'bg-gray-50 shadow-2xl ring-1 ring-gray-900/5' : 'bg-white hover:shadow-lg hover:border-gray-200'
                  }`}
              >
                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 shadow-lg flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm sm:text-base text-gray-500 font-medium">{product.year}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedProduct === product.id ? 180 : 0 }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors flex-shrink-0 self-start sm:self-auto"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 sm:pt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 border-t border-gray-200 mt-8 sm:mt-12">
                          <div className="space-y-2 sm:space-y-3">
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">The Problem</h4>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.problem}</p>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">The Solution</h4>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.solution}</p>
                          </div>
                          <div className="space-y-2 sm:space-y-3 sm:col-span-2 md:col-span-1">
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">The Impact</h4>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.impact}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-16 sm:py-24 md:py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">The Journey</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
              A timeline of innovation, failure, and redemption.
            </p>
          </motion.div>

          <div className="relative ml-4 md:ml-0">
            {/* Mobile Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-800 md:hidden" />

            {/* Desktop Line */}
            <div className="absolute left-[180px] lg:left-[232px] top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 sm:mb-16 relative pl-10 sm:pl-12 md:pl-0"
              >
                <div className="md:grid md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] md:gap-12 lg:gap-16 items-start">
                  <div className="md:text-right mb-2 md:mb-0">
                    <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {item.year}
                    </span>
                  </div>

                  <div className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[41px] sm:-left-[49px] md:-left-[40px] top-1 sm:top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 ring-2 sm:ring-4 ring-gray-900" />

                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">{item.event}</h3>
                    <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section id="funfacts" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">Fun Facts</h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl">
              Surprising details about the man behind the legend.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  2.6
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">High School GPA</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                Despite his later success, Steve Jobs had a 2.6 GPA in high school. He was more interested in electronics and pranks than traditional academics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                    <polygon points="12 15 17 21 7 21 12 15" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">License Plate Strategy</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                Jobs got a new Mercedes every six months so he wouldn&apos;t have to put a license plate on it. California law gave new car owners six months before requiring plates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">Biological Sister</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                Jobs was adopted at birth and didn&apos;t meet his biological sister, Mona Simpson, until he was 27 years old. They later became very close.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">Pescatarian Diet</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                Jobs was a pescatarian and was known for eating the same meal for weeks at a time. He particularly favored carrot salad and would often eat it exclusively for extended periods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Watch Films Section */}
      <section id="watchfilms" className="py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">Watch Films</h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl">
              Explore the life and legacy of Steve Jobs through these compelling films and documentaries.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <motion.a
              href="https://www.google.com/search?q=Jobs+2013+movie+Steve+Jobs+Ashton+Kutcher"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/stevejobs2013.jpg"
                  alt="Steve Jobs (2013)"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Steve Jobs (2013)</h3>
                  <ExternalLink size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                  A biographical drama film directed by Joshua Michael Stern, starring Ashton Kutcher as Steve Jobs.
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://tv.apple.com/us/movie/steve-jobs/umc.cmc.20qugmesej4yg33x3e4uev8xh"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/stevejobs2015.jpg"
                  alt="Steve Jobs (2015)"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Steve Jobs (2015)</h3>
                  <ExternalLink size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                  A biographical drama film directed by Danny Boyle, starring Michael Fassbender as Steve Jobs.
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.google.com/search?q=Steve+Jobs+documentary"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer block sm:col-span-2 lg:col-span-1"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="/stevejobsdocumentary.jpg"
                  alt="Steve Jobs Documentary"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Steve Jobs Documentary</h3>
                  <ExternalLink size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                  An in-depth documentary exploring the life, work, and impact of Steve Jobs on technology and innovation.
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Stanford Speech Section */}
      <section id="stanfordspeech" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">Stanford Speech</h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl">
              One of the most inspiring commencement speeches in history.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-lg"
          >
            <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
              <iframe
                src="https://www.youtube.com/embed/UF8uR6Z6KLc"
                title="Steve Jobs Stanford Commencement Speech"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Stanford Commencement</h3>
                <a
                  href="https://youtu.be/UF8uR6Z6KLc?si=2e9gxGeYoZ8gnJhm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink size={18} className="flex-shrink-0 ml-2" />
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                In 2005, Steve Jobs delivered one of the most inspiring commencement speeches in history. He shared three stories from his life—connecting the dots, love and loss, and death—reminding graduates that their time is limited, so they must follow their hearts and intuition.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-gray-900">
              Stay Hungry. <br />
              <span className="text-gray-400">Stay Foolish.</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto px-4">
              Your time is limited, so don&apos;t waste it living someone else&apos;s life.
            </p>

            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://en.wikipedia.org/wiki/Steve_Jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Read Biography <ExternalLink size={18} />
              </a>
              <a
                href="https://www.google.com/search?q=steve+jobs+biography+by+walter+issacson&sca_esv=1c3cc78ff16bfd4a&sxsrf=AE3TifPXTBzL5dO_gbKO03Wn0qYa7J0G3w%3A1764605519683&ei=T74tac64Kc7tptQP9pbRqQQ&ved=0ahUKEwiOnK3p45yRAxXOtokEHXZLNEUQ4dUDCBE&uact=5&oq=steve+jobs+biography+by+walter+issacson&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ3N0ZXZlIGpvYnMgYmlvZ3JhcGh5IGJ5IHdhbHRlciBpc3NhY3NvbjIHEC4YgAQYDTIGEAAYHhgNMgoQABgIGB4YDRgKMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIIEAAYgAQYogQyFhAuGIAEGA0YlwUY3AQY3gQY4ATYAQFIrhxQuQVYlBFwAXgBkAEAmAGYAaABygeqAQM2LjS4AQPIAQD4AQGYAgigAqUFwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICExAuGIAEGIoFGEMYyAMYsAPYAQHCAhMQLhhDGIAEGIoFGMgDGLAD2AEBwgIEECEYCsICCBAAGAgYHhgNwgIIEAAYiQUYogSYAwDiAwUSATEgQIgGAZAGE7oGBggBEAEYCZIHAzYuMqAHq2SyBwM1LjK4B6AFwgcFMC4yLjbIBx4&sclient=gws-wiz-serp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Read Book <ExternalLink size={18} />
              </a>
            </div>

            <div className="pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-gray-200">
              <p className="text-gray-500 text-base sm:text-lg px-4">
                Made by Kamalesh Motamarri for the 🐐 Steve Jobs
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0 }}
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-3 sm:p-4 bg-gray-900 text-white rounded-full shadow-xl z-40 hover:bg-gray-800 transition-colors"
      >
        <ArrowUp size={20} className="sm:w-6 sm:h-6" />
      </motion.button>
    </div>
  );
}
