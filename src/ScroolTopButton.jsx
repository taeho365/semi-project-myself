import { useEffect, useState } from "react";
import "./ScroolTopButton.css"

export default function ScroolTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect (() => {
        const handleScroll = () => {
            if(window.scrollY > 300) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const scrolltoTop = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return (
        <>
            {showButton && (
                <button className="scroll-top-btn" onClick={scrolltoTop}>
                    <img src="/images/608336.png" />
                </button>
            )}
        </>
    )
}