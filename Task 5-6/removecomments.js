function remove(code) {
  lines = code.split("\n");
  rewritten_code = ``;
  for (line in lines) {
    if (!line.trim().includes("//")) {
      rewritten_code = rewritten_code.concat(line + "\n");
    }
  }
  return rewritten_code;
}

console.log(
  remove(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF_8" />
    <meta name="viewport" content="width=device_width, initial_scale=1.0" />
    <title>Quantum Dashboard</title>
    <!-- <link rel="stylesheet" href="index.css" />-->
    <link rel="stylesheet" href="scss_index.css" />
    <link rel="stylesheet" href="scss_dashboard.css" />
  </head>

  <body>
    <script>
      // function close_all() {
      //   alerts_dd = document.querySelector("#alerts_dd");
      //   ann_dd = document.querySelector("#announcements_dd");
      //   ham_dd = document.querySelector(".ham_menu_links_dd");
      //   if (ann_dd.style.display == "flex") {
      //     ann_dd.style.display = "none";
      //   }
      //   if (ham_dd.style.display != "none") {
      //     ham_dd.style.display = "none";
      //   }
      //   if (alerts_dd.style.display != "none") {
      //     alerts_dd.style.display = "none";
      //   }
      // }
    </script>
    <header>
      <div class="header_logo">
        <img src="icons/logo used in header.svg" alt="" />
      </div>
      <div class="links">
        <div class="ham_menu_links">
          <a id="dashboard" class="navbar_link">Dashboard</a>
          <a id="content" class="navbar_link">Content</a>
          <a id="users" class="navbar_link">Users</a>
          <a id="reports" class="navbar_link">Reports</a>
          <a id="admin" class="navbar_link">Admin</a>
        </div>

        <a id="alerts" class="navbar_link alerts_link">
          <img src="icons/alerts.svg" alt="" />
          <div class="badge">2</div>
        </a>
        <div id="alerts_dd" class="abs">
          <div id="alerts_dd_all"></div>
          <div class="show_create_ann_container">
            <div class="show_create_ann">
              <div class="right-border">SHOW ALL</div>
              <div>CREATE NEW</div>
            </div>
          </div>
        </div>
        <script>
          // class alert {
          //   constructor(content, checked, second_line, date, time) {
          //     this.content = content;
          //     this.checked = checked;
          //     this.second_line = second_line;
          //     this.date = date;
          //     this.time = time;
          //   }
          // }

          // all_alerts = [
          //   new alert(
          //     "License for introduction to Algebra has been assigned to your school",
          //     false,
          //     undefined,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new alert(
          //     "Lesson 3 Practice Worksheet overdue for Amy Santiago",
          //     true,
          //     { key: "Course", value: "Advanced Mathematics" },
          //     [15, "Sep", 2018],
          //     [5, 21, "pm"]
          //   ),
          //   new alert(
          //     "23 new students created",
          //     false,
          //     undefined,
          //     [14, "Sep", 2018],
          //     [1, 21, "pm"]
          //   ),
          //   new alert(
          //     "15 submissions ready for evaluation",
          //     false,
          //     { key: "Class", value: "Basics of Algebra" },
          //     [13, "Sep", 2018],
          //     [1, 15, "pm"]
          //   ),
          //   new alert(
          //     "License for Basic Concepts in Geometry has been assigned to your school",
          //     false,
          //     undefined,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new alert(
          //     "Lesson 3 Practice Worksheet overdue for Rosa Diaz",
          //     true,
          //     { key: "Course", value: "Mathematics" },
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          // ];
          // alerts = document.getElementById("alerts_dd_all");

          // all_alerts.forEach((a) => {
          //   ann = document.createElement("div");
          //   ann.setAttribute("class", "ann_container");
          //   a.checked ? ann.classList.add("checked") : undefined;
          //   ih = --string_denotion--
          //   <div class="announcement flex-col">
          // <div class="content">js_start_inlinea.content}</div>

          // js_start_inline
          //   a.second_line
          //     ? --string_denotion--<div class="flex-start al_second_line"><span class="sl_key">js_start_inlinea.second_line.key}:</span><span class="sl_value">&nbsp;js_start_inlinea.second_line.value}</span></div>--string_denotion--
          //     : --string_denotion----string_denotion--
          // }

          // <div class="flex-end date_time">
          //   <span class="date">js_start_inline
          //     a.date[0] + "-" + a.date[1] + "-" + a.date[2]
          //   }</span>&nbsp;at&nbsp;
          //   <span class="time">js_start_inline
          //     a.time[0] + ":" + a.time[1] + " " + a.time[2]
          //   }</span>
          //   </div>
          //   </div>
          //   </div>

          //   --string_denotion--;

          //   ann.innerHTML = ih;

          //   alerts.appendChild(ann);
          // });
        </script>
        <script>
          // alerts = document.querySelector("#alerts");
          // alerts_dd = document.querySelector("#alerts_dd");
          // ann_dd = document.querySelector("#announcements_dd");
          // ham_dd = document.querySelector(".ham_menu_links_dd");
          // alerts.addEventListener("mouseover", () => {
          //   close_all();
          //   alerts_dd.style.display = "block";
          // });

          // alerts_dd.addEventListener("mouseover", () => {
          //   close_all();
          //   alerts_dd.style.display = "block";
          // });

          // alerts_dd.addEventListener("mouseout", () => {
          //   alerts_dd.style.display = "none";
          // });
        </script>
        <!-- <div class="abs dd">Hi</div> -->
        <a
          id="announcements"
          onmouseover="mouseover('announcements')"
          class="navbar_link announcements_link"
        >
          <img src="icons/announcements.svg" alt="" />
          <div class="badge">1</div>
        </a>
        <div id="announcements_dd" class="abs">
          <div id="announcements_dd_all"></div>
          <div class="show_create_ann_container">
            <div class="show_create_ann">
              <div class="right-border">SHOW ALL</div>
              <div>CREATE NEW</div>
            </div>
          </div>
        </div>
        <a
          id="profile"
          onmouseover="mouseover('profile')"
          class="navbar_link profile"
        >
          <img src="icons/account_circle.svg" alt="" />
          <div class="badge">T</div>
        </a>
        <script>
          // class announcement {
          //   constructor(
          //     pa,
          //     checked,
          //     content,
          //     course,
          //     files_attached,
          //     date,
          //     time
          //   ) {
          //     this.pa = pa;
          //     this.checked = checked;
          //     this.content = content;
          //     this.course = course;
          //     this.files_attached = files_attached;
          //     this.date = date;
          //     this.time = time;
          //   }
          // }

          // announcements = [
          //   new announcement(
          //     "Wilson Kumar",
          //     true,
          //     "No classes will be held on 21st Nov",
          //     undefined,
          //     2,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new announcement(
          //     "Samson White",
          //     false,
          //     "Guest lecture on Geometry on 20th September",
          //     undefined,
          //     2,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new announcement(
          //     "Wilson Kumar",
          //     true,
          //     "Additional course materials available on request",
          //     "Mathematics 101",
          //     undefined,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new announcement(
          //     "Wilson Kumar",
          //     false,
          //     "No classes will be held on 25th Dec",
          //     undefined,
          //     undefined,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          //   new announcement(
          //     "Wilson Kumar",
          //     false,
          //     "Additional course materials available on request",
          //     "Mathematics 101",
          //     undefined,
          //     [15, "Sep", 2018],
          //     [7, 21, "pm"]
          //   ),
          // ];

          // all_ann = document.getElementById("announcements_dd_all");

          // announcements.forEach((a) => {
          //   ann = document.createElement("div");
          //   ann.setAttribute("class", "ann_container");
          //   a.checked ? ann.classList.add("checked") : undefined;
          //   ih = --string_denotion--
          //   <div class="announcement flex-col">
          //     <div class="ann_pa_check">
          //       <div class="pa">PA: <span class="pa_name">js_start_inlinea.pa}</span></div>
          //       <div class="check">
          // <img
          // height="18px"
          // src=js_start_inlinea.checked ? "icons/tick-green.png" : "icons/minus-green-1.png"}
          // alt=""
          // />
          // </div>
          // </div>
          // <div class="content">js_start_inlinea.content}</div>
          // <div class="course">js_start_inlinea.course == undefined ? --string_denotion----string_denotion-- : a.course}</div>
          // <div class=" files_attached js_start_inlinea.files_attached ? "" : "flex-end"}">
          //   <div class="files_attached_num_div">js_start_inline
          //     a.files_attached
          //       ? --string_denotion--<img height="12px" src="icons/files.png" alt="" /><span
          // class="files_attached_num">--string_denotion-- +
          //         a.files_attached +
          //         --string_denotion--</span>&nbsp;files are attached
          // </div>--string_denotion--
          //       : ""
          //   }

          // <div class="date_time">
          //   <span class="date">js_start_inline
          //     a.date[0] + "-" + a.date[1] + "-" + a.date[2]
          //   }</span>&nbsp;at
          //   <span class="time">js_start_inline
          //     a.time[0] + ":" + a.time[1] + " " + a.time[2]
          //   }</span>
          //   </div>
          //   </div>
          //   </div>

          //   --string_denotion--;

          //   ann.innerHTML = ih;

          //   all_ann.appendChild(ann);
          // });
        </script>
        <script>
          // announcements = document.querySelector("#announcements");
          // announ_dd = document.querySelector("#announcements_dd");
          // announcements.addEventListener("mouseover", () => {
          //   close_all();
          //   announ_dd.style.display = "flex";
          // });

          // announ_dd.addEventListener("mouseover", () => {
          //   close_all();
          //   announ_dd.style.display = "flex";
          // });

          // announ_dd.addEventListener("mouseout", () => {
          //   announ_dd.style.display = "none";
          // });
        </script>
        <a id="hamburger" class="navbar_link" href="">
          <img src="icons/hamburger-menu.svg" alt="" />
        </a>
        <div class="ham_menu_links_dd"></div>
        <script>
          // ham_dd = document.querySelector(".ham_menu_links_dd");
          // ham_dd_content = [
          //   {
          //     item: "dashboard",
          //     sub_items: [],
          //   },
          //   {
          //     item: "content",
          //     sub_items: ["course catalog"],
          //   },
          //   {
          //     item: "Users",
          //     sub_items: ["user 1", "user 2", "user 3"],
          //   },
          //   {
          //     item: "reports",
          //     sub_items: ["report1"],
          //   },
          //   {
          //     item: "admin",
          //     sub_items: ["admin function 1"],
          //   },
          // ];
          // console.log(ham_dd_content);

          // ham_dd_content.forEach((element) => {
          //   dd_el = document.createElement("div");
          //   dd_el.setAttribute("id", "dd_el_" + element.item);
          //   dd_el_ih = --string_denotion--<div id="dd_js_start_inlineelement.item}" class='dd_item_head' onclick="open_item_in_dd('js_start_inlineelement.item}')">js_start_inlineelement.item}--string_denotion--;
          //   console.log(element.sub_items);
          //   if (element.sub_items.length > 0) {
          //     dd_el_ih = dd_el_ih.concat(
          //       --string_denotion--<img  src='/icons/arrow-down.svg' alt="" /></div>--string_denotion--
          //     );
          //     element.sub_items.forEach((si) => {
          //       dd_el_ih = dd_el_ih.concat(--string_denotion--
          //     <div class="dd_el_si js_start_inlineelement.item}_si" alt="">js_start_inlinesi}</div>
          //     --string_denotion--);
          //     });
          //   } else {
          //     dd_el_ih = dd_el_ih.concat("</div>");
          //   }
          //   dd_el.innerHTML = dd_el_ih;
          //   ham_dd.appendChild(dd_el);
          // });

          // ham_selected = "";

          // function close_in_dd(ham_selected) {
          //   sis = document.querySelectorAll("." + ham_selected + "_si");
          //   sis.forEach((si) => {
          //     si.style.display = "none";
          //   });
          //   prev_ih = document.querySelector("#dd_el_" + ham_selected);
          //   prev_ig_img = prev_ih.querySelector("img");
          //   prev_ig_img.setAttribute("src", "/icons/arrow-down.svg");
          //   // prev_ig_img = prev_ih.querySelector("img");
          //   // console.log(img);
          //   prev_ig_img.setAttribute("height", "24px");
          //   prev_ig_img.style.padding = "0px";
          //   prev_ih.style.background = "white";
          // }

          // open_ham = "";

          // function open_item_in_dd(item) {
          //   if (ham_selected != "") {
          //     close_in_dd(ham_selected);
          //   }

          //   if (open_ham == item && ham_selected == item) {
          //     close_in_dd(item);
          //     open_ham = "";
          //     return;
          //   }

          //   console.log(item);
          //   ih = document.querySelector("#dd_el_" + item);
          //   ih.style.background = "#F3F3F3";
          //   sis = ih.querySelectorAll("." + item + "_si");
          //   console.log(sis.length);
          //   sis.forEach((si) => {
          //     // si.classList.add("show");
          //     si.style.display = "block";
          //   });
          //   arr = ih.querySelector("img");
          //   arr.setAttribute("src", "/icons/arrow-up (1).png");
          //   arr.setAttribute("height", "13px");
          //   arr.style.padding = "5px";

          //   ham_selected = item;
          //   open_ham = item;
          // }
        </script>
      </div>
    </header>
    <div class="section_courses_classes">
      <div class="header_of_section">
        <div id="courses" class="section_option courses_option sel_section">
          <div class="icon_center courses_icon">
            <img src="icons/courses.svg" alt="" />&nbsp;
          </div>
          <div class="num_section courses_num">4&nbsp;</div>
          Courses
        </div>
        <div id="classes" class="section_option classes_option">
          <div class="icon_center classes_icon">
            <img src="icons/classes.svg" alt="" />&nbsp;
          </div>
          <div class="num_section classes_num">4&nbsp;</div>
          Classes
        </div>
      </div>
      <div class="section_info">
        <div class="num_available_of_option">
          Showing&nbsp;<span class="shown_num">4&nbsp;</span> of&nbsp;
          <span class="total_num">4&nbsp;</span
          ><span class="section_name">&nbsp;Courses</span>
        </div>
        <div class="sorting_info">
          <div>Sort By:</div>
          <div class="sort_method greybott">
            <div class="method_name">Course Name</div>
            <div class="sort_method_dd_arrow">
              <img src="icons/arrow-down.svg" alt="" />
            </div>
          </div>
          <div class="ascending_or_descending">
            <img src="icons/sort.svg" alt="" />
          </div>
        </div>
      </div>
      <div id="section_card_grid"></div>
    </div>
    <script>
      // prev_navbar_selected = "";
      // navbar_selected = "";
      // navbar_links = document.querySelectorAll(".navbar_link");
      // navbar_links.forEach((element) => {
      //   element.addEventListener("click", () => {
      //     window.event.preventDefault();
      //     prev_navbar_selected = navbar_selected;
      //     navbar_selected = element.getAttribute("id");
      //     update_navbar();
      //   });
      // });

      // function update_navbar() {
      //   if (navbar_selected == "hamburger") {
      //     dd = document.querySelector(".ham_menu_links_dd");
      //     if (dd.style.display == "flex") {
      //       dd.style.display = "none";
      //     } else {
      //       close_all();
      //       dd.style.display = "flex";
      //     }
      //   } else {
      //     if (prev_navbar_selected != "")
      //       document
      //         .getElementById(prev_navbar_selected)
      //         .classList.remove("selected_navbar_link");
      //     document
      //       .getElementById(navbar_selected)
      //       .classList.add("selected_navbar_link");
      //   }
      // }
    </script>
    <script>
      //   class Course {
      //     constructor(
      //       title,
      //       thumbnail,
      //       starred,
      //       subject,
      //       grade_base,
      //       grade_plus,
      //       units,
      //       lessons,
      //       topics,
      //       class_there,
      //       class_name,
      //       class_students,
      //       from_day,
      //       from_month,
      //       from_year,
      //       to_day,
      //       to_month,
      //       to_year,
      //       preview,
      //       manage_course,
      //       grade_submissions,
      //       reports,
      //       expired
      //     ) {
      //       this.title = title;
      //       this.thumbnail = thumbnail;
      //       this.starred = starred;
      //       this.subject = subject;
      //       this.grade_base = grade_base;
      //       this.grade_plus = grade_plus;
      //       this.units = units;
      //       this.lessons = lessons;
      //       this.topics = topics;
      //       this.class_there = class_there;
      //       if (class_there) {
      //         this.class_name = class_name;
      //         this.class_students = class_students;
      //         this.from_day = from_day;
      //         this.from_month = from_month;
      //         this.from_year = from_year;
      //         this.to_day = to_day;
      //         this.to_month = to_month;
      //         this.to_year = to_year;
      //       }
      //       this.preview = preview;
      //       this.manage_course = manage_course;
      //       this.grade_subs = grade_submissions;
      //       this.reports = reports;
      //       this.expired = expired;
      //     }
      //   }

      //   selected_section = "courses";

      //   courses_info = [
      //     new Course(
      //       "Acceleration",
      //       "images/imageMask-1.svg",
      //       false,
      //       "Physics",
      //       7,
      //       2,
      //       4,
      //       18,
      //       24,
      //       true,
      //       "Mr. Frank's Class B",
      //       50,
      //       21,
      //       "Jan",
      //       2020,
      //       21,
      //       "Aug",
      //       2020,
      //       true,
      //       true,
      //       true,
      //       true,
      //       false
      //     ),
      //     new Course(
      //       "Displacement, Velocity and Speed",
      //       "images/imageMask-2.svg",
      //       false,
      //       "Physics 2",
      //       6,
      //       3,
      //       2,
      //       15,
      //       20,
      //       false,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       true,
      //       false,
      //       false,
      //       true,
      //       false
      //     ),
      //     new Course(
      //       "Introduction to Biology: Micro organisms and how they affect the environment and its beings.",
      //       "images/imageMask.svg",
      //       false,
      //       "Biology",
      //       4,
      //       1,
      //       5,
      //       16,
      //       22,
      //       true,
      //       "All Classes",
      //       300,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       undefined,
      //       true,
      //       false,
      //       false,
      //       true,
      //       false
      //     ),
      //     new Course(
      //       "Introduction to High School Mathematics",
      //       "images/imageMask-3.svg",
      //       false,
      //       "Mathematics",
      //       8,
      //       3,
      //       undefined,
      //       undefined,
      //       undefined,
      //       true,
      //       "Mr. Frank's Class A",
      //       44,
      //       14,
      //       "Oct",
      //       2019,
      //       20,
      //       "Oct",
      //       2020,
      //       true,
      //       true,
      //       true,
      //       true,
      //       true
      //     ),
      //   ];

      //   function get_first(str) {
      //     if (str.length > 50) return str.substring(0, 51) + "...";
      //     else return str;
      //   }
      //   section_card_grid = document.getElementById("section_card_grid");
      //   courses_info.forEach((element) => {
      //     title_short = get_first(element.title);
      //     course_card = document.createElement("div");
      //     course_card.setAttribute("class", "course_card_container");

      //     expired = element.expired ? --string_denotion--<div class="expired">EXPIRED</div>--string_denotion-- : --string_denotion----string_denotion--;
      //     star = --string_denotion--<img src="icons/favourite.svg" alt="" />--string_denotion--;
      //     if (!element.starred)
      //       star = star.replace("alt", --string_denotion--class="not_starred" alt--string_denotion--);
      //     card_top =
      //       --string_denotion--<div class='course_card'>
      //         --string_denotion-- +
      //       expired +
      //       --string_denotion--
      //     <div class="course_thumbnail">
      //       <img src="--string_denotion-- +
      //       element.thumbnail +
      //       --string_denotion--" alt="" />
      //     </div>
      //     <div class="course_info">
      //       <div class="main_course_info">
      //         <div class="course_title">--string_denotion-- +
      //       title_short +
      //       --string_denotion--</div>
      //         <div class="starred">--string_denotion-- +
      //       star +
      //       --string_denotion--</div>
      //       </div>
      //       <div class="course_lines">--string_denotion--;
      //     card_line =
      //       --string_denotion--
      //         <div class="course_second_line small">
      //           <div class="subject">--string_denotion-- +
      //       element.subject +
      //       --string_denotion--</div>
      //           <div class="grade_info">
      //             Grade
      //             <div class="grade_base">js_start_inlineelement.grade_base}</div>
      //             <div class="grade_plus green">+js_start_inlineelement.grade_plus}</div>
      //           </div>
      //         </div>--string_denotion--;
      //     units_lessons_topics = --string_denotion--
      //         <div class="course_third_line small">
      //           <div class="units">
      //             <div class="units_num bold">js_start_inlineelement.units}&nbsp;</div>
      //             Units
      //           </div>
      //           <div class="lessons">
      //             <div class="lessons_num bold">js_start_inlineelement.lessons}&nbsp;</div>
      //             Lessons
      //           </div>
      //           <div class="topics">
      //             <div class="topics_num bold">js_start_inlineelement.topics}&nbsp;</div>
      //             Topics
      //           </div>
      //         </div>--string_denotion--;
      //     if (element.units != undefined)
      //       card_line += units_lessons_topics + "</div>";
      //     else card_line += "</div>";
      //     classes_info = --string_denotion--
      //       <div class="course_fourth_line">
      //         <div class="dropdown greybott class_dd">
      //           --string_denotion--;
      //     // console.log(element.class_there);
      //     if (element.class_there) {
      //       classes_info = classes_info.concat(
      //         --string_denotion--<div class="class_name">js_start_inlineelement.class_name}</div>
      //           <div class="arrow_down">
      //             <img src="icons/arrow-down.svg" alt="" />
      //           </div>
      //         </div>
      //         <div class="class_info small">
      //           <div class="students">
      //             <div class="students_num">js_start_inlineelement.class_students} &nbsp;</div>
      //             Students
      //           </div>
      //           --string_denotion--
      //       );
      //       if (element.from_day != undefined) {
      //         classes_info += --string_denotion--
      //         <div class="dates">
      //             <div class="from_date">js_start_inlineelement.from_day}-js_start_inlineelement.from_month}-js_start_inlineelement.from_year}</div>
      //             &nbsp;-&nbsp;
      //             <div class="to_date">js_start_inlineelement.to_day}-js_start_inlineelement.to_month}-js_start_inlineelement.to_year}</div>
      //         </div></div></div></div>--string_denotion--;
      //       } else {
      //         classes_info += "</div></div></div>";
      //       }
      //     } else {
      //       classes_info += --string_denotion--
      //         <div class="class_name inactive">No Classes</div>
      //           <div class="arrow_down">
      //             <img src="icons/arrow-down.svg" alt="" />
      //           </div>
      //         </div>

      //       </div>
      //     </div>
      //     --string_denotion--;
      //     }

      //     not_avl = 'class="not_avl"';

      //     preview_img = --string_denotion--<img src="icons/preview.svg"  alt="" />--string_denotion--;
      //     manage_c_img = --string_denotion--<img src="icons/manage course.svg" alt="" />--string_denotion--;
      //     grad_subs_img = --string_denotion--<img src="icons/grade submissions.svg" alt="" />--string_denotion--;
      //     reports_img = --string_denotion--<img src="icons/reports.svg" alt="" />--string_denotion--;

      //     if (!element.preview)
      //       preview_img = preview_img.replace(--string_denotion--alt=--string_denotion--, 'class="not_avl');
      //     if (!element.manage_course)
      //       manage_c_img = manage_c_img.replace(--string_denotion--alt=--string_denotion--, 'class="not_avl');
      //     if (!element.grade_subs)
      //       grad_subs_img = grad_subs_img.replace(--string_denotion--alt=--string_denotion--, 'class="not_avl');
      //     if (!element.reports)
      //       reports_img = reports_img.replace(--string_denotion--alt=--string_denotion--, 'class="not_avl');

      //     footer =
      //       --string_denotion--
      //     <div class="course_footer"><div class="footer_icon preview">--string_denotion-- +
      //       preview_img +
      //       --string_denotion--

      //       </div>
      //       <div class="footer_icon manage_course">
      //         --string_denotion-- +
      //       manage_c_img +
      //       --string_denotion--
      //       </div>
      //       <div class="footer_icon grade_subs">
      //         --string_denotion-- +
      //       grad_subs_img +
      //       --string_denotion--
      //       </div>
      //       <div class="footer_icon reports">
      //         --string_denotion-- +
      //       reports_img +
      //       --string_denotion--
      //       </div>
      //       </div>
      //       </div>
      //     --string_denotion--;

      //     console.log(element);

      //     // console.log(classes_info);

      //     course_card.innerHTML = card_top + card_line + classes_info + footer;

      //     section_card_grid.appendChild(course_card);
      //   });
      //
    </script>

    <footer>
      <div class="above_moreinfo">
        <div class="about pd-5">About</div>
        <div class="contact_us pd-5">Contact Us</div>
      </div>
      <div class="moreinfo">
        <div class="quantumlogo">
          <img src="icons/logo used in footer.svg" alt="" />
        </div>
        <div class="copyright">Copyright © 2020-2021</div>
        <div class="dev_name">Zeus Systems Pvt. Ltd.</div>
        <div class="copyright">All rights reserved.</div>
      </div>
    </footer>

    <script src="ts/index.js"></script>
  </body>
</html>
`)
);
