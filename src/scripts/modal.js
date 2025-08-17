export function createModal({ title, body, footer, id }) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("fade");
  modal.id = id;
  modal.tabIndex = -1;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-labelledby", `${id}Label`);

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        ${
          title !== undefined
            ? `
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        `
            : ""
        }
        <div class="modal-body">
          ${body}
        </div>
        ${
          footer !== undefined
            ? `
        <div class="modal-footer">
          ${footer}
        </div>
        `
            : ""
        }
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

export function showModal(modal) {
  const modalExisting = document.querySelector(".modal.show");

  if (modalExisting) {
    modalExisting.remove();
    document.body.style = "";
  }

  const bsModal = new window.bootstrap.Modal(modal);
  bsModal.show();

  modal.addEventListener("hidden.bs.modal", () => {
    modal.remove();
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });
}
