import * as React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Episode, SeriesData, TVMazeRes } from './_types';

function App() {
  const [query, setQuery] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<TVMazeRes>();
  const inputRef = React.useRef(null);

  const handleSubmit = React.useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        fetch('http://localhost:3000/api/tvshowsdata', {
          method: 'POST',
          body: `https://api.tvmaze.com/singlesearch/shows?q=${inputRef.current.value}&embed=episodes`,
        })
          .then(res => {
            if (res.status === 200) setQuery('');
            return res.json();
          })
          .then(data => {
            inputRef.current.value = '';
            setData(data);
          });
      } catch (e: any) {
        setError(e.message);
      }
    },
    [inputRef]
  );

  function getSeasonData(episodesData: Episode[] | undefined) {
    const distinctSeasons = [...new Set(episodesData?.map(e => e.season))]
      .length;

    const seasonsArray = Object.entries(
      episodesData?.reduce((r, a) => {
        r[a.season] = r[a.season] || [];
        r[a.season].push(a);
        return r;
      }, Object.create(null)) || []
    )
      .map(s => {
        return s[1];
      })
      .map(season => {
        return (
          Math.round(
            (season.reduce((a, b) => a + b.rating.average, 0) / season.length) *
              100
          ) / 100
        );
      });

    return { distinctSeasons, seasonsArray };
  }

  function RenderChart({ series_data }: SeriesData) {
    if (!series_data) return <></>;

    const { distinctSeasons, seasonsArray } = getSeasonData(
      series_data._embedded.episodes
    );

    const data = seasonsArray.map((s, i) => ({ season: i + 1, rating: s }));

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>{series_data.name}</p>
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='season' />
          <YAxis type='number' domain={[0, 10]} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='rating'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>TV Shows Rating Guide</h1>

        <input ref={inputRef} type='text' style={{ width: '350px' }}></input>
        <button type='submit' style={{ width: '100px', marginTop: '10px' }}>
          Submit
        </button>
      </form>
      <div style={{ marginTop: '50px' }}>
        <RenderChart series_data={data} />
      </div>
    </div>
  );
}

export default App;
