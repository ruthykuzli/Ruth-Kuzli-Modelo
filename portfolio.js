document.addEventListener("DOMContentLoaded", function() {

    // --- 1. FILTROS DE CATEGORÍA SOBERBIOS & FLUIDOS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');
    const runwayBrandsBar = document.getElementById('runway-brands-bar');

    // Función para aplicar filtro
    function applyFilter(filterValue) {
        // Mostrar/ocultar barra de marcas si es Runway
        if (runwayBrandsBar) {
            runwayBrandsBar.style.display = (filterValue === 'runway') ? 'block' : 'none';
        }

        // Filtrar elementos garantizando separación estricta de categorías
        masonryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (category === filterValue) {
                item.style.setProperty('display', 'inline-block', 'important');
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            } else {
                item.classList.remove('visible');
                item.style.setProperty('display', 'none', 'important');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Sincronizar estado activo en todos los botones (superiores e inferiores)
            filterBtns.forEach(b => {
                if (b.getAttribute('data-filter') === filterValue) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            applyFilter(filterValue);

            // Si se hace clic desde los botones inferiores, hacer scroll suave al inicio de la galería
            if (this.closest('.bottom-category-selector')) {
                const gallerySection = document.getElementById('trabajos') || document.querySelector('.editorial-gallery-section');
                if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Inicializar con el filtro activo por defecto (RUNWAY)
    const initialActive = document.querySelector('.filter-btn.active');
    if (initialActive) {
        applyFilter(initialActive.getAttribute('data-filter'));
    }

    // --- 2. FADE-IN SCROLL ANIMATION (OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    masonryItems.forEach(item => {
        fadeInObserver.observe(item);
    });


    // --- 3. VISOR LIGHTBOX HIGH FASHION & SONIDO ---
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxMedia = document.getElementById('lightbox-media');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCredit = document.getElementById('lightbox-credit');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const backdrop = document.querySelector('.lightbox-backdrop');

    let visibleItemsList = [];
    let currentIndex = -1;

    function getVisibleItems() {
        return Array.from(masonryItems).filter(item => item.style.display !== 'none');
    }

    function openLightbox(item) {
        visibleItemsList = getVisibleItems();
        currentIndex = visibleItemsList.indexOf(item);

        if (currentIndex === -1) return;

        updateLightboxContent(item);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxMedia.innerHTML = '';
        document.body.style.overflow = '';
    }

    function updateLightboxContent(item) {
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        const title = item.getAttribute('data-title') || 'Ruth Kuzli Portfolio';
        const credit = item.getAttribute('data-credit') || 'Editorial High Fashion';

        lightboxTitle.textContent = title;
        lightboxCredit.textContent = credit;

        lightboxMedia.innerHTML = '';

        if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '75vh';
            lightboxMedia.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '75vh';
            lightboxMedia.appendChild(img);
        }
    }

    function showNext() {
        visibleItemsList = getVisibleItems();
        if (visibleItemsList.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleItemsList.length;
        updateLightboxContent(visibleItemsList[currentIndex]);
    }

    function showPrev() {
        visibleItemsList = getVisibleItems();
        if (visibleItemsList.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleItemsList.length) % visibleItemsList.length;
        updateLightboxContent(visibleItemsList[currentIndex]);
    }

    // Clic en items de la grilla para abrir Lightbox
    masonryItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });

    // Eventos de cierre y navegación
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
