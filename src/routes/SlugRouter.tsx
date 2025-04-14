import React, { useEffect } from 'react'
import useGameQueryStore from '../store';
import useGame from '../hooks/useGame';
import { useParams } from 'react-router-dom';
import useGenres from '../hooks/useGenres';
import usePlatforms from '../hooks/usePlatforms';
import CategoryPage from '../pages/CategoryPage';
import GameDetailPage from '../pages/GameDetailPage';

// Reusable slug-matching helper
const matchesSlug = (item: { name: string; slug?: string }, slug: string) => {
    const lowerSlug = slug.toLowerCase();
    return (
        item.name.toLowerCase() === lowerSlug ||
        (item.slug && item.slug === lowerSlug) ||
        item.name.toLowerCase().replace(/\s+/g, '-') === lowerSlug
    );
};

const SlugRouter = () => {
    const { slug } = useParams();
    const { data: genres } = useGenres();
    const { data: platforms } = usePlatforms();
    const setGenreId = useGameQueryStore(state => state.setGenreId);
    const setPlatformId = useGameQueryStore(state => state.setPlatformId);
    const setSearchText = useGameQueryStore(state => state.setSearchText);

    useEffect(() => {
        setSearchText('');

        if (slug && genres?.results && platforms?.results) {
            const matchingGenre = genres.results.find(genre => matchesSlug(genre, slug));
            const matchingPlatform = platforms.results.find(platform => matchesSlug(platform, slug));

            if (matchingGenre) {
                setGenreId(matchingGenre.id);
                setPlatformId(undefined);
            } else if (matchingPlatform) {
                setPlatformId(matchingPlatform.id);
                setGenreId(undefined);
            }
        }
    }, [slug, genres, platforms, setGenreId, setPlatformId, setSearchText]);

    const isCategory = () => {
        if (!slug || !genres?.results || !platforms?.results) return false;

        return (
            genres.results.some(genre => matchesSlug(genre, slug)) ||
            platforms.results.some(platform => matchesSlug(platform, slug))
        );
    };

    return isCategory() ? <CategoryPage /> : <GameDetailPage />;
};

export default SlugRouter;
