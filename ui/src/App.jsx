import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import MainBody from "./components/MainBody";
import TabLists from "./components/TabLists";
import NewTable from "./components/MainBodyComponents/NewTable";

export default function App() {
    return (
        <>
            <MainBody />

            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NewTable collection={"users"} />} />
                </Routes>
            </BrowserRouter> */}
        </>
    );
}
