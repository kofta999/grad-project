import { GraduationCap } from 'lucide-react';
import ProgramCard from './ProgramCard';

export default function ProgramsSection() {
  const programs = [
    {
      id: '1',
      title: 'العمارة والتخطيط العمراني',
      description: 'تصميم الفراغات المعمارية والتخطيط الحضري المستدام، مع التركيز على الهوية المحلية والابتكار',
      image: '/architecture.jpg',
      link: 'https://eng.suez.edu.eg/?page_id=8426',
    },
    {
      id: '2',
      title: 'الهندسة الميكانيكية',
      description: 'تصميم وتحليل وتصنيع وصيانة الأنظمة الميكانيكية والحركية مثل المحركات والآلات.',
      image: '/mechanic.webp',
      link: 'https://eng.suez.edu.eg/?page_id=5443',
    },
    {
      id: '3',
      title: 'الهندسة الكهربائية',
      description: 'دراسة وتطبيق الكهرباء والإلكترونيات والكهرومغناطيسية لتصميم الأنظمة والمعدات الكهربائية.',
      image: '/electric.jpg',
      link: 'https://eng.suez.edu.eg/?page_id=5441',
    },
    {
      id: '4',
      title: 'الهندسة المدنية',
      description: 'تصميم وبناء وصيانة البنية التحتية والمنشآت مثل الطرق والجسور والمباني.',
      image: '/civil.jpg',
      link: 'https://eng.suez.edu.eg/?page_id=5433',
    },
  ];

  return (
    <section id="programs-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
            <GraduationCap className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">البرامج الأكاديمية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف برامجنا الشاملة المصممة لتأهيل مهندسين قادرين على مواكبة متطلبات سوق العمل
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
}