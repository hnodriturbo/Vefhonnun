(isWindows = -1 < navigator.platform.indexOf("Win")), isWindows ? ($(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar(), $("html").addClass("perfect-scrollbar-on")) : $("html").addClass("perfect-scrollbar-off");
var breakCards = !0,
    searchVisible = 0,
    transparent = !0,
    transparentDemo = !0,
    fixedTop = !1,
    mobile_menu_visible = 0,
    mobile_menu_initialized = !1,
    toggle_initialized = !1,
    bootstrap_nav_initialized = !1,
    seq = 0,
    delays = 80,
    durations = 500,
    seq2 = 0,
    delays2 = 80,
    durations2 = 500;
function debounce(n, i, t) {
    var r;
    return function () {
        var e = this,
            a = arguments;
        clearTimeout(r),
            (r = setTimeout(function () {
                (r = null), t || n.apply(e, a);
            }, i)),
            t && !r && n.apply(e, a);
    };
}
$(document).ready(function () {
    $("body").bootstrapMaterialDesign(),
        ($sidebar = $(".sidebar")),
        md.initSidebarsCheck(),
        (window_width = $(window).width()),
        md.checkSidebarImage(),
        0 != $(".selectpicker").length && $(".selectpicker").selectpicker(),
        $('[rel="tooltip"]').tooltip(),
        $(".form-control")
            .on("focus", function () {
                $(this).parent(".input-group").addClass("input-group-focus");
            })
            .on("blur", function () {
                $(this).parent(".input-group").removeClass("input-group-focus");
            }),
        $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on("click", function () {
            $(this).hasClass("error") && $(this).closest("div").removeClass("has-error");
        });
}),
    $(document).on("click", ".navbar-toggler", function () {
        if ((($toggle = $(this)), 1 == mobile_menu_visible))
            $("html").removeClass("nav-open"),
                $(".close-layer").remove(),
                setTimeout(function () {
                    $toggle.removeClass("toggled");
                }, 400),
                (mobile_menu_visible = 0);
        else {
            setTimeout(function () {
                $toggle.addClass("toggled");
            }, 430);
            var e = $('<div class="close-layer"></div>');
            0 != $("body").find(".main-panel").length ? e.appendTo(".main-panel") : $("body").hasClass("off-canvas-sidebar") && e.appendTo(".wrapper-full-page"),
                setTimeout(function () {
                    e.addClass("visible");
                }, 100),
                e.click(function () {
                    $("html").removeClass("nav-open"),
                        (mobile_menu_visible = 0),
                        e.removeClass("visible"),
                        setTimeout(function () {
                            e.remove(), $toggle.removeClass("toggled");
                        }, 400);
                }),
                $("html").addClass("nav-open"),
                (mobile_menu_visible = 1);
        }
    }),
    $(window).resize(function () {
        md.initSidebarsCheck(),
            (seq = seq2 = 0),
            setTimeout(function () {
                md.initDashboardPageCharts();
            }, 500);
    }),
    (md = {
        misc: { navbar_menu_visible: 0, active_collapse: !0, disabled_collapse_init: 0 },
        checkSidebarImage: function () {
            ($sidebar = $(".sidebar")),
                (image_src = $sidebar.data("image")),
                void 0 !== image_src && ((sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'), $sidebar.append(sidebar_container));
        },
        initSidebarsCheck: function () {
            $(window).width() <= 991 && 0 != $sidebar.length && md.initRightMenu();
        },
        initDashboardPageCharts: function () {
            if (0 != $("#dailySalesChart").length || 0 != $("#completedTasksChart").length || 0 != $("#websiteViewsChart").length) {
                (dataDailySalesChart = { labels: ["M", "T", "W", "T", "F", "S", "S"], series: [[12, 17, 7, 17, 23, 18, 38]] }),
                    (optionsDailySalesChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0, high: 50, chartPadding: { top: 0, right: 0, bottom: 0, left: 0 } });
                var e = new Chartist.Line("#dailySalesChart", dataDailySalesChart, optionsDailySalesChart);
                md.startAnimationForLineChart(e),
                    (dataCompletedTasksChart = { labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"], series: [[230, 750, 450, 300, 280, 240, 200, 190]] }),
                    (optionsCompletedTasksChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0, high: 1e3, chartPadding: { top: 0, right: 0, bottom: 0, left: 0 } });
                var a = new Chartist.Line("#completedTasksChart", dataCompletedTasksChart, optionsCompletedTasksChart);
                md.startAnimationForLineChart(a);
                var n = Chartist.Bar(
                    "#websiteViewsChart",
                    { labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]] },
                    { axisX: { showGrid: !1 }, low: 0, high: 1e3, chartPadding: { top: 0, right: 5, bottom: 0, left: 0 } },
                    [
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function (e) {
                                        return e[0];
                                    },
                                },
                            },
                        ],
                    ]
                );
                md.startAnimationForBarChart(n);
            }
        },
        showNotification: function (e, a) {
            (type = ["", "info", "danger", "success", "warning", "primary"]),
                (color = Math.floor(5 * Math.random() + 1)),
                $.notify({ icon: "add_alert", message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer." }, { type: type[color], timer: 3e3, placement: { from: e, align: a } });
        },
        checkScrollForTransparentNavbar: debounce(function () {
            260 < $(document).scrollTop()
                ? transparent && ((transparent = !1), $(".navbar-color-on-scroll").removeClass("navbar-transparent"))
                : transparent || ((transparent = !0), $(".navbar-color-on-scroll").addClass("navbar-transparent"));
        }, 17),
        initRightMenu: debounce(function () {
            ($sidebar_wrapper = $(".sidebar-wrapper")),
                mobile_menu_initialized
                    ? 991 < $(window).width() && ($sidebar_wrapper.find(".navbar-form").remove(), $sidebar_wrapper.find(".nav-mobile-menu").remove(), (mobile_menu_initialized = !1))
                    : (console.log("intra"),
                      ($navbar = $("nav").find(".navbar-collapse").children(".navbar-nav")),
                      (mobile_menu_content = ""),
                      (nav_content = $navbar.html()),
                      (nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + "</ul>"),
                      (navbar_form = 0 != $("nav").find(".navbar-form").length ? $("nav").find(".navbar-form")[0].outerHTML : null),
                      ($sidebar_nav = $sidebar_wrapper.find(" > .nav")),
                      ($nav_content = $(nav_content)),
                      ($navbar_form = $(navbar_form)),
                      $nav_content.insertBefore($sidebar_nav),
                      $navbar_form.insertBefore($nav_content),
                      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (e) {
                          e.stopPropagation();
                      }),
                      window.dispatchEvent(new Event("resize")),
                      (mobile_menu_initialized = !0));
        }, 200),
        startAnimationForLineChart: function (e) {
            e.on("draw", function (e) {
                ("line" !== e.type && "area" !== e.type) || !window.matchMedia("(min-width: 900px)").matches
                    ? "point" === e.type && (seq++, e.element.animate({ opacity: { begin: seq * delays, dur: durations, from: 0, to: 1, easing: "ease" } }))
                    : e.element.animate({ d: { begin: 600, dur: 700, from: e.path.clone().scale(1, 0).translate(0, e.chartRect.height()).stringify(), to: e.path.clone().stringify(), easing: Chartist.Svg.Easing.easeOutQuint } });
            }),
                (seq = 0);
        },
        startAnimationForBarChart: function (e) {
            e.on("draw", function (e) {
                "bar" === e.type && window.matchMedia("(min-width: 900px)").matches && (seq2++, e.element.animate({ opacity: { begin: seq2 * delays2, dur: durations2, from: 0, to: 1, easing: "ease" } }));
            }),
                (seq2 = 0);
        },
    });
//# sourceMappingURL=_site_dashboard_free/assets/js/dashboard-free.js.map
