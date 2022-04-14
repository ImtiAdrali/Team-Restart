const currentLinks = document.querySelectorAll(".article p");
const currentArticles = document.querySelectorAll(".show .article-show-container");


currentLinks.forEach((currentLink) => {
    currentLink.addEventListener("click", (e) => {
        const currentLinkId = e.target.id;
        currentArticles.forEach((currentArticle) => {
            if (currentArticle.id === currentLinkId) {
                currentArticle.classList.remove("anactive");
                currentArticle.classList.add("active");
            }else{
                currentArticle.classList.add("anactive");
            }
        })
    })
})