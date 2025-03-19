document.getElementById('form-tarefa').addEventListener('submit', adicionarTarefa);

const tarefaInput = document.getElementById('tarefa');
const tarefasLista = document.getElementById('tarefas-lista');

async function adicionarTarefa(e) {
  e.preventDefault();

  const novaTarefa = {
    id: Date.now().toString(),
    descricao: tarefaInput.value
  };

  // Enviar para o backend
  await fetch('http://localhost:3001/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaTarefa)
  });

  // Limpar o campo de input
  tarefaInput.value = '';

  // Recarregar as tarefas
  carregarTarefas();
}

async function carregarTarefas() {
  const resposta = await fetch('http://localhost:3001/tarefas');
  const tarefas = await resposta.json();

  tarefasLista.innerHTML = ''; // Limpar as tarefas anteriores

  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${tarefa.descricao}
      <button class="delete" onclick="deletarTarefa('${tarefa.id}')">Excluir</button>
    `;
    tarefasLista.appendChild(li);
  });
}

async function deletarTarefa(id) {
  await fetch(`http://localhost:3001/tarefas/${id}`, { method: 'DELETE' });

  carregarTarefas(); // Recarregar as tarefas após exclusão
}

// Carregar tarefas no carregamento da página
carregarTarefas();
