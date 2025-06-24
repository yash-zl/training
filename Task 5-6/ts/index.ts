function closeAll(): void {
  let alerts_dd: any = document.querySelector("#alerts_dd");
  let ann_dd: any = document.querySelector("#announcements_dd");
  let ham_dd: any = document.querySelector(".ham_menu_links_dd");
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

type Alert_Second_Line = { key: string; value: string };

class Alert {
  content: string;
  checked: boolean;
  second_line: Alert_Second_Line | null;
  date: any[];
  time: any[];

  constructor(
    content: string,
    checked: boolean,
    second_line: Alert_Second_Line | null,
    date: any[],
    time: any[]
  ) {
    this.content = content;
    this.checked = checked;
    this.second_line = second_line;
    this.date = date;
    this.time = time;
  }
}

let all_alerts: Alert[] = [
  new Alert(
    "License for introduction to Algebra has been assigned to your school",
    false,
    null,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Alert(
    "Lesson 3 Practice Worksheet overdue for Amy Santiago",
    true,
    { key: "Course", value: "Advanced Mathematics" },
    [15, "Sep", 2018],
    [5, 21, "pm"]
  ),
  new Alert(
    "23 new students created",
    false,
    null,
    [14, "Sep", 2018],
    [1, 21, "pm"]
  ),
  new Alert(
    "15 submissions ready for evaluation",
    false,
    { key: "Class", value: "Basics of Algebra" },
    [13, "Sep", 2018],
    [1, 15, "pm"]
  ),
  new Alert(
    "License for Basic Concepts in Geometry has been assigned to your school",
    false,
    null,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Alert(
    "Lesson 3 Practice Worksheet overdue for Rosa Diaz",
    true,
    { key: "Course", value: "Mathematics" },
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
];

let alerts = document.getElementById("alerts_dd_all");

all_alerts.forEach((a) => {
  let ann = document.createElement("div");
  ann.setAttribute("class", "ann_container");
  a.checked ? ann.classList.add("checked") : null;
  let ih: string = `
            <div class="announcement flex-col small">
            <div class="content_check">
          <div class="content medium">${a.content}</div>
          <img src="${
            a.checked ? "icons/tick-green.png" : "icons/minus-green-1.png"
          }" alt>
          </div>

          ${
            a.second_line
              ? `<div class="flex-start al_second_line"><span class="sl_key">${a.second_line.key}:</span><span class="sl_value">&nbsp;${a.second_line.value}</span></div>`
              : ``
          }

          <div class="flex-end date_time">
            <span class="date">${
              a.date[0] + "-" + a.date[1] + "-" + a.date[2]
            }</span>&nbsp;at&nbsp;
            <span class="time">${
              a.time[0] + ":" + a.time[1] + " " + a.time[2]
            }</span>
            </div>
            </div>
            </div>

            `;

  ann.innerHTML = ih;

  (alerts as HTMLElement).appendChild(ann);
});

alerts = document.querySelector("#alerts");
let alerts_dd: HTMLElement = document.querySelector("#alerts_dd")!;
let ann_dd: HTMLElement = document.querySelector("#announcements_dd")!;
let ham_dd: HTMLElement = document.querySelector(".ham_menu_links_dd")!;
(alerts as HTMLElement).addEventListener("mouseover", () => {
  closeAll();
  alerts_dd.style.display = "block";
});

alerts_dd.addEventListener("mouseover", () => {
  closeAll();
  alerts_dd.style.display = "block";
});

alerts_dd.addEventListener("mouseout", () => {
  alerts_dd.style.display = "none";
});

class Announcement {
  pa: string;
  checked: boolean;
  content: string;
  course: string | null;
  files_attached: number | null;
  date: any[] | null;
  time: any[] | null;

  constructor(pa, checked, content, course, files_attached, date, time) {
    this.pa = pa;
    this.checked = checked;
    this.content = content;
    this.course = course;
    this.files_attached = files_attached;
    this.date = date;
    this.time = time;
  }
}

let announcements: any = [
  new Announcement(
    "Wilson Kumar",
    true,
    "No classes will be held on 21st Nov",
    null,
    2,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Announcement(
    "Samson White",
    false,
    "Guest lecture on Geometry on 20th September",
    null,
    2,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Announcement(
    "Wilson Kumar",
    true,
    "Additional course materials available on request",
    "Mathematics 101",
    null,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Announcement(
    "Wilson Kumar",
    false,
    "No classes will be held on 25th Dec",
    null,
    null,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
  new Announcement(
    "Wilson Kumar",
    false,
    "Additional course materials available on request",
    "Mathematics 101",
    null,
    [15, "Sep", 2018],
    [7, 21, "pm"]
  ),
]!;

let all_ann = document.getElementById("announcements_dd_all");

announcements.forEach((a) => {
  let ann = document.createElement("div");
  ann.setAttribute("class", "ann_container");
  a.checked ? ann.classList.add("checked") : null;
  let ih = `
            <div class="announcement flex-col">
              <div class="ann_pa_check small">
                <div class="pa">PA: <span class="pa_name">${a.pa}</span></div>
                <div class="check">
          <img
          height="18px"
          src=${a.checked ? "icons/tick-green.png" : "icons/minus-green-1.png"}
          alt=""
          />
          </div>
          </div>
          <div class="content medium">${a.content}</div>
          <div class="course small">${a.course == null ? `` : a.course}</div>
          <div class="small files_attached asdf ${
            a.files_attached ? "" : "flex-end"
          }">
            <div class="files_attached_num_div">${
              a.files_attached
                ? `<img height="12px" src="icons/files.png" alt="" /><span
          class="files_attached_num">` +
                  a.files_attached +
                  `</span>&nbsp;files are attached
          </div>`
                : ""
            }
          
          <div class="date_time">
            <span class="date">${
              a.date[0] + "-" + a.date[1] + "-" + a.date[2]
            }</span>&nbsp;at
            <span class="time">${
              a.time[0] + ":" + a.time[1] + " " + a.time[2]
            }</span>
            </div>
            </div>
            </div>
            
            `;

  ann.innerHTML = ih;

  (all_ann as HTMLElement).appendChild(ann);
});

announcements = document.querySelector("#announcements");
let announ_dd: HTMLElement = document.querySelector("#announcements_dd")!;
announcements.addEventListener("mouseover", () => {
  closeAll();
  announ_dd.style.display = "flex";
});

announ_dd.addEventListener("mouseover", () => {
  closeAll();
  announ_dd.style.display = "flex";
});

announ_dd.addEventListener("mouseout", () => {
  announ_dd.style.display = "none";
});

// let ham_dd = document.querySelector(".ham_menu_links_dd");
let ham_dd_content = [
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

ham_dd_content.forEach((element) => {
  let dd_el = document.createElement("div");
  dd_el.setAttribute("id", "dd_el_" + element.item);
  let dd_el_ih = `<div id="dd_${element.item}" class='dd_item_head' onclick="openItemInDD('${element.item}')">${element.item}`;
  console.log(element.sub_items);
  if (element.sub_items.length > 0) {
    dd_el_ih = dd_el_ih.concat(
      `<img  src='/icons/arrow-down.svg' alt="" /></div>`
    );
    element.sub_items.forEach((si) => {
      dd_el_ih = dd_el_ih.concat(`
              <div class="dd_el_si ${element.item}_si" alt="">${si}</div>
              `);
    });
  } else {
    dd_el_ih = dd_el_ih.concat("</div>");
  }
  dd_el.innerHTML = dd_el_ih;
  ham_dd.appendChild(dd_el);
});

let ham_selected = "";

function closeInDD(ham_selected) {
  let sis = document.querySelectorAll("." + ham_selected + "_si");
  sis.forEach((si) => {
    (si as HTMLElement).style.display = "none";
  });
  let prev_ih: HTMLElement = document.querySelector("#dd_el_" + ham_selected)!;
  let prev_ig_img = prev_ih.querySelector("img")!;
  prev_ig_img.setAttribute("src", "/icons/arrow-down.svg");
  // prev_ig_img = prev_ih.querySelector("img");
  // console.log(img);
  prev_ig_img.setAttribute("height", "24px");
  prev_ig_img.style.padding = "0px";
  prev_ih.style.background = "white";
}

let open_ham = "";

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
  let ih = document.querySelector("#dd_el_" + item)!;
  (ih as HTMLElement).style.background = "#F3F3F3";
  let sis = ih.querySelectorAll("." + item + "_si");
  console.log(sis.length);
  sis.forEach((si) => {
    // si.classList.add("show");
    (si as HTMLElement).style.display = "block";
  });
  let arr: HTMLElement = ih.querySelector("img")!;
  arr.setAttribute("src", "/icons/arrow-up (1).png");
  arr.setAttribute("height", "13px");
  arr.style.padding = "5px";

  ham_selected = item;
  open_ham = item;
}

let prev_navbar_selected = "";
let navbar_selected = "";
let navbar_links: any = document.querySelectorAll(".navbar_link")!;
navbar_links.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    prev_navbar_selected = navbar_selected;
    navbar_selected = element.getAttribute("id");
    updateNavbar();
  });
});

function updateNavbar() {
  //   let;
  if (navbar_selected == "hamburger") {
    let dd: HTMLElement = document.querySelector(".ham_menu_links_dd")!;
    if (dd.style.display == "flex") {
      dd.style.display = "none";
    } else {
      closeAll();
      dd.style.display = "flex";
    }
  } else {
    if (prev_navbar_selected != "")
      document
        .getElementById(prev_navbar_selected)!
        .classList.remove("selected_navbar_link");
    document
      .getElementById(navbar_selected)!
      .classList.add("selected_navbar_link");
  }
}

class CourseClass {
  title: string;
  thumbnail: string;
  starred: boolean;
  subject: string;
  grade_base: number;
  grade_plus: number;
  units: number | null;
  lessons: number | null;
  topics: number | null;
  class_there: boolean;
  class_name: string;
  class_students: number;
  from_day: number | null;
  from_month: string | null;
  from_year: number | null;
  to_day: number | null;
  to_month: string | null;
  to_year: number | null;
  preview: boolean;
  manage_course: boolean;
  grade_submissions: boolean;
  reports: boolean;
  expired: boolean;
  constructor(
    title,
    thumbnail,
    starred,
    subject,
    grade_base,
    grade_plus,
    units,
    lessons,
    topics,
    class_there,
    class_name,
    class_students,
    from_day,
    from_month,
    from_year,
    to_day,
    to_month,
    to_year,
    preview,
    manage_course,
    grade_submissions,
    reports,
    expired
  ) {
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
}

let selected_section = "courses";

let courses_info = [
  new CourseClass(
    "Acceleration",
    "images/imageMask-1.svg",
    false,
    "Physics",
    7,
    2,
    4,
    18,
    24,
    true,
    "Mr. Frank's Class B",
    50,
    21,
    "Jan",
    2020,
    21,
    "Aug",
    2020,
    true,
    true,
    true,
    true,
    false
  ),
  new CourseClass(
    "Displacement, Velocity and Speed",
    "images/imageMask-2.svg",
    false,
    "Physics 2",
    6,
    3,
    2,
    15,
    20,
    false,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    true,
    false,
    false,
    true,
    false
  ),
  new CourseClass(
    "Introduction to Biology: Micro organisms and how they affect the environment and its beings.",
    "images/imageMask.svg",
    false,
    "Biology",
    4,
    1,
    5,
    16,
    22,
    true,
    "All Classes",
    300,
    null,
    null,
    null,
    null,
    null,
    null,
    true,
    false,
    false,
    true,
    false
  ),
  new CourseClass(
    "Introduction to High School Mathematics",
    "images/imageMask-3.svg",
    false,
    "Mathematics",
    8,
    3,
    null,
    null,
    null,
    true,
    "Mr. Frank's Class A",
    44,
    14,
    "Oct",
    2019,
    20,
    "Oct",
    2020,
    true,
    true,
    true,
    true,
    true
  ),
];

function getFirst(title: string) {
  if (title.length > 50) return title.substring(0, 51) + "...";
  else return title;
}
let section_card_grid = document.getElementById("section_card_grid");
courses_info.forEach((element) => {
  let title_short = getFirst(element.title);
  let course_card = document.createElement("div");
  course_card.setAttribute("class", "course_card_container");

  let expired = element.expired
    ? `<div class="expired small">EXPIRED</div>`
    : ``;
  let star = `<img src="icons/favourite.svg" alt="" />`;
  if (!element.starred) star = star.replace("alt", `class="not_starred" alt`);
  let card_top =
    `<div class='course_card'>
            ` +
    expired +
    `
        <div class="course_thumbnail">
          <img src="` +
    element.thumbnail +
    `" alt="" />
        </div>
        <div class="course_info">
          <div class="main_course_info">
            <div class="course_title large">` +
    title_short +
    `</div>
            <div class="starred">` +
    star +
    `</div>
          </div>
          <div class="course_lines">`;
  let card_line =
    `
            <div class="course_second_line small">
              <div class="subject">` +
    element.subject +
    `</div>
              <div class="grade_info">
                Grade
                <div class="grade_base">${element.grade_base}</div>
                <div class="grade_plus green">+${element.grade_plus}</div>
              </div>
            </div>`;
  let units_lessons_topics = `
            <div class="course_third_line small">
              <div class="units">
                <div class="units_num bold">${element.units}&nbsp;</div>
                Units
              </div>
              <div class="lessons">
                <div class="lessons_num bold">${element.lessons}&nbsp;</div>
                Lessons
              </div>
              <div class="topics">
                <div class="topics_num bold">${element.topics}&nbsp;</div>
                Topics
              </div>
            </div>`;
  if (element.units != null) card_line += units_lessons_topics + "</div>";
  else card_line += "</div>";
  let classes_info = `
          <div class="course_fourth_line">
            <div class="dropdown greybott class_dd">
              `;
  // console.log(element.class_there);
  if (element.class_there) {
    classes_info = classes_info.concat(
      `<div class="class_name">${element.class_name}</div>
              <div class="arrow_down">
                <img src="icons/arrow-down.svg" alt="" />
              </div>
            </div>
            <div class="class_info small">
              <div class="students">
                <div class="students_num">${element.class_students} &nbsp;</div>
                Students
              </div>
              `
    );
    if (element.from_day != null) {
      classes_info += `
            <div class="dates">
                <div class="from_date">${element.from_day}-${element.from_month}-${element.from_year}</div>
                &nbsp;-&nbsp;
                <div class="to_date">${element.to_day}-${element.to_month}-${element.to_year}</div>
            </div></div></div></div>`;
    } else {
      classes_info += "</div></div></div>";
    }
  } else {
    classes_info += `
            <div class="class_name inactive">No Classes</div>
              <div class="arrow_down">
                <img src="icons/arrow-down.svg" alt="" />
              </div>
            </div>

          </div>
        </div>
        `;
  }

  let not_avl = 'class="not_avl"';

  let preview_img = `<img src="icons/preview.svg"  alt="" />`;
  let manage_c_img = `<img src="icons/manage course.svg" alt="" />`;
  let grad_subs_img = `<img src="icons/grade submissions.svg" alt="" />`;
  let reports_img = `<img src="icons/reports.svg" alt="" />`;

  if (!element.preview)
    preview_img = preview_img.replace(`alt=`, 'class="not_avl');
  if (!element.manage_course)
    manage_c_img = manage_c_img.replace(`alt=`, 'class="not_avl');
  if (!element.grade_submissions)
    grad_subs_img = grad_subs_img.replace(`alt=`, 'class="not_avl');
  if (!element.reports)
    reports_img = reports_img.replace(`alt=`, 'class="not_avl');

  let footer =
    `
        <div class="course_footer"><div class="footer_icon preview">` +
    preview_img +
    `
            
          </div>
          <div class="footer_icon manage_course">
            ` +
    manage_c_img +
    `
          </div>
          <div class="footer_icon grade_subs">
            ` +
    grad_subs_img +
    `
          </div>
          <div class="footer_icon reports">
            ` +
    reports_img +
    `
          </div>
          </div>
          </div>
        `;

  console.log(element);

  // console.log(classes_info);

  course_card.innerHTML = card_top + card_line + classes_info + footer;

  section_card_grid!.appendChild(course_card);
});
