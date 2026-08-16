const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting DB seed...");

  // 1. Seed Categories
  const categoriesData = [
    {
      name: "الحلويات الشرقية",
      nameEn: "Oriental Sweets",
      description: "أشهى حلويات المنطقة بوصفات أصيلة ومكونات طبيعية",
      descriptionEn: "Delicious regional sweets with authentic recipes and natural ingredients",
      tag: "الأكثر طلباً",
      tagEn: "Best Seller",
      image: "/images/cat_eastern.jpg",
    },
    {
      name: "الحلويات الغربية",
      nameEn: "Western Sweets",
      description: "تشكيلة راقية من الحلويات الأوروبية بأفضل الخامات",
      descriptionEn: "A fine selection of European sweets with the best ingredients",
      tag: "جديد",
      tagEn: "New",
      image: "/images/cat_western.jpg",
    },
    {
      name: "المخبوزات",
      nameEn: "Bakery",
      description: "تُخبز يومياً بأيدٍ ماهرة وتُقدَّم دافئة على طاولتكم",
      descriptionEn: "Baked daily by skilled hands and served warm on your table",
      tag: "طازج يومياً",
      tagEn: "Fresh Daily",
      image: "/images/cat_bakery.jpg",
    },
    {
      name: "قسم التُرت",
      nameEn: "Cakes Section",
      description: "تشكيلة فاخرة من التُرت (الكيكات) بمختلف النكهات والمقاسات للمناسبات السعيدة",
      descriptionEn: "A luxurious selection of cakes in various flavors and sizes for happy occasions",
      tag: "مميّز",
      tagEn: "Special",
      image: "/images/cat_tarts.jpg",
    }
  ];

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({ data: cat });
    console.log(`Created category: ${createdCat.name}`);

    // Seed Products for this category
    let products = [];
    if (cat.name === "الحلويات الشرقية") {
      products = [
        { name: "كنافة سادة", nameEn: "Plain Kunafa", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_kunafa_plain.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "كنافة قشطة", nameEn: "Cream Kunafa", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_kunafa_cream.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "بسبوسة سادة", nameEn: "Plain Basbousa", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_basbousa_plain.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "بسبوسة نوتيلا", nameEn: "Nutella Basbousa", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_basbousa_nutella.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "بسبوسة مكسرات", nameEn: "Nuts Basbousa", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_basbousa_nuts.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "عش البلبل", nameEn: "Osh Al-Bulbul", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_osh_albulbul.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "بقلاوة", nameEn: "Baklava", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_baklava.jpg", status: "نشط", categoryId: createdCat.id },
        { name: "بلح الشام", nameEn: "Balah Al-Sham", price: "حسب الطلب", priceEn: "On Demand", image: "/images/p_balah_alsham.jpg", status: "نشط", categoryId: createdCat.id },
      ];
    } else if (cat.name === "الحلويات الغربية") {
      products = [
        { name: "التورت بمختلف المقاسات", nameEn: "Cakes of various sizes", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تشيز كيك", nameEn: "Cheesecake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "كاب كيك", nameEn: "Cupcake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "انجليش كيك", nameEn: "English Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "كيكة الشوكولا", nameEn: "Chocolate Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "جانو", nameEn: "Gato", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "كوكيز", nameEn: "Cookies", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80", status: "نشط", categoryId: createdCat.id },
      ];
    } else if (cat.name === "المخبوزات") {
      products = [
        { name: "خبز التورتيلا", nameEn: "Tortilla Bread", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "خبز الشوفان", nameEn: "Oat Bread", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "خبز التوست الأبيض والبر", nameEn: "White & Brown Toast", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "خبز لبناني أبيض", nameEn: "White Lebanese Bread", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "خبز لبناني أسمر", nameEn: "Brown Lebanese Bread", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "الخبز المصري", nameEn: "Egyptian Bread", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "كرواسان سادة جبن نوتيلا", nameEn: "Croissant (Plain, Cheese, Nutella)", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "بوف وبريت محشي", nameEn: "Stuffed Puff & Pretzel", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "عيش البرجر", nameEn: "Burger Buns", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80", status: "نشط", categoryId: createdCat.id },
      ];
    } else if (cat.name === "قسم التُرت") {
      products = [
        { name: "تُرتة فواكه", nameEn: "Fruit Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تُرتة شوكولاتة", nameEn: "Chocolate Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تُرتة بلاك فورست", nameEn: "Black Forest Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تُرتة فانيليا وفراولة", nameEn: "Vanilla & Strawberry Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تُرتة ريد فيلفيت", nameEn: "Red Velvet Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
        { name: "تُرتة مناسبات كبيرة", nameEn: "Large Occasions Cake", price: "حسب الطلب", priceEn: "On Demand", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", status: "نشط", categoryId: createdCat.id },
      ];
    }

    for (const p of products) {
      await prisma.product.create({ data: p });
    }
  }

  // 2. Seed Offers
  const offersData = [
    { title: "بوكس لمتنا", titleEn: "Family Gathering Box", description: "تشكيلة رائعة من المخبوزات والحلويات تكفي العائلة بخصم خاص ليوم الجمعة.", descriptionEn: "A wonderful selection of baked goods and sweets enough for the family with a special Friday discount.", discount: "خصم 20%", discountEn: "20% OFF", badge: "لفترة محدودة", image: "/images/offer_weekend_box.jpg", status: "نشط" },
    { title: "باقة الأفراح", titleEn: "Wedding Package", description: "بوفيه حلويات متكامل بأسعار تنافسية. يشمل التوصيل والتنسيق المجاني للطلبات الكبيرة.", descriptionEn: "A complete sweets buffet at competitive prices. Includes free delivery and setup for large orders.", discount: "توصيل مجاني", discountEn: "Free Delivery", badge: "جديد", image: "/images/offer_wedding_package.jpg", status: "نشط" },
    { title: "حلى الصباح", titleEn: "Morning Sweets", description: "كوب قهوة مختصة مع قطعة كرواسون سادة أو محشية.", descriptionEn: "A cup of specialty coffee with a plain or stuffed croissant.", discount: "فقط بـ 15 ريال", discountEn: "Only 15 SAR", badge: "يومياً للصّباح", image: "/images/offer_morning_sweets.jpg", status: "نشط" }
  ];
  for (const o of offersData) {
    await prisma.offer.create({ data: o });
  }

  // 3. Seed Services
  const servicesData = [
    { title: "توصيل سريع", titleEn: "Fast Delivery", description: "خدمة توصيل مبردة لضمان وصول الحلويات طازجة.", descriptionEn: "Refrigerated delivery service to ensure sweets arrive fresh.", icon: "local_shipping", status: "نشط" },
    { title: "بوفيهات وحفلات", titleEn: "Buffets and Parties", description: "تجهيز كامل لبوفيهات الحلويات لمناسباتكم الخاصة وتنسيقها بشكل راقي.", descriptionEn: "Complete preparation of sweets buffets for your special occasions elegantly arranged.", icon: "celebration", status: "نشط" },
    { title: "كيك حسب الطلب", titleEn: "Custom Cakes", description: "تصميم كيكات مخصصة لحفلات الزفاف والنجاح بتصاميم فريدة وأحجام مختلفة.", descriptionEn: "Custom-designed cakes for weddings and graduations in unique designs and various sizes.", icon: "cake", status: "نشط" },
    { title: "تغليف هدايا", titleEn: "Gift Wrapping", description: "نقدم خدمة تغليف الحلويات بعلب فاخرة لتقديمها كهدايا مميزة لمن تحب.", descriptionEn: "We offer sweet wrapping services in luxurious boxes for special gifts to your loved ones.", icon: "volunteer_activism", status: "نشط" }
  ];
  for (const s of servicesData) {
    await prisma.service.create({ data: s });
  }

  // 4. Seed Branches
  const branchesData = [
    { name: "فرع الشوقية", nameEn: "Al-Shawqiyah Branch", address: "مكة المكرمة - الشوقية - الشارع العام", addressEn: "Makkah - Al-Shawqiyah - Main Street", phone: "0555555555", hours: "8 صباحاً - 12 منتصف الليل", hoursEn: "8 AM - 12 Midnight", status: "مفتوح" },
    { name: "فرع العزيزية", nameEn: "Al-Aziziyah Branch", address: "مكة المكرمة - العزيزية - بالقرب من الجامعة", addressEn: "Makkah - Al-Aziziyah - Near the University", phone: "0555555556", hours: "9 صباحاً - 11 مساءً", hoursEn: "9 AM - 11 PM", status: "مفتوح" },
    { name: "فرع العوالي", nameEn: "Al-Awali Branch", address: "مكة المكرمة - العوالي - شارع إبراهيم الجفالي", addressEn: "Makkah - Al-Awali - Ibrahim Juffali Street", phone: "0555555557", hours: "10 صباحاً - 11 مساءً", hoursEn: "10 AM - 11 PM", status: "مفتوح" }
  ];
  for (const b of branchesData) {
    await prisma.branch.create({ data: b });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
