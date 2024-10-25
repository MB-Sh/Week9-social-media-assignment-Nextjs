import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

export default function AboutPage() {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">About Page</h1>

      <p className="text-lg">
        Welcome to our blog! We aim to provide insightful content on a variety of topics.
      </p>

      
      <Popover>
        <PopoverTrigger asChild>
          
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            More about us
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-white p-4 rounded-md shadow-lg border border-gray-200 max-w-sm"
          align="center"
        >
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-sm mt-2">
            We strive to deliver high-quality content to inspire, educate, and inform our readers.
            Whether  technology, lifestyle, or personal development, we are here to share what matters most.
          </p>
          <a
            href="/our-story"
            className="text-blue-500 mt-4 inline-block hover:underline"
          >
            Learn more about our story
          </a>
        </PopoverContent>
      </Popover>
    </>
  );
}
