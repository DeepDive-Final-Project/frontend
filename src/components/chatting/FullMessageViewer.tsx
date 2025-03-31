import { X } from 'react-feather';

interface MessageViewerProps {
  expandedMessage: string;
  onClose: () => void;
}

const FullMessageViewer = ({
  expandedMessage,
  onClose,
}: MessageViewerProps) => {
  return (
    <>
      {/* pc */}
      <div className="hidden desktop:flex w-[33.33%] h-full flex-col bg-[#1E1E1F]">
        <div className="flex flex-shrink-0 h-[52px] px-5 items-center justify-between">
          <p className="font-semibold">메시지 전체보기</p>
          <button type="button" onClick={onClose}>
            <X size={18}></X>
          </button>
        </div>
        <div className="pt-2 pb-5 px-5 mb-5 h-full overflow-y-auto">
          <div className="h-full font-medium text-sm leading-normal">
            {expandedMessage}
          </div>
        </div>
      </div>

      {/* tablet, mobile */}
      <div className="desktop:hidden fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-5">
        <div className="bg-[#1E1E1F] w-full max-w-[400px] max-h-[70%] rounded-lg overflow-hidden flex flex-col">
          <div className="flex flex-shrink-0 h-[52px] px-5 items-center justify-between">
            <p className="font-semibold">메시지 전체보기</p>
            <button type="button" onClick={onClose}>
              <X></X>
            </button>
          </div>
          <div className="pt-2 pb-5 px-5 mb-5 h-full overflow-y-auto">
            <div className="h-full font-medium text-sm leading-normal">
              {expandedMessage}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullMessageViewer;
