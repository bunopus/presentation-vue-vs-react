
/**
 * Show logos with frameworks
 *
 * @author https://github.com/bunopus
 */
(function() {
    const config = Reveal.getConfig().cornerLogos;
    const logoClass = 'corner-logo';
    const horizontalClass = 'horizontal-layout';
    const cornerLogos = addLogos(config);
    const margin = '10px'

    hideLogos(cornerLogos);

    function showEl(el, position) {
        let css = {position: 'absolute', 'z-index': 100};
        css = Object.assign(css, position);
        el.removeAttr('style').css(css).show();
    }

    Reveal.addEventListener( 'slidechanged', function( slide ) {
        hideLogos(cornerLogos);

        let frameworks = getFrameworks(slide.currentSlide, Object.keys(cornerLogos));
        if (!frameworks.length || frameworks.length > 2) {
            return;
        }
        let horizontal = getLayout(slide.currentSlide, horizontalClass);
        if (horizontal) {
            frameworks[0] && showEl(cornerLogos[frameworks[0]], {left: `${margin}`, top: `${margin}`});
            frameworks[1] && showEl(cornerLogos[frameworks[1]], {left: `${margin}`, top: `calc(50% + ${margin})`});
        } else {
            frameworks[0] && showEl(cornerLogos[frameworks[0]], {top: `${margin}`, left: `${margin}`});
            frameworks[1] && showEl(cornerLogos[frameworks[1]], {top: `${margin}`, right: `${margin}`});
        }

    }, false );

    function addLogos(config) {
        let retVal = {};
        for(let cls in config){
            retVal[cls] = $(`<div class='.${logoClass}'><img src='${config[cls]}'></div>`).appendTo('body');
        }
        return retVal;
    }

    function hideLogos(logos) {
        for (let key in logos) {
            logos[key].hide();
        }
    }

    function getFrameworks(slide, classes) {
        let frameworks = intersect(slide.classList, classes);
        return frameworks.length ? frameworks : intersect(slide.parentElement.classList, classes)
    }

    function getLayout(slide, layoutClass) {
        return slide.classList.contains(layoutClass);
    }

    function intersect(a, b) {
        return [...new Set(a)].filter(x => new Set(b).has(x));
    }
})();
