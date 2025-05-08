import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";

const poemLinks = [
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/I - Musings.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/II - Mirrors.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/III - Ex Nihilo.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/IV - The Black.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/V - Infinitum.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VI - Polar.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VII - Fleeting.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/VIII - Coin.md`,
  `${import.meta.env.BASE_URL}Documents/Poetry/lux/section0/IX - Florence.md`,
];

const md = new MarkdownIt();

const Poem = ({ title, content }) => (
  <div className="poem-container">
    <h1 className="poem-title">{title}</h1>
    <div className="poem-body" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const existentialPoetry = () => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [poems, setPoems] = useState(
    poemLinks.map((link) => ({
      title: link.split("/").pop().replace(".md", ""),
      content: "",
    }))
  );

  useEffect(() => {
    // Fetch all poems
    const fetchPoems = async () => {
      const updatedPoems = await Promise.all(
        poemLinks.map(async (link, index) => {
          try {
            const response = await fetch(link);
            const markdown = await response.text();
            const content = md.render(markdown);

            return { title: poems[index].title, content };
          } catch (error) {
            console.error(`Error fetching ${link}:`, error);
            return {
              title: poems[index].title,
              content: "Error loading poem.",
            };
          }
        })
      );

      setPoems(updatedPoems);
    };

    fetchPoems();
  }, []);

  const handleTabClick = (index) => {
    setCurrentPoemIndex(index);
  };

  return (
    <div className="poetry-page">
      <div className="tabs">
        {poems.map((poem, index) => (
          <button
            key={index}
            className={`tab-button ${
              currentPoemIndex === index ? "active" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {poem.title}
          </button>
        ))}
      </div>

      <div className="poem-display">
        <Poem
          title={poems[currentPoemIndex].title}
          content={poems[currentPoemIndex].content}
        />
      </div>
    </div>
  );
};

export default existentialPoetry;
