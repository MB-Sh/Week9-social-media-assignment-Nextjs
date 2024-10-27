"use client"; 
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/post'); 
  };

  return (
    <button
      onClick={handleBackClick}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
    >
      Back to all posts
    </button>
  );
}
