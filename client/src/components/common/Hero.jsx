const Hero = () => {
  return (
    <div className="relative h-[600px] bg-gray-900">
      <img
        src="https://picsum.photos/1920/1080"
        alt="Travel"
        className="w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Discover the World with Us
          </h1>
          <p className="text-xl mb-8">
            Experience unforgettable journeys and create lasting memories
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
