document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            id: "wellspent",
            url: "https://devpost.com/software/wellspent",
        },
        {
            id: "patriot-help-services",
            url: "https://devpost.com/software/patriot-help-services",
        },
        {
            id: "medicognize",
            url: "https://devpost.com/software/medicognize",
        },
    ];

    projects.forEach(project => {
        fetchProjectDetails(project.id, project.url);
    });
});

function fetchProjectDetails(elementId, projectUrl) {
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(projectUrl);

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, "text/html");

            const projectTitle = doc.querySelector(".software-page-header__title").innerText;
            const projectDescription = doc.querySelector(".software-page-header__subtitle").innerText;
            const projectImage = doc.querySelector(".gallery-item img").src;

            const projectElement = document.getElementById(elementId);
            projectElement.innerHTML = `
                <h3>${projectTitle}</h3>
                <img src="${projectImage}" alt="${projectTitle}" width="100%">
                <p>${projectDescription}</p>
                <a href="${projectUrl}" target="_blank">View project</a>
            `;
        })
        .catch(error => console.error("Error fetching project details:", error));
}
