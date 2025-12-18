"use client";
import { useEffect } from "react";

export default function BookingInlineEmbed({
    namespace = "app-development-strategy-session",
    layout = "month_view",
    theme = "light",
    hideEventTypeDetails = true,
    style = { width: "100%", height: "100%", overflow: "scroll" },
    className = ""
}) {
    const elementId = `my-cal-inline-${namespace}`;
    const calLink = `maximus-shurr/${namespace}`;
    const brandColor = "#FFBA4A";

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
        
        Cal("init", namespace, {origin:"https://app.cal.com"});
        
        Cal.ns[namespace]("inline", {
            elementOrSelector: `#${elementId}`,
            config: { layout, theme },
            calLink: calLink,
        });
        
        Cal.ns[namespace]("ui", {
            "cssVarsPerTheme": {
                "light": { "cal-brand": brandColor },
                "dark": { "cal-brand": brandColor }
            },
            "hideEventTypeDetails": hideEventTypeDetails,
            "layout": layout
        });
    }, [namespace, calLink, layout, theme, hideEventTypeDetails, elementId]);

    return (
        <div 
            style={style} 
            className={className}
            id={elementId}
        />
    );
}