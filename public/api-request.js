document.getElementById('nxt-btn').addEventListener('click', getImage)
document.getElementById('add-btn').addEventListener('click', saveImage)
function getImage() {
let imgBin = document.getElementById('image-container')

  try {
    axios.get('https://dog.ceo/api/breeds/image/random').then(res =>{
      imgBin.innerHTML = `<img src="${res.data.message}" alt="No image found" id="current-image" style="max-height: 100%">`
    })
  } catch (error) {
    console.error(error)
  }
}

function saveImage(){
  let currentImage = document.getElementById('current-image')
  currentImage.src

}
