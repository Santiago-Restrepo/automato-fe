export const Header = () => {
  const sections = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/flow",
      title: "Flows",
    },
    {
      url: "/integrations",
      title: "Integrations",
    },
    {
      url: "/settings",
      title: "Settings",
    },
  ];

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-center">
        <ul className="flex space-x-8">
          {sections.map((section) => (
            <li key={section.url}>
              <a
                href={section.url}
                className="text-xl text-gray-300 font-medium hover:text-white transition"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
