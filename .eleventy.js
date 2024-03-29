const { DateTime } = require("luxon");
const eleventyPluginPhosphoricons = require('eleventy-plugin-phosphoricons');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  // eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/bundle.js");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/_js/");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksFilter("date", function (dateString) {
    return DateTime.fromISO(dateString).toFormat('dd LLL yyyy');
  });

  eleventyConfig.addPlugin(eleventyPluginPhosphoricons, {
    style: "vertical-align: middle;",
    size: 16,
    fill: "currentColor"
  });


  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};