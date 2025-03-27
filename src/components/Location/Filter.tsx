import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useFilterStore } from '@/stores/useFilterStore';

const roles = ['디자이너', '개발자', '프로젝트 매니저', '학생', '기타'];
const careers = ['취준생', '주니어', '미들', '시니어', '총괄 및 오너'];

const Filter: React.FC = () => {
  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const setRole = useFilterStore((state) => state.setRole);
  const setCareer = useFilterStore((state) => state.setCareer);

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showCareerDropdown, setShowCareerDropdown] = useState(false);

  const isCareerDisabled = role === '학생' || role === '기타';

  return (
    <div className="flex gap-2 items-start w-full px-2">
      <div className="relative w-1/2">
        <button
          onClick={() => setShowRoleDropdown((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-gray-500 bg-[#222222] text-white text-sm">
          <span>{role || '분야 선택'}</span>
          <span className="border border-gray-500 rounded-md">
            <ChevronDown size={16} />
          </span>
        </button>
        {showRoleDropdown && (
          <ul className="absolute left-0 mt-2 w-full bg-[#222222] border border-gray-500 rounded-lg shadow-md z-30">
            {roles.map((r) => (
              <li
                key={r}
                onClick={() => {
                  setRole(r);
                  setShowRoleDropdown(false);
                }}
                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm text-white">
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-1/2">
        <button
          onClick={() => {
            if (!isCareerDisabled) {
              setShowCareerDropdown((prev) => !prev);
            }
          }}
          className={`w-full flex justify-between items-center gap-2 px-4 py-2 rounded-lg border ${
            isCareerDisabled
              ? 'border-gray-700 bg-[#333333] text-gray-500 cursor-not-allowed'
              : 'border-gray-500 bg-[#222222] text-white'
          } text-sm`}>
          <span>{career || '경력 선택'}</span>
          <span className="border border-gray-500 rounded-md ">
            <ChevronDown size={16} />
          </span>
        </button>
        {showCareerDropdown && !isCareerDisabled && (
          <ul className="absolute left-0 mt-2 w-full bg-[#222222] border border-gray-500 rounded-lg shadow-md z-30">
            {careers.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCareer(c);
                  setShowCareerDropdown(false);
                }}
                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm text-white">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(Filter);
