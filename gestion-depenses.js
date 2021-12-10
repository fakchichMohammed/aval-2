window.addEventListener("DOMContentLoaded", async () => {
  const reponse = await fetch("http://localhost:3000/depenses");
  const depenses = await reponse.json();

  document.querySelector(".js-list-depenses").innerHTML = genererFormsTaches(depenses);

  let total = depenses.map((d) => {
    let p = parseInt(d.price)
    p += p;
    console.log(p);
  });
  document.querySelector(".js-compteur").innerHTML = total;
  let dep = depenses.map((d) => {
    if (parseInt(d.price) > 0) {
      
      let p = parseInt(d.price)
      p += p;
      console.log(p);
    }
  });
  document.querySelector(".js-de").innerHTML = dep;
  let re = depenses.map((d) => {
    if (parseInt(d.price) < 0) {
      
      let p = parseInt(d.price)
      p += p;
      console.log(p);
    }
  });
  document.querySelector(".js-de").innerHTML = re;
  document.querySelector(".js-list-depenses").addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.className.includes("btn")) {
      const form = e.target.parentNode;
      const action = e.target.value;
      const id = form.id.value;
      console.log(id);
      if (action == "modifier") {
        console.log(form.id.value);
        const data = {
          id: id,
          name: form.name.value,
          price: form.price.value,
        };
        const options = {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        };
        await fetch("http://localhost:3000/depenses/" + id, options);
      } else if (action == "supprimer") {
        const options = { method: "DELETE" };
        await fetch("http://localhost:3000/depenses/" + id, options);
      }
    }
  });
});

function genererFormsTaches(data) {
  if (data.length === 0) return "<p>Veuillez ajouter des tâches</p>";

  return data
    .map((d) => {
      return `
              <form class="d-flex my-3">
                
                <input class="input" type="text" name="id" class="form-input" value="${d.id}">
                
                <input class="input" type="text" name="name" class="form-input" value="${d.name}">
                <input class="input" type="text" name="price" class="form-input" value="${d.price}">
               
                  <input type="submit" class="btn btn-primary mx-3" value="modifier">
                  <input type="submit" class="btn btn-danger" value="supprimer">
                 
              
              </form>
              `;
    })
    .join("");
}
