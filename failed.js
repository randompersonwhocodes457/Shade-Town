// import { sunglassesOptions } from "./sunglasses"
let {models, lenses, frames} = sunglassesOptions

let sunglasses = {
    model: models[0],
    lense: lenses[0],
    frame: frames[0]  
}


let productDetailsEl = document.getElementById("productDetails")
let productImage = document.getElementById("productImage")
let productFrames = document.getElementsByClassName("product-image_frame")[0]
let productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

// function setSunglasses(sunglassesNew = sunglasses) {
//     return sunglassesNew
// }

function render(sunglassesNew) {
    let {model, lense, frame} = sunglassesNew

    sunglassesNew = {
        model: {...model},
        lense: {...lense},
        frame: {...frame}
    }

    let price = `$${sunglassesNew.model.price + sunglassesNew.lense.price + sunglassesNew.frame.price}`
    
  
    productDetailsEl.innerHTML = `<h1>${sunglassesNew.model.name}</h1><p>Custom: ${sunglassesNew.lense.color} lenses, ${sunglassesNew.frame.color} frames</p><p>${price}</p>`
    
    let currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)

    let currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)
    
    let currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lense.cssClass)
    
}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        let siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", function(event) {
    let clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        let currName = clickedItem.dataset.name

        let modelOptions = models
        .filter(function(item) {
            return item.name === currName
        })[0]
        
        let name = modelOptions.name
        let price = modelOptions.price
        let thumbImg = modelOptions.thumbImg
        let cssClass = modelOptions.cssClass
        
        let {model,lense, frame} = sunglassesNew

        sunglassesNew = {
            model: {
                name: name,
                price: price,
                thumbImg: model.thumbImg,
                cssClass: cssClass,
            },
            lense: {...lense},
            frame: {...frame}
        }
       
        addHighlight(clickedItem)
        // setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        let currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            let colorOptions = lenses
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass
         
            let {model, frame} = sunglassesNew

            sunglassesNew = {
                model: {...model},
                lense: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
                frame: {...frame}
            }
        } 
        
        //frames
        else {
            let colorOptions = frames
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass
            
            let {model, lenses} = sunglassesNew

            sunglassesNew = {
                model: {...model},
                lenses: {...lenses},
                frame: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                }  
            }
        }

        addHighlight(clickedItem)
        // setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)