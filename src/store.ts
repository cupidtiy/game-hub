import { create } from 'zustand';

interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;       // for in-page SearchPage input
  topSearchText?: string;    // for global/homepage search input
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setTopSearchText: (topSearchText: string) => void;
  setGenreId: (genreId: number | undefined) => void;
  setPlatformId: (platformId: number | undefined) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  
  setSearchText: (searchText) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, searchText }
    })),

  setTopSearchText: (topSearchText) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, topSearchText }
    })),

  setGenreId: (genreId) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, genreId }
    })),

  setPlatformId: (platformId) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, platformId }
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, sortOrder }
    })),
}));

export default useGameQueryStore;
