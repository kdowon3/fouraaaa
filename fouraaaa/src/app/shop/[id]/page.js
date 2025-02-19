"use client";

import styles from "./page.module.css"
import Footer from "../../components/common/Footer";
import DetailNav from "./components/header";
import InfoTab from "./components/Info";
import Detail from "./components/detail";
import SameProducer from "./components/MoreProduct";


export default function ShopPage() {
  return (
    <div className={styles.container}>
        <DetailNav />
        <InfoTab/>
        <Detail/>
        <SameProducer/>
      <Footer/>
    </div>
  );
}