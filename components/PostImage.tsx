import Image from "next/image";

import type { PostImage as PostImageData } from "@/lib/news";
import { cn } from "@/lib/utils";

const PostImage = ({ image }: { image: PostImageData }) => {
  const { src, srcDark, alt, width, height, displayWidth } = image;

  // Lazy on purpose: the variant hidden by `display: none` is never fetched.
  const sharedProps = {
    width,
    height,
    style: displayWidth ? { maxWidth: displayWidth } : undefined,
  };

  return (
    <div className="mb-12">
      <Image
        {...sharedProps}
        src={src}
        alt={alt}
        className={cn(
          "rounded-md mx-auto w-full h-auto",
          srcDark && "dark:hidden"
        )}
      />
      {srcDark && (
        <Image
          {...sharedProps}
          src={srcDark}
          alt=""
          aria-hidden
          className="rounded-md mx-auto w-full h-auto hidden dark:block"
        />
      )}
    </div>
  );
};

export default PostImage;
