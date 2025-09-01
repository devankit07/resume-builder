<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume Builder</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Resume Builder</h1>
      <p class="tagline">Create your professional resume easily</p>
    </div>

    <!-- Left Panel: Sections -->
    <div class="left" id="drag-sections">
      <div class="section" id="section-objective" draggable="true">
        <h3>Objective:</h3>
        <p contenteditable="true">Write your career objective here...</p>
      </div>

      <div class="section" id="section-career" draggable="true">
        <h3>Career:</h3>
        <p contenteditable="true">Write your career summary here...</p>
      </div>

      <div class="section" id="section-skills" draggable="true">
        <h3>Skills:</h3>
        <p contenteditable="true">List your skills here...</p>
      </div>

      <div class="section" id="section-projects" draggable="true">
        <h3>Projects:</h3>
      </div>

      <div class="section" id="section-education" draggable="true">
        <h3>Education:</h3>
        <p contenteditable="true">List your education here...</p>
      </div>

      <div class="section" id="section-experience" draggable="true">
        <h3>Experience:</h3>
        <p contenteditable="true">List your work experience here...</p>
      </div>

      <div class="section" id="section-certifications" draggable="true">
        <h3>Certifications:</h3>
      </div>

      <div class="section" id="section-contact" draggable="true">
        <h3>Contact:</h3>
        <p contenteditable="true">List your contact information here...</p>
      </div>

      <div class="section" id="section-address" draggable="true">
        <h3>Address:</h3>
        <p contenteditable="true">List your address here...</p>
      </div>
    </div>

    <!-- Right Panel: Resume Preview -->
    <div class="right" id="resume-preview">
      <img id="profile-photo" src="https://via.placeholder.com/150" alt="">
      <div class="name" id="profile-name">Your Name</div>
      <div class="role" id="profile-role">Your Role</div>
      <div class="content" id="resume-content">
        <div class="placeholder">Drag and drop your sections here</div>
      </div>
      <button class="download-btn" id="download-resume">Download Image</button>
      <button class="download-btn" id="download-resume-doc">Download as DOC</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <script src="script.js"></script>

  /* -------------------- General Reset -------------------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  position: relative;
  color: #fff;
  overflow-y: auto;
}

/* Bubble Background */
body::before,
body::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
  animation: float 12s infinite ease-in-out;
}

body::before { width: 220px; height: 220px; top: 10%; left: 15%; }
body::after { width: 300px; height: 300px; bottom: 10%; right: 10%; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

/* Container */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 90%;
  max-width: 1200px;
  gap: 30px;
  padding: 20px;
}

/* Header */
.header { grid-column: 1 / -1; text-align: center; margin-bottom: 20px; }
.header h1 { font-size: 2.5rem; color: #f0f0f0; }
.tagline { font-size: 1rem; color: #aaa; margin-top: 5px; }

/* Left Panel */
.left {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.section {
  width: 100%;
  padding: 12px 18px;
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  cursor: grab;
  font-weight: 500;
  text-align: left;
  transition: all 0.3s ease;
}

.section:hover { background: rgba(255,255,255,0.35); transform: translateY(-3px); }

.section p[contenteditable="true"] {
  border: 1px dashed transparent;
  padding: 5px;
  min-height: 20px;
  white-space: normal;      
  word-break: break-word;   
  overflow-wrap: break-word;
  max-width: 100%;          
  display: block;        
}

.section p[contenteditable="true"]:focus {
  border: 1px dashed #007bff;
  background: #f9f9f9;
  outline: none;
  color: #333;
}

.section h3 { margin-bottom: 5px; font-size: 18px; font-weight: bold; color: #333; }
.section p, .section ul { margin: 0; padding: 0; font-size: 15px; color: #444; }

/* Right Panel */
.right {
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  box-shadow: 0 4px 40px rgba(0,0,0,0.6);
}

.right img {
  width: 150px; height: 150px; border-radius: 50%; object-fit: cover;
  border: 3px solid #333; cursor: pointer; box-shadow: rgba(0,0,0,0.5) 0px 4px 12px;
}

.name { font-size: 1.8rem; font-weight: 700; color: #fff; }
.role { font-size: 1.2rem; color: #ccc; margin-bottom: 10px; }

#resume-content {
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 15px; padding: 20px; width: 100%; min-height: 250px;
  background: rgba(255,255,255,0.08); border-radius: 15px;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.15);
}

.download-btn {
  margin-top: 15px; padding: 12px 25px; border: none; border-radius: 25px;
  background: linear-gradient(135deg, #00c6ff, #0072ff); color: #fff;
  font-weight: 600; cursor: pointer; transition: 0.3s ease;
}

.download-btn:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,114,255,0.5); }

.card, .section { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; color: #333; }

.project-controls, .cert-controls { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }

.project-controls input, .cert-controls input { padding: 8px; border-radius: 6px; border: none; width: 100%; }

.project-controls button, .cert-controls button { background: #007bff; color: white; padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; transition: 0.3s; }

.project-controls button:hover, .cert-controls button:hover { background: #0056b3; }

.cert-gallery { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }

.cert-gallery img { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid #333; }
/* -------------------- Responsive Media Queries -------------------- */

/* Small phones (<= 480px) */
@media (max-width: 480px) {
    body::before { width: 120px; height: 120px; top: 5%; left: 5%; box-shadow: 0 0 20px rgba(255,255,255,0.25); }
    body::after  { width: 140px; height: 140px; bottom: 5%; right: 5%; box-shadow: 0 0 24px rgba(255,255,255,0.25); }

    .container {
        grid-template-columns: 1fr;
        width: 95%;
        gap: 18px;
        padding: 14px;
    }

    .header h1 { font-size: 1.6rem; }
    .tagline { font-size: 0.9rem; }

    .left, .right {
        padding: 14px;
        border-radius: 14px;
    }

    .section, .card {
        padding: 10px;
        border-radius: 10px;
        font-size: 14px;
    }

    .section h3 { font-size: 16px; }
    .section p, .section ul { font-size: 14px; }

    .right img { width: 110px; height: 110px; }
    .name { font-size: 1.3rem; }
    .role { font-size: 0.95rem; }

    #resume-content { min-height: 170px; padding: 14px; gap: 12px; }

    .download-btn { width: 100%; padding: 10px 16px; border-radius: 20px; }

    .cert-gallery img { width: 60px; height: 60px; }

    /* Touch-friendly: remove hover lift */
    .section:hover { transform: none; }
    .section { cursor: default; touch-action: manipulation; }
}

/* Large phones & small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
    body::before { width: 150px; height: 150px; top: 6%; left: 8%; }
    body::after  { width: 180px; height: 180px; bottom: 6%; right: 8%; }

    .container {
        grid-template-columns: 1fr;
        width: 94%;
        gap: 20px;
        padding: 16px;
    }

    .header h1 { font-size: 1.9rem; }
    .tagline { font-size: 0.95rem; }

    .left, .right { padding: 16px; }

    .section { padding: 11px; }
    .right img { width: 120px; height: 120px; }
    .name { font-size: 1.45rem; }
    #resume-content { min-height: 190px; }
    .download-btn { width: 100%; }
    .section:hover { transform: none; }
}

/* Tablet / iPad landscape & portrait (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    body::before { width: 180px; height: 180px; top: 8%; left: 10%; }
    body::after  { width: 220px; height: 220px; bottom: 8%; right: 10%; }

    .container {
        grid-template-columns: 1fr 1.4fr;
        width: 92%;
        gap: 22px;
        padding: 18px;
    }

    .header h1 { font-size: 2.2rem; }
    .tagline { font-size: 1rem; }

    .left { padding: 18px; }
    .right { padding: 22px; }

    .section { padding: 12px 14px; }
    .section h3 { font-size: 17px; }
    .section p, .section ul { font-size: 15px; }

    .right img { width: 135px; height: 135px; }
    .name { font-size: 1.6rem; }
    .role { font-size: 1.05rem; }

    #resume-content { min-height: 220px; padding: 18px; }
    .download-btn { padding: 11px 22px; }
}

/* Laptops (1025px - 1366px) */
@media (min-width: 1025px) and (max-width: 1366px) {
    body::before { width: 220px; height: 220px; top: 10%; left: 12%; }
    body::after  { width: 300px; height: 300px; bottom: 10%; right: 10%; }

    .container {
        grid-template-columns: 1fr 2fr;
        width: 88%;
        gap: 26px;
        padding: 20px;
    }

    .header h1 { font-size: 2.4rem; }
    .tagline { font-size: 1rem; }

    .left, .right { padding: 20px; }

    .section { padding: 12px 18px; }
    .right img { width: 150px; height: 150px; }
    .name { font-size: 1.75rem; }
    #resume-content { min-height: 250px; }
}

/* Large desktops (>= 1367px) */
@media (min-width: 1367px) {
    body::before { width: 280px; height: 280px; top: 8%; left: 10%; }
    body::after  { width: 420px; height: 420px; bottom: 8%; right: 8%; }

    .container {
        grid-template-columns: 1fr 2.3fr;
        width: 80%;
        max-width: 1400px;
        gap: 32px;
        padding: 26px;
    }

    .header h1 { font-size: 2.8rem; }
    .tagline { font-size: 1.05rem; }

    .left, .right { padding: 24px; border-radius: 22px; }

    .section { padding: 18px; }
    .section h3 { font-size: 18px; }
    .right img { width: 170px; height: 170px; }
    .name { font-size: 2rem; }
    .role { font-size: 1.25rem; }

    #resume-content { min-height: 320px; padding: 24px; }
    .download-btn { padding: 14px 28px; }
}

/* Print adjustments */
@media print {
    body { background: #fff; color: #000; }
    body::before, body::after { display: none; }
    .download-btn, .project-controls button, .cert-controls button { display: none !important; }
    .container { width: 100%; box-shadow: none; background: transparent; padding: 0; }
    .left, .right, .section, .card { box-shadow: none; background: transparent; border-radius: 0; color: #000; }
}

/* Accessibility & minor improvements */
@media (hover: hover) {
    .section { cursor: grab; }
    .section:active { cursor: grabbing; }
}


// Element References
const sections = document.querySelector('#drag-sections');
const resumePreview = document.querySelector('#resume-preview');
const resumeContent = document.querySelector('#resume-content');
const downloadBtn = document.querySelector('#download-resume');
const downloadDocBtn = document.querySelector('#download-resume-doc');
const profileName = document.querySelector('#profile-name');
const profileRole = document.querySelector('#profile-role');

// Profile Photo Upload
const profilePhoto = document.querySelector('#profile-photo');
const photoInput = document.createElement('input');
photoInput.type = 'file'; photoInput.accept = 'image/*'; photoInput.style.display = 'none';
document.body.appendChild(photoInput);

profilePhoto.addEventListener('click', () => photoInput.click());
photoInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = ev => profilePhoto.src = ev.target.result;
    reader.readAsDataURL(file);
  }
});

// Drag & Drop
sections.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", e.target.id));
resumePreview.addEventListener("dragover", e => e.preventDefault());
resumePreview.addEventListener("dragenter", e => { e.preventDefault(); resumePreview.style.boxShadow = "0 0 20px 5px #00c6ff"; });
resumePreview.addEventListener("dragleave", e => { e.preventDefault(); resumePreview.style.boxShadow = "0 4px 40px rgba(0,0,0,0.6)"; });

resumePreview.addEventListener("drop", e => {
  e.preventDefault();
  const sectionId = e.dataTransfer.getData("text/plain");
  const section = document.querySelector(`#${sectionId}`);
  if(section){
    const placeholder = resumeContent.querySelector('.placeholder');
    if(placeholder) placeholder.remove();
    if(!resumeContent.contains(section)) resumeContent.appendChild(section);

    if(sectionId === "section-projects") setupProjectControls(section);
    if(sectionId === "section-certifications") setupCertControls(section);

    resumePreview.style.boxShadow = "0 4px 40px rgba(0,0,0,0.6)";
  }
});

// Editable Fields
profileName.contentEditable = true;
profileRole.contentEditable = true;

// Project Section Controls
function setupProjectControls(section){
  if(!section.querySelector(".project-controls")){
    const controls = document.createElement("div");
    controls.className = "project-controls";
    controls.innerHTML = `
      <input type="text" placeholder="Enter project link">
      <button>Add Link</button>
      <ul class="project-links"></ul>
    `;
    section.appendChild(controls);

    const input = controls.querySelector("input");
    const btn = controls.querySelector("button");
    const list = controls.querySelector(".project-links");

    btn.addEventListener("click", () => {
      const link = input.value.trim();
      if(link){
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        list.appendChild(li);
        input.value = "";
      }
    });
  }
}

// Certification Section Controls
function setupCertControls(section){
  if(!section.querySelector(".cert-controls")){
    const controls = document.createElement("div");
    controls.className = "cert-controls";
    controls.innerHTML = `
      <input type="file" accept="image/*" multiple>
      <button style="display:none;">Remove All</button>
      <div class="cert-gallery"></div>
    `;
    section.appendChild(controls);

    const input = controls.querySelector("input");
    const btn = controls.querySelector("button");
    const gallery = controls.querySelector(".cert-gallery");

    input.addEventListener("change", () => {
      gallery.innerHTML = "";
      const files = input.files;
      if(files.length) btn.style.display = "inline-block";
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const img = document.createElement("img");
          img.src = e.target.result;
          gallery.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });

    btn.addEventListener("click", () => {
      input.value = "";
      gallery.innerHTML = "";
      btn.style.display = "none";
    });
  }
}

// Download as Image
downloadBtn.addEventListener("click", () => {
  html2canvas(resumePreview, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "my_resume.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// Download as DOC
downloadDocBtn.addEventListener("click", () => {
  const clone = resumePreview.cloneNode(true);
  const removeEls = clone.querySelectorAll('.download-btn, .project-controls input, .project-controls button, .cert-controls input, .cert-controls button, .placeholder');
  removeEls.forEach(el => el.remove());

  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
                xmlns:w='urn:schemas-microsoft-com:office:word'
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>Resume</title></head><body>${clone.innerHTML}</body></html>`;
  
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "My_Resume.doc"; link.click();
  URL.revokeObjectURL(url);
});
</body>
</html>
