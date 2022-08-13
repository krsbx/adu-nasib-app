import { Box, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useBlockquoteMdColor from '../../../hooks/useBlockquoteMdColor';

const Preview = ({ value, theme }: Props) => {
  const { blockQuoteBg, blockQuoteBorderColor, blockQuoteColor } = useBlockquoteMdColor();

  return (
    <ReactMarkdown
      components={ChakraUIRenderer({
        blockquote: ({ children }) => (
          <Box py={1} pl={2} bg={blockQuoteBg} color={blockQuoteColor} borderRadius={'md'} my={2}>
            <Box pl={2} borderLeftColor={blockQuoteBorderColor} borderLeftWidth={5}>
              {children}
            </Box>
          </Box>
        ),
        code: ({ children }) => (
          <Box px={2} py={2} bg={blockQuoteBg} color={blockQuoteColor} borderRadius={'md'} my={2}>
            {children}
          </Box>
        ),
        p: ({ children, ...props }) => (
          <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'} {...props}>
            {children}
          </Text>
        ),
        ...theme,
      })}
      remarkPlugins={[remarkGfm]}
      skipHtml
    >
      {value}
    </ReactMarkdown>
  );
};

type Props = {
  value: string;
  theme?: Components;
};

export default Preview;
