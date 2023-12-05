import "./header.module.scss";
import Logo from "./Logo";
import MenuHandler from "./MenuHandler";
import UserDropDown from "./UserDropdown";

import styles from "./header.module.scss";

export default function Header() {
    return (
        <header className={`flex-row-around ${styles.header}`}>
            <MenuHandler />
            <Logo />
            <UserDropDown />
        </header>
    )
}