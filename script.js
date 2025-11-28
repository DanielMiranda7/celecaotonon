/* script.js */
// A gente escolheu usar o Vue.js porque ele facilita muito a reatividade do carrinho
const { createApp } = Vue;

createApp({
    data() {
        return {
            // Aqui ficam as variáveis que o site usa o tempo todo
            cart: [], // Começa vazio, mas depois a gente carrega do LocalStorage
            currentCategory: 'Todos', // Controle do filtro da página de produtos
            currentProduct: {}, // Guarda o produto que foi clicado pra página de detalhes
            selectedImageIndex: 0, // Pra controlar qual foto aparece grande no detalhes
            selectedSize: 'M', // Tamanho padrão
            selectedQuantity: 1, // Quantidade padrão
            
            // Objeto pra guardar os dados do formulário de checkout
            checkout: { name: '', email: '', address: '', payment: 'credit' },

            // --- BANCO DE DADOS (SIMULADO) ---
            // Criamos uma lista de objetos com 50 produtos pra preencher o catálogo
            products: [
                // --- FEMININO ---
                { id: 1, name: "Vestido Longo Seda", price: 389.00, originalPrice: 489.00, description: "Deslumbrante vestido longo confeccionado em 100% seda pura. Possui um caimento fluido que desenha a silhueta, decote em V valorizado e fenda lateral estratégica. Ideal para eventos noturnos.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966"], category: "Feminino" },
                { id: 2, name: "Casaco Lã Estruturado", price: 899.00, description: "Casaco térmico de lã batida com modelagem estruturada e acinturada. Possui gola lapela larga, fechamento por botões duplos e forro acetinado. Elegância e proteção.", images: ["https://files.catbox.moe/t35ryj.jpg"], category: "Feminino" },
                { id: 3, name: "Saia Midi Plissada", price: 150.00, originalPrice: 220.00, description: "Saia midi com plissado permanente e acabamento acetinado. O tecido leve proporciona um movimento incrível ao caminhar. Cintura elástica confortável.", images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964"], category: "Feminino" },
                { id: 4, name: "Blusa Tricô Gola Alta", price: 159.90, description: "Blusa em tricô premium com trama fechada e toque extremamente macio. A gola alta e os punhos canelados trazem conforto e sofisticação.", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964"], category: "Feminino" },
                { id: 5, name: "Calça Jeans Skinny", price: 189.00, description: "Jeans com tecnologia 'super stretch' (alto teor de elastano) que se adapta perfeitamente às curvas sem lacear. Lavagem escura clássica.", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887"], category: "Feminino" },
                { id: 6, name: "Blazer Oversized Bege", price: 350.00, originalPrice: 450.00, description: "Alfaiataria moderna com corte oversized (modelagem ampla). Feito em tecido estruturado com toque de linho. Ombros levemente marcados.", images: ["https://files.catbox.moe/k0qteh.webp"], category: "Feminino" },
                { id: 7, name: "Shorts de Linho", price: 120.00, description: "Shorts em mix de linho e viscose, unindo frescor e caimento. Possui cintura alta clochard, bolsos laterais funcionais e acompanha cinto faixa.", images: ["https://files.catbox.moe/78aq2c.webp"], category: "Feminino" },
                { id: 8, name: "Macacão Pantacourt", price: 299.90, description: "Peça única cheia de estilo. Macacão pantacourt em viscose encorpada que não marca. Decote transpassado, mangas fluidas e elástico na cintura.", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887"], category: "Feminino" },
                { id: 9, name: "Cropped Renda Branco", price: 69.90, originalPrice: 89.90, description: "Cropped delicado confeccionado em renda francesa com desenhos florais. Possui forro na parte frontal, mangas curtas sem forro para transparência sutil.", images: ["https://files.catbox.moe/f6xbkf.webp"], category: "Feminino" },
                { id: 10, name: "Kimono Floral", price: 145.00, description: "A terceira peça perfeita para o verão. Kimono em tecido crepe leve com estampa floral vibrante exclusiva. Modelagem ampla e mangas 3/4.", images: ["https://files.catbox.moe/buinvo.webp"], category: "Feminino" },
                { id: 11, name: "Vestido Preto Básico", price: 199.00, description: "O famoso 'little black dress' indispensável. Confeccionado em malha canelada de alta gramatura que modela sem marcar. Comprimento curto e alças finas.", images: ["https://files.catbox.moe/imlzcr.jpg"], category: "Feminino" },
                { id: 12, name: "Camisa Branca Clássica", price: 210.00, description: "Camisa branca essencial em algodão tricoline premium. Corte de alfaiataria impecável, gola estruturada e botões de madrepérola.", images: ["https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1887"], category: "Feminino" },
                { id: 13, name: "Cardigan Longo Malha", price: 129.00, originalPrice: 179.00, description: "Maxi cardigan em malha de toque extremamente macio. Modelagem alongada, sem fechamento, com bolsos frontais funcionais.", images: ["https://files.catbox.moe/2ep3od.jpg"], category: "Feminino" },
                { id: 14, name: "Saia Lápis Couro", price: 250.00, description: "Saia lápis clássica reinventada em couro ecológico (PU) de alta qualidade. Cintura alta, comprimento midi e fenda traseira para facilitar o movimento.", images: ["https://files.catbox.moe/nrzd26.jpg"], category: "Feminino" },
                { id: 15, name: "Body Decotado Preto", price: 99.00, description: "Body preto em poliamida com elastano, tecido que adere perfeitamente ao corpo. Possui decote profundo em V na frente e nas costas.", images: ["https://files.catbox.moe/7ggcrz.webp"], category: "Feminino" },
                { id: 16, name: "Calça Alfaiataria Rosa", price: 280.00, description: "Calça de alfaiataria em tom rosa vibrante. Corte reto, cintura alta, bolsos faca laterais e fechamento por colchete e zíper.", images: ["https://files.catbox.moe/5bmb32.webp"], category: "Feminino" },
                { id: 17, name: "Vestido Midi Estampado", price: 320.00, description: "Vestido comprimento midi em tecido fluido com estampa floral exclusiva. Possui mangas bufantes sutis, decote quadrado e lastex nas costas.", images: ["https://files.catbox.moe/rhpj64.webp"], category: "Feminino" },

                // --- MASCULINO ---
                { id: 18, name: "Camisa Social Slim", price: 199.00, originalPrice: 259.00, description: "Camisa social confeccionada em algodão egípcio fio 80, garantindo toque sedoso e alta durabilidade. Modelagem Slim Fit que se ajusta ao corpo sem apertar.", images: ["https://files.catbox.moe/ppu4kj.jpg"], category: "Masculino" },
                { id: 19, name: "Blazer Alfaiataria Azul", price: 599.00, description: "Blazer marinho clássico em lã fria. Corte de alfaiataria moderna, dois botões, fenda dupla traseira e forro interno acetinado.", images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"], category: "Masculino" },
                { id: 20, name: "Calça Chino Bege", price: 189.90, description: "A calça chino perfeita. Feita em sarja de algodão com 2% de elastano para conforto total. Modelagem levemente ajustada na perna.", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887"], category: "Masculino" },
                { id: 21, name: "Jaqueta Jeans Vintage", price: 299.00, originalPrice: 349.00, description: "Jaqueta jeans em denim 100% algodão robusto. Lavagem estonada média com puídos estratégicos para um visual vintage autêntico.", images: ["https://files.catbox.moe/yct42f.webp"], category: "Masculino" },
                { id: 22, name: "Camiseta Básica Premium", price: 79.90, description: "Camiseta básica elevada a outro nível. Malha 100% algodão peruano Pima, conhecido por sua maciez e resistência. Não desbota e não torce após as lavagens.", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780"], category: "Masculino" },
                { id: 23, name: "Calça Jogger Preta", price: 159.00, description: "Calça jogger em sarja com elastano. Estilo urbano com conforto total. Possui cós elástico com cordão de ajuste e punhos de elástico na barra.", images: ["https://files.catbox.moe/1tif1q.webp"], category: "Masculino" },
                { id: 24, name: "Bermuda Sarja", price: 89.00, originalPrice: 119.00, description: "Bermuda em sarja leve de algodão. Corte de alfaiataria com comprimento logo acima do joelho. Bolsos faca e bolsos traseiros embutidos.", images: ["https://files.catbox.moe/bmgvn8.webp"], category: "Masculino" },
                { id: 25, name: "Jaqueta Couro Moto", price: 680.00, description: "Jaqueta estilo biker clássica em couro bovino legítimo. Possui zíperes metálicos assimétricos reforçados, gola com botões de pressão e forro matelassê.", images: ["https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1995"], category: "Masculino" },
                { id: 26, name: "Moletom Capuz Cinza", price: 220.00, description: "Moletom canguru fechado em malha de alta gramatura (3 cabo). Interior flanelado super aquecido. Capuz duplo com cordão e bolso frontal amplo.", images: ["https://files.catbox.moe/3bbtd3.webp"], category: "Masculino" },
                { id: 27, name: "Camisa Xadrez Lenhador", price: 199.00, description: "Camisa em flanela grossa de algodão com padronagem xadrez lenhador (buffalo check). Estilo rústico e autêntico, perfeita para sobreposições em dias frios.", images: ["https://files.catbox.moe/e9vt9g.jpg"], category: "Masculino" },
                { id: 28, name: "Polo Piquet Marinho", price: 99.00, originalPrice: 139.00, description: "Polo clássica em malha piquet 100% algodão, tecido respirável e texturizado. Gola e punhos em retilínea que não deformam. Bordado discreto do logo no peito.", images: ["https://files.catbox.moe/7zb7tz.webp"], category: "Masculino" },
                { id: 29, name: "Sobretudo Lã Preto", price: 950.00, description: "Sobretudo de lã batida premium. Corte alongado (7/8), lapela larga e fechamento trespassado. Elegância suprema e proteção térmica para o inverno rigoroso.", images: ["https://files.catbox.moe/5cx4c2.webp"], category: "Masculino" },
                { id: 30, name: "Calça Jeans Reta", price: 210.00, description: "O jeans tradicional que nunca sai de moda. Modelagem reta (straight leg) que não aperta a perna. Denim 100% algodão de gramatura média e lavagem azul índigo clássica.", images: ["https://files.catbox.moe/idyo2n.webp"], category: "Masculino" },
                { id: 31, name: "Regata Esportiva Dry", price: 49.90, originalPrice: 69.90, description: "Regata para treino em tecido tecnológico Dry-Fit. Absorve o suor e seca rapidamente, mantendo o corpo fresco. Modelagem atlética que permite liberdade de movimentos.", images: ["https://files.catbox.moe/7wqh2r.webp"], category: "Masculino" },
                { id: 32, name: "Suéter Gola V Vinho", price: 180.00, description: "Suéter clássico em malha fina de algodão com toque de cashmere. Gola V ideal para usar sobre camisas sociais, deixando o colarinho à mostra.", images: ["https://files.catbox.moe/xreq7q.webp"], category: "Masculino" },
                { id: 33, name: "Terno Completo Cinza", price: 1200.00, description: "Conjunto de paletó e calça. Alfaiataria de precisão em tecido nobre (lã fria super 120). Corte italiano slim, moderno e sofisticado. Ideal para ambientes corporativos ou eventos.", images: ["https://files.catbox.moe/4d1olh.jpg"], category: "Masculino" },
                { id: 34, name: "Camisa Linho Branca", price: 289.00, description: "A elegância descontraída do linho puro (100%). Camisa de manga longa com textura natural e alto poder de absorção, garantindo frescor absoluto no verão.", images: ["https://files.catbox.moe/gdrgv6.webp"], category: "Masculino" },

                // --- ACESSÓRIOS ---
                { id: 35, name: "Bolsa Couro Tote", price: 399.00, originalPrice: 450.00, description: "Bolsa modelo Tote (sacola) espaçosa, confeccionada em couro legítimo texturizado na cor caramelo. Alças de ombro reforçadas, fechamento por zíper e bolsos internos organizadores.", images: ["https://files.catbox.moe/2d4k18.webp"], category: "Acessórios" },
                { id: 36, name: "Óculos Wayfarer", price: 129.90, description: "Óculos de sol estilo Wayfarer clássico. Armação em acetato preto resistente e lentes escuras com proteção UV400 certificada. Modelo unissex atemporal.", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1760"], category: "Acessórios" },
                { id: 37, name: "Corrente Prata 925", price: 199.00, description: "Corrente veneziana delicada em Prata de Lei 925. Design minimalista unissex, com 60cm de comprimento. Brilho intenso e durabilidade garantida.", images: ["https://files.catbox.moe/5gnjpm.webp"], category: "Acessórios" },
                { id: 38, name: "Carteira Slim Couro", price: 69.90, originalPrice: 89.90, description: "Carteira masculina modelo slim em couro genuíno preto. Design ultrafino para não fazer volume no bolso. Possui 4 slots para cartões e compartimento para CNH e poucas cédulas.", images: ["https://files.catbox.moe/s40sih.webp"], category: "Acessórios" },
                { id: 39, name: "Relógio Minimalista", price: 350.00, description: "Relógio analógico com design escandinavo minimalista. Caixa fina em aço inoxidável, mostrador preto limpo sem números e pulseira de malha de aço (milanesa). Resistente à água 5ATM.", images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999"], category: "Acessórios" },
                { id: 40, name: "Relógio Couro Marrom", price: 420.00, description: "Relógio cronógrafo com estilo clássico aviador. Caixa robusta, mostrador creme com três submostradores funcionais e pulseira de couro legítimo marrom envelhecido.", images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1894"], category: "Acessórios" },
                { id: 41, name: "Óculos Aviador Dourado", price: 150.00, description: "O icônico modelo aviador. Armação metálica leve na cor dourada com ponte dupla. Lentes de cristal degradê marrom com proteção total contra raios UVA/UVB.", images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780"], category: "Acessórios" },
                { id: 42, name: "Bolsa Transversal Preta", price: 299.00, description: "Bolsa tiracolo compacta e estruturada em material sintético premium. Fechamento por aba com botão magnético e detalhe de fivela dourada. Alça longa ajustável.", images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769"], category: "Acessórios" },
                { id: 43, name: "Mochila Couro Notebook", price: 499.00, originalPrice: 550.00, description: "Mochila executiva em couro legítimo. Design sóbrio e elegante. Possui compartimento acolchoado para notebook de até 15.6 polegadas, costas respiráveis e alças confortáveis.", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887"], category: "Acessórios" },
                { id: 44, name: "Cinto Couro Preto", price: 110.00, description: "Cinto masculino social em couro integral de alta qualidade. Fivela metálica prateada de design limpo. Largura de 3.5cm, ideal para presilhas de calças sociais ou jeans.", images: ["https://files.catbox.moe/7n4smg.webp"], category: "Acessórios" },
                { id: 45, name: "Chapéu Fedora Feltro", price: 180.00, description: "Chapéu estilo Fedora confeccionado em feltro de lã na cor areia. Aba média estruturada e fita de gorgurão ao redor da copa. Traz um toque boêmio chic ao look.", images: ["https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1887"], category: "Acessórios" },
                { id: 46, name: "Lenço de Seda Estampado", price: 85.00, description: "Lenço quadrado (carré) em toque de seda. Estampa geométrica colorida. Acessório multifuncional: use amarrado no pescoço, no cabelo, na alça da bolsa ou como cinto.", images: ["https://files.catbox.moe/xiad4z.avif"], category: "Acessórios" },
                { id: 47, name: "Brincos Argola Ouro", price: 240.00, description: "Brincos clássicos de argola média, tubo liso. Semijoia banhada a ouro 18k com verniz antialérgico de alta durabilidade. Fecho tipo italiano seguro.", images: ["https://files.catbox.moe/3vlh3r.webp"], category: "Acessórios" },
                { id: 48, name: "Anel Prata Minimalista", price: 120.00, description: "Anel em Prata 925 maciça com design geométrico vazado. Estilo moderno e minimalista, perfeito para usar sozinho ou em mix de anéis.", images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770"], category: "Acessórios" },
                { id: 49, name: "Boné Aba Curva Basic", price: 49.90, originalPrice: 65.00, description: "Boné estilo dad hat (aba curva) em sarja de algodão lavada. Desestruturado, com ajuste traseiro por fivela metálica. Logo minimalista bordado na lateral.", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1935"], category: "Acessórios" },
                { id: 50, name: "Bolsa Clutch Festa", price: 210.00, description: "Bolsa de festa tipo clutch rígida. Acabamento em tecido acetinado com aplicação de brilhos discretos. Fecho encaixe e alça de corrente dourada removível.", images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1771"], category: "Acessórios" }
            ]
        }
    },
    
    // COMPUTED: São valores que o Vue calcula automaticamente quando os dados mudam
    computed: {
        // Filtra os produtos baseado na categoria que o usuário clicou
        filteredProducts() {
            if (this.currentCategory === 'Todos') return this.products;
            // Usa a função filter do array pra pegar só o que bate com a categoria
            return this.products.filter(p => p.category === this.currentCategory);
        },
        // Conta quantos itens tem no carrinho somando as quantidades
        cartCount() {
            return this.cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        // Calcula o preço total dos produtos
        cartSubtotal() {
            return this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        // Regra de negócio: Frete grátis se o subtotal passar de R$ 500
        shippingCost() {
            return this.cartSubtotal > 500 ? 0 : 35.00;
        },
        // Total final somando frete
        cartTotal() {
            return this.cartSubtotal + this.shippingCost;
        }
    },

    // METHODS: As funções que a gente chama nos botões (@click)
    methods: {
        // Função pra formatar o dinheiro pra R$ (padrão brasileiro)
        formatMoney(value) {
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },
        
        // Troca a categoria atual quando clica no menu lateral
        setCategory(category) {
            this.currentCategory = category;
        },
        
        // Se a imagem do Unsplash der erro, a gente troca por uma imagem cinza de fallback
        imageError(event) {
            event.target.src = "https://via.placeholder.com/400x400?text=Sem+Foto";
        },
        
        // Adiciona produto ao carrinho (verifica se já existe pra só aumentar a quantidade)
        addToCart(product, qtd = 1, size = 'M') {
            // Procura se o item já tá no array cart
            const existing = this.cart.find(item => item.id === product.id && item.size === size);
            
            if (existing) {
                existing.quantity += parseInt(qtd); // Se tiver, só soma
            } else {
                // Se não, empurra um novo objeto pro array
                this.cart.push({ ...product, quantity: parseInt(qtd), size: size });
            }
            this.saveCart(); // Salva no navegador
            
            // Mostra aquele alerta bonito no canto (SweetAlert2)
            Swal.fire({
                icon: 'success',
                title: 'Adicionado!',
                text: `${product.name} foi para a sacola.`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                background: '#1a1a1a',
                color: '#fff'
            });
        },

        // Função pros botões de + e - no checkout
        updateQuantity(index, change) {
            const item = this.cart[index];
            item.quantity += change;
            
            // Se a quantidade zerar, pergunta se quer remover
            if (item.quantity <= 0) {
                Swal.fire({
                    title: 'Remover item?',
                    text: "Deseja retirar este item do carrinho?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#e74c3c', // Vermelho
                    cancelButtonColor: '#1a1a1a', // Preto
                    confirmButtonText: 'Sim, remover'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.cart.splice(index, 1); // Remove do array
                        this.saveCart();
                    } else {
                        item.quantity = 1; // Se cancelar, volta pra 1
                    }
                });
            } else {
                this.saveCart();
            }
        },

        // Botão de lixeira pra remover direto
        removeFromCart(index) {
            Swal.fire({
                title: 'Remover item?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#1a1a1a',
                confirmButtonText: 'Sim'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cart.splice(index, 1);
                    this.saveCart();
                }
            });
        },

        // Salva o estado do carrinho no LocalStorage do navegador (pra não perder se der F5)
        saveCart() {
            localStorage.setItem('vueStoreCart', JSON.stringify(this.cart));
        },
        // Recupera o carrinho quando a página abre
        loadCart() {
            const saved = localStorage.getItem('vueStoreCart');
            if (saved) this.cart = JSON.parse(saved);
        },
        
        // Troca a foto principal na página de detalhes
        changeDetailImage(index) {
            this.selectedImageIndex = index;
        },

        // Finaliza a compra (simulação)
        checkoutSubmit() {
            // Só roda se o HTML validar os campos required
            Swal.fire({
                title: 'Compra Finalizada!',
                html: `Obrigado, <strong>${this.checkout.name}</strong>!<br>Seu pedido foi confirmado com sucesso.`,
                icon: 'success',
                confirmButtonText: 'Voltar à Loja',
                confirmButtonColor: '#1a1a1a',
                allowOutsideClick: false
            }).then(() => {
                this.cart = []; // Limpa o carrinho
                this.saveCart();
                window.location.href = 'index.html'; // Redireciona pra home
            });
        }
    },
    // O mounted é executado automaticamente assim que o Vue termina de carregar
    mounted() {
        this.loadCart(); // Carrega o carrinho salvo
        
        // Lê a URL pra ver se tem algum filtro (ex: ?cat=Feminino)
        const params = new URLSearchParams(window.location.search);
        if (params.has('cat')) this.currentCategory = params.get('cat');
        
        // Se tiver na página de detalhes, pega o ID da URL pra mostrar o produto certo
        if (window.location.pathname.includes('detalhe.html')) {
            const id = parseInt(params.get('id')) || 1; 
            // Busca o produto na lista pelo ID
            this.currentProduct = this.products.find(p => p.id === id) || this.products[0];
        }
    }
}).mount('#app');