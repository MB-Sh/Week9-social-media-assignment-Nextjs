import Image from "next/image";

export const metadata = {
  title: "Home page",
  description: "This social media app where people write blogs and share.",
};

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
     
      <Image src={'https://cdn.pixabay.com/photo/2016/01/09/18/28/notepad-1130743_640.jpg'} alt="Writer tools" className="rounded-lg" width={640} height={427} />
      <p className="text-gray-600 mt-4">Welcome to our blog! Explore our posts and enjoy the content.</p>
    </div>
  );
}
