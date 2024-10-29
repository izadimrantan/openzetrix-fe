import { useEffect, useState } from "react";

type SnackbarProps = {
  message: string;
  onClose: () => void;
  duration?: number; // Optional prop to auto-hide the snackbar after a certain time (in ms)
};

export default function Snackbar({ message, onClose, duration = 3000 }: SnackbarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after the specified duration
    const timer = setTimeout(() => {
      setVisible(false); // Trigger slide-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Trigger onClose after the slide-out animation completes
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onClose, 300); // Wait for slide-out animation to finish
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed top-16 right-4 z-50 bg-black text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-4 border border-white/80
        ${visible ? "animate-slide-in" : "animate-slide-out"}`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => setVisible(false)} // Trigger slide-out
        className="text-white hover:text-gray-300 transition"
      >
        &times;
      </button>
    </div>
  );
}
