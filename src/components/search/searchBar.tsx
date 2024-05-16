import React, { useState } from 'react';

// styles
import './searchBar.scss';

// react icons
import { AiOutlineSearch } from "react-icons/ai";

// atoms
import { useAtom, useSetAtom } from 'jotai';
import { searchResultsAtom } from '../../atoms';


// interface SearchBarProps {
//     value?: string;
//     setValue: (value: string) => void;
// }

const SearchBar: React.FC = () => {

    const [searchStr, setSearchStr] = useState("");
    const setSearchResultsAtom = useSetAtom(searchResultsAtom);

    const onClickSearchBtn: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
        console.log('searching for: ', searchStr);

        // ... 検索を行う ...

        setSearchResultsAtom({
          query: searchStr,
          center: [0, 0],
          results: undefined
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
