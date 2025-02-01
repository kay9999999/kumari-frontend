import { getStrapiURL } from "@/lib/utils";

const Policy = ({ response }) => {
  const policy = response?.data?.policy;

  if (!policy) {
    return <div>Loading...</div>;
  }

  // Create an array of the usp icons to map over
  const policyIcons = [
    policy.shipping,
    policy.return,
    policy.insurance,
    policy.buyback,
  ];
  const policyTexts = [
    "Free shipping within India",
    "Free 15-day easy returns",
    "One-year Jewellery Insurance",
    "Lifetime exchange and buy-backs",
  ];

  return (
    <div className="bg-black block">
      <div className="flex flex-wrap justify-center">
        {policyIcons.map((icon, index) => (
          <div
            key={index}
            className="w-1/2 sm:w-1/4 p-4 flex flex-col items-center"
          >
            <div className="items-center flex flex-col  ">
              <div className="icon w-10 h-10 flex-shrink-0">
                {/* Render the image inside the icon div */}
                {icon && (
                  <img
                    src={`${getStrapiURL()}${icon.url}`}
                    alt={icon.alternativeText || `policy Icon ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="w-full break-words tracking-wide text-xs lg:text-sm font-secondary font-light text-white  mt-4   text-center">
                <p className="max-w-28 lg:max-w-32">{policyTexts[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
