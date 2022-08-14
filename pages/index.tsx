import dynamic from 'next/dynamic';

const Posts = dynamic(import('./posts/index'), { ssr: false });

export default Posts;
