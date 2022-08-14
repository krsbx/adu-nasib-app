import { Stack, Textarea } from '@chakra-ui/react';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { PLACEHOLDER } from '../../../utils/constant';
import { commentTheme } from '../../../utils/theme';

const CommentPlaceholder = ({ onFocus }: Props) => {
  const { cardBgColor } = useCardColorMode();

  const onClick = () => onFocus?.();

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1}>
      <Textarea
        placeholder={PLACEHOLDER.COMMENT}
        fontWeight={'semibold'}
        onClick={onClick}
        variant="filled"
      />
    </Stack>
  );
};

type Props = {
  onFocus?: () => void;
};

export default CommentPlaceholder;
