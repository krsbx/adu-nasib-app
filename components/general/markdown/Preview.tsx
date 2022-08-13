import { Box, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import useBlockquoteMdColor from '../../../hooks/useBlockquoteMdColor';

const Preview = ({ value, theme }: Props) => {
  const { blockQuoteBg, blockQuoteBorderColor, blockQuoteColor } = useBlockquoteMdColor();

  return (
    <Box minH={'250px'}>
      <ReactMarkdown
        components={ChakraUIRenderer({
          blockquote: ({ children }) => (
            <Box py={1} pl={2} bg={blockQuoteBg} color={blockQuoteColor} borderRadius={'md'} my={2}>
              <Box pl={2} borderLeftColor={blockQuoteBorderColor} borderLeftWidth={5}>
                {children}
              </Box>
            </Box>
          ),
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={coldarkDark as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <Box
                px={2}
                py={2}
                bg={blockQuoteBg}
                color={blockQuoteColor}
                borderRadius={'md'}
                my={2}
                {...props}
              >
                {children}
              </Box>
            );
          },
          p: ({ children, ...props }) => (
            <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'} {...props}>
              {children}
            </Text>
          ),
          ...theme,
        })}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        skipHtml
      >
        {value}
      </ReactMarkdown>
    </Box>
  );
};

type Props = {
  value: string;
  theme?: Components;
};

export default Preview;
