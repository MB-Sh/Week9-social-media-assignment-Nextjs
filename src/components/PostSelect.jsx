// app/components/PostSelect.js
"use client"; // This needs to be a client component
import * as Select from "@radix-ui/react-select"; // Import Radix Select
import { useRouter } from "next/navigation"; // Import useRouter to navigate programmatically

const PostSelect = ({ posts }) => {
  const router = useRouter();

  const handleSelectChange = (value) => {
    router.push(`/post/${value}`); // Redirect to the selected post
  };

  return (
    <Select.Root onValueChange={handleSelectChange}>
      <Select.Trigger className="bg-gray-200 border border-gray-400 rounded-md px-4 py-2">
        <Select.Value placeholder="Select a post title" />
        <Select.Icon>
          <svg width="10" height="10" fill="currentColor">
            <path d="M0 0h10L5 10 0 0z" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-200">
            ↑
          </Select.ScrollUpButton>
          <Select.Viewport>
            {posts.map((post) => (
              <Select.Item key={post.id} value={post.id} className="select-item">
                <Select.ItemText>{post.title}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-200">
            ↓
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default PostSelect;
