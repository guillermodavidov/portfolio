document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initNavigation();
    initMobileNav();
    loadProjects();
    loadAbout();
    loadSkills().then(animateSkillBars);
});

async function loadAbout() {
    const grid = document.getElementById('about-grid');
    if (!grid) return;

    try {
        const res = await fetch('data/about.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const about = await res.json();

        if (!about.summary) return;

        grid.innerHTML = `<div class="about-box about-summary-box">
            <h3 class="about-box-title">Summary</h3>
            <div class="about-box-content">${about.summary.split('\n').map(p => p.trim() ? `<p>${escapeHtml(p)}</p>` : '').join('')}</div>
        </div>` + grid.innerHTML;

        let boxesHtml = '';

        if (about.education) {
            boxesHtml += `
                <div class="about-box">
                    <h3 class="about-box-title">Educational Background</h3>
                    <div class="about-box-content">
                        <div class="about-box-item">
                            <div class="about-box-main">
                                <div>${escapeHtml(about.education.degree)}</div>
                                <div class="course-subtitle">${escapeHtml(about.education.institution)}</div>
                            </div>
                            <span class="about-box-meta">${escapeHtml(about.education.years)}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        if (about.languages && about.languages.length > 0) {
            boxesHtml += `
                <div class="about-box">
                    <h3 class="about-box-title">Language Skills</h3>
                    <div class="about-box-content">
                        ${about.languages.map(l => `
                            <p class="about-box-item">
                                <span class="about-box-main">${escapeHtml(l.name)}</span>
                                <span class="about-box-meta">${escapeHtml(l.level)}</span>
                            </p>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (about.courses && about.courses.length > 0) {
            boxesHtml += `
                <div class="about-box about-box-courses">
                    <h3 class="about-box-title">Courses & Training</h3>
                    <div class="about-box-content">
                        ${about.courses.map(c => `
                            <div class="about-box-item">
                                <div class="about-box-main">
                                    <div>${escapeHtml(c.title)}</div>
                                    ${c.subtitle ? `<div class="course-subtitle">${escapeHtml(c.subtitle)}</div>` : ''}
                                </div>
                                <span class="about-box-meta">${escapeHtml(c.provider)} - ${escapeHtml(c.year)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (about.industry && about.industry.length > 0) {
            boxesHtml += `
                <div class="about-box">
                    <h3 class="about-box-title">Industry Expertise</h3>
                    <div class="about-box-content">
                        ${about.industry.map(i => `
                            <p class="about-box-item">
                                <span class="about-box-main">${escapeHtml(i.name)}</span>
                                <span class="about-box-meta">${escapeHtml(i.years)}</span>
                            </p>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        grid.innerHTML += boxesHtml;
    } catch (err) {
        console.error('Failed to load about:', err);
    }
}

async function loadSkills() {
    const container = document.getElementById('circles-container');
    const pillsContainer = document.getElementById('tech-pills-container');

    try {
        const res = await fetch('data/skills.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const allSkills = [
            ...(data.languages || []),
            ...(data.frameworks || []),
            ...(data.testing || []),
            ...(data.tools || []),
            ...(data.concepts || []),
            ...(data.designTools || [])
        ];

        const prioritySkills = ['JavaScript', 'React', 'TypeScript'];
        const sortedSkills = [
            ...prioritySkills.map(name => allSkills.find(s => s.name === name)).filter(Boolean),
            ...allSkills.filter(s => !prioritySkills.includes(s.name))
        ];

        if (container) {
            sortedSkills.forEach((skill) => {
                const circle = document.createElement('div');
                circle.className = 'skill-circle';
                circle.style.setProperty('--size', (skill.size || 100) + 'px');
                circle.style.left = `${Math.round(skill.x || 0)}px`;
                circle.style.top = `${Math.round(skill.y || 0)}px`;
                circle.innerHTML = `
                    <span class="circle-name">${escapeHtml(skill.name)}</span>
                    <span class="circle-years">${skill.years} years</span>
                `;
                container.appendChild(circle);
            });
        }

        if (pillsContainer) {
            ['frameworks', 'testing', 'tools', 'concepts', 'designTools'].forEach(cat => {
                if (data[cat]) {
                    data[cat].forEach(skill => {
                        const pill = document.createElement('div');
                        pill.className = 'tech-pill';
                        pill.innerHTML = `<span>${escapeHtml(skill.name)}</span>`;
                        pillsContainer.appendChild(pill);
                    });
                }
            });
        }

        animateSkillBars();
    } catch (err) {
        console.error('Failed to load skills:', err);
    }
}

function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const colors = ['star--white', 'star--white', 'star--white', 'star--purple', 'star--cyan', 'star--green'];

    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = `star ${colors[Math.floor(Math.random() * colors.length)]}`;
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 0.05 + 0.02}rem;
            height: ${Math.random() * 0.05 + 0.02}rem;
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        fragment.appendChild(star);
    }

    container.appendChild(fragment);
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.card[id]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            closeMobileMenu();
        });
    });

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

const mobileNav = (() => {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('nav-overlay');

    return {
        open() {
            hamburger?.classList.add('active');
            overlay?.classList.add('active');
        },
        close() {
            hamburger?.classList.remove('active');
            overlay?.classList.remove('active');
        },
        init() {
            if (!hamburger || !overlay) return;

            hamburger.addEventListener('click', () => {
                this[hamburger.classList.contains('active') ? 'close' : 'open']();
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.close();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.close();
            });
        }
    };
})();

function openMobileMenu() { mobileNav.open(); }
function closeMobileMenu() { mobileNav.close(); }
function initMobileNav() { mobileNav.init(); }

function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--skill-width', `${width}%`);
                fill.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
}

async function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const res = await fetch('data/projects.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const projects = await res.json();

        if (projects.length === 0) {
            return;
        }

        const sorted = projects.sort((a, b) => (a.order || 0) - (b.order || 0));

        container.innerHTML = sorted.map(project => createProjectCard(project)).join('');
    } catch (err) {
        console.error('Failed to load projects:', err);
    }
}

function createProjectCard(project) {
    const metaItems = [];
    if (project.domain) metaItems.push(`<span class="meta-item">${escapeHtml(project.domain)}</span>`);
    if (project.company) metaItems.push(`<span class="meta-item">${escapeHtml(project.company)}</span>`);
    if (project.role) metaItems.push(`<span class="meta-item">${escapeHtml(project.role)}</span>`);

    const techStackHtml = project.techStack?.length
        ? project.techStack.map(tech => `<span class="tech-pill-colored">${escapeHtml(tech)}</span>`).join('')
        : '';

    const dateDisplay = [project.endDate, project.startDate].filter(Boolean).join(' - ');

    return `
        <div class="project-card">
            <div class="project-card-header">
                ${dateDisplay ? `<span class="project-date">${escapeHtml(dateDisplay)}</span>` : ''}
                ${project.duration ? `<span class="project-duration">${escapeHtml(project.duration)}</span>` : ''}
            </div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            ${metaItems.length > 0 ? `<div class="project-meta">${metaItems.join('')}</div>` : ''}
            <div class="project-overview">
                <span class="section-label">Project Overview</span>
                <p>${escapeHtml(project.overview || '')}</p>
            </div>
            <div class="project-description">
                <span class="section-label">Job Description</span>
                <p class="project-description-text">${(project.description || []).map(desc => `• ${escapeHtml(desc)}`).join(' ')}</p>
            </div>
            ${techStackHtml ? `<div class="project-tech-stack">${techStackHtml}</div>` : ''}
        </div>
    `;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}