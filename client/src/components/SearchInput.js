import React, {useState} from 'react'

const SearchInput = ({searchMusic}) => {
    const [search,setSearch] = useState("")
    return (
        <div className="flex center p-2">
            <label htmlFor="search">Search:</label>
            <input className="search-input" type="text" name="search" id="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Artist/Track"/>
            <button className="search btn flex center" onClick={()=>{searchMusic(search); setSearch("")}}>Search</button>
        </div>
    )
}

export default SearchInput
