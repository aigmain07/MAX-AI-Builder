/* =========================================
   MAX AI STUDIO
   GLOBAL APPLICATION FOUNDATION
========================================= */

"use strict";


/* =========================================
   APP STATE
========================================= */

const MAX_APP = {

    name: "MAX AI Studio",

    version: "0.1.0",

    theme: "dark",

    connection: {
        status: "online"
    },

    user: {
        plan: "pro"
    }

};


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeButtons();

    initializeSearch();

    initializeStatus();

});


/* =========================================
   NAVIGATION
========================================= */

function initializeNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

        });

    });


    const topLinks =
        document.querySelectorAll(".top-link");

    topLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            topLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

}


/* =========================================
   BUTTON SYSTEM
========================================= */

function initializeButtons() {

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const label =
                button.textContent.trim();

            console.log(
                `[MAX] Button clicked: ${label}`
            );

        });

    });

}


/* =========================================
   SEARCH
========================================= */

function initializeSearch() {

    const searchInput =
        document.querySelector(
            ".search-box input"
        );

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                const query =
                    searchInput.value.trim();

                if (!query) {
                    return;
                }

                console.log(
                    `[MAX] Searching for: ${query}`
                );

            }

        }
    );


    /* Ctrl + K */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                searchInput.focus();

            }

        }
    );

}


/* =========================================
   SYSTEM STATUS
========================================= */

function initializeStatus() {

    console.log(
        `%cMAX AI Studio`,
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        `Version: ${MAX_APP.version}`
    );

    console.log(
        `System: ${MAX_APP.connection.status}`
    );

}
