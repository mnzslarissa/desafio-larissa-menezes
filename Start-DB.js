class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            {cod: "cafe", descricao: "Café", valor: 3.00},
            {cod: "chantily", descricao: "Chantily (extra do café)", valor: 1.50},
            {cod: "suco", descricao: "Suco Natural", valor: 6.20},
            {cod: "sanduiche", descricao: "Sanduiche", valor: 6.50},
            {cod: "queijo", descricao: "Queijo (extra do sanduiche)", valor: 2.00},
            {cod: "salgado", descricao: "Salgado", valor: 7.25},
            {cod: "combo1", descricao: "1 Suco e 1 Sanduiche", valor: 9.50},
            {cod: "combo2", descricao: "1 Cafe e 1 Sanduiche", valor: 7.50}
        ];
        
        this.formasDePagamento = [ "Dinheiro", "Debito", "Credito" ];

        this.pedidos = [];
    }

    adicionarPedido(codItem) {
        const itemSelecionado = this.cardapio.find(menuItem => menuItem.cod === codItem);
       //Se o código do item não existir, apresentar mensagem "Item inválido!"
        if (!itemSelecionado){
            return "Item invalido.";
        }
        
        //verificar produto extra
        if (codItem === "chantily" && !this.pedidos.some(pedido => pedido.cod === "cafe")) {
            return "Chantily não adicionado, é apenas extra do café."
        }
        if (codItem === "queijo" && !this.pedidos.some(pedido => pedido.cod === "sanduiche")) {
            return "Queijo não adicionado, é apenas extra do sanduíche."
        }

        this.pedidos.push(itemSelecionado);
        return "Pedido adicionado!";

    }

    calcularTotal() {
        let total = 0;
        for (const pedido of this.pedidos){
            total += pedido.valor;
        }
        return total;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        //Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
        //Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
        if(this.pedidos.length === 0){
            return "Não há itens no carrinho de compra!"
        }

        //Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
        if (!this.formasDePagamento.includes(metodoDePagamento)){
            return "Forma de pagamento inválida!"
        }

        let total = this.calcularTotal();

        if (metodoDePagamento === "Dinheiro"){
           total = (total * 0.95); //5% de desconto
        } else {
            total = (total * 1.03); //acrescimo de 3%
        }

        //
        return total.toFixed(2);
    }

}

export { CaixaDaLanchonete };
