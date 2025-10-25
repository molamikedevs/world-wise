import { Outlet } from "react-router-dom";
import AppNavigation from "../../navigation/app-navigation/app-navigation";
import Footer from "../footer/footer";
import Logo from "../logo/logo";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNavigation />
      <Outlet />
      <Footer />
    </aside>
  );
}
