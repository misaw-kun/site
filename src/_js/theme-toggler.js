/**
 * this code has a 2 parts
 * 1. first part runs in `base.njk` top-level `script` before anything loads
 * 2. it acts as a "DOM blocker" to stop flickering on initial lood
 * 3. while respecting user-preferences like system-wide dark/light modes
 * 4. which makes us to move on to the second part where
 * 5. we wait for the "DOMContentLoaded" event to fire to avoid any race conditions (if any)
 * 6. here we basically allow the user to pick their own preference from the toggler , regardless of the default user-prefs
 * 7. then store it in the localStorage
 *
 * This sure has a lot of mental gymnastics involved but essentially it allows * us to respect initial user prefs while allowing them to have custom prefs later on.
 */

document.addEventListener("DOMContentLoaded", function () {
  let toggler = document.getElementById("toggler");

  // setting appropriate initial button icon (if past user pref exists)
  localStorage.theme === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches ?
    toggler.classList.add("theme-toggle--toggled")
    :
    toggler.classList.remove("theme-toggle--toggled");

  toggler.addEventListener('click', () => {
    let theme = toggler.classList.contains("theme-toggle--toggled") ?
      "light" : "dark";
    setTheme(theme);
    toggler.classList.toggle("theme-toggle--toggled");
  });
});