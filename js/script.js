let lastScrollY = window.scrollY;
const menu = document.getElementById('menu');

// Detecta rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // rolando para baixo → esconde o menu
        menu.classList.add('hide');
    }
    lastScrollY = window.scrollY;
});

// Detecta mouse próximo ao topo da tela
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 80) {
        // se o mouse estiver perto do topo mostra o menu
        menu.classList.remove('hide');
    }
});


//__________________________________________________________

//circulo raio X

// Seleção dos elementos (mantendo os seus)
const container = document.querySelector('.foto-de-perfil-boas-vindas');
const imgBaixo = document.querySelector('.img-baixo');
const imgCima = document.querySelector('.img-cima');
const circle = document.getElementById('raio-x-circle');
const blocker = document.getElementById('cursor-blocker');
const btnToggle = document.getElementById('btn-revelar-rosto'); // O novo botão

const circleRadius = 120;
let efeitoAtivo = true; // Chave para ligar/desligar

// --- LÓGICA DO BOTÃO ---
// --- LÓGICA DO BOTÃO (SEU JS ANTIGO COM VACINA MOBILE) ---
btnToggle.addEventListener('click', () => {
    efeitoAtivo = !efeitoAtivo;

    if (!efeitoAtivo) {
        // DESLIGA TUDO (Funciona igual no PC e Mobile)
        blocker.style.display = "none";
        circle.style.display = 'none';
        imgBaixo.style.clipPath = 'none'; // Mostra a foto real
        imgCima.style.opacity = '0';      // Esconde o vidro
        
        // Ajuste de texto para Mobile vs PC
        btnToggle.innerText = (window.innerWidth < 1200) ? "Ver Vidro" : "Ligar Efeito";
    } else {
        // RELIGA O SISTEMA
        imgCima.style.opacity = '1'; // Mostra o vidro
        
        if (window.innerWidth < 1200) {
            // No Mobile: Como não tem mouse, deixamos a foto real escondida
            imgBaixo.style.clipPath = 'circle(0px at 0 0)';
            btnToggle.innerText = "Ver Rosto";
        } else {
            // No PC: Deixa pronto para o mouse agir
            imgBaixo.style.clipPath = `circle(0px at 0 0)`;
            btnToggle.innerText = "Ver Rosto";
        }
    }
});

// --- SEU CÓDIGO DE MOVIMENTO (COM TRAVA DE TELA) ---
container.addEventListener('mousemove', (e) => {
    // VACINA 1: Se for tela pequena, o mouse não faz nada
    if (window.innerWidth < 1200 || !efeitoAtivo) return;

    blocker.style.display = "block";
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = `${x - circleRadius}px`;
    circle.style.top = `${y - circleRadius}px`;
    circle.style.display = 'block';

    imgBaixo.style.clipPath = `circle(${circleRadius}px at ${x}px ${y}px)`;

    imgCima.style.maskImage = `radial-gradient(circle ${circleRadius}px at ${x}px ${y}px, transparent 0%, transparent 99%, black 100%)`;
    imgCima.style.webkitMaskImage = `radial-gradient(circle ${circleRadius}px at ${x}px ${y}px, transparent 0%, transparent 99%, black 100%)`;
});

// --- SEU MOUSE LEAVE (COM TRAVA DE TELA) ---
container.addEventListener('mouseleave', () => {
    // VACINA 2: Se for tela pequena ou desligado, não reseta nada
    if (window.innerWidth < 1200 || !efeitoAtivo) return;

    blocker.style.display = "none";
    circle.style.display = 'none';
    imgBaixo.style.clipPath = `circle(0px at 0 0)`;

    imgCima.style.maskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, transparent 0%, black 100%)`;
    imgCima.style.webkitMaskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, transparent 0%, black 100%)`;
});

//__________________________________________________________

// seleção de principais pejetos
let projetoAberto = null;  // Variável para controlar qual projeto está aberto

function abrirDetalhes(id) {
  const detalhe = document.getElementById(`detalhe-projeto-${id}`);

  // Verifica se o projeto já está aberto
  if (projetoAberto === id) {
    // Se o projeto clicado já está aberto, fecha ele
    detalhe.classList.toggle('mostrar');
    projetoAberto = null; // Marca que nenhum projeto está aberto
  } else {
    // Se não, abre o novo projeto
    if (projetoAberto !== null) {
      // Fecha o projeto atualmente aberto, se houver
      const projetoFechado = document.getElementById(`detalhe-projeto-${projetoAberto}`);
      projetoFechado.classList.remove('mostrar');
    }

    // Abre o novo projeto
    detalhe.classList.add('mostrar');
    projetoAberto = id; // Marca o projeto aberto

  }
}

//________________________________________________________________________

//Troca de img dos projetos

document.querySelectorAll(".detalhe-projeto").forEach(projetoDiv => {
    const slider = projetoDiv.querySelector(".slider");
    const btnEsq = projetoDiv.querySelector(".btn-esq");
    const btnDir = projetoDiv.querySelector(".btn-dir");
    const imgs = slider.querySelectorAll("img");
    let index = 0;

    const mostrarSlide = () => {
        // Move o slider em múltiplos de 100%
        const offset = -(index * 100);
        slider.style.transform = `translateX(${offset}%)`;

        // Gerencia a classe 'ativo'
        imgs.forEach((img, i) => {
            img.classList.toggle("ativo", i === index);
        });
    };

    btnDir.addEventListener("click", (e) => {
        e.preventDefault(); // Evita comportamentos estranhos
        index = (index + 1) % imgs.length;
        mostrarSlide();
    });

    btnEsq.addEventListener("click", (e) => {
        e.preventDefault();
        index = (index - 1 + imgs.length) % imgs.length;
        mostrarSlide();
    });
    
    // Resetar para o primeiro slide quando abrir o modal (opcional)
    // Se você tiver uma função que abre o modal, chame mostrarSlide() lá.
});


//_______________________________________________________________________

//________________________________________________________________________

// js das tecnologias em esteira infinita
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.tecnologias-track');
  
  // Duplica os ícones
  track.innerHTML += track.innerHTML;
  
  // Calcola o tempos
  const firstChild = track.children[0];
  const style = getComputedStyle(firstChild);
  const margin = parseFloat(style.marginRight);
  
  const totalWidth = Array.from(track.children).reduce((acc, child) => 
    acc + child.clientWidth + margin, 0
  ) / 2;
  
  
  track.style.animationDuration = `${totalWidth / 10}s`;
});

//_____________________________________________________________________________________

// js aonde fica todos os projetos no port.

// Função para alternar entre os projetos
function mostrar(secao) {
  // Remove a classe "ativo" de todos os botões
  document.querySelectorAll(".menu button").forEach(btn => {
    btn.classList.remove("ativo");
  });

  // Adiciona a classe "ativo" no botão clicado
  document.getElementById(`btn-${secao}`).classList.add("ativo");

  // Esconde todas as seções
  document.querySelectorAll(".conteudo .sessao").forEach(s => {
    s.classList.remove("visivel");
  });

  // Mostra a seção clicada
  document.getElementById(secao).classList.add("visivel");
}

function toggleProjeto(elemento) {
    // Verifica se o card clicado já está expandido
    const jaEstaExpandido = elemento.classList.contains("expandido");

    // Opcional: Fecha todos os outros projetos antes de abrir o novo
    document.querySelectorAll(".conteudos-projetos").forEach(card => {
        card.classList.remove("expandido");
    });

    // Se não estava expandido, expande agora
    if (!jaEstaExpandido) {
        elemento.classList.add("expandido");
    }
}

/**
 * Função para navegar pelas imagens do carrossel.
 * @param {HTMLElement} botao - O botão de seta clicado (this).
 * @param {number} direcao - A direção da mudança (-1 para esquerda, 1 para direita).
 */
function mudarSlide(botao, direcao) {
    // 1. Encontrar o container do carrossel relativo ao botão clicado
    const containerCarrossel = botao.closest('.carrossel-container');
    
    // 2. Obter todas as imagens deste carrossel
    const imagens = containerCarrossel.querySelectorAll('.carrossel-imagem');
    
    // 3. Encontrar o índice da imagem ativa atual
    let indiceAtivo = -1;
    for (let i = 0; i < imagens.length; i++) {
        if (imagens[i].classList.contains('ativa')) {
            indiceAtivo = i;
            break;
        }
    }

    // 4. Se não encontrar uma imagem ativa (segurança), sai
    if (indiceAtivo === -1 && imagens.length > 0) {
        imagens[0].classList.add('ativa');
        return;
    }

    // 5. Calcular o novo índice
    let novoIndice = indiceAtivo + direcao;

    // 6. Tratar o loop (se passar do fim, volta para o início e vice-versa)
    if (novoIndice >= imagens.length) {
        novoIndice = 0; // Se passou da última, vai para a primeira
    } else if (novoIndice < 0) {
        novoIndice = imagens.length - 1; // Se passou da primeira, vai para a última
    }

    // 7. Atualizar as classes CSS
    // Remove a classe ativa da imagem atual
    imagens[indiceAtivo].classList.remove('ativa');
    // Adiciona a classe ativa na nova imagem
    imagens[novoIndice].classList.add('ativa');
}

//____________________________________________

//____________________________________________