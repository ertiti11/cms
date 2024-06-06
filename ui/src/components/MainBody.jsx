import React, { useState } from 'react';
import Title from './MainBodyComponents/Title';
import TabLists from './TabLists';
import TableComponent from './MainBodyComponents/TableComponent';

const MainBody = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);

    const handleCollectionSelect = (collection) => {
        setSelectedCollection(collection);
    };

    return (
        <>
            <Title collection={selectedCollection} />
            <TabLists onCollectionSelect={handleCollectionSelect} />
            {selectedCollection && <TableComponent collection={selectedCollection} />}
        </>
    );
};

export default MainBody;
