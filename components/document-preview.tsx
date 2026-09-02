export function DocumentPreview({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
      <div className="aspect-[210/297] overflow-hidden">
        <iframe
          src={src}
          title={title}
          className="h-[200%] w-[200%] origin-top-left scale-50 border-0"
        />
      </div>
    </div>
  );
}
