//  ***********************************************************************
// Client side JavaScript >> Suggestion Box 
// ***********************************************************************
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('Suggestion_form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default submission
  
        const formData = new FormData(e.target);
        const suggestion = formData.get('suggestion');
        const email = formData.get('email');
        const submissionType = formData.get('submissionType');
  
        const data = {
          suggestion,
          email: submissionType === 'anonymous' ? null : email,
          anonymous: submissionType === 'anonymous'
        };
  
        try {
          const res = await fetch('/api/suggestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          if (res.ok) {
            alert('Suggestion submitted successfully!');
            e.target.reset();
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while submitting your suggestion.');
        }
      });
    } else {
      console.error("Suggestion_form element not found.");
    }
  });
  



// ******************************************************************************
// ******************************************************************************
//  HEADER 
// ******************************************************************************
// ******************************************************************************


// ******************************************************************************
// HEADER HAMBURGER MENU
document.addEventListener("DOMContentLoaded", function () {
    let menuIcon = document.querySelector(".Menu_icon");
    let closeIcon = document.querySelector(".Close_icon");
    let sidebar = document.querySelector(".Sidebar");
    let searchBox = document.querySelector(".Search_box");

    // Open sidebar when clicking the hamburger menu
    menuIcon.addEventListener("click", function () {
        sidebar.classList.add("Active");
        menuIcon.style.display = "none"; // Hide hamburger menu
        closeIcon.style.display = "block"; // Show close icon
        searchBox.classList.add("Push_left"); // Reduce width
    });

    // Close sidebar when clicking the close icon
    closeIcon.addEventListener("click", function () {
        sidebar.classList.remove("Active");
        menuIcon.style.display = "block"; // Show hamburger menu
        closeIcon.style.display = "none"; // Hide close icon
        searchBox.classList.remove("Push_left"); // Restore width
    });
});


// *********************************************************************************
//  TOGGLE BUTTON
function toggleTheme() {
    let theme = document.body.classList.toggle("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

window.onload =  function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};


// *********************************************************************************
//  SEARCH BAR
function searchFunction() {
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("#starList li");
    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(input) ? "block" : "none";
    })
}

function performSearch() {
    let query = document.getElementById("Search_box").value.trim();
    if (query !== "") {
        window.location.href = `search_results.html?q=${encodeURIComponent(query)}`;
    }
}



// ******************************************************************************
// ******************************************************************************
//  NEWS  
// ******************************************************************************
// *******************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const newsCards = document.querySelectorAll(".News_cards");

  function revealOnScroll() {
      let windowHeight = window.innerHeight;

      newsCards.forEach((card, index) => {
          let rect = card.getBoundingClientRect();

          if (rect.top < windowHeight * 0.85) { // 85% of viewport
              // Add delay for a staggered effect
              setTimeout(() => {
                  card.classList.add("Visible");
              }, index * 200); // Delay each card by 200ms
          }
      });
  }

  // Scroll event for smooth appearance
  let ticking = false;
  function onScroll() {
      if (!ticking) {
          requestAnimationFrame(() => {
              revealOnScroll();
              ticking = false;
          });
          ticking = true;
      }
  }

  // Initial check and scroll listener
  window.addEventListener("scroll", onScroll);
  revealOnScroll();
});




// ******************************************************************************
// ******************************************************************************
//  LEARN  
// ******************************************************************************
// ******************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const learnContent = document.querySelector(".Learn_content");

  function revealLearnSection() {
      let rect = learnContent.getBoundingClientRect();
      let windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.85) { // 85% of viewport
          learnContent.classList.add("Visible");
      }
  }

  window.addEventListener("scroll", revealLearnSection);
  revealLearnSection(); // Run on page load in case it's already in view
});





// ******************************************************************************
// ******************************************************************************
//  SKYHOOD FAMILY 
// ******************************************************************************
// ******************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const growCards = document.querySelectorAll(".Grow_card");

  function revealGrowCards() {
      growCards.forEach((card) => {
          let rect = card.getBoundingClientRect();
          let windowHeight = window.innerHeight;

          if (rect.top < windowHeight * 0.85) { // 85% of viewport
              card.classList.add("Visible");
          }
      });
  }

  window.addEventListener("scroll", revealGrowCards);
  revealGrowCards(); // Run on page load in case they are already in view
});









// ******************************************************************************
// ******************************************************************************
//  CONTACT US FORM VALIDATION 
// ******************************************************************************
// ******************************************************************************
// document.querySelector(".Contact_form").addEventListener("submit", function(event) {
//     let name = document.querySelector(".Contact_input[name='name']").value;
//     let email = document.querySelector(".Contact_input[name='email']").value;
//     let message = document.querySelector(".Contact_textarea").value;

//     if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
//         alert("Please fill in all fields.");
//         event.preventDefault();
//     }
// });



// ******************************************************************************
// ******************************************************************************
//  SUGGESTION BOX  
// ******************************************************************************
// ******************************************************************************
document.addEventListener('DOMContentLoaded', function () {
  const suggestionForm = document.getElementById('Suggestion_form');
  const suggestionInput = suggestionForm.querySelector('textarea[name="suggestion"]');
  const emailInput = suggestionForm.querySelector('input[name="email"]');

  // Limit suggestion box to 500 characters
  suggestionInput.addEventListener('input', function () {
      if (this.value.length > 500) {
          this.value = this.value.substring(0, 500);
      }
  });

  // Validate email (case-sensitive)
  emailInput.addEventListener('input', function () {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (this.value && !emailRegex.test(this.value)) {
          this.setCustomValidity("Enter a valid email (case-sensitive)");
      } else {
          this.setCustomValidity("");
      }
  });

  // Handle form submission
  suggestionForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const suggestion = formData.get('suggestion');
      const email = formData.get('email');
      const submissionType = formData.get('submissionType');

      const data = {
          suggestion,
          email: submissionType === 'anonymous' ? null : email,
          anonymous: submissionType === 'anonymous'
      };

      try {
          const res = await fetch('/api/suggestion', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          });
          const result = await res.json();
          if (res.ok) {
              alert('Suggestion submitted successfully!');
              e.target.reset();
          } else {
              alert(`Error: ${result.message}`);
          }
      } catch (error) {
          console.error(error);
          alert('An error occurred while submitting your suggestion.');
      }
  });
});


  




//  ******************************************************************************
//  ******************************************************************************
//  About Us Page 
//  ******************************************************************************
//  ******************************************************************************
document.addEventListener("DOMContentLoaded", function() {
    // Handle the hero section button
    const heroBtn = document.getElementById("storyBtn");
    const firstStory = document.getElementById("story1");
  
    if (heroBtn && firstStory) {
      heroBtn.addEventListener("click", function() {
        firstStory.scrollIntoView({ behavior: "smooth" });
        // After a brief delay, reveal the first story's content
        setTimeout(() => {
          firstStory.classList.add("active");
        }, 600); // Adjust delay as needed
      });
    } else {
      console.error("Hero button or first story not found");
    }
  
    // Handle the "Next Story" buttons within each timeline story
    const timelineStories = document.querySelectorAll(".Timeline_story");
    
    timelineStories.forEach((story, index) => {
      // Only add a listener if there's a next story
      if (index < timelineStories.length - 1) {
        const nextBtn = story.querySelector("button.Hero_content_btn");
        if (nextBtn) {
          nextBtn.addEventListener("click", function() {
            const nextStory = timelineStories[index + 1];
            nextStory.scrollIntoView({ behavior: "smooth" });
            // After scrolling, add the "active" class to reveal the content
            setTimeout(() => {
              nextStory.classList.add("active");
            }, 600); // Adjust delay as needed
          });
        }
      }
    });
  
    // Existing scroll reveal functionality
    const stories = document.querySelectorAll(".Timeline_story");
  
    function revealOnScroll() {
      stories.forEach(story => {
        const storyTop = story.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (storyTop < windowHeight * 0.85) {
          story.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on page load
  });
  

// **********************************************************************************
// MISSION & VISION 
  document.addEventListener("DOMContentLoaded", function() {
    const missionSection = document.querySelector(".Mission_section");
    
    function revealMission() {
      const missionTop = missionSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (missionTop < windowHeight * 0.85) {
        missionSection.querySelector(".Mission_content").classList.add("active");
        window.removeEventListener("scroll", revealMission);
      }
    }
    
    window.addEventListener("scroll", revealMission);
    revealMission(); // Check on page load
  });





// ******************************************************************************
// ******************************************************************************
//  Footer & Header Background Objects Animation
// ******************************************************************************
// ******************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  function createSpaceObjects(container, totalStars) {
      const colors = ["#0FFF", "#333", "#FBDC59", "#9EA2FF", "#2D2D66"];

      function createStar() {
          let obj = document.createElement("div");
          obj.classList.add("space_object", "star");

          let size = Math.random() * 6 + 4;
          obj.style.width = `${size}px`;
          obj.style.height = `${size}px`;
          obj.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          obj.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

          obj.style.left = `${Math.random() * 100}%`;
          obj.style.top = `${Math.random() * 100}%`;

          obj.style.animationDuration = `${Math.random() * 20 + 15}s`;
          obj.style.animationDelay = `${Math.random() * 5}s`;

          obj.style.setProperty('--dirX', Math.random() > 0.5 ? 1 : -1);
          obj.style.setProperty('--dirY', Math.random() > 0.5 ? 1 : -1);

          container.appendChild(obj);
      }

      for (let i = 0; i < totalStars; i++) {
          createStar();
      }
  }

  createSpaceObjects(document.querySelector(".Header_space_objects"), 50); // Header: 50 Stars
  createSpaceObjects(document.querySelector(".Footer_space_objects"), 80); // Footer: 80 Stars
});





// ******************************************************************************
// ******************************************************************************
//  SCROLL TO TOP BUTTON 
// ******************************************************************************
// ******************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  let scrollBtn = document.querySelector(".ScrollTop_btn");

  if (!scrollBtn) {
      console.error("Error: ScrollTop_btn not found in HTML!");
      return;
  }

  window.addEventListener("scroll", function () {
      if (window.scrollY > window.innerHeight) { 
          scrollBtn.classList.add("Show_ScrollTop");
      } else {
          scrollBtn.classList.remove("Show_ScrollTop");
      }
  });

  scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
  });
});