const BASE = 'https://images.unsplash.com/photo-';
const FIT  = '?auto=format&fit=crop&w=700&q=75';

export const blogPosts = [
  {
    id: 1,
    title: '5 Tips for Glowing Skin Every Day',
    category: 'Skincare',
    excerpt:
      'Achieving that coveted lit-from-within glow doesn\'t require a 12-step routine. Here are five simple, expert-backed habits that will transform your skin over time.',
    date: 'May 10, 2024',
    readTime: '4 min read',
    image: `${BASE}1580870069867-74c57ee1bb07${FIT}`,
    slug: '5-tips-glowing-skin',
  },
  {
    id: 2,
    title: 'Aftercare Guide: Chemical Peels',
    category: 'Aftercare',
    excerpt:
      'You\'ve just had a chemical peel — congratulations! Now comes the important part. Proper aftercare is what separates good results from great ones.',
    date: 'April 22, 2024',
    readTime: '6 min read',
    image: `${BASE}1616394584738-fc6e612e71b9${FIT}`,
    slug: 'aftercare-guide-chemical-peels',
  },
  {
    id: 3,
    title: 'What to Expect During Your First Facial',
    category: 'Treatments',
    excerpt:
      'If you\'ve never had a professional facial before, it\'s normal to feel a little unsure of what\'s involved. We walk you through everything from consultation to glow.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: `${BASE}1570172619644-dfd03ed5d881${FIT}`,
    slug: 'what-to-expect-first-facial',
  },
];

export const blogCategories = ['All', 'Tips', 'Aftercare', 'Skincare', 'Treatments'];
