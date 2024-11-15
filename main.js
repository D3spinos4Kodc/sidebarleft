<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

$(document).ready(function () {
    const $body = $('body');  // Referencia al cuerpo del documento
    const $sidebarToggle = $('.sidebar-toggle, .sidebar-toggle-alt');  // Imágenes de toggle
    const $toggleExpanded = $('.toggle-expanded');  // Imagen grande
    const $toggleCollapsed = $('.toggle-collapsed');  // Imagen pequeña
    const $barraSuperior = $('.barraSuperior');  // Barra superior
    const sidebarWidth = 80;  // Ancho del sidebar colapsado
    const sidebarCollapsedWidth = 250;  // Ancho del sidebar expandido
    const animationDuration = 300;  // Duración de la animación en ms
    const animationDurationImg = 40;

    // Asegura que el sidebar comience en estado colapsado
    $toggleExpanded.css({ opacity: 0 }); // Inicialmente oculta la imagen expandida
    $toggleCollapsed.css({ opacity: 1 }); // Muestra la imagen colapsada
    $barraSuperior.css('margin-left', sidebarWidth + 'px');  // Ajusta margin-left inicial
    $barraSuperior.css('padding-right', sidebarWidth + 'px');  // Ajusta padding-right inicial

    // Función para ajustar la barra superior y sidebar con animación simultánea
    function ajustarBarraSuperiorYSidebar(expandido) {
        const nuevoMargen = expandido ? sidebarCollapsedWidth : sidebarWidth;
        const nuevoPadding = expandido ? sidebarCollapsedWidth : sidebarWidth;

        // Ajustar margin-left y padding-right de la barra superior
        $barraSuperior.stop().animate(
            {
                'margin-left': nuevoMargen + 'px',
                'padding-right': nuevoPadding + 'px'
            },
            animationDuration
        );
    }

    // Alternar estado del sidebar y animar la barra superior
    $sidebarToggle.on('click', function () {
        const esExpandido = $body.hasClass('open');

        // Alternar clase y animar barra superior
        $body.toggleClass('open', !esExpandido).toggleClass('opening', !esExpandido);
        ajustarBarraSuperiorYSidebar(!esExpandido);

        // Cambiar las imágenes del toggle con efecto de desvanecimiento
        if (esExpandido) {
            $toggleExpanded.stop().animate({ opacity: 0 }, animationDurationImg);
            $toggleCollapsed.stop().animate({ opacity: 1 }, animationDurationImg);
        } else {
            $toggleExpanded.stop().animate({ opacity: 1 }, animationDuration);
            $toggleCollapsed.stop().animate({ opacity: 0 }, animationDuration);
        }
    });

    // Ajustar la barra superior al cargar o redimensionar la ventana
    $(window).on('load resize', function () {
        if ($(window).width() < 768) {
            $body.removeClass('open opening').addClass('left');
            $barraSuperior.css({
                'margin-left': sidebarCollapsedWidth + 'px',
                'padding-right': sidebarCollapsedWidth + 'px'
            });  // Ajuste de barra superior para pantallas pequeñas
        } else {
            $body.removeClass('left');
            ajustarBarraSuperiorYSidebar($body.hasClass('open'));  // Ajustar según estado
        }
    });
});
