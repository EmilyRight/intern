import 'babel-polyfill';
import $ from 'jquery';
import {WOW} from './vendor/wow.min.js';
import   Swiper   from './vendor/swiper.min.js';
import { gaPush, gtmSet } from "./gtm-events.js";

window.jQuery = window.$ = $;
require('waypoints/lib/jquery.waypoints.js');
require('jquery.easing');

$(function (){
    let wow = new WOW({animateClass: 'animated', offset: 0, mobile: true});
    detectDevice();
    videoTeaser();
    menu();

    gtmSet();
    loadSvg();

    wow.init();

    //gtmSet();
    sliders();
    faqOpener();

    $('.js-go-next').on('click touch',function(e){e.preventDefault();e.stopPropagation();
        let nextSect = $(this).closest('section').next().get(0);
        goSection(nextSect);
    });

    /// Waypoints
    $('.section-layer').waypoint(function(dir){pointThis(dir, this)},{offset: '15%'});
    function pointThis(d,el){let $el = $(el.element);
        (d === 'down')? $el.addClass('on_point') : $el.removeClass('on_point');
    }





    let $sectHero = $('.section--specialization-dialog');
    $sectHero.waypoint(function(dir){
        window.addEventListener('scroll', movePeoples);
    },{offset: '10%'});

    function movePeoples(){
            let sectionPos = $sectHero.offset().top,
                scrollDiff = 100,    //scrollDiff = (window.innerHeight)/4,
                actionPoc = parseInt(sectionPos) + parseInt(scrollDiff),
                scrolledS = window.pageYOffset || document.documentElement.scrollTop;
            let $peoples = $sectHero.find('.people');

        let xOffset = (scrolledS - sectionPos)*2,
            yOffset = (scrolledS - sectionPos)*4;

        $sectHero.find('.pic-layer--boy').css({transform : 'translate('+ xOffset +'px, -'+ yOffset +'px )'});
        $sectHero.find('.pic-layer--girl').css({transform : 'translate(-'+ yOffset +'px, -'+ yOffset +'px )'});


        if(+scrolledS >= sectionPos){
            let yOffset = (scrolledS - sectionPos);

            if(yOffset >= 67){
                $sectHero.find('.box-content').removeClass('_dispoff')
                    .css({'transform': 'translateY('+ 0 +'px)','opacity':'1'});
            }
        }
        else if(+scrolledS < actionPoc){
            $sectHero.find('.box-content').addClass('_dispoff').css({'opacity':'0'});
           // $sectHero.find('.box-pic').removeClass('showed');
            $peoples.each(c => {
                //$(c).removeClass('_moved');
            })
        }
    }
});

function sliders(){
    const sliderAbout = new Swiper('.slider-about', {
        slidesPerView: 1.1,
        virtualTranslate:false,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        spaceBetween: 0,
        breakpoints: {
            600: {
                slidesPerView:0,
                virtualTranslate:true,
                spaceBetween: 0,
                pagination:false,
            }
        }
    });

    const sliderStages = new Swiper(".swiper_stages", {
        slidesPerView:"auto",
        spaceBetween: 18,
        pagination: {
            el: ".swiper-pagination_stages",
        },
        breakpoints: {
            600: {
                slidesPerView: 3,
                spaceBetween: 36,
                pagination: false,
            }
        },

    });

    const sliderWhatNext = new Swiper(".swiper_what-next", {
        slidesPerView: "auto",
        spaceBetween: 18,
        pagination: {
            el: ".swiper-pagination_next",
        },
        breakpoints: {
            600: {
                slidesPerView: 3,
                spaceBetween: 36,
                pagination: false,
            }
        },
    });

    const sliderReview = new Swiper(".swiper_review", {
        slidesPerView: "auto",
       // autoHeight: false,
        pagination: {
            el: ".swiper-pagination--review",
            clickable: true,
        },
        breakpoints: {
            600: {
                //autoHeight: false,
                slidesPerView:'auto',
            }
        },
        navigation: {
            nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",
        },
        on: {
            init: function(){
                //expand reviews
                let itm = '.reviews-item',
                    ac ='active';

                $('body').on('click', itm, function(e){
                        let $slf = $(e.target),
                            $itm = ($slf.hasClass('reviews-item'))? $slf : $slf.closest(itm);

                        if($itm.hasClass(ac)){$itm.removeClass(ac)}
                        else{
                            $itm.closest('.swiper_review').find(itm).removeClass(ac);
                            $itm.addClass(ac);
                        }
                }).on('click',function(e){
                    if(!$(e.target).closest(itm).length){$(itm).removeClass(ac)}
                });

            },
             slideChange: function(){//let pos = this.activeIndex;
                 $('.reviews-item').removeClass('active');
             },
        }
    });
}


function videoTeaser(){
    let startedClass = 'is_started',
        savingClass = 'device-suspended-mode',
        offsetPause = 400,
        selectorVideo = '#video-teaser';

    let vd = document.querySelector(selectorVideo);

    //change video source on HD
    //let hdVideoUrl = './video/video.h264.mp4'; ($(window).width() >=960)? vd.src = hdVideoUrl : null;

    function playPause(){
        let scrolled = window.pageYOffset || document.documentElement.scrollTop, state = vd.paused;
        if(+scrolled >= offsetPause && !state){vd.pause()}
        else if(+scrolled < offsetPause && state){vd.play()}
    }

    let readyPlay = vd.play();
    if(readyPlay !== undefined){
        readyPlay.then(function(){
            window.addEventListener('scroll', playPause);
            vd.classList.add(startedClass);
        }).catch(function(err){//console.warn('Automatic playback failed.');
            vd.classList.add(savingClass);
            $('.teaser,body').on('touchstart', function(){
                if(!vd.playing){vd.play();vd.classList.add(startedClass);}
            });
        });
    }
}

//Device
function detectDevice() {
    let deviceOs = getMobileOs();
    // let deviceTouch = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
    // let deviceScreen = (screen.width<=1024);

    // if (matchMedia('handheld').matches){console.log('mob')}
    // else{console.log('pc')}
    $('body').addClass('platform_' + deviceOs);
}

function getMobileOs() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const huaweiDevicesRegex =
        /ALP-|AMN-|ANA-|ANE-|ANG-|AQM-|ARS-|ART-|ATU-|BAC-|BLA-|BRQ-|CAG-|CAM-|CAN-|CAZ-|CDL-|CDY-|CLT-|CRO-|CUN-|DIG-|DRA-|DUA-|DUB-|DVC-|ELE-|ELS-|EML-|EVA-|EVR-|FIG-|FLA-|FRL-|GLK-|HMA-|HW-|HWI-|INE-|JAT-|JEF-|JER-|JKM-|JNY-|JSC-|LDN-|LIO-|LON-|LUA-|LYA-|LYO-|MAR-|MED-|MHA-|MLA-|MRD-|MYA-|NCE-|NEO-|NOH-|NOP-|OCE-|PAR-|PIC-|POT-|PPA-|PRA-|RNE-|SEA-|SLA-|SNE-|SPN-|STK-|TAH-|TAS-|TET-|TRT-|VCE-|VIE-|VKY-|VNS-|VOG-|VTR-|WAS-|WKG-|WLZ-|JAD-|WKG-|MLD-|RTE-|NAM-|NEN-|BAL-|JAD-|JLN-|YAL/i;
    const isHuaweiDevice = huaweiDevicesRegex.test(navigator.userAgent);

    if(isHuaweiDevice){return 'huawei'}
    if (/android/i.test(userAgent)){return 'android'}
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {return 'ios'}
    return 'unknown'
}

function isIOS() {
    let platform = navigator.platform.toLowerCase();
    return ((platform.indexOf("iphone") !== -1) || (platform.indexOf("ipod") !== -1));
}

function goSection(el){
    let offs = 0;
    let y = el.getBoundingClientRect().top + window.pageYOffset + offs;
    window.scrollTo({top: y, behavior: 'smooth'}); // element.scrollIntoView();
}

function menu(){
    let $burger = $('.menu-burger'),
        $menu = $('.menu');
    let itm = '.menu__item';

    //show menu
    function toggleMobileMenu(){
        $burger.toggleClass('opened');
        $menu.toggleClass('opened');
    }
    function hilightItem($i) {
        let cls = 'active';
        $i.addClass(cls).siblings().removeClass(cls);
    }
    function goSection(s){
        let offs = -100;
        let section = '.section--'+s, el = document.querySelector(section);

        let atrName = 'data-anchor-offset';
        if (el.hasAttribute(atrName)){
            offs = -el.getAttribute(atrName);
        }

        let y = el.getBoundingClientRect().top + window.pageYOffset + offs;
        window.scrollTo({top: y, behavior: 'smooth'}); // element.scrollIntoView();
    }

    //активный пункт меню
    $('.section').waypoint(function(dir){
        let $sect = $(this.element), menuItem = $sect.attr('data-menu');
        let $_i = $menu.find(itm).filter('[data-section="'+menuItem+'"]'),
            $headr =$('.teaser-heading'),
            firstSection ='.section--join';

        hilightItem($_i);

        //закрепленное меню
        if($sect.closest(firstSection).length >= 1){
            if(dir === 'down'){$headr.addClass('sticky');}
            if(dir === 'up'){$headr.removeClass('sticky');
                $menu.find('.menu__item').removeClass('active');
            }
        }
    },{offset: '15%'});
    $('.section').waypoint(function(dir){
        let $sect = $(this.element), menuItem = $sect.attr('data-menu');
        let $_i = $menu.find(itm).filter('[data-section="'+menuItem+'"]');

        if(dir === 'up'){hilightItem($_i)}
    },{offset: '1%'});

    $burger.on('click', function(e){e.preventDefault();toggleMobileMenu()});
    $menu.on('click', itm, function(e){
        let $menuItem = $(this),
            dataTo = $menuItem.attr('data-section');

        if($menu.hasClass('opened')){toggleMobileMenu()}

        if(typeof dataTo !== typeof undefined && dataTo !== false && dataTo !== ''){
            e.preventDefault();
            goSection(dataTo);
            //hilightItem($menuItem);
        }
    });
}

function faqOpener(){
    let $item = $('.faq__item'),
        itm = '.faq__item--text', cl = 'active',
        close = '.faq__item--close';

    $item.on('click touch',function(){let $self = $(this);
        if($self.find(itm).hasClass(cl)){
            $item.find(itm).removeClass(cl);
            $item.find(close).removeClass(cl);
        }else{
            $item.find(itm).removeClass(cl);
            $item.find(close).removeClass(cl);
            $self.find(itm).addClass(cl);
            $self.find(close).addClass(cl);

        }
    });
}



// <svg data-url="./img/logo.svg"></svg>
function loadSvg(){
    window.addEventListener('load', function(){
        const svgs = document.querySelectorAll('svg[data-url]');
        const svgsLen = svgs.length;

        for (let i = 0; i < svgsLen; ++i){
            let url = svgs[i].getAttribute('data-url');
            svgs[i].removeAttribute('data-url');

            fetchSVG(url, svgs[i]);
        }
    });
}

const fetchSVG = async function(url, el){//console.log(url);
    let response = await fetch(url);
    let data = await response.text();

    // This response should be an XML document we can parse.
    const parser = new DOMParser();
    const parsed = parser.parseFromString(data, 'image/svg+xml');

    let svg = parsed.getElementsByTagName('svg');
    if (svg.length) {svg = svg[0];
        const attr = svg.attributes, attrLen = attr.length;
        for (let i = 0; i < attrLen; ++i) {
            if (attr[i].specified){
                // Merge classes.
                if ('class' === attr[i].name) {
                    const classes = attr[i].value.replace(/\s+/g, ' ').trim().split(' ');
                    const classesLen = classes.length;
                    for (let j = 0; j < classesLen; ++j){el.classList.add(classes[j])}
                }
                else {el.setAttribute(attr[i].name, attr[i].value)}
            }
        }

        while(svg.childNodes.length){el.appendChild(svg.childNodes[0])}
    }
};
