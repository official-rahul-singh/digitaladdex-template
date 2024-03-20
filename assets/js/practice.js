document.addEventListener("DOMContentLoaded", () => {
    const e = document.querySelector("header"),
        t = document.querySelector("header ul"),
        o = document.querySelector(".search-icon"),
        n = document.querySelector(".search-form"),
        c = document.querySelectorAll(".dropdown"),
        s = document.querySelector(".compact-header"),
        l = document.querySelector("#table_of_content"),
        d = document.getElementById("scroll_to_top"),
        r = document.querySelector(".cancel-btn"),
        i = document.querySelector(".toggle-slide-btn");
    function a() {
        const e = document.body.style.overflow;
        document.body.style.overflow = "hidden" === e ? "auto" : "hidden";
    }
    if (window.matchMedia("(max-width: 1024px)")?.matches || !1) {
        function u() {
            let e = document.querySelector("header");
            if ((t.classList.toggle("show-ul"), t.classList.contains("show-ul"))) {
                let o = document.createElement("div");
                e.appendChild(o),
                    o.classList.add("doc-overlay"),
                    a(),
                    o.addEventListener("click", function (e) {
                        t.classList.remove("show-ul"), o.remove(), a();
                    });
            } else document.querySelector(".doc-overlay").remove(), a();
        }
        i?.addEventListener("click", u), r?.addEventListener("click", u);
        let g = !0;
        const v =
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
            p =
                '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512" fill="#000"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
        function m(e) {
            e.preventDefault(), e.stopPropagation();
            let t = this;
            "A" === e.target.tagName && (t = e.target.parentNode),
                c.forEach((e) => {
                    if (e !== t && !e.contains(t)) {
                        e.classList.remove("show-dropdown");
                        e.querySelector("ul").classList.remove("show");
                    }
                }),
                t.classList.toggle("show-dropdown");
            t.querySelector("ul").classList.toggle("show");
        }
        o &&
            o.addEventListener("click", () => {
                (o.innerHTML = g ? p : v), (g = !g), n.classList.toggle("search-bar-show");
            }),
            c.forEach((e) => {
                e.addEventListener("click", m);
            }),
            document.addEventListener("click", (e) => {
                [...c].some((t) => t.contains(e.target)) ||
                    c.forEach((e) => {
                        e.classList.remove("show-dropdown");
                    });
            });
    }
    let h = 0;
    if (
        (window.addEventListener("scroll", () => {
            const t = window.pageYOffset || document.documentElement.scrollTop;
            (e.style.top = t > h ? "-70px" : "0"), (h = t <= 0 ? 0 : t);
        }),
        s)
    ) {
        let L = 0;
        (s.style.display = "none"),
            window.addEventListener("scroll", () => {
                const e = window.pageYOffset || document.documentElement.scrollTop;
                (s.style.top = e >= L ? "0px" : "70px"), (s.style.display = e > 200 ? "block" : "none"), (L = e <= 0 ? 0 : e);
                const t = (e / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
                document.getElementById("myBar").style.width = t + "%";
            }),
            l &&
                (l.addEventListener("click", () => {
                    l.classList.toggle("show-tab");
                }),
                document.addEventListener("click", (e) => {
                    l.contains(e.target) || l.classList.remove("show-tab");
                }),
                window.addEventListener("scroll", () => {
                    const e = document.querySelectorAll(".table-list li");
                    for (let t = 0; t < e.length; t++) {
                        const o = e[t],
                            n = o.querySelector("a").getAttribute("href").substring(1),
                            c = document.getElementById(n).getBoundingClientRect();
                        c.top >= 0 && c.bottom <= window.innerHeight ? o.classList.add("active-li") : o.classList.remove("active-li");
                    }
                }));
    }
    if (d) {
        window.addEventListener("scroll", function () {
            document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ? d.classList.add("scroll-active") : d.classList.remove("scroll-active");
        }),
            d.addEventListener("click", () => {
                (document.body.scrollTop = 0), (document.documentElement.scrollTop = 0);
            });
    }
    const w = document.getElementById("cs_nlfr");
    w &&
        w.addEventListener("submit", function (e) {
            e.preventDefault();
            var t = new FormData(this);
            t.append("action", "cs_newsletter"),
                t.append("nl_nonce", csFrontData.nl_nonce),
                fetch(csFrontData.admin_ajax, { method: "POST", body: t })
                    .then((e) => e.json())
                    .then((e) => {
                        e.success && (document.querySelector(".subscribe").innerHTML = e.message);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
        });
});
