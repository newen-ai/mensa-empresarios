"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultFeedPosts, FEED_STORAGE_KEY } from "../constants";
import type { FeedPost } from "../types";

export const useHomeFeed = (activeProfileId: string) => {
  const [customPosts, setCustomPosts] = useState<FeedPost[]>([]);
  const [readyToSave, setReadyToSave] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FEED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FeedPost[];
        if (Array.isArray(parsed)) {
          const migratedPosts = parsed.map((post) => ({
            ...post,
            ownerProfileId: post.ownerProfileId ?? activeProfileId,
          }));
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCustomPosts(migratedPosts);
        }
      }
    } catch {
      localStorage.removeItem(FEED_STORAGE_KEY);
    } finally {
      setReadyToSave(true);
    }
  }, [activeProfileId]);

  useEffect(() => {
    if (!readyToSave) return;
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(customPosts));
  }, [customPosts, readyToSave]);

  const feedPosts = useMemo(
    () => [...customPosts, ...defaultFeedPosts],
    [customPosts]
  );

  const customPostIds = useMemo(
    () =>
      new Set(
        customPosts
          .filter((post) => post.ownerProfileId === activeProfileId)
          .map((post) => post.id)
      ),
    [customPosts, activeProfileId]
  );

  const addPost = ({
    autor,
    cargo,
    contenido,
  }: {
    autor: string;
    cargo: string;
    contenido: string;
  }) => {
    const trimmed = contenido.trim();
    if (!trimmed) return;

    const newPost: FeedPost = {
      id: crypto.randomUUID(),
      autor,
      cargo,
      contenido: trimmed,
      tiempo: "Ahora",
      etiqueta: "Tu publicacion",
      ownerProfileId: activeProfileId,
    };

    setCustomPosts((current) => [newPost, ...current]);
  };

  const updatePost = ({ id, contenido }: { id: string; contenido: string }) => {
    const trimmed = contenido.trim();
    if (!trimmed) return;

    setCustomPosts((current) =>
      current.map((post) =>
        post.id === id && post.ownerProfileId === activeProfileId
          ? { ...post, contenido: trimmed, tiempo: "Editado ahora" }
          : post
      )
    );
  };

  const deletePost = (id: string) => {
    setCustomPosts((current) =>
      current.filter(
        (post) => !(post.id === id && post.ownerProfileId === activeProfileId)
      )
    );
  };

  return {
    feedPosts,
    customPostIds,
    addPost,
    updatePost,
    deletePost,
  };
};
