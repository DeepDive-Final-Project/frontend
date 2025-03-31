import { useState } from 'react';
import Accordian from './Accordian';

interface ModalContentProps {
  onClose: () => void;
  onSave: (items: { key: string; description: string }[]) => void;
}

const ModalContent = ({ onClose, onSave }: ModalContentProps) => {
  const [selectedItems, setSelectedItems] = useState<
    { key: string; description: string }[]
  >([]);

  const handleSelect = (key: string, description: string) => {
    const isAlreadySelected = selectedItems.some((item) => item.key === key);
    if (!isAlreadySelected && selectedItems.length < 3) {
      setSelectedItems((prev) => [...prev, { key, description }]);
    }
  };
  const handleRemove = (key: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.key !== key));
  };

  return (
    <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
      <div className="flex justify-between items-center h-[18px] px-[10px] w-full text-white text-[14px]">
        <span>요즘 내 관심은</span>
        <span className="text-[#66A1F8] text-[12px]">최대 3개까지 선택</span>
      </div>
      <Accordian
        label="개발 직무 선택"
        apiUrl={`${import.meta.env.VITE_BASE_API_URL}/api/client/enums/interests?category=DEV`}
        onSelect={handleSelect}
      />
      <Accordian
        label="기획 직무 선택"
        apiUrl={`${import.meta.env.VITE_BASE_API_URL}/api/client/enums/interests?category=PD`}
        onSelect={handleSelect}
      />
      <Accordian
        label="데이터 직무 선택"
        apiUrl={`${import.meta.env.VITE_BASE_API_URL}/api/client/enums/interests?category=DS`}
        onSelect={handleSelect}
      />

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <span
              key={item.key}
              className=" text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
              {item.description}
              <button
                onClick={() => handleRemove(item.key)}
                className="text-xs font-bold]">
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          console.log('선택한 항목:', selectedItems);
          onSave(selectedItems);
          onClose();
        }}
        className="self-end text-sm text-[14px] text-[#E6E6E6] mt-4 px-4 py-2 border border-[#5A5C63] rounded-full">
        등록하기
      </button>
    </div>
  );
};

export default ModalContent;
