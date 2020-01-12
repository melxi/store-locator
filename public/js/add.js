const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

async function addStore(event) {
  event.preventDefault();

  if (!storeId.value || !storeAddress) {
    alert("Please add fields");
  }

  const storeBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  console.log(storeBody);

  try {
    const response = await fetch("/api/v1/stores", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(storeBody)
    });

    if (response.status === 400) {
      throw Error("Store already exists");
    }

    alert("Store added!");
    window.location.href = "/index.html";
  } catch (error) {
    alert(error);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
