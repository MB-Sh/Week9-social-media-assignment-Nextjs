import Image from 'next/image';
import Link from 'next/link';

export default function Post({ post }) {
  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-50'>
      {/* Link to the user's profile */}
      <Link href={`/users/${post?.username}`}>
        <Image
          src={post?.profile_image_url}
          alt='user-img'
          className='h-11 w-11 rounded-full mr-4'
        />
      </Link>

      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.username}
            </h4>
         
            <span className='text-xs truncate max-w-32'>
              @{post?.username}
            </span>
            <span className='text-xl text-gray-500'>·</span>
           
            <span className='text-xs text-gray-500 flex-1 truncate max-w-32'>
              {new Date(post?.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

       
        <Link href={`/posts/${post?.id}`}>
          <h5 className='font-semibold text-gray-900 text-sm my-1'>
            {post?.title}
          </h5>
          <p className='text-gray-800 text-sm my-2 w-full'>{post?.content}</p>
        </Link>

        {/* Post image, if present */}
        {post?.image_url && (
          <Link href={`/posts/${post?.id}`}>
            <Image src={post?.image_url} alt='post image' className='rounded-2xl mr-2' />
          </Link>
        )}
      </div>
    </div>
  );
}
