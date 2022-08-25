import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import Post from './Post';

const PostLink = ({ post }: Props) => {
  return (
    <NextLink href={`/post/${post.id}`} passHref>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Post post={post} />
      </ChakraLink>
    </NextLink>
  );
};

type Props = {
  post: ResourceMap[typeof RESOURCE_NAME.POST];
};

export default PostLink;
