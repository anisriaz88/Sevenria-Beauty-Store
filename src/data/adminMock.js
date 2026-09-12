export const ADMIN_STATS = {
  totalRevenueAED: 184520,
  monthlyGrowthPercent: 18.4,
  totalOrders: 1429,
  orderGrowthPercent: 12.6,
  totalProducts: 37,
  activeCustomers: 3240,
  averageOrderValueAED: 268,
  lowStockCount: 4,
  pendingOrdersCount: 7
};

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 14200, orders: 110 },
  { month: 'Feb', revenue: 16800, orders: 135 },
  { month: 'Mar', revenue: 19400, orders: 152 },
  { month: 'Apr', revenue: 22100, orders: 180 },
  { month: 'May', revenue: 24500, orders: 194 },
  { month: 'Jun', revenue: 27900, orders: 218 },
  { month: 'Jul', revenue: 26400, orders: 205 },
  { month: 'Aug', revenue: 31200, orders: 242 },
  { month: 'Sep', revenue: 34500, orders: 270 }
];

export const INITIAL_ORDERS = [
  {
    id: 'SB-UAE-9281',
    customerName: 'Sheikha Al-Suwaidi',
    customerEmail: 's.alsuwaidi@gmail.com',
    customerPhone: '+971 50 829 1142',
    date: 'Today, 2:40 PM',
    emirate: 'Dubai',
    area: 'Downtown Dubai',
    address: 'Burj Crown Tower, Apt 1402',
    items: [
      { title: 'Sevenria Royal Amber & Cashmere Oud EDP', quantity: 1, priceAED: 345 },
      { title: 'COSRX Advanced Snail 96 Mucin Power Essence', quantity: 2, priceAED: 78 }
    ],
    itemsCount: 3,
    totalAED: 501,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    trackingNumber: 'SE-DXB-928104'
  },
  {
    id: 'SB-UAE-9280',
    customerName: 'Zayed Al-Nahyan',
    customerEmail: 'zayed.n@outlook.com',
    customerPhone: '+971 52 441 9081',
    date: 'Today, 1:15 PM',
    emirate: 'Abu Dhabi',
    area: 'Saadiyat Island',
    address: 'Saadiyat Beach Villas, Villa 42',
    items: [
      { title: 'Shiseido Fino Premium Touch Hair Mask', quantity: 2, priceAED: 69 },
      { title: 'Anua Heartleaf 77% Soothing Toner', quantity: 1, priceAED: 89 }
    ],
    itemsCount: 3,
    totalAED: 227,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Processing',
    trackingNumber: 'SE-AUH-928012'
  },
  {
    id: 'SB-UAE-9279',
    customerName: 'Nour El-Sherif',
    customerEmail: 'nour.elsherif@gmail.com',
    customerPhone: '+971 55 198 2234',
    date: 'Yesterday, 6:20 PM',
    emirate: 'Dubai',
    area: 'Dubai Marina',
    address: 'Marina Gate 2, Apt 2804',
    items: [
      { title: 'Medicube Zero Pore Pad 2.0', quantity: 1, priceAED: 105 },
      { title: 'Arencia Fresh Green Rice Cake Cleanser', quantity: 1, priceAED: 110 }
    ],
    itemsCount: 2,
    totalAED: 215,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Shipped',
    trackingNumber: 'SE-DXB-927989'
  },
  {
    id: 'SB-UAE-9278',
    customerName: 'Chloe Henderson',
    customerEmail: 'chloe.h@hotmail.com',
    customerPhone: '+971 58 772 3190',
    date: 'Yesterday, 3:10 PM',
    emirate: 'Dubai',
    area: 'Palm Jumeirah',
    address: 'Shoreline 8, Apt 503',
    items: [
      { title: 'Camille Rose Curl Love Moisture Milk', quantity: 1, priceAED: 79 },
      { title: 'Skala Expert Divino Potão 1000g', quantity: 1, priceAED: 49 }
    ],
    itemsCount: 2,
    totalAED: 128,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'SE-DXB-927821'
  },
  {
    id: 'SB-UAE-9277',
    customerName: 'Mariam Al-Kaabi',
    customerEmail: 'm.alkaabi@gmail.com',
    customerPhone: '+971 50 632 8812',
    date: '2 days ago',
    emirate: 'Sharjah',
    area: 'Al Majaz',
    address: 'Corniche Tower 3, Apt 1101',
    items: [
      { title: 'La Roche-Posay Anthelios UVMune 400 SPF50+', quantity: 2, priceAED: 98 }
    ],
    itemsCount: 2,
    totalAED: 196,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'SE-SHJ-927710'
  },
  {
    id: 'SB-UAE-9276',
    customerName: 'Hamad Al-Marri',
    customerEmail: 'h.almarri@yahoo.com',
    customerPhone: '+971 56 312 9044',
    date: '3 days ago',
    emirate: 'Dubai',
    area: 'Jumeirah 2',
    address: 'Street 14B, Villa 18',
    items: [
      { title: 'Sevenria Rose Damascena Hair Mist', quantity: 1, priceAED: 185 },
      { title: 'CeraVe Moisturizing Cream Tub 454g', quantity: 1, priceAED: 85 }
    ],
    itemsCount: 2,
    totalAED: 270,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'SE-DXB-927643'
  },
  {
    id: 'SB-UAE-9275',
    customerName: 'Tariq Mansour',
    customerEmail: 'tariq.m@gmail.com',
    customerPhone: '+971 52 901 8872',
    date: '4 days ago',
    emirate: 'Ras Al Khaimah',
    area: 'Al Hamra Village',
    address: 'Royal Breeze 1, Apt 410',
    items: [
      { title: 'Aromatica Rosemary Root Enhancer', quantity: 1, priceAED: 72 }
    ],
    itemsCount: 1,
    totalAED: 72,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Cancelled',
    status: 'Cancelled',
    trackingNumber: 'SE-RAK-927501'
  }
];
