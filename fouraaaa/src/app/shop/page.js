"use client";

import ShopNav from "./components/header";
import Products from "./components/products";
import styles from "./page.module.css"
import Footer from "../components/common/Footer";


export default function ShopPage() {
  return (
    <div className={styles.container}>
      <ShopNav/>
      <Products/>
      <Footer/>
    </div>
  );
}