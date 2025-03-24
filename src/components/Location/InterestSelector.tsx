// import { useUserStore } from '@/stores/useUserStore';
// import { useMemo } from 'react';

// const InterestSelector = () => {
//   const { users, interests, setInterests } = useUserStore();

//   const allInterests = useMemo(() => {
//     const rawTopics = users.flatMap((user) => user.tags.map((tag) => tag.text));
//     return Array.from(new Set(rawTopics));
//   }, [users]);

//   const toggleInterest = (interest: string) => {
//     const isSelected = interests.includes(interest);
//     const updated = isSelected
//       ? interests.filter((i) => i !== interest)
//       : [...interests, interest];

//     setInterests(updated);
//   };

//   return (
//     <div className="mb-4 w-full bg-[#111111] justify-start">
//       <h2 className="text-lg font-bold px-5">탐색하기</h2>
//       <h3 className="text-lg font-medium text-left px-5 py-2">
//         네트워킹을 누리세요
//       </h3>
//       <div className="flex flex-wrap gap-2 mt-2 justify-center">
//         {allInterests.map((interest) => (
//           <button
//             key={interest}
//             className={`px-3 py-1 rounded-lg ${
//               interests.includes(interest)
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-black'
//             }`}
//             onClick={() => toggleInterest(interest)}>
//             {interest}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InterestSelector;
