import "./style.scss";

document
  .querySelector(".button")
  .addEventListener("click", () => genrateDepth());

let isLoading = false;

async function genrateDepth() {

  if (isLoading) return alert("genrate on going");

  const source_image = document.getElementById("fileInput_source_image");
  const lighting_image = document.getElementById("fileInput_lighting_image");

  if (source_image.files[0] && lighting_image.files[0]) {
  
    isLoading = true;
    document.querySelector(".button").innerHTML = "Is Loading";
  
    const url = "https://sdk.beeble.ai/v1/relight-image";
  
    const data = new FormData();
    data.append("source_image", source_image.files[0]);
    data.append("lighting_image", lighting_image.files[0]);
    // The strength of lighting reference image
    data.append("lighting_strength", "1.0");
    data.append("lighting_rotation_theta", "90.0");
    data.append("lighting_rotation_phi", "90.0");
    // Remove the background
    data.append("auto_key", "false");
    // 512x512 resolution preview
    data.append("preview", "true");
  
    const options = {
      method: "POST",
      headers: {
        "x-api-key":
          "",
      },
      body: data,
    };
  
    await fetch(url, options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        // use buffer image, a binary representation
        const blob = new Blob([buffer], { type: "image/jpeg" });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
  
        const img = document.createElement("img");
        img.src = imageUrl;
        document.querySelector(".output").appendChild(img);
      })
      .catch((e) => {
        console.log("Error:", e.message);
      });
  }else {
    alert('upload media !!!')
  }

  document.querySelector(".button").innerHTML = "Generate Image";
  isLoading = false;
}
