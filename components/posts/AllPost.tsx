import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getResources } from '../../store/selector/resources';
import { sortPostComment } from '../../utils/common';
import { RESOURCE_NAME } from '../../utils/constant';
import { Post } from '../general';

const AllPost = ({ posts }: Props) => {
  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={5} gap={5}>
      <Stack spacing={4}>
        {sortPostComment(posts.rows, 'desc').map((post) => (
          <Post.PostLink post={post} key={post.id} />
        ))}
      </Stack>
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  posts: getResources(RESOURCE_NAME.POST)(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(AllPost);
