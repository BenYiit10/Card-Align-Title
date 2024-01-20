
var blogCards = document.querySelectorAll(".blog .card")
if(blogCards.length) {
    let settings = {
        // 1 - Select your cards
        trigger:".blog .card",
        // 2 - Select your responsive property 
        breakpoints: {
            // Works according to min-width
            1024: {
                // Number of columns in container for screens 1024 and above
                columns:3
            },
            768:{
                columns:2
            }
        }
    }
    // 3 - Run alignCards function with your custom settings 
    alignCards(settings);
}

// For more example
var newsCards = document.querySelectorAll(".news .card")
if(newsCards.length) {
    let settings = {
        trigger:".news .card",
        breakpoints: {
            1300: {
                columns:4
            },
            1024: {
                columns:3
            },
            768:{
                columns:2
            }
        }
    }

    alignCards(settings);
}