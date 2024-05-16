
import React from 'react';
import SearchTable from './TabListsComponents/SearchTable';
import List from './TabListsComponents/List';

class TabLists extends React.Component {
    render() {
        return (
            <>
                <SearchTable />
                <List /> 
            </>
        );
    }
}

export default TabLists;
