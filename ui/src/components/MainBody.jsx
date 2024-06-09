import React, { useState } from 'react';
import Title from './MainBodyComponents/Title';
import TabLists from './TabLists';
import TableComponent from './MainBodyComponents/TableComponent';
import SlidingWindow from './MainBodyComponents/SlidingWindow';

const MainBody = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isSlidingWindowOpen, setIsSlidingWindowOpen] = useState(false);

    const handleCollectionSelect = (collection) => {
        setSelectedCollection(collection);
    };

    const handleOpenSlidingWindow = () => {
        setIsSlidingWindowOpen(true);
    };

    const handleCloseSlidingWindow = () => {
        setIsSlidingWindowOpen(false);
    };

    return (
        <>
            <Title collection={selectedCollection} />
            <button className='addRecordButton' onClick={handleOpenSlidingWindow}>Add record</button>
            <TabLists onCollectionSelect={handleCollectionSelect} />
            {selectedCollection && <TableComponent collection={selectedCollection} />}
            <SlidingWindow isOpen={isSlidingWindowOpen} onClose={handleCloseSlidingWindow} />
        </>
    );
};

export default MainBody;
