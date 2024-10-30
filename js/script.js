/* typing animation */
var typed = new Typed(".typing-text", {
    strings: ["Web Developer", "Full Stack Developer", "Problem Solver", "Tech Enthusiast"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

document.addEventListener("DOMContentLoaded", function() {
    // Wait for the entire page to load including images and styles
    window.addEventListener("load", function() {
        // Ensure the loading animation stays for at least 3 seconds
        setTimeout(function() {
            // Start the fade-out transition
            document.getElementById('loading-animation').style.opacity = '0';

            // When the transition ends, hide the loading animation and show the content
            document.getElementById('loading-animation').addEventListener('transitionend', function() {
                document.getElementById('loading-animation').style.display = 'none';
                document.getElementById('content').style.opacity = '1';
                document.body.style.overflow = 'auto'; // Restore scroll
            });
        }, 3000); // 3000 milliseconds = 3 seconds
    });
});

/* Aside */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0; i<totalNavList; i++)
      {
          const a = navList[i].querySelector("a");
          a.addEventListener("click",function(){
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
            }
            for(let j=0; j<totalNavList; j++)  
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                   allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            /* click any mavbar button to close the navbar in 1199px views */
            if(window.innerWidth < 1200)
            {
                asideSectionTogglerBtn(); 
            }
          })
      }
      function showSection(element)
      {
          for(let i=0; i<totalSection; i++)
          {
              allSection[i].classList.remove("active");
          }
          const target = element.getAttribute("href").split("#")[1];
          document.querySelector("#" + target).classList.add("active")
      }
      const navTogglerBtn = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click",()=>
        {
            asideSectionTogglerBtn()
        })
        function asideSectionTogglerBtn() {
            const aside = document.querySelector(".aside");
            const navToggler = document.querySelector(".nav-toggler");
            const sections = document.querySelectorAll(".section");
            const overlay = document.querySelector(".nav-overlay");
            
            aside.classList.toggle("open");
            navToggler.classList.toggle("open");
            
            sections.forEach((section) => {
                section.classList.toggle("open");
            });
            
            // Toggle overlay
            overlay.classList.toggle("active");
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = aside.classList.contains("open") ? "hidden" : "";
        }

        // Add click handler for overlay
        document.querySelector(".nav-overlay").addEventListener("click", () => {
            asideSectionTogglerBtn();
        });

        // Close menu when clicking nav items on mobile
        document.querySelectorAll(".nav li a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 1199) {
                    asideSectionTogglerBtn();
                }
            });
        });

        // Handle resize events
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1199) {
                // Reset mobile menu state when returning to desktop
                const aside = document.querySelector(".aside");
                if (aside.classList.contains("open")) {
                    asideSectionTogglerBtn();
                }
            }
        });

        // Prevent touchmove when menu is open on mobile
        document.addEventListener("touchmove", (e) => {
            if (document.querySelector(".aside").classList.contains("open")) {
                e.preventDefault();
            }
        }, { passive: false });


		
		function updateViewCount() {
            // Get the current count from localStorage
            let count = localStorage.getItem('viewCount');
            
            // If the count is not found, initialize it to 0
           if (!count || parseInt(count) < 3000) {
                count = 3000;
            }
            
            // Increment the count
            count = parseInt(count) + 1;
            
            // Store the new count in localStorage
            localStorage.setItem('viewCount', count);
            
            // Update the displayed count on the page
            document.getElementById('view-count').textContent = count;
        }

        // Run the updateViewCount function when the page loads
        document.addEventListener('DOMContentLoaded', (event) => {
            updateViewCount();
        });

        // Add this function to handle section activation
        function activateSection(sectionId) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to the corresponding nav item
            document.querySelector(`.nav a[href="#${sectionId}"]`).classList.add('active');
            
            // Remove active class from all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to the target section
            document.querySelector(`#${sectionId}`).classList.add('active');
            
            // If on mobile, close the sidebar
            if(window.innerWidth < 1200) {
                asideSectionTogglerBtn();
            }
        }

        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                document.getElementById(sectionId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });