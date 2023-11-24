interface MessageFormaterProps {
  text: string;
}
type Type = 'text' | 'code' | 'bold' | 'break' | 'tab';
interface Token {
  type: Type;
  content: string;
}

const MessageFormatter = ({ text }: MessageFormaterProps) => {
  const replaceBreaks = (str: string) => str.replace(/\n/g, '    ');
  // A simple regex-based parser function to identify **bold** and ```code``` patterns
  const parseText = (inputText: string) => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const codePattern = /\`\`\`(.*?)\`\`\`/gs;
    const breakPatter = /(\n)/g;
    const tokens: Token[] = [];
    let lastIndex = 0;

    const pushTextToken = (upToIndex: number) => {
      if (upToIndex > lastIndex) {
        tokens.push({ type: 'text', content: inputText.slice(lastIndex, upToIndex) });
      }
    };

    const matchBoldAndCode = (pattern: RegExp, type: Type) => {
      let match;
      while ((match = pattern.exec(inputText)) !== null) {
        pushTextToken(match.index);

        tokens.push({ type, content: match[1] });
        lastIndex = pattern.lastIndex;
      }
    };

    // Find bold text and code snippets, and push them to the tokens array
    matchBoldAndCode(boldPattern, 'bold');
    matchBoldAndCode(codePattern, 'code');

    // Push any remaining text after the last match
    pushTextToken(inputText.length);

    return tokens;
  };

  // Convert the parsed tokens into React elements
  const formatMessage = (parsedTokens: Token[]) => {
    return parsedTokens.map((token, index) => {
      switch (token.type) {
        case 'bold':
          return <strong key={index}>{token.content}</strong>;
        case 'code':
          return (
            <div style={{ fontSize: 'small', background: 'black', color: 'white', padding: 10 }}>
              <pre style={{ width: 400 }}>
                <code key={index}>{token.content}</code>
              </pre>
            </div>
          );
        case 'break':
          return <br />;
        default:
          return token.content;
      }
    });
  };

  const parsedTokens = parseText(text);
  return (
    <div style={{ maxWidth: '100%' }}>
      <pre style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
        {formatMessage(parsedTokens)}
      </pre>
    </div>
  );
};

export default MessageFormatter;
