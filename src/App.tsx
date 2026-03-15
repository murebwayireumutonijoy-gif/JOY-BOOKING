/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Star, 
  ChevronRight, 
  Menu, 
  X, 
  Plane, 
  Hotel, 
  Car, 
  Compass,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'about' | 'destinations' | 'booking' | 'accommodation' | 'services' | 'testimonials' | 'contact';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
}

// --- Data ---
const DESTINATIONS: Destination[] = [
  {
    id: 'volcanoes',
    name: 'Volcanoes National Park',
    description: 'Home to the majestic mountain gorillas and five of the eight volcanoes in the Virunga Mountains.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000',
    tags: ['Wildlife', 'Gorillas', 'Hiking']
  },
  {
    id: 'akagera',
    name: 'Akagera National Park',
    description: 'A classic safari destination with the Big Five, diverse landscapes, and beautiful Lake Ihema.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Safari', 'Wildlife', 'Nature']
  },
  {
    id: 'nyungwe',
    name: 'Nyungwe Forest National Park',
    description: 'One of the oldest rainforests in Africa, famous for chimpanzee trekking and the canopy walk.',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1000',
    tags: ['Rainforest', 'Chimpanzees', 'Adventure']
  },
  {
    id: 'lake-kivu',
    name: 'Lake Kivu',
    description: 'A stunning inland sea surrounded by steep, terraced hills and beautiful resort towns.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000',
    tags: ['Relaxation', 'Water Sports', 'Beach']
  },
  {
    id: 'kigali-memorial',
    name: 'Kigali Genocide Memorial',
    description: 'A place of remembrance and learning, honoring the victims of the 1994 Genocide against the Tutsi.',
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1000',
    tags: ['History', 'Culture', 'Education']
  }
];

const SERVICES: Service[] = [
  {
    id: 'guide',
    title: 'Tour Guide Services',
    description: 'Professional, multilingual guides who know every corner of Rwanda.',
    icon: <Compass className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'transport',
    title: 'Tourist Transport',
    description: 'Comfortable 4x4 vehicles specially equipped for safaris and long trips.',
    icon: <Car className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'airport',
    title: 'Airport Pickup',
    description: 'Reliable and punctual airport transfers to and from Kigali International Airport.',
    icon: <Plane className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'planning',
    title: 'Trip Planning',
    description: 'Customized itineraries tailored to your interests, budget, and schedule.',
    icon: <Calendar className="w-8 h-8 text-emerald-600" />
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    text: 'Amazing experience exploring Rwanda with Joy Booking Empire! The gorilla trekking was life-changing.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'David Chen',
    text: 'Very professional and friendly service. Joy made sure every detail of our trip was perfect.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    text: 'Our trip to the gorillas was unforgettable. The guides were so knowledgeable and patient.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=elena'
  }
];

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Destinations', value: 'destinations' },
    { label: 'About', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'Accommodation', value: 'accommodation' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <span className="text-2xl font-black tracking-tighter text-emerald-700">JOY</span>
            <span className="text-2xl font-light tracking-widest text-sky-600 ml-1">BOOKING</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setCurrentPage(link.value)}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  currentPage === link.value ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-gray-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('booking')}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => {
                    setCurrentPage(link.value);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-md"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentPage('booking');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center bg-emerald-600 text-white px-3 py-3 rounded-md text-base font-semibold"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=2000" 
        alt="Rwanda Landscape" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          JOY BOOKING EMPIRE
          <span className="block text-sky-300">Discover the Beauty of Rwanda</span>
        </h1>
        <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-light">
          Experience the Land of a Thousand Hills with the most trusted travel partner. From gorilla trekking to luxury retreats.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setCurrentPage('booking')}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
          >
            Book a Tour <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setCurrentPage('destinations')}
            className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/30 transition-all"
          >
            Explore Destinations
          </button>
        </div>
      </motion.div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-white rounded-full" />
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
              alt="Joy - Founder" 
              className="rounded-3xl shadow-2xl z-10 relative"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sky-100 rounded-3xl -z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-100 rounded-full -z-0" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">About Me</h2>
          <h3 className="text-4xl font-black text-gray-900 mb-6">Meet Joy, Your Guide to Rwanda</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Hello! I'm Joy, the founder of JOY BOOKING EMPIRE. My passion is showing the world the incredible beauty, culture, and resilience of my home country, Rwanda.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our mission is simple: to provide seamless, unforgettable travel experiences while supporting local communities and conservation efforts. Whether you're here for the gorillas or the vibrant city life of Kigali, we ensure you feel at home.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Trusted Service</h4>
                <p className="text-sm text-gray-500">100% verified bookings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900">Local Expertise</h4>
                <p className="text-sm text-gray-500">Deep cultural knowledge</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Destinations = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Explore</h2>
        <h3 className="text-4xl font-black text-gray-900">Popular Destinations</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESTINATIONS.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {dest.tags.map(tag => (
                  <span key={tag} className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">{dest.name}</h4>
              <p className="text-gray-600 mb-6 line-clamp-2">{dest.description}</p>
              <button 
                onClick={() => setCurrentPage('booking')}
                className="w-full py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all"
              >
                Book This Tour
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-24 bg-white flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 bg-emerald-50 rounded-3xl max-w-md"
        >
          <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4">Booking Received!</h3>
          <p className="text-gray-600 mb-8">Thank you for choosing Joy Booking Empire. We will contact you shortly to confirm your trip details.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold"
          >
            Make Another Booking
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Book Your Adventure</h2>
          <p className="text-gray-600">Fill out the form below and let's start planning your dream trip to Rwanda.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="+250..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Destination</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all">
                {DESTINATIONS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                <option value="custom">Custom Itinerary</option>
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Travel Date</label>
              <input required type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Number of People</label>
              <input required type="number" min="1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Special Requests</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="Tell us more about your preferences..."></textarea>
          </div>
          
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            Submit Booking Request
          </button>
        </form>
      </div>
    </section>
  );
};

const Accommodation = () => (
  <section className="py-24 bg-sky-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-4">Stay</h2>
        <h3 className="text-4xl font-black text-gray-900">Premium Accommodations</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: 'Luxury Hotels',
            desc: 'World-class comfort in the heart of Kigali and near major parks.',
            img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000'
          },
          {
            title: 'Safari Lodges',
            desc: 'Immersive nature experiences with high-end amenities.',
            img: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1000'
          },
          {
            title: 'Eco-Lodges',
            desc: 'Sustainable stays that connect you deeply with the environment.',
            img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000'
          },
          {
            title: 'Guest Houses',
            desc: 'Cozy, local stays for a more authentic and budget-friendly trip.',
            img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000'
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-md group">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Our Services</h2>
        <h3 className="text-4xl font-black text-gray-900">Complete Travel Solutions</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="p-8 bg-gray-50 rounded-3xl hover:bg-emerald-50 transition-colors group">
            <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-all">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Testimonials</h2>
        <h3 className="text-4xl font-black">What Our Clients Say</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-lg italic mb-8 text-emerald-50">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-emerald-400" referrerPolicy="no-referrer" />
              <span className="font-bold">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Contact Us</h2>
          <h3 className="text-4xl font-black text-gray-900 mb-8">Get In Touch</h3>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-bold text-gray-900">umutoni@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-bold text-gray-900">+250 788364521</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-bold text-gray-900">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
          
          <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1000" 
              alt="Kigali Map Placeholder" 
              className="w-full h-full object-cover opacity-50 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
                <MapPin className="text-red-500" />
                <span className="font-bold">Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h4>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center mb-6">
            <span className="text-3xl font-black tracking-tighter text-emerald-500">JOY</span>
            <span className="text-3xl font-light tracking-widest text-sky-400 ml-1">BOOKING</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8">
            Your premier travel partner in Rwanda. We specialize in creating unforgettable memories in the Land of a Thousand Hills.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h5 className="text-lg font-bold mb-6">Quick Links</h5>
          <ul className="space-y-4 text-gray-400">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('destinations')} className="hover:text-emerald-400 transition-colors">Destinations</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-emerald-400 transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('booking')} className="hover:text-emerald-400 transition-colors">Book a Tour</button></li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-lg font-bold mb-6">Newsletter</h5>
          <p className="text-gray-400 text-sm mb-4">Subscribe for travel tips and exclusive offers.</p>
          <div className="flex">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 outline-none focus:border-emerald-500 w-full" />
            <button className="bg-emerald-600 px-4 py-2 rounded-r-xl hover:bg-emerald-700 transition-colors">Join</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} JOY BOOKING EMPIRE – Discover Rwanda. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <About />
            <Destinations setCurrentPage={setCurrentPage} />
            <Services />
            <Testimonials />
            <Contact />
          </>
        );
      case 'about':
        return <About />;
      case 'destinations':
        return <Destinations setCurrentPage={setCurrentPage} />;
      case 'booking':
        return <BookingForm />;
      case 'accommodation':
        return <Accommodation />;
      case 'services':
        return <Services />;
      case 'testimonials':
        return <Testimonials />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/250788364521" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
