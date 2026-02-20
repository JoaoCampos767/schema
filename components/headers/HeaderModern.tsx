export default function HeaderModern({
  logoUrl,
  storeName,
  menuItems,
  backgroundColor,
  textColor,
}: {
  logoUrl: string;
  storeName: string;
  menuItems: { href: string; label: string }[];
  backgroundColor: string;
  textColor: string;
}) {
  return (
    <header style={{ backgroundColor, color: textColor }} className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt={storeName} className="h-12" />
          <span className="text-xl font-bold">{storeName}</span>
        </div>
        <nav className="flex gap-6">
          {menuItems.map(
            (item: { href: string; label: string }, idx: number) => (
              <a key={idx} href={item.href} className="hover:opacity-80">
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
