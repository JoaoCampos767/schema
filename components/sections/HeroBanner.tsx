export default function HeroBanner({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <section
      className="relative h-96 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{subtitle}</p>
        <a
          href={buttonLink}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold inline-block"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
