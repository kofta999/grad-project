"use client";
import {
  GraduationCap,
  Users,
  BookOpen,
  FlaskConical,
  Award,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50">
      <section
        className="relative h-96  flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26, 62, 114, 0.8), rgba(26, 62, 114, 0.6)), url('/-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">كلية الهندسة - جامعة قناة السويس</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            رؤية مستقبلية لتعليم هندسي متميز وإعداد كوادر قادرة على المنافسة عالميًا
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <Image
                src="/_.jpg"
                alt="مبنى كلية الهندسة"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">نبذة عن الكلية</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  تأسست كلية الهندسة بجامعة قناة السويس عام 1976 لتكون صرحًا أكاديميًا متميزًا في
                  مجال التعليم الهندسي والبحث العلمي.
                </p>
                <p>
                  تقدم الكلية برامج دراسية متنوعة تواكب احتياجات سوق العمل المحلي والدولي، مع
                  التركيز على الجانب التطبيقي والعملي.
                </p>
                <p>
                  تسعى الكلية إلى إعداد مهندسين مؤهلين علميًا ومهاريًا، قادرين على المساهمة في
                  التنمية المستدامة ومواكبة التطورات التكنولوجية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">رؤيتنا ورسالتنا</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <BookOpen className="text-blue-600 ml-2" size={24} />
                <h3 className="text-2xl font-bold text-blue-600">الرؤية</h3>
              </div>
              <p className="text-gray-700">
                أن تكون كلية الهندسة بجامعة قناة السويس رائدة في مجال التعليم الهندسي والبحث العلمي
                على المستويين المحلي والإقليمي، مع التركيز على الابتكار وخدمة المجتمع.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <FlaskConical className="text-blue-600 ml-2" size={24} />
                <h3 className="text-2xl font-bold text-blue-600">الرسالة</h3>
              </div>
              <p className="text-gray-700">
                إعداد مهندسين متميزين علميًا ومهاريًا، قادرين على المنافسة في سوق العمل، وتقديم بحوث
                علمية تطبيقية تساهم في حل مشكلات المجتمع، وتعزيز الشراكة مع المؤسسات الصناعية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">الأقسام العلمية</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "الهندسة المعمارية",
                icon: <GraduationCap className="text-blue-600" size={32} />,
              },
              {
                name: "الهندسة المدنية",
                icon: <GraduationCap className="text-blue-600" size={32} />,
              },
              {
                name: "الهندسة الميكانيكية",
                icon: <GraduationCap className="text-blue-600" size={32} />,
              },
              {
                name: "الهندسة الكهربائية",
                icon: <GraduationCap className="text-blue-600" size={32} />,
              },
            ].map((dept, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-white p-3 rounded-full ml-4">{dept.icon}</div>
                  <h3 className="text-xl font-bold text-blue-600">{dept.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">إحصائيات الكلية</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: 45,
                label: "عامًا من التميز",
                icon: <Award className="text-yellow-400" size={32} />,
              },
              {
                value: 5000,
                label: "طالب وطالبة",
                icon: <Users className="text-yellow-400" size={32} />,
              },
              {
                value: 250,
                label: "عضو هيئة تدريس",
                icon: <GraduationCap className="text-yellow-400" size={32} />,
              },
              {
                value: 12,
                label: "برنامج دراسي",
                icon: <BookOpen className="text-yellow-400" size={32} />,
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-700 p-4 rounded-full inline-block mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold mb-2 text-yellow-400">{stat.value}+</h3>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/4">
                <Image
                  src="/19_2024-638652350384119601-411 (1).jpeg"
                  alt="عميد الكلية"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">
                  كلمة السيد الأستاذ الدكتور عميد الكلية
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    يسعدني أن أرحب بكم في الموقع الإلكتروني لكلية الهندسة بجامعة قناة السويس، التي
                    تعد من أعرق الكليات الهندسية في مصر.
                  </p>
                  <p>
                    نحرص في كليتنا على تقديم تعليم هندسي متميز يجمع بين الأصالة والمعاصرة، مع
                    التركيز على الجوانب التطبيقية والمهارات العملية التي يحتاجها سوق العمل.
                  </p>
                  <p>
                    نسعى دائمًا لتطوير برامجنا الدراسية وتحديث معاملنا وورشنا لتواكب أحدث التطورات
                    التكنولوجية، وإعداد خريجين قادرين على المنافسة محليًا ودوليًا.
                  </p>
                </div>
                <p className="mt-6 font-bold text-blue-600">الأستاذ الدكتور/ عميد الكلية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الشهادات محتاج صور  */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
            شهادات الاعتماد والجودة
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "اعتماد الهيئة القومية لضمان جودة التعليم", image: "/naqaae.jpg" },
              { name: "شهادة الاعتماد الدولي ABET", image: "/abet.jpg" },
              { name: "شهادة ISO 9001", image: "/iso-9001.png" },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 relative mb-4">
                  <Image src={cert.image} alt={cert.name} fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold text-center text-blue-600">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">الموقع الجغرافي</h2>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2 h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.4762484144694!2d32.27191768508675!3d30.62053298167642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8597f201556e7%3A0x9bd6053867337ff3!2z2KzYp9mF2LnYqSDZgtmG2KfYqSDYp9mE2LPZiNmK2LM!5e0!3m2!1sar!2seg!4v1566385701025!5m2!1sar!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="موقع كلية الهندسة - جامعة قناة السويس"
                className="rounded-xl"
              />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-6 text-right">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  كلية الهندسة - جامعة قناة السويس
                </h3>

                <div className="flex flex-row items-center gap-3 ">
                  <MapPin className="text-blue-600 flex-shrink-0" size={24} />
                  <p className="text-gray-700">الإسماعيلية، مصر</p>
                </div>

                <div className="flex flex-row items-center gap-3">
                  <Phone className="text-blue-600 flex-shrink-0" size={24} />
                  <p className="text-gray-700">32001258 – 3223007 (2064+)</p>
                </div>

                <div className="flex flex-row items-center gap-3">
                  <Mail className="text-blue-600 flex-shrink-0" size={24} />
                  <p className="text-gray-700">itunit@eng.suez.edu.eg</p>
                </div>

                <div className="pt-4">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">مواعيد العمل</h4>
                  <p className="text-gray-700">من الأحد إلى الخميس: 8:30 صباحاً - 4:30 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
