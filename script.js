const url = "https://botw-compendium.herokuapp.com/api/v3/compendium"
const search = document.querySelector(".search");
const container = document.querySelector(".container")

//Testing connection to API
fetch(url)
    .then(res => res.json())
    .then(res => console.log("Working", res))
    .catch(err => console.log("Not working", err))

    search.addEventListener("submit", handleSubmit);
    function handleSubmit(e) {
        e.preventDefault(); 
    
        const {searchCompendium} = e.target.elements;
    
        fetch (`${url}/entry/${searchCompendium.value}`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                displayCard(res);
            })
            .catch(err => console.log("We searched all of Hyrule, but could not find this."))
            
            searchCompendium.value = '';
    }
    
        function displayCard(compendium) {
            container.innerHTML =  ''
            console.log(compendium.data.name);
        
            const mockHTML = `
            <div class="card_info">
                <h1 class="object_name">${compendium.data.name}</h1>
                <p class="locations">Locations: ${compendium.data.common_locations}</p>
                <p class="category">Category: ${compendium.data.category}</p>
                <p class="object_descrip"> Description: ${compendium.data.description}</p>
            </div>
            <div class="card_image">
                <img class="name_image" src=${compendium.data.image} alt=${compendium.data.name}>
            </div>`
        
            container.insertAdjacentHTML("beforeend", mockHTML);
        
        }

        const navHamburger = document.querySelector(".nav_hamburger")
        const linksContainer = document.querySelector(".nav_menu")
        const links = document.querySelectorAll(".nav_link")

        navHamburger.addEventListener("click", () => {
            linksContainer.classList.toggle("active");
            navHamburger.classList.toggle("active");
        });

        window.addEventListener("resize", () => {
            if (window.matchMedia("(max-width: 400px)").matches) {
                closeMenu();
            }
        });

        if (window.matchMedia("(max-width: 400px)").matches) {
            closeMenu();
        }

        function closeMenu() {
            links.forEach((link) => {
                link.addEventListener("click", () => {
                    linksContainer.classList.remove("active");
                    navHamburger.classList.remove("active");
                });
            });
        }
          
       
