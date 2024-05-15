import React from 'react';

// styles
import './searchBar.scss';

// react icons
import { AiOutlineSearch } from "react-icons/ai";

// atoms
import { useAtom, useSetAtom } from 'jotai';
import { searchingFlagAtom, searchValueAtom } from '../../atoms';


// interface SearchBarProps {
//     value?: string;
//     setValue: (value: string) => void;
// }

const SearchBar: React.FC = () => {

    const [searchStr, setSearchStr] = useAtom(searchValueAtom);
    const setSearchingFlagAtom = useSetAtom(searchingFlagAtom);

    const onClickSearchBtn = () => {
        console.log('searching for: ', searchStr);
        setSearchingFlagAtom(true);
    }

    return (
        <div className='search-bar'>
            <input type='text' placeholder='Search for a movie' value={searchStr} onChange={(e) => setSearchStr(e.target.value)}/>
            <span className='icon' onClick={onClickSearchBtn}><AiOutlineSearch /></span>
        </div>
    );
};

export default SearchBar;