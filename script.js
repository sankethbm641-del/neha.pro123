// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission handling using AJAX
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        
        // Show loading state
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://formspree.io/f/xvgzlowz", { // Note: Replace with your actual Formspree ID or use this one
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert(`Thank you! Your message has been sent successfully. I'll get back to you soon at ${formData.get('email')}.`);
                contactForm.reset();
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            // Fallback: If the online service fails, use mailto
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            const mailtoLink = `mailto:nehachinnu476@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
            
            alert("Oops! There was a problem sending your message through the server. I'll open your email app instead.");
            window.location.href = mailtoLink;
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation logic
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
};


// Project Details Data
const projectData = {
    'moodle': {
        title: 'Course on Moodle',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A comprehensive learning management system built with Moodle integration. This project allows administrators to manage courses, and students to access learning materials seamlessly with CRUD operations.',
        features: [
            'Dynamic course management (Add, Edit, Delete)',
            'Student enrollment tracking',
            'Interactive lesson modules',
            'Progress monitoring dashboard'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Moodle API'],
        link: 'C:\\Users\\heman\\Desktop\\moodle\\index.html'
    },
    'imagesearch': {
        title: 'Image Search Web',
        image: 'C:\\Users\\heman\\Pictures\\Screenshots\\Screenshot 2026-02-03 144256.png',
        description: 'A powerful image searching tool that leverages SEO-friendly search algorithms. Users can browse, preview in high resolution, and download images directly. Built with a focus on performance and clean UI.',
        features: [
            'High-resolution image previews',
            'Instant download functionality',
            'SEO-optimized search filters',
            'Responsive masonry layout'
        ],
        tags: ['Python', 'Django', 'REST API', 'JavaScript', 'HTML5'],
        link: 'C:\\Users\\heman\\Desktop\\moodle\\index.html'
    },
    'taskmanager': {
        title: 'Task Management App',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A sleek and intuitive task management application designed to boost productivity. It features priority sorting, status tracking, and persistent storage to keep your tasks organized across sessions.',
        features: [
            'Priority-based task sorting',
            'Status tracking (Todo, Doing, Done)',
            'Real-time data persistence',
            'Clean, distraction-free UI'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage'],
        link: 'C:\\Users\\heman\\Desktop\\task manager\\index.html'
    }
};

// Modal Logic
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            modalBody.innerHTML = `
                <div class="modal-header">
                    <h2>${project.title}</h2>
                </div>
                <div class="modal-body">
                    <img src="${project.image}" alt="${project.title}" class="modal-img">
                    <div class="modal-desc">
                        <p>${project.description}</p>
                    </div>
                    <div class="modal-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-tags">
                        ${project.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="modal-footer">
                        <a href="${project.link}" class="btn" target="_blank">Launch Project</a>
                    </div>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);
