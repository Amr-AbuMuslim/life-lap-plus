(function () {
  const burger = document.getElementById("burger");
  const mobilePanel = document.getElementById("mobilePanel");
  const toTop = document.getElementById("toTop");
  const pageLoader = document.getElementById("pageLoader");

  // Hide loader
  window.addEventListener("load", () => {
    pageLoader.classList.add("hidden");
    setTimeout(() => (pageLoader.style.display = "none"), 500);
  });

  // Burger toggle
  let mobileOpen = false;
  burger.addEventListener("click", () => {
    mobileOpen = !mobileOpen;
    if (mobileOpen) {
      mobilePanel.style.display = "block";
      burger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
      mobilePanel.style.display = "none";
      burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });

  // Desktop dropdowns
  document.querySelectorAll(".has-dropdown .drop-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.closest(".has-dropdown");
      const opened = parent.classList.toggle("open");

      document.querySelectorAll(".has-dropdown").forEach((other) => {
        if (other !== parent) other.classList.remove("open");
      });
    });
  });

  // Mobile sub-toggles
  document.querySelector(".sub-toggle").forEach((s) => {
    // selector not selectors to fix button
    s.addEventListener("click", (e) => {
      e.preventDefault();
      const id = s.dataset.target;
      const el = document.getElementById(id);
      if (el) {
        el.style.display = el.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".has-dropdown") &&
      !e.target.closest(".site-header")
    ) {
      document
        .querySelectorAll(".has-dropdown.open")
        .forEach((x) => x.classList.remove("open"));
    }
    if (!e.target.closest(".mobile-panel") && !e.target.closest(".burger")) {
      if (window.innerWidth <= 1000 && mobilePanel.style.display === "block") {
        mobilePanel.style.display = "none";
        burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileOpen = false;
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });

        // Close mobile menu
        if (mobilePanel.style.display === "block") {
          mobilePanel.style.display = "none";
          burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
          mobileOpen = false;
        }
      }
    });
  });

  // toTop button
  window.addEventListener("scroll", () => {
    toTop.style.display = window.scrollY > 400 ? "block" : "none";
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal animations
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver.observe(el);
  });

  // Animate stat numbers
  document.querySelectorAll(".stat-number").forEach((el) => {
    const target = parseInt(el.textContent.replace(/\D/g, "")) || 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                el.textContent = target.toLocaleString("ar-EG");
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current).toLocaleString("ar-EG");
              }
            }, 25);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(el);
  });
})();
