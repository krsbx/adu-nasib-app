import { Stack, Textarea } from '@chakra-ui/react';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { commentTheme } from '../../../utils/theme';

const FieldPlaceholder = ({ onClick, placeholder }: Props) => {
  const { cardBgColor } = useCardColorMode();

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1}>
      <Textarea
        placeholder={placeholder}
        fontWeight={'semibold'}
        onClick={onClick}
        variant="filled"
      />
    </Stack>
  );
};

type Props = {
  onClick: () => void;
  placeholder: string;
};

export default FieldPlaceholder;
