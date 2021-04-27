import React,{useEffect,useState} from 'react'
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import Loader from './Loader';
import {helpHttp} from "../helpers/helpHttp";


const SongSearch = () => {
    const [search, setSearch] = useState(null);
    const [lyric, setLyric] = useState(null);
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(search === null) return;
        
        const fetchData = async () => {
            const {artist, song} = search;

            let artistUrl = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

            

            setLoading(true);

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artistUrl), 
                helpHttp().get(songUrl),
            ]);
            
            setLoading(false);
            setBio(artistRes);
            setLyric(songRes);

        } 

        fetchData();
    }, [search]);

    const handleSearch = (data) => {
        setSearch(data);
    } 

    return (
        <div>
            <h1>Song search</h1>
            <article className="grid-1-3">
                <SongForm handleSearch = {handleSearch} />
                {loading && <Loader/>}
                {search && !loading && <SongDetails search = {search} lyric = {lyric} bio = {bio}/> }
            </article>
        </div>
    )
}

export default SongSearch;
