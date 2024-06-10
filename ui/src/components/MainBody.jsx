import React, { useState } from "react";
import Title from "./MainBodyComponents/Title";
import TabLists from "./TabLists";
import TableComponent from "./MainBodyComponents/TableComponent";
import NewTable from "./MainBodyComponents/NewTable";
import SlidingWindow from "./MainBodyComponents/SlidingWindow";

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
            <Title collection={selectedCollection} />
            <TabLists onCollectionSelect={handleCollectionSelect} />
            {selectedCollection && <NewTable collection={selectedCollection} />}
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
