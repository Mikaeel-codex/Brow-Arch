import { useEffect, useState } from 'react';

export function useGoogleReviews() {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    const apiKey  = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      try {
        const res = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'reviews',
            },
          }
        );

        if (!res.ok) throw new Error(`Places API error: ${res.status}`);

        const data = await res.json();

        const mapped = (data.reviews || [])
          .filter(r => r.rating >= 4)
          .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
          .slice(0, 3)
          .map((r, i) => ({
            id:     i + 1,
            name:   r.authorAttribution?.displayName ?? 'Google Reviewer',
            rating: r.rating,
            date:   r.relativePublishTimeDescription ?? '',
            text:   r.text?.text ?? '',
            treatment: null,
          }));

        setReviews(mapped);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}
