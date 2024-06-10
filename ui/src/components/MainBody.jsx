import React, { useState } from 'react';
import Title from './MainBodyComponents/Title';
import SideBar from './SideBar';
import TableComponent from './MainBodyComponents/TableComponent';
import NewTable from './MainBodyComponents/NewTable';
import SlidingWindow from './MainBodyComponents/SlidingWindow';

const MainBody = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isSlidingWindowOpen, setIsSlidingWindowOpen] = useState(false);

    const handleCollectionSelect = (collection) => {
        console.log("Collection selected:", collection);
        setSelectedCollection(collection);
    };

    const handleCloseSlidingWindow = () => {
        setIsSlidingWindowOpen(false);
    };

    console.log("Selected Collection:", selectedCollection);

    return (
        <>
            <SideBar onCollectionSelect={handleCollectionSelect} />
            <div id='titleAndTable'>
                <h1>ClientSync</h1>
                {selectedCollection && <NewTable collection={selectedCollection} />}
            </div>
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
