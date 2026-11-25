/**
 * SleepingArrangements.jsx — "Where you'll sleep"
 *
 * Verbatim cards with actual bedroom photos:
 * - Bedroom 1 with authentic photo & "1 king bed" -> links to Bedroom 1 in photo tour
 * - Bedroom 2 with authentic photo & "1 king bed" -> links to Bedroom 2 in photo tour
 */

export default function SleepingArrangements({ arrangements, onSelectSection }) {
  const defaultArrangements = [
    {
      title: 'Bedroom 1',
      bedType: '1 king bed',
      image:
        'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/ba88c8e4-315d-470b-93b4-96ea1765c135.jpeg?im_w=720',
      sectionId: 'photo-tour-section-bedroom-1',
    },
    {
      title: 'Bedroom 2',
      bedType: '1 king bed',
      image:
        'https://a0.muscache.com/im/pictures/miso/Hosting-52481572/original/143fc71f-84e1-4db7-afc4-7cc0bdf386ae.jpeg?im_w=720',
      sectionId: 'photo-tour-section-bedroom-2',
    },
  ];

  const items =
    arrangements && arrangements.length > 0
      ? arrangements.map((arr, i) => ({
          ...defaultArrangements[i],
          ...arr,
          image: arr.image || defaultArrangements[i]?.image || defaultArrangements[0].image,
          sectionId:
            arr.sectionId ||
            defaultArrangements[i]?.sectionId ||
            (i === 0 ? 'photo-tour-section-bedroom-1' : 'photo-tour-section-bedroom-2'),
        }))
      : defaultArrangements;

  const handleClick = (item, index) => {
    const targetSection =
      item.sectionId ||
      (item.title?.toLowerCase().includes('1') || index === 0
        ? 'photo-tour-section-bedroom-1'
        : 'photo-tour-section-bedroom-2');
    onSelectSection?.(targetSection);
  };

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-5">
        Where you&apos;ll sleep
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item, index)}
            className="border border-[#DDDDDD] rounded-2xl p-4 flex flex-col justify-between bg-white shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-[#222222]">{item.title}</p>
              <p className="text-sm text-[#717171] mt-0.5">{item.bedType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
