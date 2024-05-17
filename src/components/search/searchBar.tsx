import React, { useState } from 'react';
import { geocode } from '../../utils/geocoder';
import { number2kanji } from '@geolonia/japanese-numeral'

// styles
import './searchBar.scss';

// react icons
import { AiOutlineSearch } from "react-icons/ai";

// atoms
import { useSetAtom } from 'jotai';
import { searchResultsAtom } from '../../atoms';

const zen2han = (str: string) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  })
}


const SearchBar: React.FC = () => {

  const [searchStr, setSearchStr] = useState("");
  const setSearchResultsAtom = useSetAtom(searchResultsAtom);

  const onClickSearchBtn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let searchStrN = searchStr.trim();
    searchStrN = zen2han(searchStrN);
    searchStrN = searchStrN.replace(/([1-9]+)丁目/, (_, s) => {
      return number2kanji(parseInt(s, 10)) + '丁目';
    });
    searchStrN = searchStrN.replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-');
    searchStrN = searchStrN.replace(/^(香川県)?高松市/, '');
    console.log('searching for: ', searchStrN);

    // ... 検索を行う ...
    const result = await geocode(searchStrN);
    console.log(result);
    if (!result.found) {
      setSearchResultsAtom({
        query: searchStrN,
        results: []
      });
      return;
    }

    setSearchResultsAtom({
      query: searchStrN,
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
