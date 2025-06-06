document.getElementById("btn-gerar").addEventListener("click", async () => {
  const checkboxes = document.querySelectorAll(".inputs input[type='checkbox']:checked");
  const tipos = Array.from(checkboxes).map(cb => cb.value);

  const dataInicial = document.getElementById("data-inicial").value;
  const dataFinal = document.getElementById("data-final").value;

  if (!tipos.length || !dataInicial || !dataFinal) {
    alert("Selecione pelo menos um tipo e informe as datas.");
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/api/relatorios/gerar", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipos, dataInicial, dataFinal })
    });


    

    if (!response.ok) throw new Error("Erro ao gerar relatório.");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Erro ao gerar o relatório.");
  }
});
