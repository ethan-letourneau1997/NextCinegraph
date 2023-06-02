import { create } from 'zustand';

// date variables
const today = new Date();
const sixWeeksAgo = new Date(today.getTime() - 6 * 7 * 24 * 60 * 60 * 1000);

const nextMonday = new Date(today.getTime() + ((7 - today.getDay()) % 7) * 24 * 60 * 60 * 1000);
const fourWeeksAfterNextMonday = new Date(nextMonday.getTime() + 4 * 7 * 24 * 60 * 60 * 1000);

type State = {
  showMeValue?: string;
  startDate: Date | null;
  endDate: Date | null;
  genres: string[];
  keywordString: string;
  sortBy: string;
  selectedProvidersString: string;
  scoreSliderValue: [number, number];
  runtimeSliderValue: [number, number];
};

type Action = {
  updateShowMeValue: (showMeValue: State['showMeValue']) => void;
  updateStartDate?: (startDate: State['startDate']) => void;
  updateEndDate?: (endDate: State['endDate']) => void;
  updateGenres: (genreId: string) => void;
  updateKeywordString: (keywordString: string) => void;
  updateSortBy: (sortBy: string) => void;
  updateSelectedProvidersString: (selectedProvidersString: string) => void;
  updateScoreSlidertValue: (scoreSliderValue: State['scoreSliderValue']) => void;
  updateRuntimeSliderValue: (runtimeSliderValue: State['runtimeSliderValue']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create<State & Action>((set) => ({
  showMeValue: 'all',
  updateShowMeValue: (showMeValue) => {
    set(() => ({ showMeValue }));

    if (showMeValue === 'all') {
      set(() => ({ startDate: null }));
      set(() => ({ endDate: today }));
    } else if (showMeValue === 'nowPlaying') {
      set(() => ({ startDate: sixWeeksAgo }));
      set(() => ({ endDate: today }));
      set(() => ({ sortBy: 'popularity' }));
      set(() => ({ selectedProvidersString: '' }));
    } else if (showMeValue === 'upcoming') {
      set(() => ({ startDate: nextMonday }));
      set(() => ({ endDate: fourWeeksAfterNextMonday }));
    }
  },
  startDate: null,
  updateStartDate: (startDate) => set(() => ({ startDate })),
  endDate: today,
  updateEndDate: (endDate) => set(() => ({ endDate })),
  genres: [],

  updateGenres: (genreId) => {
    set((state) => {
      const updatedGenres = state.genres.includes(genreId)
        ? state.genres.filter((value) => value !== genreId)
        : [...state.genres, genreId];

      return { ...state, genres: updatedGenres };
    });
  },
  keywordString: '',
  updateKeywordString: (keywordString) => set(() => ({ keywordString })),
  sortBy: 'popularity',
  updateSortBy: (sortBy) => set(() => ({ sortBy })),
  selectedProvidersString: '',
  updateSelectedProvidersString: (selectedProvidersString) =>
    set(() => ({ selectedProvidersString })),
  scoreSliderValue: [0, 100],
  updateScoreSlidertValue: (scoreSliderValue) => set(() => ({ scoreSliderValue })),
  runtimeSliderValue: [0, 350],
  updateRuntimeSliderValue: (runtimeSliderValue) => set(() => ({ runtimeSliderValue })),
}));
