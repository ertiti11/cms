
import React from 'react';
import Title from './MainBodyComponents/Title';
import TableComponent from './MainBodyComponents/TableComponent';

class MainBody extends React.Component {
    render() {
        return (
            <>
                <Title />
                {/* <Search /> */}
                <TableComponent />
            </>
        );
    }
}

export default MainBody;
