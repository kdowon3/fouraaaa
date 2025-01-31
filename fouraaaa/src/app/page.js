"use client";
import HomeNav from "./components/common/homeNav";
import Banner from "./components/banner";
import styles from "./page.module.css"
import Recommend from "./components/recommend";
import Soldout from "./components/SoldOut";
import CardTab from "./components/CardTab";
import NewProductsContainer from "./components/NewProducts";
import MagSection from "./components/MagSection";
import TenEdition from "./components/TenEdition";
import Footer from "./components/common/Footer";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <HomeNav/>
        <Banner />
          <Recommend />
            <Soldout />
              <CardTab/>
                <NewProductsContainer />
                  <MagSection />
                    <TenEdition />
                    <Footer />
    </div>
  );
}
