import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import { addData as _addData } from '../../../store/actions/resources';
import { EDITOR_COMMANDS } from '../markdown/command';

const CommentField = ({ addData }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;

  return (
    <Box
      backgroundColor="gray.700"
      width={{ base: 'sm', md: 'md' }}
      p={3}
      borderRadius={'md'}
      gap={3}
      boxShadow={'md'}
      overflow={'hidden'}
      transition="all 0.3s ease-in-out"
      minWidth={'100%'}
      minHeight={'75px'}
    >
      <Markdown.Editor
        commandName={Object.values(EDITOR_COMMANDS)}
        name={'content'}
        variant="filled"
        fontWeight={'semibold'}
        placeholder="Lu mah mending lah gw..."
        minH={'175px'}
      />
    </Box>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CommentField);
