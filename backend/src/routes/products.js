const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'AirPods Pro 2',
    description: 'Active Noise Cancellation and Transparency mode.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1603351154351-5cf99bc5f16d?w=800&q=80',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    description: 'Titanium design. A17 Pro chip. Action button.',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
  },
  {
    id: 3,
    name: 'MacBook Air 15"',
    description: 'Impossibly thin and incredibly fast M2 chip.',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80',
  },
  {
    id: 4,
    name: 'iPad Pro',
    description: 'Supercharged by M2. The ultimate iPad experience.',
    price: 799.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  },
  {
    id: 5,
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch.',
    price: 799.00,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
  },
];

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json(products);
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
