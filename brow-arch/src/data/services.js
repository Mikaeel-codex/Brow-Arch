export const services = [
  // Face Wax
  { id: 1,  name: 'Brow',               category: 'Face Wax',     price: 100,  duration: 15 },
  { id: 2,  name: 'Lip',                category: 'Face Wax',     price: 70,   duration: 10 },
  { id: 3,  name: 'Chin',               category: 'Face Wax',     price: 70,   duration: 10 },
  { id: 4,  name: 'Neck',               category: 'Face Wax',     price: 80,   duration: 10 },
  { id: 5,  name: 'Ear Wax',            category: 'Face Wax',     price: 80,   duration: 10 },
  { id: 6,  name: 'Nose',               category: 'Face Wax',     price: 80,   duration: 10 },
  { id: 7,  name: 'Sides',              category: 'Face Wax',     price: 80,   duration: 10 },
  { id: 8,  name: 'Full Face',          category: 'Face Wax',     price: 250,  duration: 30 },
  { id: 9,  name: 'Eye Brow + Tint',    category: 'Face Wax',     price: 170,  duration: 20 },

  // Legs Wax
  { id: 10, name: 'Full',               category: 'Legs Wax',     price: 250,  duration: 45 },
  { id: 11, name: 'Three Quarter',      category: 'Legs Wax',     price: 210,  duration: 35 },
  { id: 12, name: 'Half Legs',          category: 'Legs Wax',     price: 160,  duration: 25 },

  // Arms Wax
  { id: 13, name: 'Full Arms',          category: 'Arms Wax',     price: 200,  duration: 30 },
  { id: 14, name: 'Half Arms',          category: 'Arms Wax',     price: 150,  duration: 20 },
  { id: 15, name: 'Under Arms',         category: 'Arms Wax',     price: 120,  duration: 15 },

  // Intimate Wax
  { id: 16, name: 'Bikini',             category: 'Intimate Wax', price: 200,  duration: 20 },
  { id: 17, name: 'Brazillian',         category: 'Intimate Wax', price: 220,  duration: 25 },
  { id: 18, name: 'Hollywood',          category: 'Intimate Wax', price: 250,  duration: 30 },

  // Body Wax
  { id: 19, name: 'Chest',              category: 'Body Wax',     price: 130,  duration: 20 },
  { id: 20, name: 'Back',               category: 'Body Wax',     price: 170,  duration: 25 },
  { id: 21, name: 'Bum',                category: 'Body Wax',     price: 100,  duration: 15 },
  { id: 22, name: 'Tummy',              category: 'Body Wax',     price: 130,  duration: 20 },
  { id: 23, name: 'Shoulders',          category: 'Body Wax',     price: 100,  duration: 15 },
  { id: 24, name: 'Full Body',          category: 'Body Wax',     price: 1100, duration: 120 },

  // Threading
  { id: 25, name: 'Brow',                   category: 'Threading', price: 80,  duration: 15 },
  { id: 26, name: 'Lip',                    category: 'Threading', price: 70,  duration: 10 },
  { id: 27, name: 'Chin',                   category: 'Threading', price: 70,  duration: 10 },
  { id: 28, name: 'Neck',                   category: 'Threading', price: 80,  duration: 10 },
  { id: 29, name: 'Nose',                   category: 'Threading', price: 70,  duration: 10 },
  { id: 30, name: 'Sides',                  category: 'Threading', price: 80,  duration: 10 },
  { id: 31, name: 'Full Face with Brow',    category: 'Threading', price: 250, duration: 30 },
  { id: 32, name: 'Full Face without Brow', category: 'Threading', price: 200, duration: 25 },

  // Tinting
  { id: 33, name: 'Brow Tint',          category: 'Tinting',      price: 80,   duration: 15 },
  { id: 34, name: 'Lash Tint',          category: 'Tinting',      price: 80,   duration: 15 },
  { id: 35, name: 'Eye Brow + Tint',    category: 'Tinting',      price: 150,  duration: 25 },

  // Lash Lift
  { id: 41, name: 'Lash Lift',          category: 'Lash Lift',    price: 350,  duration: 60 },
  { id: 42, name: 'Lash Lift & Tint',   category: 'Lash Lift',    price: 400,  duration: 75 },

  // Combo Deals
  { id: 43, name: 'Brow Shape & Tint',          category: 'Combo Deals', price: 150,  duration: 30  },
  { id: 44, name: 'Lash Lift & Brow Tint',       category: 'Combo Deals', price: 420,  duration: 75  },
  { id: 45, name: 'Full Face Wax & Threading',   category: 'Combo Deals', price: 350,  duration: 45  },
  { id: 46, name: 'Facial & Lash Tint',          category: 'Combo Deals', price: 450,  duration: 75  },
  { id: 47, name: 'Brow Tint & Lash Tint',       category: 'Combo Deals', price: 140,  duration: 25  },

  // Facials
  { id: 36, name: 'Deep Cleanse Facial',  category: 'Facials', price: 400, duration: 60 },
  { id: 37, name: 'Acne Facial',          category: 'Facials', price: 400, duration: 60 },
  { id: 38, name: 'Hydration Facial',     category: 'Facials', price: 400, duration: 60 },
  { id: 39, name: 'Instant Glow Facial',  category: 'Facials', price: 400, duration: 60 },
  { id: 40, name: 'Anti-Aging Facial',    category: 'Facials', price: 400, duration: 60 },
];

export const categoryNotes = {
  Facials: 'All facials include steam, cleanse, exfoliation, extraction, face massage & special mask.',
};

export const categories = [
  'Face Wax',
  'Legs Wax',
  'Arms Wax',
  'Intimate Wax',
  'Body Wax',
  'Threading',
  'Tinting',
  'Facials',
  'Lash Lift',
  'Combo Deals',
];
