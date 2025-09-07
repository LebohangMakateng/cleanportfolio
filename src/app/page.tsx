'use client';

import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

export default function Home() {
  const [displayText1, setDisplayText1] = useState('');
  const [displayText2, setDisplayText2] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollLine, setShowScrollLine] = useState(false);
  const [showScrollText, setShowScrollText] = useState(false);
  const [scrollClicked, setScrollClicked] = useState(false);
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);
  const [showBadge1, setShowBadge1] = useState(false);
  const [showBadge2, setShowBadge2] = useState(false);
  const [showBadge3, setShowBadge3] = useState(false);
  const [showProject1, setShowProject1] = useState(false);
  const [showProject2, setShowProject2] = useState(false);
  const [showProject3, setShowProject3] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const fullText1 = 'LEBOHANG';
  const fullText2 = 'MAKATENG';
  const fullText3 = 'Engineer.';
  const fullText4 = 'Builder.';

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    
    // Type first word
    const timer1 = setInterval(() => {
      if (index1 < fullText1.length) {
        setDisplayText1(fullText1.slice(0, index1 + 1));
        index1++;
      } else {
        clearInterval(timer1);
        // Start typing second word after first is complete
        const timer2 = setInterval(() => {
          if (index2 < fullText2.length) {
            setDisplayText2(fullText2.slice(0, index2 + 1));
            index2++;
          } else {
            clearInterval(timer2);
            // Show navigation and scroll elements after typing is complete
            setTimeout(() => {
              setShowNav(true);
              setShowScrollLine(true);
              // Show scroll text after line animation
              setTimeout(() => {
                setShowScrollText(true);
              }, 800); // Delay for line animation
            }, 500);
          }
        }, 150); // Slightly faster for second word
      }
    }, 200); // Speed for first word

    return () => {
      clearInterval(timer1);
    };
  }, []);

  // Function to trigger project animations (left to right)
  const triggerProjectAnimations = useCallback(() => {
    setShowProject1(true);
    setTimeout(() => {
      setShowProject2(true);
      setTimeout(() => {
        setShowProject3(true);
      }, 400); // 400ms between each project
    }, 400);
  }, []);

  // Function to trigger badge animations (left to right)
  const triggerBadgeAnimations = useCallback(() => {
    setShowBadge1(true);
    setTimeout(() => {
      setShowBadge2(true);
      setTimeout(() => {
        setShowBadge3(true);
        // Trigger project animations after badges are shown
        setTimeout(() => {
          triggerProjectAnimations();
        }, 800);
      }, 400); // 400ms between each badge
    }, 400);
  }, [triggerProjectAnimations]);

  // Function to trigger card animations
  const triggerCardAnimations = useCallback(() => {
    setShowCard1(true);
    // Desktop: first, third, then middle. Mobile: sequential
    setTimeout(() => {
      if (window.innerWidth >= 768) { // Desktop
        setShowCard3(true);
        setTimeout(() => {
          setShowCard2(true);
          // Trigger badge animations after all cards are shown
          setTimeout(() => {
            triggerBadgeAnimations();
          }, 800); // Wait a bit after the last card appears
        }, 600);
      } else { // Mobile
        setShowCard2(true);
        setTimeout(() => {
          setShowCard3(true);
          // Trigger badge animations after all cards are shown
          setTimeout(() => {
            triggerBadgeAnimations();
          }, 800); // Wait a bit after the last card appears
        }, 600);
      }
    }, 600);
  }, [triggerBadgeAnimations]);

  // Add scroll event listener to hide scroll elements and trigger cards
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { // Hide when scrolled down more than 150px
        setScrollClicked(true);
        // Trigger card animations when scrolling
        if (!showCard1) {
          triggerCardAnimations();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCard1, triggerCardAnimations]);


  return (
    <div className="min-h-screen bg-white relative">
      {/* Clock Display */}
      <div className="fixed top-4 right-4 z-50 text-gray-600 font-mono text-sm">
        {currentTime}
      </div>

      {/* Desktop Navigation Menu */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-1200 ease-out hidden md:block ${
        showNav ? 'translate-y-5' : '-translate-y-full'
      }`}>
        <div className="flex justify-center items-center py-1">
          <div className="flex space-x-8 text-black font-mono">
                         <a href="#" className="flex flex-col items-center hover:text-[#82C8E5] transition-colors">
               <span className="text-xs">01</span>
               <span className="text-sm tracking-wide">{'// home'}</span>
             </a>
            <a 
              href="#expertise" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center hover:text-[#82C8E5] transition-colors"
            >
              <span className="text-xs">02</span>
                             <span className="text-sm tracking-wide">{'// expertise'}</span>
            </a>
            <div 
              className="relative flex flex-col items-center hover:text-[#82C8E5] transition-colors cursor-pointer"
              onMouseEnter={() => setShowProjectsDropdown(true)}
              onMouseLeave={() => setShowProjectsDropdown(false)}
            >
              <span className="text-xs">03</span>
              <span className="text-sm tracking-wide">{'// projects'}</span>
              {showProjectsDropdown && (
                <div className="absolute top-full mt-2 z-50">
                  <a 
                    href="/projects/spent" 
                    className="block px-4 py-2 text-base text-gray-600 hover:text-[#82C8E5] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  >
                    Spent
                  </a>
                </div>
              )}
            </div>
             <a 
               href="#contact" 
               onClick={(e) => {
                 e.preventDefault();
                 document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="flex flex-col items-center hover:text-[#82C8E5] transition-colors"
             >
               <span className="text-xs">04</span>
                               <span className="text-sm tracking-wide">{'// contact'}</span>
             </a>
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Menu Button */}
      <button 
        className={`fixed top-4 left-4 z-50 md:hidden transition-opacity duration-300 ${
          showNav ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
          <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></div>
          <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}></div>
          <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></div>
        </div>
      </button>

      {/* Mobile Navigation Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-white">
          <div className="flex flex-col items-start justify-start pt-20 px-8">
            <div className="space-y-8 text-black font-mono">
                             <a href="#" className="block text-lg hover:text-[#82C8E5] transition-colors">{'// home'}</a>
              <a 
                href="#expertise" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false); // Close mobile menu first
                  // Add delay to ensure menu closes before scrolling
                  setTimeout(() => {
                    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="block text-lg hover:text-[#82C8E5] transition-colors"
              >
                                 {'// expertise'}
              </a>
            <div className="space-y-2">
              <button 
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                className="block text-lg hover:text-[#82C8E5] transition-colors text-left w-full"
              >
                {'// projects'}
              </button>
              {showProjectsDropdown && (
                <div className="ml-4 space-y-2">
                  <a 
                    href="/projects/spent" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base text-gray-600 hover:text-[#82C8E5] transition-colors"
                  >
                    Spent
                  </a>
                </div>
              )}
            </div>
               <a 
                 href="#contact" 
                 onClick={(e) => {
                   e.preventDefault();
                   setMobileMenuOpen(false); // Close mobile menu first
                   // Add delay to ensure menu closes before scrolling
                   setTimeout(() => {
                     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                   }, 300);
                 }}
                 className="block text-lg hover:text-[#82C8E5] transition-colors"
               >
                                   {'// contact'}
               </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Line and Text */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        {/* Scroll Text Button */}
        <button 
          onClick={() => {
            setScrollClicked(true);
            // Custom slow scroll animation
            const startPosition = window.pageYOffset;
            const targetPosition = window.innerHeight - 130;
            const distance = targetPosition - startPosition;
            const duration = 4000; // 4 seconds for much slower scroll
            let startTime: number | null = null;
            
            function animation(currentTime: number) {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Easing function for smooth animation
            function easeInOutQuad(t: number, b: number, c: number, d: number) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
            
            // Trigger card animations when scroll button is clicked
            if (!showCard1) {
              triggerCardAnimations();
            }
          }}
          className={`transition-opacity duration-500 ease-out cursor-pointer ${
            showScrollText && !scrollClicked ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-black text-sm font-light tracking-wide hover:text-[#82C8E5] transition-colors">SCROLL</span>
        </button>
        
        {/* Vertical Line */}
        <div className={`w-px bg-black transition-all duration-800 ease-out mt-2 ${
          showScrollLine && !scrollClicked ? 'h-20' : 'h-0'
        }`}></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-archivo-black text-black text-5xl md:text-6xl tracking-tight leading-none">
            {displayText1}
          </h1>
          <h2 className="font-archivo-black text-black text-5xl md:text-6xl tracking-tight leading-none mt-1">
            {displayText2}
          </h2>
        </div>
      </div>

      {/* Second Section - Expertise */}
      <div id="expertise" className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pb-20">
        <div className="text-center mb-12 md:mb-12 mb-2">
          <h2 className="font-archivo-black text-black text-2xl md:text-4xl lg:text-5xl tracking-tight leading-none">
          WHERE I THRIVE
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full md:max-w-5xl max-w-sm">
          {/* Software Development Card */}
          <div className={` p-6 md:p-6 p-4 transition-all duration-1000 ease-out transform ${
            showCard1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="text-center">
              
              <h3 className="text-lg md:text-lg text-base font-medium mb-3 text-black">
                <span className="border-b-2 border-pink-500">Software</span> Development
              </h3>
              <p className="text-black text-xs mb-3 font-mono font-bold">Full-stack, future-focused.</p>
              <p className="text-black text-sm md:text-sm text-xs leading-relaxed font-mono font-bold">
              From API development to full-stack applications, I leverage modern technologies (python, C#, Angular, and cloud platforms) to deliver solutions that are not just functional, but future-ready. 
              </p>
            </div>
          </div>

          {/* Frontend Dev Card */}
          <div className={` p-6 md:p-6 p-4 transition-all duration-1000 ease-out transform ${
            showCard2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="text-center">
              
              <h3 className="text-lg md:text-lg text-base font-medium mb-3 text-black">
                <span className="border-b-2 border-blue-500">Solutions Architecture</span>
              </h3>
              <p className="text-black text-xs mb-3 font-mono font-bold">Engineering that scales.</p>
              <p className="text-black text-sm md:text-sm text-xs leading-relaxed font-mono font-bold">
              Having worked on systems that process real transactions and serve real users, I understand that great software isn&apos;t just about clean code—it&apos;s about creating solutions that make a meaningful difference to businesses and their customers.
              </p>
            </div>
          </div>

          {/* Flutter Dev Card */}
          <div className={`p-6 md:p-6 p-4 transition-all duration-1000 ease-out transform ${
            showCard3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="text-center">
              
              <h3 className="text-lg md:text-lg text-base font-medium mb-3 text-black">
                <span className="border-b-2 border-orange-500">Efficiency Catalyst</span>
              </h3>
              <p className="text-black text-xs mb-3 font-mono font-bold">Automation, AI</p>
              <p className="text-black text-sm md:text-sm text-xs leading-relaxed font-mono font-bold">
              I partner with innovative minds to design and build secure, scalable software solutions that drive real results,
              bringing enterprise-level expertise ready to elevate digital presences.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
        <h3 className="text-lg md:text-lg text-base font-medium mt-12 text-black">
                <span className="">NEW SKILLS IN THE ARSENAL</span>
              </h3>
        </div>
          
        {/* Credly Badges */}
         <div className="flex flex-wrap justify-center items-center gap-4 mt-12 max-w-4xl">
           <div className={`transition-all duration-1000 ease-out transform ${
             showBadge1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
           }`}>
             <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="33a5a35f-65f5-4b87-b2d4-8e98d289c827" data-share-badge-host="https://www.credly.com"></div>
           </div>
           <div className={`transition-all duration-1000 ease-out transform ${
             showBadge2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
           }`}>
             <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="29fa478e-77f2-4b04-863a-dc09a91a767e" data-share-badge-host="https://www.credly.com"></div>
           </div>
           <div className={`transition-all duration-1000 ease-out transform ${
             showBadge3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
           }`}>
             <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="fd5bd3ca-fcc4-4b42-b273-fb0dc773aafa" data-share-badge-host="https://www.credly.com"></div>
           </div>
         </div>
         
        {/* Projects Section */}
        <div className="text-center mt-20">
          <h3 className="text-lg md:text-lg text-base font-medium mb-8 text-black">
            <span className="">WHAT I HAVE BEEN UP TO</span>
          </h3>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 max-w-5xl w-full mt-8">
          {/* Project 1 */}
          <div className={`transition-all duration-300 transform ${
            showProject1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="flex flex-col md:flex-row gap-1.5">
              {/* Project Image/Preview - Left Side */}
              <div className="w-full md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-white text-center">
                  <div className="text-sm font-mono">Project Preview</div>
                </div>
              </div>
              {/* Project Content - Right Side */}
              <div className="flex-1 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-archivo-black text-black text-lg mb-2">Spotify Connected App</h4>
                <p className="text-gray-600 text-sm mb-4 font-mono">
                  Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#82C8E5] text-white text-xs font-mono rounded">React</span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-mono rounded">Express</span>
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-mono rounded">Spotify API</span>
                  <span className="px-3 py-1 bg-purple-500 text-white text-xs font-mono rounded">Heroku</span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-[#82C8E5] hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className={`transition-all duration-300 transform ${
            showProject2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="flex flex-col md:flex-row gap-1.5">
              {/* Project Image/Preview - Left Side */}
              <div className="w-full md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-white text-center">
                  <div className="text-sm font-mono">Theme Preview</div>
                </div>
              </div>
              {/* Project Content - Right Side */}
              <div className="flex-1 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-archivo-black text-black text-lg mb-2">Halcyon Theme</h4>
                <p className="text-gray-600 text-sm mb-4 font-mono">
                  Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Clean design focused on readability and reduced eye strain during long coding sessions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-mono rounded">VS Code</span>
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-mono rounded">Sublime</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-mono rounded">Atom</span>
                  <span className="px-3 py-1 bg-gray-600 text-white text-xs font-mono rounded">iTerm</span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-[#82C8E5] hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className={`transition-all duration-300 transform ${
            showProject3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="flex flex-col md:flex-row gap-1.5">
              {/* Project Image/Preview - Left Side */}
              <div className="w-full md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-white text-center">
                  <div className="text-sm font-mono">Portfolio Site</div>
                </div>
              </div>
              {/* Project Content - Right Side */}
              <div className="flex-1 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-archivo-black text-black text-lg mb-2">brittanychiang.com (v4)</h4>
                <p className="text-gray-600 text-sm mb-4 font-mono">
                  An old portfolio site built with Gatsby with 6k+ stars and 3k+ forks. Features smooth animations, responsive design, and modern web development practices.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-mono rounded">Gatsby</span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-mono rounded">React</span>
                  <span className="px-3 py-1 bg-pink-500 text-white text-xs font-mono rounded">Styled Components</span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-mono rounded">GraphQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-[#82C8E5] hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-archivo-black text-black text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none mb-8">
            GET IN TOUCH
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            {/* Call Button */}
            <a 
              href="tel:+27640671506"
              className="flex items-center space-x-3 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-mono text-sm">+27 64 067 1506</span>
            </a>
            
            {/* Email Link */}
            <a 
              href="mailto:lebohangdev@gmail.com"
              className="flex items-center space-x-3 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-mono text-sm">lebohangdev@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="bg-white py-8 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-black text-sm font-mono">
            © 2025 Lebohang Makateng
          </p>
        </div>
      </div>
      
      {/* Credly Script */}
      <Script
        src="//cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
