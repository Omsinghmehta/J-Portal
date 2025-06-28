import Typewriter from 'typewriter-effect';

export default function HeroText() {
  return (
    <div className="text-md md:text-3xl font-bold text-center mt-5 md:mt-10">
      <Typewriter
        options={{
          strings: ['Welcome to JobPortal!', 'Find Your Dream Job!', 'Start Hiring Now!'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}
