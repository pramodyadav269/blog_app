import React from 'react'
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";

function LayoutHome() {
    return (
        <>
            <HeaderLayoutHome />
            <Outlet />
            <FooterLayoutHome />
        </>
    )
}
function LayoutDashboard() {
    return (
        <>
            <HeaderLayoutDashboard />
            <Outlet />
            <FooterLayoutDashboard />
        </>
    )
}

function HeaderLayoutHome() {
    return (
        <>
            <div>This is Home header template</div>
        </>
    )
}
function FooterLayoutHome() {
    return (
        <>
            <div>This is Home Footer template</div>
        </>
    )
}

function HeaderLayoutDashboard() {
    return (
        <>
            <div>This is Dashboard header template</div>
        </>
    )
}
function FooterLayoutDashboard() {
    return (
        <>
            <div>This is Dashboard Footer template</div>
        </>
    )
}


function Home() {
    return (
        <div>Home</div>
    )
}
function Dashboard() {
    return (
        <div>Dashboard</div>
    )
}

function App_loyout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutHome />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path="/" element={<LayoutDashboard />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App_loyout