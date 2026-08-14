export interface Product {
  name: string;
  price: string;
  image: string;
}

export interface Category {
  id: string;
  image: string;
  name: string;
  desc: string;
  tag: string;
  items: Product[];
}

export const categories: Category[] = [
  {
    id: "eastern",
    image: "/images/cat_eastern.jpg",
    name: "الحلويات الشرقية",
    desc: "أشهى حلويات المنطقة بوصفات أصيلة ومكونات طبيعية",
    tag: "الأكثر طلباً",
    items: [
      { name: "كنافة سادة", price: "حسب الطلب", image: "/images/p_kunafa_plain.jpg" },
      { name: "كنافة قشطة", price: "حسب الطلب", image: "/images/p_kunafa_cream.jpg" },
      { name: "بسبوسة سادة", price: "حسب الطلب", image: "/images/p_basbousa_plain.jpg" },
      { name: "بسبوسة نوتيلا", price: "حسب الطلب", image: "/images/p_basbousa_nutella.jpg" },
      { name: "بسبوسة مكسرات", price: "حسب الطلب", image: "/images/p_basbousa_nuts.jpg" },
      { name: "عش البلبل", price: "حسب الطلب", image: "/images/p_osh_albulbul.jpg" },
      { name: "بقلاوة", price: "حسب الطلب", image: "/images/p_baklava.jpg" },
      { name: "بلح الشام", price: "حسب الطلب", image: "/images/p_balah_alsham.jpg" },
    ],
  },
  {
    id: "western",
    image: "/images/cat_western.jpg",
    name: "الحلويات الغربية",
    desc: "تشكيلة راقية من الحلويات الأوروبية بأفضل الخامات",
    tag: "جديد",
    items: [
      { name: "التورت بمختلف المقاسات", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تشيز كيك", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "كاب كيك", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80" },
      { name: "انجليش كيك", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80" },
      { name: "كيكة الشوكولا", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "جانو", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80" },
      { name: "كوكيز", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80" },
    ],
  },
  {
    id: "bakery",
    image: "/images/cat_bakery.jpg",
    name: "المخبوزات",
    desc: "تُخبز يومياً بأيدٍ ماهرة وتُقدَّم دافئة على طاولتكم",
    tag: "طازج يومياً",
    items: [
      { name: "خبز التورتيلا", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80" },
      { name: "خبز الشوفان", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
      { name: "خبز التوست الأبيض والبر", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80" },
      { name: "خبز لبناني أبيض", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
      { name: "خبز لبناني أسمر", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
      { name: "الخبز المصري", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80" },
      { name: "كرواسان سادة جبن نوتيلا", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80" },
      { name: "بوف وبريت محشي", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1555507036-ab1f40221114?w=500&q=80" },
      { name: "عيش البرجر", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&q=80" },
    ],
  },
  {
    id: "tortes",
    image: "/images/cat_tarts.jpg", // Keeping this image temporarily or we can change it to a cake image
    name: "قسم التُرت",
    desc: "تشكيلة فاخرة من التُرت (الكيكات) بمختلف النكهات والمقاسات للمناسبات السعيدة",
    tag: "مميّز",
    items: [
      { name: "تُرتة فواكه", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تُرتة شوكولاتة", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تُرتة بلاك فورست", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تُرتة فانيليا وفراولة", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تُرتة ريد فيلفيت", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
      { name: "تُرتة مناسبات كبيرة", price: "حسب الطلب", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
