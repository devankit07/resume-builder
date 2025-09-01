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
