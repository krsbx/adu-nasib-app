import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useFieldButtonColorMode from '../../../hooks/useFieldButtonColorMode';
import { addData as _addData } from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import { postSchema } from '../../../utils/schema';
import { commentTheme } from '../../../utils/theme';
import { EDITOR_COMMANDS } from '../markdown/command';

type Schema = Pick<ResourceMap[typeof RESOURCE_NAME.POST], 'content'>;

const PostField = ({ addData }: Props) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(true);
  const [value, setValue] = useState('');

  const containerRef = createRef<HTMLDivElement>();

  const { cardBgColor, cardTextColor } = useCardColorMode();
  const { fieldButtonBgColor, fieldButtonTextColor } = useFieldButtonColorMode();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (values: Schema) => {
    const { id } = (await addData(
      RESOURCE_NAME.POST,
      values
    )) as ResourceMap[typeof RESOURCE_NAME.POST];

    reset({
      content: '',
    });

    router.push(`/post/${id}`);
  };

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1} ref={containerRef}>
      <Stack direction="row">
        <Button
          variant={'ghost'}
          px={2}
          w={'75px'}
          {...(isEdit && {
            backgroundColor: fieldButtonBgColor,
            color: fieldButtonTextColor,
          })}
          transition={'all 0.3s ease-in-out'}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </Button>
        <Button
          variant={'ghost'}
          px={2}
          w={'75px'}
          {...(!isEdit && {
            backgroundColor: fieldButtonBgColor,
            color: fieldButtonTextColor,
          })}
          transition={'all 0.3s ease-in-out'}
          onClick={() => setIsEdit(false)}
        >
          Preview
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {isEdit ? (
            <Markdown.Editor
              {...register('content')}
              commandName={_.values(_.omit(EDITOR_COMMANDS, ['CODE']))}
              variant="filled"
              fontWeight={'semibold'}
              placeholder={PLACEHOLDER.POST}
              minH={'175px'}
              stackProps={{
                color: cardTextColor,
                backgroundColor: cardBgColor,
              }}
              value={value}
              setValue={setValue}
            />
          ) : (
            <Markdown.Preview value={value} />
          )}
          <Button disabled={isSubmitting} isLoading={isSubmitting} type={'submit'}>
            Adu Nasib!
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostField);
