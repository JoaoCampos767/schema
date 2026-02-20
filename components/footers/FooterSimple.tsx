export default function FooterSimple({
  copyright,
  links,
  socialMedia,
  backgroundColor,
}: {
  copyright: string;
  links: { label: string; href: string }[];
  socialMedia: { platform: string; url: string }[];
  backgroundColor: string;
}) {
  return (
    <footer style={{ backgroundColor }} className="py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          {socialMedia.map(
            (social: { platform: string; url: string }, idx: number) => (
              <a key={idx} href={social.url} className="hover:opacity-70">
                {social.platform}
              </a>
            )
          )}
        </div>
        <div className="flex justify-center gap-4 mb-4">
          {links.map((link: { label: string; href: string }, idx: number) => (
            <a key={idx} href={link.href} className="text-sm hover:underline">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-600">{copyright}</p>
      </div>
    </footer>
  );
}
