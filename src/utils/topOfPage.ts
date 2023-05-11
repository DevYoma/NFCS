import { useEffect } from "react";

export default function TopOfPage(){
    useEffect(() => {
        window.scrollTo(50, 0)
    }, []);
}