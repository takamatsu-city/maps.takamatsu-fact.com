import React, { useState } from 'react';
import { geocode } from '../../utils/geocoder';

// styles
import './searchBar.scss';

// react icons
import { AiOutlineSearch } from "react-icons/ai";

// atoms
import { useSetAtom } from 'jotai';
import { searchResultsAtom } from '../../atoms';

const SearchBar: React.FC = () => {

  const [searchStr, setSearchStr] = useState("");
  const setSearchResultsAtom = useSetAtom(searchResultsAtom);

  const onClickSearchBtn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('searching for: ', searchStr);

    // ... 検索を行う ...
    const result = await geocode(searchStr);
    console.log(result);
    if (!result.found) {
      setSearchResultsAtom({
        query: searchStr,
        results: []
      });
      return;
    }

    setSearchResultsAtom({
      query: searchStr,
      results: [
        {
          type: "Feature",
          properties: {
            address: result.formattedAddress
          },
          geometry: {
            type: "Point",
            coordinates: result.point! as [number, number]
          },
        }
      ]
    });
  }

  return (
    <form className='search-bar' onSubmit={onClickSearchBtn}>
      <input type='text' placeholder='住所検索' value={searchStr} onChange={(e) => setSearchStr(e.target.value)}/>
      <button className='search-btn' type="submit"><AiOutlineSearch className='icon'/></button>
    </form>
  );
};

export default SearchBar;
