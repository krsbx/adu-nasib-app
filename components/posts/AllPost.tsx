import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import _ from 'lodash';
import NextLink from 'next/link';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getResources } from '../../store/selector/resources';
import { RESOURCE_NAME } from '../../utils/constant';
import { ThreadsCard } from '../general';

const AllPost = ({ posts }: Props) => {
  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
      {_.map(posts.rows, (post) => (
        <NextLink href={`/post/${post.id}`} passHref key={post.id}>
          <ChakraLink
            _hover={{
              textDecoration: 'none',
            }}
          >
            <ThreadsCard post={post} />
          </ChakraLink>
        </NextLink>
      ))}
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  posts: getResources(RESOURCE_NAME.POST)(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(AllPost);
