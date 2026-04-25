import { Outlet } from "react-router-dom";
import { Drawer } from "../Drawer/Drawer";

export const LayoutWithDrawer = () => {
    return (
        <div style={{display: "flex"}}>
            <div style={{height: "100vh", display: "flex"}}>
                <Drawer />
            </div>
            <main style={{flex: 1, overflow: "auto"}}>
                <Outlet />
            </main>
        </div>
    );
};