import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
}

export default function NewsSection() {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "برنامج لوريال من اجل المرأة في العلم برنامج مصر للباحثات الصاعدات",
      date: "2025-03-09",
      description:
        "شركة لوريـال تعتزم منحـة سنوية بالاشتراك مع منظمة اليونسكو من خلال برنامج “من أجل المرأة في العلم”",
      imageUrl: "/women-in-science-logo.png",
      category: "أخبار الكلية",
      link: "https://eng.suez.edu.eg/?p=9143",
    },
    {
      id: "2",
      title: "معرض Egypt Energy - الحدث الأبرز للطاقة في شمال افريقيا",
      date: "2025-02-09",
      description:
        "نضموا إلينا في معرض Egypt Energy، الحدث الأكبر والأهم للطاقة في شمال إفريقيا، والذي يمتد لأكثر من 33 عامًا من النجاح والريادة في المنطقة.",
      imageUrl: "/Screenshot-from-2025-02-09-10-28-57-768x418.png",
      category: "أخبار الكلية",
      link: "https://eng.suez.edu.eg/?p=8872",
    },
    {
      id: "3",
      title: "برنامج دعم مشروعات التخرج",
      date: "2025-2-6",
      description:
        "أعلنت هيئة تنمية صناعة تكنولوجيا المعلومات (إيتيدا) عن إطلاق الدورة العشرين من برنامج دعم مشروعات التخرج لطلاب الجامعات، ضمن مبادرة دعم التعاون بين الشركات والجهات البحثية.",
      imageUrl: "/475524247.jpg",
      category: "برنامج دعم مشروعات التخرج",
      link: "https://eng.suez.edu.eg/?p=8689",
    },
  ];

  return (
    <section id="news-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">أحدث الأخبار والفعاليات</h2>
          <Link
            href="https://eng.suez.edu.eg/"
            target="_blank"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            عرض جميع الأخبار
            <ArrowLeft className="mr-2" size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {news.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-3">
                  <CalendarDays className="ml-1" size={16} />
                  <span className="text-sm ml-2">
                    {new Date(news.date).toLocaleDateString("ar-EG")}
                  </span>
                  {news.time && (
                    <>
                      <Clock className="ml-3" size={16} />
                      <span className="text-sm ml-2">{news.time}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                  <Link href={news.link}>{news.title}</Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">{news.description}</p>

                <Link
                  href={news.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  target="_blank"
                >
                  اقرأ المزيد
                  <ArrowLeft className="mr-1" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
