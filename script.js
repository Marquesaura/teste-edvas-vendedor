let db = {
    Vendedores: [],
    Clientes: [],
    Vendas: []
};

function salvarDados() {
    localStorage.setItem('db', JSON.stringify(db));
}

function carregarDados() {
    const dados = localStorage.getItem('db');
    if (dados) {
        db = JSON.parse(dados);
    }
}

function adicionarVendedores() {
    const nome = document.getElementById("Vendedores_nome").value;
    const nascimento = document.getElementById("Vendedores_nascimento").value;
    if (!nome || !nascimento) {
        alert("Preencha todos os campos!");
        return;
    }
    const id = db.Vendedores.length + 1;
    db.Vendedores.push({ id, nome, nascimento });
    salvarDados();
    listarVendedores();
}

function adicionarClientes() {
    const nome = document.getElementById("Clientes_nome").value;
    const nascimento = document.getElementById("Clientes_nascimento").value;
    const id = db.Clientes.length + 1;
    db.Clientes.push({ id, nome, nascimento });
    salvarDados();
    listarClientes();
}

function adicionarVendas() {
    const data = document.getElementById("Vendas_data").value;
    const horario = document.getElementById("Vendas_horario").value;
    const id_Vendedor = document.getElementById("Vendas_vendedor").value;
    const id = db.Vendas.length + 1;
    db.Vendas.push({ id, data, horario, id_Vendedor });
    salvarDados();
    listarVendas();
}

function listarVendedores() {
    let lista = "";
    db.Vendedores.forEach(v => {
        lista += `<li>${v.nome} - ${v.nascimento} <button onclick="excluirVendedores(${v.id})">Excluir</button></li>`;
    });
    document.getElementById("lista_Vendedores").innerHTML = lista;
}

function listarClientes() {
    let lista = "";
    db.Clientes.forEach(l => {
        lista += `<li>${l.nome} - ${l.nascimento} <button onclick="excluirClientes(${l.id})">Excluir</button></li>`;
    });
    document.getElementById("lista_Clientes").innerHTML = lista; 
}

function listarVendas() {
    let lista = "";
    db.Vendas.forEach(v => {
        const vendedor = db.Vendedores.find(ven => ven.id == v.id_Vendedor)?.nome || "Desconhecido";
        lista += `<li>${v.data} - ${v.horario} - ${vendedor} <button onclick="excluirVendas(${v.id})">Excluir</button></li>`;
    });
    document.getElementById("lista_Vendas").innerHTML = lista;
}


function excluirVendedores(id) {
    db.Vendedores = db.Vendedores.filter(v => v.id !== id);
    salvarDados();
    listarVendedores();
}

function excluirClientes(id) {
    db.Clientes = db.Clientes.filter(l => l.id !== id);
    salvarDados();
    listarClientes();
}

function excluirVendas(id) {
    db.Vendas = db.Vendas.filter(v => v.id !== id);
    salvarDados();
    listarVendas();
}

window.onload = function () {
    carregarDados();
    listarVendedores();
    listarClientes();
    listarVendas();
};