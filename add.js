document.querySelector(".js-form-add").addEventListener("submit", async (e) => {
  const schema_val = joi.object({
    name: joi.string().min(5).max(100).required(),
    price: joi.number().max(1000000).required(),
  });
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    price: e.target.price.value,
  };

  const { value, error } = schema_val.validate(data, { abortEarly: false });
  if (error) return console.log(error.details);

  const optionsRequete = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  const reponse = await fetch("http://localhost:3000/depenses", optionsRequete);

  if (reponse.status) e.target.reset();
});
