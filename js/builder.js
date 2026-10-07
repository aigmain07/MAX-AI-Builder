"use strict";

/* =========================================================
   MAX AI BUILDER
   INTERACTIVE LOGIC
========================================================= */

const AIBuilder = {
    version: "1.0.0",
    
    state: {
        theme: "dark",
        currentBuildType: null,
        projectData: {},
        isGenerating: false
    },

    // AI Models Integration
    aiModels: {
        openai: {
            name: "OpenAI GPT-4",
            icon: "🤖",
            description: "Advanced code generation"
        },
        gemini: {
            name: "Google Gemini",
            icon: "✨",
            description: "Multi-modal AI"
        },
        claude: {
            name: "Anthropic Claude",
            icon: "🧠",
            description: "Code expert"
        },
        llama: {
            name: "Meta Llama",
            icon: "🦙",
            description: "Open source power"
        }
    },

    init: function() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupSearch();
        this.setupSidebar();
        this.setupFormHandling();
        console.log("[MAX AI Builder] Initialized v" + this.version);
    },

    setupEventListeners: function() {
        // Build type selection
        document.querySelectorAll(".build-type-card").forEach(card => {
            card.addEventListener("click", (e) => {
                const button = card.querySelector(".model-button");
                if (button) button.click();
            });
        });

        // Close buttons
        document.querySelectorAll(".close-btn").forEach(btn => {
            btn.addEventListener("click", () => this.resetBuilder());
        });

        // Theme toggle
        const themeBtn = document.getElementById("themeButton");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => this.toggleTheme());
        }

        // Search
        const searchInput = document.getElementById("globalSearch");
        if (searchInput) {
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") this.handleSearch(searchInput.value);
            });
        }
    },

    setupTheme: function() {
        const savedTheme = localStorage.getItem("maxTheme") || "dark";
        this.state.theme = savedTheme;
        document.documentElement.setAttribute("data-theme", savedTheme);
    },

    toggleTheme: function() {
        this.state.theme = this.state.theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", this.state.theme);
        localStorage.setItem("maxTheme", this.state.theme);
        console.log("[MAX] Theme: " + this.state.theme);
    },

    setupSearch: function() {
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                const search = document.getElementById("globalSearch");
                if (search) search.focus();
            }
        });
    },

    handleSearch: function(query) {
        console.log("[MAX] Searching: " + query);
        alert("Search: " + query + "\n(Integration with backend API)");
    },

    setupSidebar: function() {
        document.querySelectorAll(".sidebar-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelectorAll(".sidebar-item").forEach(el => 
                    el.classList.remove("active")
                );
                item.classList.add("active");
                console.log("[MAX] Page: " + item.textContent.trim());
            });
        });
    },

    setupFormHandling: function() {
        const form = document.getElementById("aiBuilderForm");
        if (form) {
            form.addEventListener("submit", (e) => this.handleFormSubmit(e));
        }
    },

    // Build type selection
    selectBuildType: function(type) {
        this.state.currentBuildType = type;
        
        // Hide all conditional fields
        document.querySelectorAll(".conditional-fields").forEach(field => {
            field.style.display = "none";
        });

        // Show relevant conditional fields
        const fieldMap = {
            "website": "websiteFields",
            "android": "androidFields",
            "saas": "saasFields",
            "dashboard": "dashboardFields"
        };

        if (fieldMap[type]) {
            document.getElementById(fieldMap[type]).style.display = "flex";
        }

        // Update label
        const labels = {
            "website": "Website",
            "android": "Android App",
            "saas": "SaaS App",
            "dashboard": "Dashboard"
        };
        document.getElementById("buildTypeLabel").textContent = labels[type] || "Project";

        // Show form section
        document.getElementById("hero-section").style.display = "none";
        document.getElementById("builder-form-section").style.display = "block";
        
        // Scroll to form
        setTimeout(() => {
            document.getElementById("builder-form-section").scrollIntoView({ behavior: "smooth" });
        }, 100);

        console.log("[MAX] Selected Build Type: " + type);
    },

    // Form submission
    handleFormSubmit: function(e) {
        e.preventDefault();

        if (this.state.isGenerating) return;

        this.state.isGenerating = true;
        const submitBtn = document.querySelector(".builder-form button[type='submit']");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "⏳ Generating...";
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(document.getElementById("aiBuilderForm"));
        this.state.projectData = Object.fromEntries(formData.entries());
        this.state.projectData.buildType = this.state.currentBuildType;

        console.log("[MAX] Form Submitted:", this.state.projectData);

        // Simulate AI generation with actual API call placeholder
        this.generateProjectWithAI(this.state.projectData).then(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.state.isGenerating = false;
        });
    },

    // AI Generation with GitHub Actions
    generateProjectWithAI: function(data) {
        return new Promise((resolve) => {
            // Show generating state
            document.getElementById("builder-form-section").style.display = "none";
            document.getElementById("resultSection").style.display = "block";

            // Update result display
            document.getElementById("resultProjectName").textContent = data.projectName;
            
            const typeLabel = {
                "website": "🌐 Website",
                "android": "📱 Android App",
                "saas": "☁️ SaaS Application",
                "dashboard": "📊 Dashboard"
            };
            document.getElementById("resultProjectType").textContent = typeLabel[data.buildType] || "Project";

            // Generate file tree
            this.generateFileTree(data);

            // Simulate GitHub Actions trigger
            this.triggerGitHubAction(data).then(() => {
                console.log("[MAX] Project generated successfully");
                resolve();
            });

            // Scroll to result
            setTimeout(() => {
                document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
            }, 500);
        });
    },

    // Generate project file structure
    generateFileTree: function(data) {
        const treeContent = document.getElementById("fileTreeContent");
        let fileTree = "";

        if (data.buildType === "website") {
            fileTree = `
                <div style="font-family: monospace; color: #94A3B8;">
                    📁 ${data.projectName}/
                    <div style="margin-left: 20px;">
                        📁 src/
                        <div style="margin-left: 20px;">
                            📄 App.jsx<br>
                            📄 main.jsx<br>
                            📁 components/<br>
                            📁 styles/
                        </div>
                        📁 public/<br>
                        📄 index.html<br>
                        📄 package.json<br>
                        📄 vite.config.js<br>
                        📄 README.md
                    </div>
                </div>
            `;
        } else if (data.buildType === "android") {
            fileTree = `
                <div style="font-family: monospace; color: #94A3B8;">
                    📁 ${data.projectName}/
                    <div style="margin-left: 20px;">
                        📁 app/
                        <div style="margin-left: 20px;">
                            📁 src/main/
                            <div style="margin-left: 20px;">
                                📁 java/${data.androidPackage?.replace(/\./g, '/')}/
                                <div style="margin-left: 20px;">
                                    📄 MainActivity.kt<br>
                                    📄 AppViewModel.kt
                                </div>
                                📁 res/
                                <div style="margin-left: 20px;">
                                    📁 layout/<br>
                                    📁 values/<br>
                                    📁 drawable/
                                </div>
                            </div>
                            📄 build.gradle
                        </div>
                        📄 build.gradle<br>
                        📄 settings.gradle<br>
                        📄 README.md
                    </div>
                </div>
            `;
        } else if (data.buildType === "saas") {
            fileTree = `
                <div style="font-family: monospace; color: #94A3B8;">
                    📁 ${data.projectName}/
                    <div style="margin-left: 20px;">
                        📁 backend/
                        <div style="margin-left: 20px;">
                            📁 app/
                            <div style="margin-left: 20px;">
                                📁 models/<br>
                                📁 routes/<br>
                                📁 middleware/
                            </div>
                            �� main.py<br>
                            📄 requirements.txt
                        </div>
                        📁 frontend/
                        <div style="margin-left: 20px;">
                            📁 src/<br>
                            📄 package.json
                        </div>
                        📄 docker-compose.yml
                    </div>
                </div>
            `;
        }

        treeContent.innerHTML = fileTree;
    },

    // Trigger GitHub Actions
    triggerGitHubAction: function(data) {
        return new Promise((resolve) => {
            console.log("[MAX] Triggering GitHub Actions...");
            console.log("[MAX] Project Data:", data);

            // GitHub Actions payload
            const payload = {
                project_name: data.projectName,
                project_type: data.buildType,
                description: data.projectDescription,
                features: data.projectFeatures,
                ...data
            };

            // This would trigger the GitHub Actions workflow
            console.log("[MAX] GitHub Actions Payload:", payload);
            console.log("[MAX] Workflow: build-" + data.buildType + ".yml");

            // Simulate processing
            setTimeout(() => {
                console.log("[MAX] Project built successfully via GitHub Actions");
                resolve();
            }, 2000);
        });
    },

    // Download project
    downloadProject: function() {
        const projectName = this.state.projectData.projectName || "project";
        const filename = projectName.toLowerCase().replace(/\s+/g, "-") + ".zip";
        
        console.log("[MAX] Downloading: " + filename);
        alert("Download started: " + filename + "\n\nIn production, this would download a ZIP file from GitHub Actions artifacts.");
    },

    // Preview project
    previewProject: function() {
        console.log("[MAX] Opening Live Preview");
        alert("Live Preview would open in a new window.\n\nProject: " + this.state.projectData.projectName);
    },

    // Deploy project
    deployProject: function() {
        const options = [
            "🚀 Deploy to Vercel",
            "🚀 Deploy to Netlify",
            "🚀 Deploy to GitHub Pages",
            "🚀 Deploy to Firebase"
        ];

        console.log("[MAX] Deploy Options Available");
        alert("Select deployment platform:\n\n" + options.join("\n"));
    },

    // Reset builder
    resetBuilder: function() {
        this.state.currentBuildType = null;
        this.state.projectData = {};
        
        document.getElementById("hero-section").style.display = "block";
        document.getElementById("builder-form-section").style.display = "none";
        document.getElementById("resultSection").style.display = "none";

        const form = document.getElementById("aiBuilderForm");
        if (form) form.reset();

        document.getElementById("hero-section").scrollIntoView({ behavior: "smooth" });
        console.log("[MAX] Builder reset");
    }
};

/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

function selectBuildType(type) {
    AIBuilder.selectBuildType(type);
}

function scrollToBuilder(type) {
    AIBuilder.selectBuildType(type);
}

function downloadProject() {
    AIBuilder.downloadProject();
}

function previewProject() {
    AIBuilder.previewProject();
}

function deployProject() {
    AIBuilder.deployProject();
}

function resetBuilder() {
    AIBuilder.resetBuilder();
}

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    AIBuilder.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIBuilder;
}
