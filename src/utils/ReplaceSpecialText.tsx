import React from 'react';

type Props = {
  text: string;
};

const SpecialText: { [key: string]: string } = {
  'meisho_2': '土地の所在地'
};

const ReplaceSpecialText: React.FC<Props> = ({ text }) => {
  if (!text) { return null; }
  const replaced = SpecialText[text] ?? text;
  return <>{replaced}</>;
};

export default ReplaceSpecialText;
