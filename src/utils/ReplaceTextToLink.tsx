type Props = {
  text: string
}

const ReplaceTextToLink = (props: Props) => {
  const { text } = props;

  if (typeof text !== 'string') {
    return (<>{text}</>)
  }

  const urlRegex = /https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g;
  const telRegex = /0\d{1,4}-\d{1,4}-\d{4}/g;
  const regex = new RegExp(`(${urlRegex.source}|${telRegex.source})`, 'g');

  const parts = text.split(regex);

  const result = parts.map((part, index) => {

    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    } else if (part.match(telRegex)) {
      return (
        <a
          key={index}
          href={`tel:${part}`}
        >
          {part}
        </a>
      );
    }

    return part;
  });

  return <>{result}</>;
};


export default ReplaceTextToLink
