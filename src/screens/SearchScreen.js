import React, {useState} from 'react';
import {Text, ScrollView} from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import useResults from "../hooks/useResults";

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    }

    return (
        <>
            <SearchBar searchText={searchText}
                       onSearchChanged={(text) => setSearchText(text)}
                       onTextSubmit={() => searchApi(searchText)}
            />
            {
                errorMessage ? <Text>{errorMessage}</Text> : null
            }
            <ScrollView showsVerticalScrollIndicator={false}>
                <ResultsList results={filterResultsByPrice('$')} title='Cost Effective'/>
                <ResultsList results={filterResultsByPrice('$$')} title='Bit Pricer'/>
                <ResultsList results={filterResultsByPrice('$$$')} title='Big Spender'/>
            </ScrollView>
        </>
    )
}

export default SearchScreen
