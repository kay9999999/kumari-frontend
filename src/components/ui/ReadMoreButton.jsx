import { useRouter } from "next/navigation";

const ReadMoreButton = ({ link, label, className }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(link);
  };

  return (
    <button
      onClick={handleReadMore}
      className={`bg-black text-white uppercase  ${className}`}
    >
      {label}
    </button>
  );
};

export default ReadMoreButton;
