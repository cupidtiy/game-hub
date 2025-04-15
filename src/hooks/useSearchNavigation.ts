import { useNavigate, useLocation } from 'react-router-dom';
import useGameQueryStore from '../store';

export const useSearchNavigation = (searchTextKey: 'searchText' | 'topSearchText' = 'searchText') => {
  const navigate = useNavigate();
  const location = useLocation();
  const setSearchText = useGameQueryStore(s => 
    searchTextKey === 'searchText' ? s.setSearchText : s.setTopSearchText
  );
  const searchText = useGameQueryStore(s => s.gameQuery[searchTextKey]);

  const navigateToSearch = (query: string) => {
    if (query.trim()) {
      setSearchText(query);
      navigate(`/games/search?query=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    navigate('/');
  };

  return {
    searchText,
    setSearchText,
    navigateToSearch,
    clearSearch,
    location
  };
};