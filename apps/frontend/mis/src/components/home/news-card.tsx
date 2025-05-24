import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
}

export default function NewsCard({
  id,
  title,
  date,
  time,
  description,
  imageUrl,
  category,
  link,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-gray-500 mb-3">
          <CalendarDays className="ml-1" size={16} />
          <span className="text-sm ml-2">{new Date(date).toLocaleDateString("ar-EG")}</span>
          {time && (
            <>
              <Clock className="ml-3" size={16} />
              <span className="text-sm ml-2">{time}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
          <Link href={link}>{title}</Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{description}</p>

        <Link
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-auto"
        >
          اقرأ المزيد
          <ArrowLeft className="mr-1" size={16} />
        </Link>
      </div>
    </div>
  );
}
