import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown } from 'react-feather';

const filterOptions = {
  분야: ['전체', '프론트엔드', '백엔드', '디자인', '기획', 'AI'],
  관심사1: ['전체', 'UI/UX', '머신러닝', '블록체인', '데이터 분석'],
  관심사2: ['전체', '스타트업', '오픈소스', '커뮤니티', '기술 블로그'],
} as const;

type FilterKey = keyof typeof filterOptions;

const Filter: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterKey, string>
  >({
    분야: '전체',
    관심사1: '전체',
    관심사2: '전체',
  });

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const handleSelect = useCallback((filterType: FilterKey, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = useCallback((filterType: FilterKey) => {
    setOpenDropdown((prev) => (prev === filterType ? null : filterType));
  }, []);

  const memoizedFilterKeys = useMemo(
    () => Object.keys(filterOptions) as FilterKey[],
    [],
  );

  return (
    <div className="flex justify-center gap-9 relative z-10">
      {memoizedFilterKeys.map((filterType) => (
        <div key={filterType} className="relative">
          <button
            className="flex items-center bg-[#222222] text-white px-3 py-1 rounded-md border border-[#a1a1aa]"
            onClick={() => toggleDropdown(filterType)}>
            {selectedFilters[filterType]}{' '}
            <ChevronDown size={20} color="white" />
          </button>

          {openDropdown === filterType && (
            <div className="absolute top-10 left-0 w-36 bg-[#1e293b] text-white shadow-lg rounded-md p-2">
              {filterOptions[filterType].map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-2 py-1 hover:bg-[#374151] rounded-md"
                  onClick={() => handleSelect(filterType, option)}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Filter);
