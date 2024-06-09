import React, { useState } from 'react';
import Title from './MainBodyComponents/Title';
import TabLists from './TabLists';
import TableComponent from './MainBodyComponents/TableComponent';
import SlidingWindow from './MainBodyComponents/SlidingWindow';

const MainBody = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isSlidingWindowOpen, setIsSlidingWindowOpen] = useState(false);

    const handleCollectionSelect = (collection) => {
        console.log("Collection selected:", collection);
        setSelectedCollection(collection);
        setIsSlidingWindowOpen(true); // Asegúrate de abrir SlidingWindow cuando se selecciona una colección
    };

    const handleOpenSlidingWindow = () => {
        setIsSlidingWindowOpen(true);
    };

    const handleCloseSlidingWindow = () => {
        setIsSlidingWindowOpen(false);
    };

    console.log("Selected Collection:", selectedCollection); // Añadir este log

    return (
        <>
            <Title collection={selectedCollection} />
            <button className='addRecordButton' onClick={handleOpenSlidingWindow}>Add record</button>
            <TabLists onCollectionSelect={handleCollectionSelect} />
            {selectedCollection && <TableComponent collection={selectedCollection} />}
            {isSlidingWindowOpen && (
            <SlidingWindow 
                isOpen={isSlidingWindowOpen} 
                onClose={handleCloseSlidingWindow} 
                collection={selectedCollection}
            />
            )}
        </>
    );
};

export default MainBody;
