import React from "react";
import NavbarComponet from "../componets/NavbarComponet";
// import FooterComponet from "../componets/FooterComponet";
import ContentHome from "../componets/ContentHome/ContentHome";

export default function Home(){
    return(
        <div>
            <NavbarComponet/>
            <ContentHome/>
            {/* <FooterComponet/> */}
        </div>
    )
}