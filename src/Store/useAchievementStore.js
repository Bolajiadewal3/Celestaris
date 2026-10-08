// src/store/useAchievementStore.js
/**
 * @module Store
 * @category State Management
 * @description Provides a Zustand store for managing achievement tracking in the application.
 * The store keeps track of discovered nodes, total nodes, and whether all achievements have been unlocked.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store for managing achievement tracking.
 * It maintains the state of discovered nodes, total nodes, and whether all achievements have been unlocked.
 * The store provides a method to discover new nodes and automatically updates the unlocked status.
 */
export const useAchievementStore = create(
  persist(
    (set) => ({
      discoveredNodes: [],
      totalNodes: 5,
      isFullyUnlocked: false,

      /**
       * Discovers a new node and updates the achievement status.
       * @param nodeId
       */
      discoverNode: (nodeId) =>
        set((state) => {
          if (state.discoveredNodes.includes(nodeId)) return state;

          const newDiscovered = [...state.discoveredNodes, nodeId];
          const isFullyUnlocked = newDiscovered.length >= state.totalNodes;

          return {
            discoveredNodes: newDiscovered,
            isFullyUnlocked,
          };
        }),
    }),
    {
      name: "celestaris-achievements-storage", // unique key for localStorage
    },
  ),
);
