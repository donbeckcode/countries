import { Link } from "react-router";
import { useTheme } from "../../providers/ThemeProvider";
import "./Header.css";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="header">
      <Link to="/">
        <span className="headerLogo">Country App</span>
      </Link>
      <button onClick={toggleTheme}>
        <span>{theme === "light" ? "light" : "dark"} mode</span>
      </button>
    </div>
  );
};
