export const AvatarFromUrl = ({
  src,
  alt = "User",
}: {
  src: string | null | undefined;
  alt?: string;
}) => {
  if (!src) return null;

  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

