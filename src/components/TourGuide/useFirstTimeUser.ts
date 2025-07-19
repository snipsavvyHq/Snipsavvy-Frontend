"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { baseURL } from '@/config';

export const useFirstTimeUser = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Check if user has any workspaces
        const response = await axios.get(`${baseURL}/v1/api/workspace`, { headers });
        
        // If user has no workspaces, they are a first-time user
        setIsFirstTimeUser(response.data.length === 0);
      } catch (error) {
        console.error('Error checking first time user:', error);
        // Default to showing tour if there's an error
        setIsFirstTimeUser(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstTimeUser();
  }, [session]);

  return { isFirstTimeUser, isLoading };
}; 