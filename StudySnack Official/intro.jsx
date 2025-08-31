import { useState, useEffect } from "react";
import logo from "./assets/logo.png"; // đổi sang ảnh của bạn

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000">
      <img src={logo} alt="App Logo" className="max-w-[60%] max-h-[60%]" />
    </div>
  );
}



export default function App() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 2500); // bắt đầu fade
    const timer2 = setTimeout(() => setLoading(false), 3500); // ẩn hẳn
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <img src={logo} alt="App Logo" className="max-w-[60%] max-h-[60%]" />
        </div>
      )}
      {!loading && (
        <div className="p-6">
          <h1>Main App</h1>
          <p>This is your application content.</p>
        </div>
      )}
    </>
  );
}

