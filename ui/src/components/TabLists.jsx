import React, { useState } from 'react';
import SearchTable from './TabListsComponents/SearchTable';
import List from './TabListsComponents/List';
import TableComponent from './MainBodyComponents/TableComponent';
import '../styles/TabListsStyles/list.css';

const TabLists = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);

    const handleCollectionClick = (collection) => {
        setSelectedCollection(collection);
    };

    return (
        <>
            <SearchTable />
            <List onCollectionClick={handleCollectionClick} />
            {selectedCollection && <TableComponent collection={selectedCollection} />}
        </>
    );
};

export default TabLists;