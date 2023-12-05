"use client";

import { createContext, useState } from "react";

interface MenuContextProps {
    showMenu: boolean;
    setMenuVisibility(): void;
}

const MenuContext = createContext<MenuContextProps>({
    showMenu: false,
    setMenuVisibility: () => {}
})

export function MenuProvider(props: any) {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const setMenuVisibility = () => setShowMenu(!showMenu);

    return (
        <MenuContext.Provider value={{ showMenu, setMenuVisibility }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContext;