"use strict";


/* =========================================================
   MAX AI STUDIO
   APPLICATION FOUNDATION
========================================================= */

const MAX = {

    version: "1.0.0",

    state: {
        theme: "dark",
        currentPage: "Dashboard"
    }

};


/* =========================================================
   DOM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initSidebar();

        initTopNavigation();

        initSearch();

        initTheme();

        initButtons();

    }
);


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

function initSidebar() {

    const items =
        document.querySelectorAll(
            ".sidebar-item"
        );

    items.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                items.forEach(
                    element =>
                        element.classList.remove(
                            "active"
                        )
                );

                item.classList.add("active");

                MAX.state.currentPage =
                    item
                        .querySelector("span:last-child")
                        ?.textContent
                        .trim() ||
                    "Dashboard";

                console.log(
                    `[MAX] Page: ${MAX.state.currentPage}`
                );

            }
        );

    });

}


/* =========================================================
   TOP NAVIGATION
========================================================= */

function initTopNavigation() {

    const links =
        document.querySelectorAll(
            ".top-nav-link"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                links.forEach(
                    element =>
                        element.classList.remove(
                            "active"
                        )
                );

                link.classList.add("active");

            }
        );

    });

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        );

    if (!search) {
        return;
    }


    search.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            const query =
                search.value.trim();

            if (!query) {
                return;
            }

            console.log(
                `[MAX] Search: ${query}`
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search.focus();

            }

        }
    );

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const button =
        document.getElementById(
            "themeButton"
        );

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            MAX.state.theme =
                MAX.state.theme === "dark"
                    ? "light"
                    : "dark";

            /*
             * Full theme system will be connected
             * later through CSS variables.
             */

            console.log(
                `[MAX] Theme: ${MAX.state.theme}`
            );

        }
    );

}


/* =========================================================
   GLOBAL BUTTON EVENTS
========================================================= */

function initButtons() {

    document
        .querySelectorAll(
            ".primary-button, " +
            ".outline-button, " +
            ".model-button, " +
            ".quick-card button, " +
            ".gradient-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.textContent
                            .replace(/\s+/g, " ")
                            .trim();

                    console.log(
                        `[MAX] Action: ${action}`
                    );

                }
            );

        });

}
