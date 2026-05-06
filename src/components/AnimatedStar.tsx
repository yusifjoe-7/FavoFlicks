
import { useEffect, useState } from "react";


const messages = [
  "Are you okay?",
  "Need a movie night?",
  "Searching for your next obsession?",
  "Ready for something unforgettable?",
  "Popcorn first, questions later.",
  "Your next favorite movie is waiting.",
  "Bored? Let’s fix that.",
  "Dive into another world.",
  "Series marathon incoming...",
  "Find something worth watching.",
  "Lost in choices? We got you.",
  "Cinema never sleeps.",
  "Escape reality for a while.",
  "Tonight’s vibe starts here.",
  "Warning: binge mode activated.",
  "Scroll less, watch more.",
  "Fresh stories await.",
  "One click from your next adventure.",
  "Lights off. Screen on.",
  "Every film tells a story."
];

export default function AnimatedStar() {
  const [visible, setVisible] = useState(false);

 const [theMessage, setTheMessage]= useState<string | null>()

  const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  console.log(randomIndex);
  setTheMessage(messages[randomIndex]);
};


  useEffect(() => {
    console.log(theMessage)
    const interval = setInterval( async() => {
     await getRandomMessage();
      setVisible(true);
     
      setTimeout(() => setVisible(false), 8000);
      
      // تفض 3 ثواني
    }, 60 * 1000); // كل دقيقتين
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* النجمة من اليمين */}
      <div
        className={`fixed top-40  z-700 transition-all duration-700 ease-in-out ${
          visible ? "right-8" : "-right-24"
        }`}
      >
        <svg
          className="w-20 h-20 sm:w-14 sm:h-14"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="9,1 11,6.5 17,6.5 12.5,10 14,16 9,12.5 4,16 5.5,10 1,6.5 7,6.5"
            fill="white"
          />
        </svg>
      </div>

      {/* الرسالة منفصلة تحت النجمة */}
      <div
        className={`fixed top-60 z-700 transition-all duration-700 ease-in-out ${
          visible
            ? "right-4 opacity-100"
            : "-right-40 opacity-0"
        }`}
      >
        <div className="bg-white text-black text-sm px-4 py-2 rounded-2xl shadow-lg">
          {theMessage}
        </div>
      </div>
    </>
  );
}