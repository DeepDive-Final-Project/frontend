import React from 'react';

interface TagProps {
  color: string;
  text: string;
}

const Tag: React.FC<TagProps> = ({ color, text }) => {
  return (
    <div className="flex items-center gap-1 bg-black] rounded-full text-white text-xs">
      <div
        className={`w-3 h-3 rounded-full`}
        style={{ backgroundColor: color }}></div>
      <span className="text-[9px]">{text}</span>
    </div>
  );
};

export default React.memo(Tag);
