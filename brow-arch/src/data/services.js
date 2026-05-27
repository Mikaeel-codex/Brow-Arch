const BASE = 'https://images.unsplash.com/photo-';
const FIT  = '?auto=format&fit=crop&w=600&q=75';

export const services = [
  {
    id: 1,
    name: 'Hydrating Facial',
    category: 'Facials',
    description:
      'A deeply nourishing facial tailored to your skin type. Replenishes moisture levels, brightens your complexion, and leaves your skin feeling supple and refreshed.',
    duration: 60,
    price: 950,
    popular: true,
    image: `${BASE}1570172619644-dfd03ed5d881${FIT}`,
  },
  {
    id: 2,
    name: 'Advanced Chemical Peel',
    category: 'Skin Treatments',
    description:
      'A professional-grade peel that targets uneven skin tone, fine lines, and textural irregularities. Reveals smoother, more radiant skin with minimal downtime.',
    duration: 45,
    price: 1250,
    popular: true,
    image: `${BASE}1643684391140-c5056cfd3436${FIT}`,
  },
  {
    id: 3,
    name: 'Brow Shape & Tint',
    category: 'Lash & Brow',
    description:
      'Precision brow shaping using wax and tweeze, followed by a customised tint to frame and define your features. Results that last up to 4–6 weeks.',
    duration: 30,
    price: 350,
    popular: true,
    image: `${BASE}1589710751893-f9a6770ad71b${FIT}`,
  },
  {
    id: 4,
    name: 'Full Body Massage',
    category: 'Massage',
    description:
      'A full-body Swedish massage designed to melt away tension, improve circulation, and restore a sense of calm. Customised pressure to suit your needs.',
    duration: 60,
    price: 850,
    popular: false,
    image: `${BASE}1519823551278-64ac92734fb1${FIT}`,
  },
  {
    id: 5,
    name: 'Lash Lift & Tint',
    category: 'Lash & Brow',
    description:
      'A semi-permanent treatment that lifts, curls, and tints your natural lashes for a wide-eyed, mascara-free look lasting up to 8 weeks.',
    duration: 60,
    price: 750,
    popular: true,
    image: `${BASE}1587910234573-d6fc84743bc8${FIT}`,
  },
  {
    id: 6,
    name: 'Dermaplaning',
    category: 'Skin Treatments',
    description:
      'A gentle exfoliation technique that removes dead skin cells and vellus hair, leaving your skin instantly smoother, brighter, and ready to absorb skincare.',
    duration: 45,
    price: 900,
    popular: false,
    image: `${BASE}1616394584738-fc6e612e71b9${FIT}`,
  },
  {
    id: 7,
    name: 'Full Leg Wax',
    category: 'Waxing',
    description:
      'Smooth, long-lasting results with our professional warm wax treatment for full legs. Suitable for all skin types, leaving skin silky soft.',
    duration: 45,
    price: 550,
    popular: false,
    image: `${BASE}1585945037805-5fd82c2e60b1${FIT}`,
  },
  {
    id: 8,
    name: 'Glow Facial',
    category: 'Facials',
    description:
      'A results-driven brightening facial combining exfoliation, vitamin C infusion, and LED light therapy for a luminous, glass-skin finish.',
    duration: 75,
    price: 1100,
    popular: false,
    image: `${BASE}1619451427882-6aaaded0cc61${FIT}`,
  },
];

export const categories = ['All', 'Facials', 'Skin Treatments', 'Waxing', 'Lash & Brow', 'Massage'];
