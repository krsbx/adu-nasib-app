import { Box, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useBlockquoteMdColor from '../../../hooks/useBlockquoteMdColor';

const Preview = ({ value }: Props) => {
  const { blockQuoteBg, blockQuoteBorderColor, blockQuoteColor } = useBlockquoteMdColor();

  return (
    <ReactMarkdown
      components={ChakraUIRenderer({
        blockquote: (props) => (
          <Box py={1} pl={2} bg={blockQuoteBg} color={blockQuoteColor}>
            <Box
              pl={2}
              alignItems={'center'}
              borderLeftColor={blockQuoteBorderColor}
              borderLeftWidth={5}
            >
              {props.children}
            </Box>
          </Box>
        ),
        p: ({ children, ...props }) => (
          <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'} {...props}>
            {children}
          </Text>
        ),
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
};

export default Preview;
