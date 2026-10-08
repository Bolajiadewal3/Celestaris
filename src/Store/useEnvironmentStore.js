/**
 * @category State Management
 * @description Provides a Zustand store for managing environment settings in the application.
 * The store keeps track of manual time, weather conditions, and whether the user is overriding automatic settings.
 */
import { create } from "zustand";

/**
 * Zustand store for managing environment settings.
 * It maintains the state of manual time, weather conditions, and whether the user is overriding automatic settings.
 * The store provides methods to update these settings and automatically handles transitions between manual and automatic modes.
 */
export const useEnvironmentStore = create((set, get) => ({
  manualTime: 12,
  isOverriding: false,
  weather: "clear",
  weatherMode: "auto", // 'auto' or 'manual'

  /**
   * Sets the manual time and enables overriding.
   * @param time
   */
  setManualTime: (time) => set({ manualTime: time, isOverriding: true }),
  /**
   * Sets the overriding status.
   * @param status
   */
  setOverriding: (status) => set({ isOverriding: status }),

  /**
   * Sets the weather condition and switches to manual mode.
   * @param weather
   */
  setWeather: (weather) => set({ weather, weatherMode: "manual" }), // Manual override locks out auto-random until reset
  /**
   * Sets the weather condition in automatic mode.
   * @param weather
   */
  setAutoWeather: (weather) => set({ weather }), // Used by the random timer without locking manual mode
  /**
   * Sets the weather mode.
   * @param mode
   */
  setWeatherMode: (mode) => set({ weatherMode: mode }),
}));
