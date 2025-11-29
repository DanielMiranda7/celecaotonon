# TONON - E-commerce de Moda Premium

Este projeto consiste no desenvolvimento de um site completo de comércio eletrônico (Front-End), simulando uma loja de roupas e acessórios de alto padrão com foco em design minimalista e experiência do usuário fluida.

## 1. Descrição do Produto/Serviço
A **TONON** é uma marca fictícia de moda atemporal que une elegância e conforto. O site funciona como uma vitrine virtual e plataforma de vendas para três linhas principais de produtos:

* **Moda Feminina:** Uma curadoria de peças sofisticadas, incluindo vestidos de seda, alfaiataria moderna e tricôs premium.
* **Moda Masculina:** Roupas essenciais para o homem contemporâneo, variando do estilo casual urbano a ternos de corte italiano.
* **Acessórios:** Itens complementares de luxo acessível, como relógios, bolsas de couro legítimo, óculos de sol e joias em prata e ouro.

O serviço oferecido pela plataforma permite ao usuário navegar por categorias, filtrar produtos, visualizar detalhes técnicos (tecido, caimento), adicionar itens a um carrinho de compras persistente e simular a finalização de um pedido com cálculo de valores em tempo real.

## 2. Tecnologias Utilizadas
O projeto aplica conceitos modernos de desenvolvimento web, utilizando:

* **HTML5 Semântico:** Para estruturação acessível e organizada do conteúdo.
* **CSS3 + Bootstrap 5:** Para estilização, layout responsivo (Grid System) e componentes de interface, com uma camada de CSS personalizado para identidade visual (fontes, cores e animações).
* **JavaScript (ES6+):** Para lógica de programação e manipulação do DOM.
* **Vue.js 3 (Framework):** Utilizado via CDN para criar a reatividade do sistema. O Vue.js gerencia:
    * A renderização automática da lista de 50 produtos.
    * O funcionamento do carrinho de compras (adição, remoção, totais).
    * A atualização instantânea de preços e quantidades sem recarregar a página.
* **SweetAlert2:** Biblioteca para alertas visuais animados (pop-ups de confirmação de compra e remoção de itens).
* **LocalStorage:** Para salvar os itens do carrinho no navegador do usuário, mantendo os dados mesmo se a página for fechada.

## 3. Instruções para Execução Local
Para testar o projeto em seu computador:

1.  Baixe todos os arquivos do repositório e mantenha-os na mesma pasta.
2.  Certifique-se de ter os seguintes arquivos:
    * `index.html`, `produtos.html`, `detalhe.html`, `checkout.html`, `contato.html`, `sobre.html`
    * `style.css`
    * `script.js`
3.  **Execução Recomendada:** Abra a pasta do projeto no **VS Code**, instale a extensão **"Live Server"**, clique com o botão direito no arquivo `index.html` e escolha a opção **"Open with Live Server"**.
4.  **Execução Simples:** Basta dar um duplo clique no arquivo `index.html` para abrir em seu navegador padrão.

## 4. Integrantes do Grupo
Trabalho desenvolvido pela equipe:

* Eduardo Tonon
* Daniel Miranda
* Ester
* Gabriel Charles 
* Isabella Cardoso
