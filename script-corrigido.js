// Modern JavaScript for Vanderray Website - VERSÃO CORRIGIDA

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando componentes...');
    
    // Initialize all components with error handling
    try {
        initializeLoading();
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeMobileMenu();
        initializeBackToTop();
        initializeWhatsAppFloat();
        initializeProgressBar();
        initializeLazyLoading();
        initializeFormValidation();
        initializeAccessibility();
        console.log('Todos os componentes inicializados com sucesso');
    } catch (error) {
        console.error('Erro na inicialização:', error);
        // Força a remoção da tela de carregamento em caso de erro
        forceRemoveLoadingScreen();
    }
});

// Loading Screen - VERSÃO CORRIGIDA
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) {
        console.log('Tela de carregamento não encontrada, continuando...');
        return;
    }
    
    console.log('Removendo tela de carregamento...');
    
    // Remove imediatamente para evitar travamento
    setTimeout(() => {
        try {
            loadingScreen.classList.add('hidden');
            console.log('Classe hidden adicionada à tela de carregamento');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                    console.log('Tela de carregamento removida do DOM');
                }
            }, 500);
        } catch (error) {
            console.error('Erro ao remover tela de carregamento:', error);
            forceRemoveLoadingScreen();
        }
    }, 100); // Reduzido para 100ms para remoção mais rápida
}

// Função para forçar remoção da tela de carregamento
function forceRemoveLoadingScreen() {
    console.log('Forçando remoção da tela de carregamento...');
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
        }
        console.log('Tela de carregamento removida forçadamente');
    }
}

// Navigation Effects - COM TRATAMENTO DE ERRO
function initializeNavigation() {
    try {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) {
            console.log('Navbar não encontrado, pulando inicialização da navegação');
            return;
        }
        
        // Navbar scroll effect
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            try {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            } catch (error) {
                console.error('Erro no scroll da navbar:', error);
            }
        });
        
        // Active navigation link
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length > 0) {
            window.addEventListener('scroll', () => {
                try {
                    const scrollPos = window.scrollY + 100;
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        const sectionId = section.getAttribute('id');
                        
                        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                            navLinks.forEach(link => {
                                link.classList.remove('active');
                                if (link.getAttribute('href') === `#${sectionId}`) {
                                    link.classList.add('active');
                                }
                            });
                        }
                    });
                } catch (error) {
                    console.error('Erro na navegação ativa:', error);
                }
            });
        }
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                    console.error('Erro no scroll suave:', error);
                }
            });
        });
        
        console.log('Navegação inicializada com sucesso');
    } catch (error) {
        console.error('Erro na inicialização da navegação:', error);
    }
}

// Scroll Effects - COM TRATAMENTO DE ERRO
function initializeScrollEffects() {
    try {
        // Parallax effect for background elements
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                try {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach(element => {
                        const rate = scrolled * -0.5;
                        element.style.transform = `translateY(${rate}px)`;
                    });
                } catch (error) {
                    console.error('Erro no efeito parallax:', error);
                }
            });
        }
        
        console.log('Efeitos de scroll inicializados');
    } catch (error) {
        console.error('Erro na inicialização dos efeitos de scroll:', error);
    }
}

// Animations on Scroll - COM TRATAMENTO DE ERRO
function initializeAnimations() {
    try {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Stagger animation for multiple elements
                        const staggerElements = entry.target.querySelectorAll('.stagger-animation');
                        staggerElements.forEach((el, index) => {
                            el.style.setProperty('--stagger', index);
                            setTimeout(() => {
                                el.classList.add('animated');
                            }, index * 100);
                        });
                    }
                } catch (error) {
                    console.error('Erro na animação de scroll:', error);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Counter animation
        const counters = document.querySelectorAll('[data-count]');
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            counterObserver.unobserve(entry.target);
                        }
                    } catch (error) {
                        console.error('Erro na animação do contador:', error);
                    }
                });
            });
            
            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }
        
        console.log('Animações inicializadas');
    } catch (error) {
        console.error('Erro na inicialização das animações:', error);
    }
}

// Counter Animation - COM TRATAMENTO DE ERRO
function animateCounter(element) {
    try {
        const target = parseInt(element.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            try {
                current += step;
                element.textContent = Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            } catch (error) {
                console.error('Erro na animação do contador:', error);
                clearInterval(timer);
            }
        }, 16);
    } catch (error) {
        console.error('Erro ao inicializar contador:', error);
    }
}

// Mobile Menu - COM TRATAMENTO DE ERRO
function initializeMobileMenu() {
    try {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!mobileMenuBtn || !mobileMenu) {
            console.log('Menu mobile não encontrado, pulando inicialização');
            return;
        }
        
        let isMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', () => {
            try {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('show');
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    `;
                } else {
                    mobileMenu.classList.remove('show');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    `;
                }
            } catch (error) {
                console.error('Erro no menu mobile:', error);
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                try {
                    if (isMenuOpen) {
                        mobileMenuBtn.click();
                    }
                } catch (error) {
                    console.error('Erro ao fechar menu mobile:', error);
                }
            });
        });
        
        console.log('Menu mobile inicializado');
    } catch (error) {
        console.error('Erro na inicialização do menu mobile:', error);
    }
}

// Back to Top Button - COM TRATAMENTO DE ERRO
function initializeBackToTop() {
    try {
        // Create back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        backToTop.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(backToTop);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            try {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            } catch (error) {
                console.error('Erro no botão voltar ao topo:', error);
            }
        });
        
        // Scroll to top functionality
        backToTop.addEventListener('click', () => {
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Erro ao voltar ao topo:', error);
            }
        });
        
        console.log('Botão voltar ao topo inicializado');
    } catch (error) {
        console.error('Erro na inicialização do botão voltar ao topo:', error);
    }
}

// WhatsApp Floating Button - COM TRATAMENTO DE ERRO
function initializeWhatsAppFloat() {
    try {
        const whatsappFloat = document.createElement('a');
        whatsappFloat.href = 'https://wa.me/5591900000000';
        whatsappFloat.target = '_blank';
        whatsappFloat.className = 'whatsapp-float';
        whatsappFloat.innerHTML = `
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
            </svg>
        `;
        whatsappFloat.setAttribute('aria-label', 'Falar no WhatsApp');
        document.body.appendChild(whatsappFloat);
        
        console.log('Botão WhatsApp inicializado');
    } catch (error) {
        console.error('Erro na inicialização do botão WhatsApp:', error);
    }
}

// Progress Bar - COM TRATAMENTO DE ERRO
function initializeProgressBar() {
    try {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            try {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                
                progressBar.style.width = scrollPercent + '%';
            } catch (error) {
                console.error('Erro na barra de progresso:', error);
            }
        });
        
        console.log('Barra de progresso inicializada');
    } catch (error) {
        console.error('Erro na inicialização da barra de progresso:', error);
    }
}

// Lazy Loading - COM TRATAMENTO DE ERRO
function initializeLazyLoading() {
    try {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length === 0) {
            console.log('Nenhuma imagem lazy encontrada');
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                } catch (error) {
                    console.error('Erro no lazy loading:', error);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('Lazy loading inicializado');
    } catch (error) {
        console.error('Erro na inicialização do lazy loading:', error);
    }
}

// Form Validation - COM TRATAMENTO DE ERRO
function initializeFormValidation() {
    try {
        const forms = document.querySelectorAll('form');
        
        if (forms.length === 0) {
            console.log('Nenhum formulário encontrado');
            return;
        }
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                try {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    
                    // Basic validation
                    let isValid = true;
                    const requiredFields = form.querySelectorAll('[required]');
                    
                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            showFieldError(field, 'Este campo é obrigatório');
                        } else {
                            clearFieldError(field);
                        }
                    });
                    
                    // Email validation
                    const emailFields = form.querySelectorAll('input[type="email"]');
                    emailFields.forEach(field => {
                        if (field.value && !isValidEmail(field.value)) {
                            isValid = false;
                            showFieldError(field, 'Por favor, insira um email válido');
                        }
                    });
                    
                    if (isValid) {
                        // Show success message
                        showNotification('Mensagem enviada com sucesso!', 'success');
                        form.reset();
                    }
                } catch (error) {
                    console.error('Erro na validação do formulário:', error);
                }
            });
        });
        
        console.log('Validação de formulários inicializada');
    } catch (error) {
        console.error('Erro na inicialização da validação de formulários:', error);
    }
}

// Utility Functions - COM TRATAMENTO DE ERRO
function showFieldError(field, message) {
    try {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.classList.add('border-red-500');
    } catch (error) {
        console.error('Erro ao mostrar erro do campo:', error);
    }
}

function clearFieldError(field) {
    try {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.classList.remove('border-red-500');
    } catch (error) {
        console.error('Erro ao limpar erro do campo:', error);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    } catch (error) {
        console.error('Erro ao mostrar notificação:', error);
    }
}

// Accessibility - COM TRATAMENTO DE ERRO
function initializeAccessibility() {
    try {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            try {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            } catch (error) {
                console.error('Erro na navegação por teclado:', error);
            }
        });
        
        document.addEventListener('mousedown', () => {
            try {
                document.body.classList.remove('keyboard-navigation');
            } catch (error) {
                console.error('Erro ao remover navegação por teclado:', error);
            }
        });
        
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        console.log('Acessibilidade inicializada');
    } catch (error) {
        console.error('Erro na inicialização da acessibilidade:', error);
    }
}

// Error Handling Global
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Força remoção da tela de carregamento em caso de erro
    forceRemoveLoadingScreen();
});

// Fallback para garantir que a tela de carregamento seja removida
setTimeout(() => {
    forceRemoveLoadingScreen();
}, 2000);

console.log('Script carregado e pronto para execução');
