type Props = {
  pill: string;
  subheading?: string;
  title: string;
};

export function TitleSection(props: Props) {
  const { pill, subheading, title } = props;

  return (
    <>
      <section className="flex flex-col items-start justify-center gap-4 md:items-center">
        <article className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple">
          <div className="rounded-full px-3 py-1 dark:bg-black">{pill}</div>
        </article>
        {subheading ? (
          <>
            <h2 className="sm-max-w-[750px] text-left text-3xl font-semibold sm:text-5xl md:text-center">
              {title}
            </h2>
            <p className="dark:text-washed-purple-700 sm:max-w-[450px] md:text-center">
              {subheading}
            </p>
          </>
        ) : (
          <h1 className="text-left text-4xl font-semibold sm:max-w-[850px] sm:text-6xl md:text-center">
            {title}
          </h1>
        )}
      </section>
    </>
  );
}
