import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/sidebar.css'
import './styles/mainBody.css'
import './styles/tabLists.css'
import './styles/MainBodyStyles/Title.css'
import './styles/MainBodyStyles/Search.css'
import './styles/MainBodyStyles/Table.css'
import './styles/MainBodyStyles/table/customTable.css'
import './styles/TabListsStyles/list.css'
import './styles/TabListsStyles/searchTable.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
