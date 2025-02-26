import { useRouter } from "next/navigation";

const ReadMoreButton = ({ onClick, link, label, className }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(link);
  };

  return (
    <button
      onClick={onClick}
      className={`bg-black text-white uppercase  ${className}`}
    >
      {label}
    </button>
  );
};

export default ReadMoreButton;
