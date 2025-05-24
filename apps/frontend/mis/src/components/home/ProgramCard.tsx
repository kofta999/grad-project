import Link from 'next/link';
import Image from 'next/image';

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProgramCard({ title, description, image, link }: ProgramCardProps) {
  return (
    <div className="h-full flex flex-col transition-transform hover:-translate-y-2 shadow-md hover:shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex-grow p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          اكتشف المزيد
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}