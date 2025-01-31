"use client";

import ShopNav from "./components/header";
import Products from "./components/products";
import styles from "./page.module.css"


export default function ShopPage() {
  return (
    <div className={styles.container}>
      <ShopNav/>
      <Products/>
    </div>
  );
}