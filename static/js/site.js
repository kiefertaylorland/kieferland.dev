(function () {
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current =
        document.documentElement.getAttribute("data-theme") || "light";
      var next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  var buttons = document.querySelectorAll(".tag-btn");
  var rows = document.querySelectorAll(".writing-row");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var tag = btn.getAttribute("data-tag");
      rows.forEach(function (row) {
        var tags = (row.getAttribute("data-tags") || "").split(",");
        row.style.display = !tag || tags.indexOf(tag) !== -1 ? "" : "none";
      });
    });
  });
})();
