import React from 'react';
import logoClientSync from '../resources/logoClientSync.webp';

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <img src={logoClientSync} alt="Client Sync Logo" />
        </ul>
      </div>
    );
  }
}

export default SideBar;
