import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProfiles = (n) => {
  const [profiles, setProfiles] = useState([]);
  const [swiperHistory, setSwiperHistory] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get(`http://localhost:8000/ai-profiles/fetch-profile?n=${n}`);
      setProfiles(response.data);
    };

    fetchProfiles();
  }, [n]);

  const backSwipe = () => {
    if (swiperHistory.length > 0) {
      const lastSwiped = swiperHistory.pop();
      setProfiles([lastSwiped, ...profiles]);
    }
  };

  const onSwipe = (index) => {
    setSwiperHistory([...swiperHistory, profiles[index]]);
    setProfiles(profiles.slice(1));
  };

  return { profiles, backSwipe, onSwipe };
};