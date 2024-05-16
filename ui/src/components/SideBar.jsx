import React from 'react';

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li><a href="#">DB</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Config</a></li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
