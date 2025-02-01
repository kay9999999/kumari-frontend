import { getStrapiURL } from "@/lib/utils";

const Usp = ({ response }) => {
  const usp = response?.data?.Usp;

  if (!usp) {
    return <div>Loading...</div>;
  }

  // Create an array of the usp icons to map over
  const uspIcons = [usp.usp_1, usp.usp_2, usp.usp_3, usp.usp_4];
  const uspTexts = [
    "Legacy of 85+ years",
    "Heritage of craft",
    "Only natural Diamonds",
    "BIS hallmarked gold",
  ];

  return (
    <div className="bg-primary block">
      <div className="flex flex-wrap justify-center">
        {uspIcons.map((icon, index) => (
          <div
            key={index}
            className="w-1/2 sm:w-1/4 p-4 flex flex-col items-center"
          >
            <div className="items-center flex flex-col lg:flex-row lg:gap-4">
              <div className="icon w-10 h-10 flex-shrink-0">
                {/* Render the image inside the icon div */}
                {icon && (
                  <img
                    src={`${getStrapiURL()}${icon.url}`}
                    alt={icon.alternativeText || `USP Icon ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="w-28 lg:w-36 break-words tracking-wide text-xs lg:text-sm font-primary font-light text-white uppercase mt-4 lg:mt-2 lg:text-left text-center">
                {uspTexts[index]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usp;
