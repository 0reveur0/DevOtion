import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const USERNAME_KEY = "@devotion/username";

const ADJECTIVES = ["swift", "bold", "keen", "sharp", "clever", "bright", "quick", "agile"];
const NOUNS = ["dev", "coder", "builder", "hacker", "engineer", "maker"];

function generateUsername(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${adj}_${noun}_${num}`;
}

export function useUsername() {
  const [username, setUsernameState] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem(USERNAME_KEY).then((stored) => {
      if (stored) {
        setUsernameState(stored);
      } else {
        const generated = generateUsername();
        AsyncStorage.setItem(USERNAME_KEY, generated);
        setUsernameState(generated);
      }
    });
  }, []);

  const setUsername = async (newUsername: string) => {
    const trimmed = newUsername.trim();
    if (!trimmed) return;
    await AsyncStorage.setItem(USERNAME_KEY, trimmed);
    setUsernameState(trimmed);
  };

  return { username, setUsername };
}
