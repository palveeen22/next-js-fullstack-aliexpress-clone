// import Link from 'next/link';
// import React from 'react';
// import { Icon } from '@iconify/react';
// import { formatCurrency } from '@/app/utils';

// const CardProduct = ({ data: any }) => {
//   return (
//     <div className="relative flex flex-col gap-2" key={e?.id}>
//       <Link href={`/product/productId`}>
//         <p className="absolute top-2 left-2 bg-[#000000] text-[#ffffff] rounded-full px-2 py-1 italic">
//           {data?.type}
//         </p>
//         <div>
//           <img src={data?.img} className="h-62 w-62 rounded-3xl object-cover" />
//         </div>
//         <p className="text-sm">{data?.text}</p>
//         <div className="flex justify-start gap-2">
//           <div className="flex justify-between text-[#000000] item-center">
//             <Icon icon="material-symbols:star" width={15} color="#cc290a" />
//             <p className="text-[#000000] text-sm">{data?.rate}</p>
//           </div>
//           <p className="text-[#000000] text-sm">{data?.buy} buyed</p>
//         </div>
//         <p className="text-[#fe2722] text-xl font-bold ">
//           {formatCurrency(data?.price)}
//         </p>
//         <div className="flex justify-start gap-2 items-center">
//           <Icon icon="ph:truck-thin" color="#00ab11" width={25} />
//           <p className="text-[#00ab11] text-sm">sampai 30 hari</p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default CardProduct;
