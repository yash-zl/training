function closeAll() {
    var alerts_dd = document.querySelector("#alerts_dd");
    var ann_dd = document.querySelector("#announcements_dd");
    var ham_dd = document.querySelector(".ham_menu_links_dd");
    if (ann_dd.style.display == "flex") {
        ann_dd.style.display = "none";
    }
    if (ham_dd.style.display != "none") {
        ham_dd.style.display = "none";
    }
    if (alerts_dd.style.display != "none") {
        alerts_dd.style.display = "none";
    }
}
var Alert = /** @class */ (function () {
    function Alert(content, checked, second_line, date, time) {
        this.content = content;
        this.checked = checked;
        this.second_line = second_line;
        this.date = date;
        this.time = time;
    }
    return Alert;
}());
var all_alerts = [
    new Alert("License for introduction to Algebra has been assigned to your school", false, null, [15, "Sep", 2018], [7, 21, "pm"]),
    new Alert("Lesson 3 Practice Worksheet overdue for Amy Santiago", true, { key: "Course", value: "Advanced Mathematics" }, [15, "Sep", 2018], [5, 21, "pm"]),
    new Alert("23 new students created", false, null, [14, "Sep", 2018], [1, 21, "pm"]),
    new Alert("15 submissions ready for evaluation", false, { key: "Class", value: "Basics of Algebra" }, [13, "Sep", 2018], [1, 15, "pm"]),
    new Alert("License for Basic Concepts in Geometry has been assigned to your school", false, null, [15, "Sep", 2018], [7, 21, "pm"]),
    new Alert("Lesson 3 Practice Worksheet overdue for Rosa Diaz", true, { key: "Course", value: "Mathematics" }, [15, "Sep", 2018], [7, 21, "pm"]),
];
var alerts = document.getElementById("alerts_dd_all");
all_alerts.forEach(function (a) {
    var ann = document.createElement("div");
    ann.setAttribute("class", "ann_container");
    a.checked ? ann.classList.add("checked") : null;
    var ih = "\n            <div class=\"announcement flex-col small\">\n            <div class=\"content_check\">\n          <div class=\"content medium\">".concat(a.content, "</div>\n          <img src=\"").concat(a.checked ? "icons/tick-green.png" : "icons/minus-green-1.png", "\" alt>\n          </div>\n\n          ").concat(a.second_line
        ? "<div class=\"flex-start al_second_line\"><span class=\"sl_key\">".concat(a.second_line.key, ":</span><span class=\"sl_value\">&nbsp;").concat(a.second_line.value, "</span></div>")
        : "", "\n\n          <div class=\"flex-end date_time\">\n            <span class=\"date\">").concat(a.date[0] + "-" + a.date[1] + "-" + a.date[2], "</span>&nbsp;at&nbsp;\n            <span class=\"time\">").concat(a.time[0] + ":" + a.time[1] + " " + a.time[2], "</span>\n            </div>\n            </div>\n            </div>\n\n            ");
    ann.innerHTML = ih;
    alerts.appendChild(ann);
});
alerts = document.querySelector("#alerts");
var alerts_dd = document.querySelector("#alerts_dd");
var ann_dd = document.querySelector("#announcements_dd");
var ham_dd = document.querySelector(".ham_menu_links_dd");
alerts.addEventListener("mouseover", function () {
    closeAll();
    alerts_dd.style.display = "block";
});
alerts_dd.addEventListener("mouseover", function () {
    closeAll();
    alerts_dd.style.display = "block";
});
alerts_dd.addEventListener("mouseout", function () {
    alerts_dd.style.display = "none";
});
var Announcement = /** @class */ (function () {
    function Announcement(pa, checked, content, course, files_attached, date, time) {
        this.pa = pa;
        this.checked = checked;
        this.content = content;
        this.course = course;
        this.files_attached = files_attached;
        this.date = date;
        this.time = time;
    }
    return Announcement;
}());
var announcements = [
    new Announcement("Wilson Kumar", true, "No classes will be held on 21st Nov", null, 2, [15, "Sep", 2018], [7, 21, "pm"]),
    new Announcement("Samson White", false, "Guest lecture on Geometry on 20th September", null, 2, [15, "Sep", 2018], [7, 21, "pm"]),
    new Announcement("Wilson Kumar", true, "Additional course materials available on request", "Mathematics 101", null, [15, "Sep", 2018], [7, 21, "pm"]),
    new Announcement("Wilson Kumar", false, "No classes will be held on 25th Dec", null, null, [15, "Sep", 2018], [7, 21, "pm"]),
    new Announcement("Wilson Kumar", false, "Additional course materials available on request", "Mathematics 101", null, [15, "Sep", 2018], [7, 21, "pm"]),
];
var all_ann = document.getElementById("announcements_dd_all");
announcements.forEach(function (a) {
    var ann = document.createElement("div");
    ann.setAttribute("class", "ann_container");
    a.checked ? ann.classList.add("checked") : null;
    var ih = "\n            <div class=\"announcement flex-col\">\n              <div class=\"ann_pa_check small\">\n                <div class=\"pa\">PA: <span class=\"pa_name\">".concat(a.pa, "</span></div>\n                <div class=\"check\">\n          <img\n          height=\"18px\"\n          src=").concat(a.checked ? "icons/tick-green.png" : "icons/minus-green-1.png", "\n          alt=\"\"\n          />\n          </div>\n          </div>\n          <div class=\"content medium\">").concat(a.content, "</div>\n          <div class=\"course small\">").concat(a.course == null ? "" : a.course, "</div>\n          <div class=\"small files_attached asdf ").concat(a.files_attached ? "" : "flex-end", "\">\n            <div class=\"files_attached_num_div\">").concat(a.files_attached
        ? "<img height=\"12px\" src=\"icons/files.png\" alt=\"\" /><span\n          class=\"files_attached_num\">" +
            a.files_attached +
            "</span>&nbsp;files are attached\n          </div>"
        : "", "\n          \n          <div class=\"date_time\">\n            <span class=\"date\">").concat(a.date[0] + "-" + a.date[1] + "-" + a.date[2], "</span>&nbsp;at\n            <span class=\"time\">").concat(a.time[0] + ":" + a.time[1] + " " + a.time[2], "</span>\n            </div>\n            </div>\n            </div>\n            \n            ");
    ann.innerHTML = ih;
    all_ann.appendChild(ann);
});
announcements = document.querySelector("#announcements");
var announ_dd = document.querySelector("#announcements_dd");
announcements.addEventListener("mouseover", function () {
    closeAll();
    announ_dd.style.display = "flex";
});
announ_dd.addEventListener("mouseover", function () {
    closeAll();
    announ_dd.style.display = "flex";
});
announ_dd.addEventListener("mouseout", function () {
    announ_dd.style.display = "none";
});
// let ham_dd = document.querySelector(".ham_menu_links_dd");
var ham_dd_content = [
    {
        item: "dashboard",
        sub_items: [],
    },
    {
        item: "content",
        sub_items: ["course catalog"],
    },
    {
        item: "Users",
        sub_items: ["user 1", "user 2", "user 3"],
    },
    {
        item: "reports",
        sub_items: ["report1"],
    },
    {
        item: "admin",
        sub_items: ["admin function 1"],
    },
];
console.log(ham_dd_content);
ham_dd_content.forEach(function (element) {
    var dd_el = document.createElement("div");
    dd_el.setAttribute("id", "dd_el_" + element.item);
    var dd_el_ih = "<div id=\"dd_".concat(element.item, "\" class='dd_item_head' onclick=\"openItemInDD('").concat(element.item, "')\">").concat(element.item);
    console.log(element.sub_items);
    if (element.sub_items.length > 0) {
        dd_el_ih = dd_el_ih.concat("<img  src='/icons/arrow-down.svg' alt=\"\" /></div>");
        element.sub_items.forEach(function (si) {
            dd_el_ih = dd_el_ih.concat("\n              <div class=\"dd_el_si ".concat(element.item, "_si\" alt=\"\">").concat(si, "</div>\n              "));
        });
    }
    else {
        dd_el_ih = dd_el_ih.concat("</div>");
    }
    dd_el.innerHTML = dd_el_ih;
    ham_dd.appendChild(dd_el);
});
var ham_selected = "";
function closeInDD(ham_selected) {
    var sis = document.querySelectorAll("." + ham_selected + "_si");
    sis.forEach(function (si) {
        si.style.display = "none";
    });
    var prev_ih = document.querySelector("#dd_el_" + ham_selected);
    var prev_ig_img = prev_ih.querySelector("img");
    prev_ig_img.setAttribute("src", "/icons/arrow-down.svg");
    // prev_ig_img = prev_ih.querySelector("img");
    // console.log(img);
    prev_ig_img.setAttribute("height", "24px");
    prev_ig_img.style.padding = "0px";
    prev_ih.style.background = "white";
}
var open_ham = "";
function openItemInDD(item) {
    if (ham_selected != "") {
        closeInDD(ham_selected);
    }
    if (open_ham == item && ham_selected == item) {
        closeInDD(item);
        open_ham = "";
        return;
    }
    console.log(item);
    var ih = document.querySelector("#dd_el_" + item);
    ih.style.background = "#F3F3F3";
    var sis = ih.querySelectorAll("." + item + "_si");
    console.log(sis.length);
    sis.forEach(function (si) {
        // si.classList.add("show");
        si.style.display = "block";
    });
    var arr = ih.querySelector("img");
    arr.setAttribute("src", "/icons/arrow-up (1).png");
    arr.setAttribute("height", "13px");
    arr.style.padding = "5px";
    ham_selected = item;
    open_ham = item;
}
var prev_navbar_selected = "";
var navbar_selected = "";
var navbar_links = document.querySelectorAll(".navbar_link");
navbar_links.forEach(function (element) {
    element.addEventListener("click", function (e) {
        e.preventDefault();
        prev_navbar_selected = navbar_selected;
        navbar_selected = element.getAttribute("id");
        updateNavbar();
    });
});
function updateNavbar() {
    //   let;
    if (navbar_selected == "hamburger") {
        var dd = document.querySelector(".ham_menu_links_dd");
        if (dd.style.display == "flex") {
            dd.style.display = "none";
        }
        else {
            closeAll();
            dd.style.display = "flex";
        }
    }
    else {
        if (prev_navbar_selected != "")
            document
                .getElementById(prev_navbar_selected)
                .classList.remove("selected_navbar_link");
        document
            .getElementById(navbar_selected)
            .classList.add("selected_navbar_link");
    }
}
var CourseClass = /** @class */ (function () {
    function CourseClass(title, thumbnail, starred, subject, grade_base, grade_plus, units, lessons, topics, class_there, class_name, class_students, from_day, from_month, from_year, to_day, to_month, to_year, preview, manage_course, grade_submissions, reports, expired) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.starred = starred;
        this.subject = subject;
        this.grade_base = grade_base;
        this.grade_plus = grade_plus;
        this.units = units;
        this.lessons = lessons;
        this.topics = topics;
        this.class_there = class_there;
        if (class_there) {
            this.class_name = class_name;
            this.class_students = class_students;
            this.from_day = from_day;
            this.from_month = from_month;
            this.from_year = from_year;
            this.to_day = to_day;
            this.to_month = to_month;
            this.to_year = to_year;
        }
        this.preview = preview;
        this.manage_course = manage_course;
        this.grade_submissions = grade_submissions;
        this.reports = reports;
        this.expired = expired;
    }
    return CourseClass;
}());
var selected_section = "courses";
var courses_info = [
    new CourseClass("Acceleration", "images/imageMask-1.svg", false, "Physics", 7, 2, 4, 18, 24, true, "Mr. Frank's Class B", 50, 21, "Jan", 2020, 21, "Aug", 2020, true, true, true, true, false),
    new CourseClass("Displacement, Velocity and Speed", "images/imageMask-2.svg", false, "Physics 2", 6, 3, 2, 15, 20, false, null, null, null, null, null, null, null, null, true, false, false, true, false),
    new CourseClass("Introduction to Biology: Micro organisms and how they affect the environment and its beings.", "images/imageMask.svg", false, "Biology", 4, 1, 5, 16, 22, true, "All Classes", 300, null, null, null, null, null, null, true, false, false, true, false),
    new CourseClass("Introduction to High School Mathematics", "images/imageMask-3.svg", false, "Mathematics", 8, 3, null, null, null, true, "Mr. Frank's Class A", 44, 14, "Oct", 2019, 20, "Oct", 2020, true, true, true, true, true),
];
function getFirst(title) {
    if (title.length > 50)
        return title.substring(0, 51) + "...";
    else
        return title;
}
var section_card_grid = document.getElementById("section_card_grid");
courses_info.forEach(function (element) {
    var title_short = getFirst(element.title);
    var course_card = document.createElement("div");
    course_card.setAttribute("class", "course_card_container");
    var expired = element.expired
        ? "<div class=\"expired small\">EXPIRED</div>"
        : "";
    var star = "<img src=\"icons/favourite.svg\" alt=\"\" />";
    if (!element.starred)
        star = star.replace("alt", "class=\"not_starred\" alt");
    var card_top = "<div class='course_card'>\n            " +
        expired +
        "\n        <div class=\"course_thumbnail\">\n          <img src=\"" +
        element.thumbnail +
        "\" alt=\"\" />\n        </div>\n        <div class=\"course_info\">\n          <div class=\"main_course_info\">\n            <div class=\"course_title large\">" +
        title_short +
        "</div>\n            <div class=\"starred\">" +
        star +
        "</div>\n          </div>\n          <div class=\"course_lines\">";
    var card_line = "\n            <div class=\"course_second_line small\">\n              <div class=\"subject\">" +
        element.subject +
        "</div>\n              <div class=\"grade_info\">\n                Grade\n                <div class=\"grade_base\">".concat(element.grade_base, "</div>\n                <div class=\"grade_plus green\">+").concat(element.grade_plus, "</div>\n              </div>\n            </div>");
    var units_lessons_topics = "\n            <div class=\"course_third_line small\">\n              <div class=\"units\">\n                <div class=\"units_num bold\">".concat(element.units, "&nbsp;</div>\n                Units\n              </div>\n              <div class=\"lessons\">\n                <div class=\"lessons_num bold\">").concat(element.lessons, "&nbsp;</div>\n                Lessons\n              </div>\n              <div class=\"topics\">\n                <div class=\"topics_num bold\">").concat(element.topics, "&nbsp;</div>\n                Topics\n              </div>\n            </div>");
    if (element.units != null)
        card_line += units_lessons_topics + "</div>";
    else
        card_line += "</div>";
    var classes_info = "\n          <div class=\"course_fourth_line\">\n            <div class=\"dropdown greybott class_dd\">\n              ";
    // console.log(element.class_there);
    if (element.class_there) {
        classes_info = classes_info.concat("<div class=\"class_name\">".concat(element.class_name, "</div>\n              <div class=\"arrow_down\">\n                <img src=\"icons/arrow-down.svg\" alt=\"\" />\n              </div>\n            </div>\n            <div class=\"class_info small\">\n              <div class=\"students\">\n                <div class=\"students_num\">").concat(element.class_students, " &nbsp;</div>\n                Students\n              </div>\n              "));
        if (element.from_day != null) {
            classes_info += "\n            <div class=\"dates\">\n                <div class=\"from_date\">".concat(element.from_day, "-").concat(element.from_month, "-").concat(element.from_year, "</div>\n                &nbsp;-&nbsp;\n                <div class=\"to_date\">").concat(element.to_day, "-").concat(element.to_month, "-").concat(element.to_year, "</div>\n            </div></div></div></div>");
        }
        else {
            classes_info += "</div></div></div>";
        }
    }
    else {
        classes_info += "\n            <div class=\"class_name inactive\">No Classes</div>\n              <div class=\"arrow_down\">\n                <img src=\"icons/arrow-down.svg\" alt=\"\" />\n              </div>\n            </div>\n\n          </div>\n        </div>\n        ";
    }
    var not_avl = 'class="not_avl"';
    var preview_img = "<img src=\"icons/preview.svg\"  alt=\"\" />";
    var manage_c_img = "<img src=\"icons/manage course.svg\" alt=\"\" />";
    var grad_subs_img = "<img src=\"icons/grade submissions.svg\" alt=\"\" />";
    var reports_img = "<img src=\"icons/reports.svg\" alt=\"\" />";
    if (!element.preview)
        preview_img = preview_img.replace("alt=", 'class="not_avl');
    if (!element.manage_course)
        manage_c_img = manage_c_img.replace("alt=", 'class="not_avl');
    if (!element.grade_submissions)
        grad_subs_img = grad_subs_img.replace("alt=", 'class="not_avl');
    if (!element.reports)
        reports_img = reports_img.replace("alt=", 'class="not_avl');
    var footer = "\n        <div class=\"course_footer\"><div class=\"footer_icon preview\">" +
        preview_img +
        "\n            \n          </div>\n          <div class=\"footer_icon manage_course\">\n            " +
        manage_c_img +
        "\n          </div>\n          <div class=\"footer_icon grade_subs\">\n            " +
        grad_subs_img +
        "\n          </div>\n          <div class=\"footer_icon reports\">\n            " +
        reports_img +
        "\n          </div>\n          </div>\n          </div>\n        ";
    console.log(element);
    // console.log(classes_info);
    course_card.innerHTML = card_top + card_line + classes_info + footer;
    section_card_grid.appendChild(course_card);
});
