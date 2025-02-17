import { useEffect } from "react";

export const useKeyboardNav = (onShowShortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "h":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "p":
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "s":
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "c":
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "?":
          onShowShortcuts?.();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [onShowShortcuts]);
};
