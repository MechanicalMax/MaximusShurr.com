"use client";
import { useEffect } from "react";

export default function ZeroAdminLabBooking() {
    useEffect(() => {
        (function (C, A, L) { 
            let p = function (a, ar) { a.q.push(ar); }; 
            let d = C.document; 
            C.Cal = C.Cal || function () { 
                let cal = C.Cal; 
                let ar = arguments; 
                if (!cal.loaded) { 
                    cal.ns = {}; 
                    cal.q = cal.q || []; 
                    d.head.appendChild(d.createElement("script")).src = A; 
                    cal.loaded = true; 
                } 
                if (ar[0] === L) { 
                    const api = function () { p(api, arguments); }; 
                    const namespace = ar[1]; 
                    api.q = api.q || []; 
                    if(typeof namespace === "string"){
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar); 
                    return;
                } 
                p(cal, ar); 
            }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        Cal("init", "zeroadminlab", {origin:"https://app.cal.com"});
        
        Cal.ns["zeroadminlab"]("inline", {
            elementOrSelector:"#my-cal-inline-zeroadminlab",
            config: {"layout":"week_view","theme":"auto"},
            calLink: "maximus-shurr/zeroadminlab",
        });
        
        Cal.ns["zeroadminlab"]("ui", {
            "cssVarsPerTheme":{
                "light":{"cal-brand":"#FFBA4A"},
                "dark":{"cal-brand":"#FFBA4A"}
            },
            "hideEventTypeDetails":true,
            "layout":"column_view"
        });
    }, []);

    return (
        <div style={{width:"100%",height:"100%",overflow:"scroll"}} id="my-cal-inline-zeroadminlab"></div>
    );
}