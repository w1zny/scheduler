import "./globals.css";

export const metadata = {
  title: "Simple Schedule Creator",
  description: "Application for easily creating schedules",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Slab:wght@100..900&display=swap"
        rel="stylesheet"/>
    </head>
    <body
      className={`text-customGray bg-customWhite-dark`}
    >
    <nav className={`bg-customWhite-light pb-8 shadow-md sticky top-0 z-5`}>
      <ul className={`px-12`}>
        <li className={`flex items-end cursor-default font-logoFont text-5xl font-bold text-customGray-light`}>
          <p>Simple Schedule Creator</p>
          <p className={`font-logoFont text-7xl font-bold text-customOrange-light`}>.</p>
        </li>
      </ul>
    </nav>
    {children}
    </body>
    </html>
  );
}
