import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ['🌈', '✨', '👩‍🏫', '📚', '🎉'],
        emojiSize: 30,
        confettiNumber: 50,
      });
    }
  }, [trigger]);

  return null;
};

export default Confetti;