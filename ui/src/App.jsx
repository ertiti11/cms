import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import MainBody from "./components/MainBody";
import TabLists from "./components/TabLists";

export default function App() {
    return (
        <>
            <SideBar />
            <TabLists />
            <MainBody />
            {/*
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
            */}
        </>
        
    );
}
