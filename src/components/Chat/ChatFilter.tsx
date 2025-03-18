import { List } from 'react-feather';

const ChatFilter = () => {
  return (
    <div className="flex flex-shrink-0 h-[52px] items-center border-b border-b-[#222325] bg-[#0A0A0B]">
      <button type="button">
        <List className="ml-[20px]" aria-label="필터링 메뉴" />
      </button>
    </div>
  );
};

export default ChatFilter;
