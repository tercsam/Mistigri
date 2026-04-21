import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data as Profile);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        setUser(session?.user ?? null);
        if (session?.user) await fetchProfile(session.user.id);
        else setProfile(null);
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  };

  const signOut = async () => { await supabase.auth.signOut(); setUser(null); setProfile(null); };

  const updateProfile = async (updates: Partial<Pick<Profile, 'username' | 'display_name' | 'avatar_url'>>) => {
    if (!user) return { error: 'Non connecté' };
    const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
    if (error) return { error: error.code === '23505' ? 'Ce username est déjà pris' : error.message };
    await fetchProfile(user.id);
    return { error: null };
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: 'Non connecté' };
    const ext = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (uploadError) return { error: uploadError.message };
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return updateProfile({ avatar_url: publicUrl });
  };

  return { user, profile, loading, signInWithGoogle, signOut, updateProfile, uploadAvatar };
}
