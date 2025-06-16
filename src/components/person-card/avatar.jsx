

const Avatar = ({ name }) => {
  const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&rounded=true`;
  return (
    <img
      src={url}
      alt={name}
      className="w-24 h-24 rounded-full object-cover shadow-[0_0_20px_rgba(255,255,0,0.6)]"
    />
  );
};
export default Avatar;