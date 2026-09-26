document.addEventListener("DOMContentLoaded", function () {
  // Find all the titles that start a new documentation block
  const headers = document.querySelectorAll("h4.name");

  headers.forEach((header) => {
    // Create the wrapper "Card" div
    const wrapper = document.createElement("div");
    wrapper.className = "doc-card";

    // Insert the wrapper before the header
    header.parentNode.insertBefore(wrapper, header);

    // Move the header and everything until the next header/section title into the wrapper
    let currentElement = header;
    while (
      currentElement &&
      currentElement.tagName !== "H3" &&
      (currentElement === header || currentElement.tagName !== "H4")
    ) {
      let nextElement = currentElement.nextElementSibling;
      wrapper.appendChild(currentElement);
      currentElement = nextElement;
    }
  });
});
