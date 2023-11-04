import React from "react";
import styles from "../styles/Home.module.css";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
const Home = () => {
	const el = useRef(null);

	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: [
				`				Welcome To
				<br />
				Find A Pet
				`,
			],
			typeSpeed: 100,
			backSpeed: 100,
			showCursor: false,
			loop: true,
		});

		return () => {
			typed.destroy();
		};
	});
	return (
		<div className={styles.home_container}>
			<div className={styles.main} ref={el}></div>
			<div className={styles.content} >
				Your One-Stop Pet Adoption and SErvice Platform
			</div>
		</div>
	);
};

export default Home;
