import './SlideShow.css';

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

function SlideShow() {
  const images = [
    "https://images.unsplash.com/photo-1541480601022-2308c0f02487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1M3w&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1618318786162-54793c10908f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1M3w&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1OHw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1OHw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIxfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&ixlib=rb-4.0.3&w=1500",
    "https://images.unsplash.com/photo-1447015237013-0e80b2786ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1NXw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1605143185597-9fe1a8065fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1OHw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1530692228265-084b21566b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1OXw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1695028967822-ae973f8ac31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1NHw&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1617781711776-224e00e5f43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1Nnw&ixlib=rb-4.0.3&q=80&w=1080",
  ];

  // Shuffle the images array
  const shuffledImages = shuffleArray([...images]);

  return (
    <div className="logos">
      <div className="logos-slide">
        {/* First set of shuffled images */}
        {shuffledImages.map((src, index) => (
          <img key={index} src={src} alt={`logo${index + 1}`} />
        ))}
        {/* Second set of shuffled images for seamless scrolling */}
        {shuffledImages.map((src, index) => (
          <img key={`copy-${index}`} src={src} alt={`logo${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
